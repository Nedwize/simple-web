const mongoose = require('mongoose')

const bookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      minlength: 6,
      maxlength: 100,
    },
    author: { type: String, required: true, index: true },
    publisher: { type: String, required: true },
    pictureUrl: { type: String },
    description: {
      type: String,
      minLength: 6,
      maxLength: 40,
      default: '404 Description Not Found',
    },
    isbn: { type: Number },
  },
  { timestamps: true, versionKey: false }
)

bookSchema.index({ description: 'text', title: 'text' })

module.exports = mongoose.model('Book', bookSchema)
