const mongoose = require(`mongoose`)

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

module.exports = Task