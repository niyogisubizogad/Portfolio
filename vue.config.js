const { defineConfig } = require('@vue/cli-service')

const DEFAULT_HF_MODEL = 'Qwen/Qwen2.5-7B-Instruct:fastest'

function normalizeHistory(history = []) {
  if (!Array.isArray(history)) return []

  return history
    .slice(-10)
    .map((entry) => ({
      role: entry?.sender === 'me' ? 'user' : 'assistant',
      content: String(entry?.text || '').trim()
    }))
    .filter((entry) => entry.content)
}

function buildChatMessages({ username, message, history }) {
  const safeUsername = String(username || 'there').trim() || 'there'
  const recentHistory = normalizeHistory(history)

  return [
    {
      role: 'system',
      content:
        `You are Gad AI, an intelligent assistant built by Gad NiYOGiSUBiZO. The user's name is ${safeUsername}. Address the user naturally by name, but only occasionally, not in every sentence. Keep responses conversational, human-like, friendly, and concise. Reply in 1 or 2 short sentences. Avoid markdown, lists, or long explanations. You can mention you were built by Gad NiYOGiSUBiZO if asked.`
    },
    ...recentHistory,
    {
      role: 'user',
      content: String(message || '').trim()
    }
  ]
}

async function requestHuggingFaceReply({ apiKey, model, message, username, history }) {
  const response = await fetch('https://router.huggingface.co/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      model,
      messages: buildChatMessages({ username, message, history }),
      max_tokens: 60
    })
  })

  const responseText = await response.text()
  let payload = {}

  try {
    payload = responseText ? JSON.parse(responseText) : {}
  } catch {
    payload = {}
  }

  if (!response.ok) {
    const providerMessage = payload?.error?.message || payload?.message || responseText
    const error = new Error(`Hugging Face request failed: ${response.status} ${providerMessage}`)
    error.statusCode = response.status
    error.providerCode = payload?.error?.code
    error.providerMessage = providerMessage
    throw error
  }

  return (payload.choices?.[0]?.message?.content || '').trim()
}

function isUnsupportedModelError(error) {
  return error?.statusCode === 400
    && (
      error?.providerCode === 'model_not_supported'
      || /model.*not supported/i.test(error?.providerMessage || error?.message || '')
    )
}

async function generateHuggingFaceReply({ username = '', message = '', history = [] } = {}) {
  const apiKey = process.env.HF_API_KEY
  const requestedModel = process.env.HF_MODEL || DEFAULT_HF_MODEL
  const modelsToTry = [...new Set([requestedModel, DEFAULT_HF_MODEL])]

  if (!apiKey) {
    const error = new Error('Missing HF_API_KEY')
    error.statusCode = 500
    throw error
  }

  let lastError = null

  for (const model of modelsToTry) {
    try {
      return await requestHuggingFaceReply({ apiKey, model, message, username, history })
    } catch (error) {
      lastError = error

      if (model !== DEFAULT_HF_MODEL && isUnsupportedModelError(error)) {
        console.warn(`Unsupported Hugging Face model "${model}". Retrying with "${DEFAULT_HF_MODEL}".`)
        continue
      }

      throw error
    }
  }

  throw lastError || new Error('Auto reply failed')
}

async function generateReply({ username = '', message = '', history = [] } = {}) {
  return generateHuggingFaceReply({ username, message, history })
}

module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    setupMiddlewares(middlewares, devServer) {
      if (!devServer || !devServer.app) {
        return middlewares
      }

      devServer.app.post('/api/auto-reply', (req, res) => {
        let body = ''

        req.on('data', (chunk) => {
          body += chunk
        })

        req.on('end', () => {
          (async () => {
            try {
              const payload = body ? JSON.parse(body) : {}
              const username = String(payload.username || '').trim()
              const message = String(payload.message || '').trim()
              const history = Array.isArray(payload.history) ? payload.history : []

              if (!message) {
                res.statusCode = 400
                res.setHeader('Content-Type', 'application/json')
                res.end(JSON.stringify({ error: 'Message is required' }))
                return
              }

              console.log('📨 Auto-reply request:', { username, message })
              const reply = await generateReply({ username, message, history })
              console.log('✅ Auto-reply response:', { reply })

              res.setHeader('Content-Type', 'application/json')
              res.end(JSON.stringify({ reply }))
            } catch (error) {
              console.error('❌ Auto-reply error:', error.message)
              res.statusCode = error.statusCode || 500
              res.setHeader('Content-Type', 'application/json')
              res.end(JSON.stringify({ error: error.message || 'Auto reply failed' }))
            }
          })().catch((err) => {
            console.error('❌ Unexpected error:', err)
            res.statusCode = 500
            res.setHeader('Content-Type', 'application/json')
            res.end(JSON.stringify({ error: 'Unexpected auto reply failure' }))
          })
        })
      })

      return middlewares
    }
  }
})
