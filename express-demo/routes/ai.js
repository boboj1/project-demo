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
    for await (const part of result) {
      console.log(part)
    }
    const responseData = {
      ...result.message,
      id: Date.now().toString(),
    }
    res.json(success(responseData))
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' })
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
