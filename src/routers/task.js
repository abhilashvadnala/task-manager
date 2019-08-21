const express = require(`express`)
const Task = require(`../models/task`)
const auth = require(`../middleware/auth`)
const router = new express.Router()

//creates a task
router.post(`/tasks/create`, auth, async (req,res) => {
    const task = await new Task({
        author: req.user._id,
        ...req.body
    })
    try {
        await task.save()
        res.status(201).send(task)
    } catch (error) {
        res.status(500).send(error)
    }
})

//retrives all tasks
router.get(`/tasks`,auth, async (req, res) => {
    const match = {}
    const sort = {}
    if(req.query.completed){
        match.completed = req.query.completed === 'true'
    }
    if(req.query.sortBy){
        const parts = req.query.sortBy.split(':')
        sort[parts[0]] = parts[1] === 'desc' ? -1 : 1
    }
    try {
        await req.user.populate({
            path: 'myTasks',
            match,
            options: {
                limit: parseInt(req.query.limit),
                skip: parseInt(req.query.skip),
                sort
            }
        }).execPopulate()
        res.send(req.user.myTasks)
    } catch (error) {
        res.status(500).send(error)   
    }
})

//retrives a task based on _id
router.get(`/tasks/:id`,auth, async (req,res) => {
    const _id = req.params.id

    try {
        const task = await Task.findOne({_id, author: req.user._id})
            if(!task){
                res.status(404).send(`no task with that id`)
            }
            res.send(task)
    } catch (error) {
        res.status(500).send(error)
    }
})

//updating a task based on its _id
router.patch(`/tasks/:id`,auth, async (req, res) => {
    const _id = req.params.id
    const allowedUpdates = [`title`, `description`, `completed`]
    const updates = Object.keys(req.body)
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if(!isValidOperation){
        return res.status(400).send({error: `Invalid Updates`})
    }
    try {
        const task = await Task.findOne({_id, author: req.user._id})
        if(!task){
            res.status(204).send(`no task with such id`)
        }
        updates.forEach((update) => task[update] = req.body[update])
        await task.save()
        res.send(task)
    } catch (error) {
        res.status(500).send(error)
    }
})

//deleting a task, by its _id
router.delete(`/tasks/:id`,auth, async (req, res) => {
    const _id = req.params.id
    try {
        const task = await Task.findOneAndDelete({_id,author: req.user._id})
        if(!task){
            res.status(404).send()
        }
        res.send(task)
    } catch (error) {
        res.status(500).send(error)
    }
})

module.exports = router