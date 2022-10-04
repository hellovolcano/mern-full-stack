const { Schema } = require('mongoose');

const riffSchema = new Schema(
  {
    riffBody: {
      type: String,
      required: true,
      maxlength: 280
    },
    username: {
      type: String,
      required: true
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  }
);

module.exports = riffSchema;
