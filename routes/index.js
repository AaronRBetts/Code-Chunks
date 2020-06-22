const express = require('express');
const router = express.Router();
const { ensureAuth, ensureGuest } = require('../middleware/auth')

const Chunk = require('../models/Chunk')

// @desc  Login/Landing page
// @route GET /
router.get('/', ensureGuest, (req, res) => {
  res.render('login', {
    layout: 'login'
  });
})


// @desc  Dashboard
// @route GET /dashboard
router.get('/dashboard', ensureAuth, async (req, res) => {
  try {
    // store all Chunks created by the logged in user (as js objects)
    const chunks = await Chunk.find({ user: req.user.id }).lean()

    res.render('dashboard', {
      name: req.user.firstName,
      chunks
    });
  } catch (err) {
    console.error(err)
    res.render('error/500')
  }
})

module.exports = router;