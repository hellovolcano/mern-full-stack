const { Schema, model } = require('mongoose')
const riffSchema = require('./Riff')
const dateFormat = require('../utils/dateFormat');

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
            default: Date.now,
            get: timestamp => dateFormat(timestamp)
        },
        username: {
            type: String,
            required: true
        },
        riffs: [riffSchema]
    },
    {
        toJSON: {
          getters: true
        }
      }
)

poemSchema.virtual('riffCount').get(function() {
    return this.riffs.length;
  });

const Poem = model('Poem', poemSchema)

module.exports = Poem
