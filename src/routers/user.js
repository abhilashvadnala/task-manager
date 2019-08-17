const express = require(`express`)
const User = require(`../models/user`)
const router = new express.Router()

//creates a user
router.post(`/users`, async (req, res) => {
    const user = new User(req.body)

    try {
        user.save()
        res.status(201).send(user)
    } catch (error) {
        res.status(400).send(error)        
    }
})

//retrives all users
router.get(`/users`, async (req, res) => {
    try {
        const user = await User.find({})
        res.send(user)
    } catch (error) {
        res.status(204).send(error)
    }

})

//retrives a single user based on _id
router.get(`/users/:id`, async (req, res) => {
    const _id = req.params.id
    try {
        const user = await User.findById(_id)
        if(!user){
            res.status(404).send()
        }
        res.send(user)
    } catch (error) {
        res.status(500).send(error)
    }
}) 

//updates a user info
router.patch(`/users/:id`, async (req,res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = [`name`, `password`, `email`, `age`]
    const _id = req.params.id
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if(!isValidOperation){
        return res.status(400).send({error: `Invalid Updates`})
    }
    try {
        const u = await User.findById(_id)
        updates.forEach((update) => u[update] = req.body[update])
        await u.save()
        if(!u){
            res.status(204).send()
        }
        res.send(u)
    } catch (error) {
        console.log(error)
        res.status(500).send(error)
    }
})

//deleting a user account
router.delete(`/users/:id`,async (req, res) => {
    const _id = req.params.id

    try {
        const u = await User.findByIdAndDelete(_id)
        if(!u){
            res.status(404).send()
        }
        console.log(`deleted ${u}`)
        res.send(u)
    } catch (error) {
        res.status(500).send(error)
    }
})

module.exports = router