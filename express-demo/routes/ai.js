const express = require('express')
const router = express.Router()
const { Ollama } = require('ollama')
const { success, error } = require('../utils/response')

const ollama = new Ollama()

router.post('/chat', async (req, res) => {
  try {
    const { model, messages } = req.body
    const result = await ollama.chat({
      model,
      messages,
      stream: true,
    })

    res.setHeader('Content-Type', 'text/event-stream')
    res.setHeader('Cache-Control', 'no-cache')

    for await (const part of result) {
      res.write(part.message.content)
    }
    res.end()
  } catch (err) {
    res.status(500).json(error(err.message))
  }
})

router.get('/models', async (req, res) => {
  try {
    const { models } = await ollama.list()
    const data = {
      defaultModel: models[0]?.model || '',
      models,
    }
    res.json(success(data))
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' })
  }
})

module.exports = router
