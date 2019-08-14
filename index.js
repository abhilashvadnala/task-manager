const express = require(`express`)
require(`./src/db/mongoose`)
const User = require(`./src/models/user`)
const Task = require(`./src/models/task`)

const app = express()
const port = process.env.PORT || 3000


// This line parses all the incoming json into obj
app.use(express.json())

app.post(`/users`, (req, res) => {
    const user = new User(req.body)

    user.save().then(() => {
        res.status(201).send(user)
    }).catch((err) => {
        console.log(err)
    })
})

app.get(`/users/:id`, (req, res) => {
    const _id = req.params.id

    User.findById(_id).then((user) => {
        if(!user){
            res.status(204).send(`no user with that id`)
        }
        res.send(user)
    }).catch((err) => {
        res.status(500).send(err)
    })
}) 

app.post(`/tasks`, (req,res) => {
    const task = new Task(req.body)

    task.save().then(() => {
        res.status(200).send(task)
    }).catch((err) => {
        res.status(500).send(err)
    })
})

app.get(`/tasks`, (req, res) => {
    Task.find({}).then(task => res.send(task)).catch( err => res.status(500).send(err))
})

app.get(`/tasks/:id`, (req,res) => {
    const _id = req.params.id

    Task.findById(_id).then( task => {
        if(!task){
            res.status(404).send(`no task with that id`)
        }
        res.send(task)
    }).catch( err => {
        res.status(500).send(err)
    })
})

app.listen(port, () => console.log(`Server is Up on ${port}`))