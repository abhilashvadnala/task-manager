const express = require(`express`)
const Task = require(`../models/task`)
const router = new express.Router()

//creates a task
router.post(`/tasks`, async (req,res) => {
    try {
        const task = await new Task(req.body)
        res.send(task)
    } catch (error) {
        res.status(500).send(error)
    }
})

//retrives all tasks
router.get(`/tasks`, async (req, res) => {
    try {
        const tasks = await Task.find({})
        res.send(tasks)
    } catch (error) {
        res.status(500).send(error)   
    }
})

//retrives a task based on _id
router.get(`/tasks/:id`, async (req,res) => {
    const _id = req.params.id

    try {
        const task = await Task.findById(_id)
            if(!task){
                res.status(404).send(`no task with that id`)
            }
            res.send(task)
    } catch (error) {
        res.status(500).send(error)
    }
})

//updating a task based on its _id
router.patch(`/tasks/:id`, async (req, res) => {
    const _id = req.params.id
    const allowedUpdates = [`title`, `description`, `completed`]
    const updates = Object.keys(req.body)
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if(!isValidOperation){
        return res.status(400).send({error: `Invalid Updates`})
    }
    try {
        const task = Task.findByIdAndUpdate(_id,req.body,{new: true, runValidators: true})
        if(!task){
            res.status(204).send(`no task with such id`)
        }
        res.send(task)
    } catch (error) {
        res.status(500).send(error)
    }
})

//deleting a task, by its _id
router.delete(`/tasks/:id`, async (req, res) => {
    const _id = req.params.id
    try {
        const task = await Task.findByIdAndDelete(_id)
        if(!task){
            res.status(404).send()
        }
        res.send(task)
    } catch (error) {
        res.status(500).send(error)
    }
})

module.exports = router