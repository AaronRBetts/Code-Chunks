const express = require('express');
const router = express.Router();
const { ensureAuth } = require('../middleware/auth')

const Chunk = require('../models/Chunk')

// @desc  Show 'add' page
// @route GET /chunks/add
router.get('/add', ensureAuth, (req, res) => {
    res.render('chunks/add')
})

// @desc  Process add form
// @route POST /chunks
router.post('/', ensureAuth, async (req, res) => {
    try {
        req.body.user = req.user.id
        await Chunk.create(req.body)
        res.redirect('/dashboard')
    } catch (err) {
        console.log(err)
        res.render('error/500')
    }
})

// @desc  Show all chunks
// @route GET /chunks/add
router.get('/', ensureAuth, async (req, res) => {
    try {
        const chunks = await Chunk.find({ status: 'public' })
            .populate('user')
            .sort({ createdAt: 'desc' })
            .lean()
        res.render('chunks/index', {
            chunks
        })
    } catch (err) {
        console.log(err)
        res.render('error/500')
    }
})


// @desc  Show edit chunk page
// @route GET /chunks/edit/:id
router.get('/edit/:id', ensureAuth, async (req, res) => {
    const chunk = await Chunk.findOne({
        _id: req.params.id
    }).lean()

    if (!chunk) {
        return res.render('error/404')
    }

    if (chunk.user != req.user.id) {
        res.redirect('/chunks')
    } else {
        res.render('chunks/edit', {
            story,
        })
    }
})

module.exports = router;