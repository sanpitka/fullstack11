require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const Anecdote = require('./models/anecdote')

const app = express()
app.use(cors())
app.use(express.json())

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.error('MongoDB connection error:', error.message))

app.get('/anecdotes', async (req, res) => {
  const anecdotes = await Anecdote.find({})
  res.json(anecdotes)
})

app.post('/anecdotes', async (req, res) => {
  const { content } = req.body
  const anecdote = new Anecdote({ content, votes: 0 })
  const saved = await anecdote.save()
  res.json(saved)
})

app.put('/anecdotes/:id', async (req, res) => {
  const { content, votes } = req.body
  const updated = await Anecdote.findByIdAndUpdate(
    req.params.id,
    { content, votes },
    { new: true }
  )
  res.json(updated)
})

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`)
})