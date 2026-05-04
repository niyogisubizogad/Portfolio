exports.handler = async function (event) {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' }
  }

  let payload = {}
  try {
    payload = JSON.parse(event.body || '{}')
  } catch {
    return { statusCode: 400, body: JSON.stringify({ error: 'Invalid JSON' }) }
  }

  const { username = '', message = '', history = [] } = payload
  if (!message.trim()) {
    return { statusCode: 400, body: JSON.stringify({ error: 'Message is required' }) }
  }

  const apiKey = process.env.HF_API_KEY
  const model = process.env.HF_MODEL

  if (!apiKey) {
    return { statusCode: 500, body: JSON.stringify({ error: 'Missing HF_API_KEY' }) }
  }

  try {
    const response = await fetch('https://router.huggingface.co/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model,
        messages: buildMessages(username, message, history),
        max_tokens: 60
      })
    })

    const data = await response.json()

    if (!response.ok) {
      return { statusCode: response.status, body: JSON.stringify({ error: data?.error?.message || 'HF error' }) }
    }

    const reply = (data.choices?.[0]?.message?.content || '').trim()
    return { statusCode: 200, body: JSON.stringify({ reply }) }

  } catch (err) {
    return { statusCode: 500, body: JSON.stringify({ error: err.message }) }
  }
}

function buildMessages(username, message, history = []) {
  const safeUsername = String(username || 'there').trim()
  const recent = (Array.isArray(history) ? history : [])
    .slice(-10)
    .map(e => ({ role: e?.sender === 'me' ? 'user' : 'assistant', content: String(e?.text || '').trim() }))
    .filter(e => e.content)

  return [
    {
      role: 'system',
      content: `You are Gad AI, an intelligent assistant built by Gad NiYOGiSUBiZO. The user's name is ${safeUsername}. Be conversational, friendly, and concise. Reply in 1 or 2 short sentences.`
    },
    ...recent,
    { role: 'user', content: String(message).trim() }
  ]
}