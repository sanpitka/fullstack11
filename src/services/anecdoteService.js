const baseUrl = 'http://localhost:3001/anecdotes'

export const getAll = async () => {
  const response = await fetch(baseUrl)
  if (!response.ok) {
    throw new Error('Failed to fetch anecdotes')
  }
  return await response.json()
}

export const create = async (content) => {
  const options = { 
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ content, votes: 0 })
  }
  const response = await fetch(baseUrl, options)
  if (!response.ok) {
    throw new Error('Failed to create anecdote')
  }
  return await response.json()
}

export const vote = async (id) => {
  const anecdoteToVote = await fetch(`${baseUrl}/${id}`)
  if (!anecdoteToVote.ok) {
    throw new Error('Anecdote not found')
  }
  const anecdote = await anecdoteToVote.json()
  const updatedAnecdote = { ...anecdote, votes: anecdote.votes + 1 }
  const options = {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updatedAnecdote)
  }
  const response = await fetch(`${baseUrl}/${id}`, options)
  if (!response.ok) {
    throw new Error('Failed to vote anecdote')
  }
  return await response.json()
}

export default { getAll, create, vote }