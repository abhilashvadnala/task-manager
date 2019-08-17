const mongoose = require(`mongoose`)
const bcrypt = require(`bcryptjs`)
const validator = require(`validator`)

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
    }
})

userSchema.pre(`save`, async function(next){
    const user = this
    if(user.isModified(`password`)){
        user.password = await bcrypt.hash(user.password, 8)
    }
    next()
})

const User = mongoose.model(`User`,userSchema)

module.exports = User