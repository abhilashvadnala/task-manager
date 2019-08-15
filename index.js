const express = require(`express`)
require(`./src/db/mongoose`)
const User = require(`./src/models/user`)
const Task = require(`./src/models/task`)
const userRouter = require(`./src/routers/user`)
const taskRouter = require(`./src/routers/task`)


const app = express()
const port = process.env.PORT || 3000


// This line parses all the incoming json into obj
app.use(express.json())
app.use(userRouter)
app.use(taskRouter)

app.listen(port, () => console.log(`Server is Up on ${port}`))