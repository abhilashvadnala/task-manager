const express = require(`express`)
const User = require(`../models/user`)
const auth = require(`../middleware/auth`)
const router = new express.Router()
const multer = require(`multer`)
const sharp = require('sharp')

//user signup
router.post(`/users/signup`, async (req, res) => {
    const user = new User(req.body)
    try {
        await user.save()
        const token = await user.generateAuthToken()
        res.status(201).send({ user, token })
    } catch (error) {
        res.status(400).send(error)        
    }
})

//user login
router.post(`/users/login`, async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const token = await user.generateAuthToken()
        res.status(200).send({user,token})
    } catch (error) {
        res.status(500).send()
    }
})

//setting avatar
const upload = multer({
    limits: {
        fileSize: 1000000
    },
    fileFilter(req, file, cb) {
        if(!file.originalname.match(/\.(jpg|jpeg|png)$/)){
            return cb(new Error('Please upload a valid image format'))
        }
        cb(undefined,true)
    }
})
router.post(`/users/me/avatar`, auth, upload.single('avatar'), async (req, res) => {
    const buffer = sharp(req.file.avatar).resize({ width: 250, height: 250}).png().toBuffer()
    req.user.avatar = buffer
    await req.user.save()
    res.status(200).send()
}, (error, req, res, next) => {
    res.status(400).send({error: error.message})
})

//deleting avatar
router.delete(`/users/me/avatar`, auth, async(req, res) => {
    try {
    req.user.avatar = undefined
    await req.user.save()
    res.status(202).send()
    } catch (error) {
        res.status(500).send('Unable to remove avatar')
    }
})

//fetching avatar onto browser
router.get(`/users/me/avatar`, auth, async(req, res) => {
    try {
        if(!req.user.avatar){
            res.status(404).send('No avatar!')
        }
        res.set('Content-Type', 'image/png')
        res.send(req.user.avatar)
    } catch (error) {
        res.status(500).send('Internal Error')
    }
})

//user logout
router.post(`/users/logout`, auth, async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token != req.token
        })
        await req.user.save()
        res.status(202).send(`logged out`)
    } catch (error) {
        res.status(500).send(`not yet logged out`)
    }
})

//user logs out of all devices
router.post(`/users/logoutAll`, auth, async (req,res) => {
    try {
        req.user.tokens = []
        await req.user.save()
        res.status(200).send()
    } catch (error) {
        res.status(500).send()
    }
})

//retrives all users
router.get(`/users/me`, auth, async (req, res) => {
    res.send(req.user)
}) 

//updates a user info
router.patch(`/users/updateMyAcc`,auth, async (req,res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = [`name`, `password`, `email`, `age`]
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if(!isValidOperation){
        return res.status(400).send({error: `Invalid Updates`})
    }
    try {
        updates.forEach((update) => req.user[update] = req.body[update])
        await req.user.save()
        
        res.send(req.user)
    } catch (error) {
        console.log(error)
        res.status(500).send(error)
    }
})

//deleting a user account
router.delete(`/users/deleteMyAcc`,auth, async (req, res) => {
    try {
        await req.user.remove()
        res.send(req.user)
    } catch (error) {
        res.status(500).send(error)
    }
})


module.exports = router