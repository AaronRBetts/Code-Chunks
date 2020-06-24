const mongoose = require('mongoose');

const ChunkSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        default: ''
    },
    body: {
        type: String,
        required: true,
        default: ''
    },
    status: {
        type: String,
        default: 'public',
        enum: ['public', 'private']
    },
    language: {
        type: String,
        default: 'html',
        enum: ['html', 'CSS', 'Javascript']
    },
    favorites: {
        type: Number,
        default: 0
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Chunk', ChunkSchema);