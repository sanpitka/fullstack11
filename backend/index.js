require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

const app = express()
app.use(cors())
app.use(express.json())

const anecdoteSchema = new mongoose.Schema({
  content: String,
  votes: Number
})

const Anecdote = mongoose.model('Anecdote', anecdoteSchema)

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(error => console.error(error.message))

app.get('/anecdotes', async (req, res) => {
  const anecdotes = await Anecdote.find({})
  res.json(anecdotes.map(a => ({
    id: a._id.toString(),
    content: a.content,
    votes: a.votes
  })))
})

app.get('/anecdotes/:id', async (req, res) => {
  const anecdote = await Anecdote.findById(req.params.id)
  if (!anecdote) {
    return res.status(404).json({ error: 'Anecdote not found' })
  }
  res.json({
    id: anecdote._id.toString(),
    content: anecdote.content,
    votes: anecdote.votes
  })
})

app.post('/anecdotes', async (req, res) => {
  const { content, votes } = req.body
  const anecdote = new Anecdote({ content, votes })
  const saved = await anecdote.save()
  res.json({
    id: saved._id.toString(),
    content: saved.content,
    votes: saved.votes
  })
})

app.put('/anecdotes/:id', async (req, res) => {
  const { content, votes } = req.body
  const updated = await Anecdote.findByIdAndUpdate(
    req.params.id,
    { content, votes },
    { new: true }
  )
  res.json({
    id: updated._id.toString(),
    content: updated.content,
    votes: updated.votes
  })
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})