const mongoose = require('mongoose')

const anecdoteSchema = new mongoose.Schema({
  content: String,
  votes: Number
})

module.exports = mongoose.model('Anecdote', anecdoteSchema)