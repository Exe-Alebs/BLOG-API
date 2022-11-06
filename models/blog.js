const mongoose = require('mongoose')
const { readingTime } = require('../middlewares/pages')

const BlogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    description: String,
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    state: {
      type: String,
      default: 'draft',
      enum: ['draft', 'published'],
    },
    read_count: {
      type: Number,
      default: 0,
    },
    reading_time: Number,
    tags: [String],
    body: String,
  },
  { timestamps: true }
)

// calculate reading time before saving document
BlogSchema.pre('save', function (next) {
  let Blog = this

  // calculate the time in minutes
  const timeToRead = readingTime(this.body)

  Blog.reading_time = timeToRead
  next()
})

// calculate reading time before updating document
BlogSchema.pre('findOneAndUpdate', function (next) {
  let article = this._update

  // calculate the time in minutes
  if (Blog.body) {
    const timeToRead = readingTime(Blog.body)
   Blog.reading_time = timeToRead
  }

  next()
})

BlogSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    delete returnedObject.__v
    delete returnedObject.owner
  },
})

module.exports = mongoose.model('Blogs', BlogSchema)