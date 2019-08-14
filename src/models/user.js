const mongoose = require(`mongoose`)
const validator = require(`validator`)

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

module.exports = User