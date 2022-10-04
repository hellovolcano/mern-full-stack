const { Schema, model } = require('mongoose')
const riffSchema = require('./Riff')

const poemSchema = new Schema(
    {
        poemText: {
            type: String,
            required: 'You need to add a poem!',
            minlength: 1,
            maxlength: 400
        },
        createdAt: {
            type: Date,
            default: Date.now
        },
        username: {
            type: String,
            required: true
        },
        riffs: [riffSchema]
    }
)

const Poem = model('Poem', poemSchema)

module.exports = Poem
