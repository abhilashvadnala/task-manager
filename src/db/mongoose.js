const mongoose = require(`mongoose`)

const connURL = `mongodb://localhost:27017/task-manager-api`

mongoose.connect(connURL, {
    useCreateIndex: true,
    useNewUrlParser: true
})

const User = mongoose.model(`User`,{
    name: {
        type: String
    },
    age: {
        type: Number
    }
})

const me = new User({
    name: `Abhilash Vadnala`,
    age: 22
})