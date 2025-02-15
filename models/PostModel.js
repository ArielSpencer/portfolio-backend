const mongoose = require('mongoose');

const Schema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  alt: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  },
  authorImg: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now()
  },
  readingTime: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  }
});

const PostModel = mongoose.models.post || mongoose.model('Post', Schema);

module.exports = PostModel;