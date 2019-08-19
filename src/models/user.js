const mongoose = require(`mongoose`)
const bcrypt = require(`bcryptjs`)
const validator = require(`validator`)
const jwt = require(`jsonwebtoken`)

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        minlength: 4,
        maxlength: 14
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: 7,
        validator(value){
            if(value.toLowerCase()===`password`){
                throw new Error(`Arey Howley, password can't contain "password". Please enter a valid password!!`)
            }
        }
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        validator(value) {
            if(!validator.isEmail(value)){
                throw new Error(`Provided Email is Invalid`)
            }
        }
    },
    age: {
        type: Number,
        default: 0,
        min: 0
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
})

//generating web tokens
userSchema.methods.generateAuthToken = async function () {
    const user = this
    const token = jwt.sign({ _id: user._id.toString() }, `MacBook Air`)
    user.tokens = user.tokens.concat({token})
    await user.save()
    return token
}

//finding user by credentials
userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({ email })
    if(!user){
        throw new Error(`User doesn't exist`)
    }
    const isMatch = await bcrypt.compare(password, user.password)
    if(!isMatch){
        throw new Error(`Unable to Login`)
    }
    return user
}

//hashes plain password
userSchema.pre(`save`, async function(next){
    const user = this
    if(user.isModified(`password`)){
        user.password = await bcrypt.hash(user.password, 8)
    }
    next()
})

const User = mongoose.model(`User`,userSchema)

module.exports = User