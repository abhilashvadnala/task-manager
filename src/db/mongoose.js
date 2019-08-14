const mongoose = require(`mongoose`)
const validator = require(`validator`)

const connURL = `mongodb://localhost:27017/task-manager-api`

mongoose.connect(connURL, {
    useCreateIndex: true,
    useNewUrlParser: true
})

const User = mongoose.model(`User`,{
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

const Task = mongoose.model(`Task`,{
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        trim: true,
        required: true,

    },  
    comments: {
        type: String,
        required: false
    },
    completed: {
        type: Boolean,
        default: false
    }
})

const user = new User({
    name: `Poppy`,
    password: `HeroABHI`,
    email: `poppy@popp.pop`
})

const code = new Task({
    title: `resolving issues in new config`,
    description: `new config is in hold. we'll start working with it shortly..`,
    completed: true
})

user.save().then(()=>console.log(user)).catch((err)=>console.log(err))
code.save().then(()=>console.log(code)).catch(err=>console.log(err))