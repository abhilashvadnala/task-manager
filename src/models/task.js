const mongoose = require(`mongoose`)

const taskSchema = new mongoose.Schema({
    author: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        trim: true,
        required: false,
    },  
    comments: {
        type: String,
        required: false
    },
    completed: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
})

const Task = mongoose.model(`Task`, taskSchema)

module.exports = Task