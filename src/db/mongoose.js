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

const Task = mongoose.model(`Task`,{
    title: {
        type: String
    },
    comments: {
        type: String
    },
    completed: {
        type: Boolean
    }
})

const me = new User({
    name: `HeroAB`
})

const code = new Task({
    title: `complete Task App in 15hrs`,
    comments: `didn't do any productive work yet.`,
    completed: false
})

me.save()
code.save()