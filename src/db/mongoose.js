const mongoose = require(`mongoose`)

const connURL = `mongodb://localhost:27017/task-manager-api`

mongoose.connect(connURL, {
    useCreateIndex: true,
    useNewUrlParser: true
})
