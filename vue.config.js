const { defineConfig } = require('@vue/cli-service')

async function generateHuggingFaceReply(message = '') {
  const apiKey = process.env.HF_API_KEY
  const model = process.env.HF_MODEL || 'Qwen/Qwen2.5-7B-Instruct:fastest'

  if (!apiKey) {
    const error = new Error('Missing HF_API_KEY')
    error.statusCode = 500
    throw error
  }

  const response = await fetch('https://router.huggingface.co/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      model,
      messages: [
        {
          role: 'system',
          content:
            'You are Gad AI, an intelligent assistant built by Gad NiYOGiSUBiZO. You write short social-media DM replies. Reply in 1 or 2 short sentences, sound casual and human, and keep it friendly. Avoid markdown, lists, or long explanations. You can mention you were built by Gad NiYOGiSUBiZO if asked.'
        },
        {
          role: 'user',
          content: message
        }
      ],
      max_tokens: 60
    })
  })

  if (!response.ok) {
    const errorText = await response.text()
    const error = new Error(`Hugging Face request failed: ${response.status} ${errorText}`)
    error.statusCode = response.status
    throw error
  }

  const payload = await response.json()
  return (payload.choices?.[0]?.message?.content || '').trim()
}

async function generateReply(message = '') {
  return generateHuggingFaceReply(message)
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
              const message = String(payload.message || '').trim()

              if (!message) {
                res.statusCode = 400
                res.setHeader('Content-Type', 'application/json')
                res.end(JSON.stringify({ error: 'Message is required' }))
                return
              }

              console.log('📨 Auto-reply request:', { message })
              const reply = await generateReply(message)
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
