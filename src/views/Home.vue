<template>
  <div class="devgram-page">
    <div class="ambient ambient-left"></div>
    <div class="ambient ambient-right"></div>

    <section class="prototype-shell">
      <div class="intro-copy">
        <span class="eyebrow">DevGram</span>
        <h1>Modern social feed with <em>AI messaging</em> built into one premium mobile interface.</h1>
        <p>
          The home feed stays visible underneath while direct messages slide in as an overlay,
          creating a polished, social-first mobile experience inside an iPhone mockup.
        </p>

        <div class="hero-cta">
          <button type="button" class="btn-primary">
            <i class="fas fa-sparkles"></i>
            Try DevGram
          </button>
          <button type="button" class="btn-ghost">
            <i class="fas fa-play"></i>
            Watch demo
          </button>
        </div>

        <div class="social-proof">
          <div class="avatars-stack">
            <img src="https://i.pravatar.cc/40?img=11" alt="User" />
            <img src="https://i.pravatar.cc/40?img=32" alt="User" />
            <img src="https://i.pravatar.cc/40?img=47" alt="User" />
            <img src="https://i.pravatar.cc/40?img=68" alt="User" />
          </div>
          <p><strong>4,200+</strong> developers already on DevGram</p>
        </div>
      </div>

      <div class="phone-stage">
        <!-- MacBook lid / screen bezel (desktop only, rendered via sibling div for clean HTML) -->
        <div class="macbook-lid" aria-hidden="true">
          <div class="macbook-camera"></div>
          <div class="macbook-screen-bezel"></div>
        </div>

        <div class="phone-frame">
          <div class="phone-notch"></div>

          <div class="phone-screen">
            <div class="app-surface">
              <header class="feed-topbar glass-panel">
                <div class="brand-group">
                  <img class="brand-logo" :src="logoImage" alt="DevGram logo" />
                  <div>
                    <span class="brand-caption">Social + AI</span>
                    <h2>DevGram</h2>
                  </div>
                </div>

                <button
                  type="button"
                  class="icon-button"
                  aria-label="Open messages"
                  @click="toggleMessages"
                >
                  <i class="far fa-paper-plane"></i>
                  <span v-if="unreadChats" class="button-badge">{{ unreadChats }}</span>
                </button>
              </header>

              <div class="status-banner glass-panel" v-if="statusMessage">
                <span>{{ statusMessage }}</span>
                <button type="button" class="banner-dismiss" aria-label="Dismiss message" @click="statusMessage = ''">
                  <i class="fas fa-xmark"></i>
                </button>
              </div>

              <main class="feed-scroll">
                <section class="profile-hero glass-panel">
                  <div class="hero-avatar-wrap">
                    <img class="hero-avatar" :src="logoImage" alt="Gad NiYoGiSuBiZo" />
                  </div>
                  <div class="hero-copy">
                    <span class="live-pill">
                      <i class="fas fa-sparkles"></i>
                      AI conversations enabled
                    </span>
                    <h3>Gad NiYoGiSuBiZo</h3>
                    <p>Frontend developer crafting polished social products with Vue.js and JavaScript.</p>
                  </div>
                </section>

                <section class="stories-strip glass-panel">
                  <div class="section-head">
                    <h4>Stories</h4>
                    <span>Today</span>
                  </div>
                  <div class="stories-row">
                    <div class="story-item" v-for="story in safeStories" :key="story?.label">
                      <div class="story-ring">
                        <img v-if="story?.image === true" class="story-avatar" :src="logoImage" alt="Gad NiYoGiSuBiZo" />
                        <img v-else-if="typeof story?.image === 'string'" class="story-avatar" :src="story?.image" :alt="story?.label || 'Story'" />
                        <div v-else class="story-avatar initials">{{ story?.initials || 'DG' }}</div>
                      </div>
                      <span>{{ story?.label || 'Story' }}</span>
                    </div>
                  </div>
                </section>

                <section class="post-list">
                  <article class="post-card glass-panel" v-for="post in safePosts" :key="post?.id">
                    <div class="post-head">
                      <div class="post-user">
                        <img class="post-avatar" :src="logoImage" alt="Gad NiYoGiSuBiZo" />
                        <div>
                          <strong>Gad NiYoGiSuBiZo</strong>
                          <p>{{ post?.meta || 'now' }}</p>
                        </div>
                      </div>
                      <button type="button" class="post-menu" aria-label="Open post options">
                        <i class="fas fa-ellipsis-h"></i>
                      </button>
                    </div>

                    <div class="post-preview" :class="post?.previewClass">
                      <div class="preview-chip">{{ post?.badge || 'DevGram' }}</div>
                      <div class="preview-grid">
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                      </div>
                    </div>

                    <div class="post-actions">
                      <button type="button" class="action-button"><i class="far fa-heart"></i></button>
                      <button type="button" class="action-button"><i class="far fa-comment"></i></button>
                      <button type="button" class="action-button" @click="openMessagesFor(post?.chatTarget)">
                        <i class="far fa-paper-plane"></i>
                      </button>
                    </div>

                    <p class="post-likes">{{ post?.likes || '0' }} likes</p>
                    <p class="post-caption">
                      <strong>Gad NiYoGiSuBiZo</strong>
                      {{ post?.caption || '' }}
                    </p>
                  </article>
                </section>
              </main>

              <transition name="dm-slide">
                <section v-if="isMessagesOpen" class="messages-overlay">
                  <div class="overlay-backdrop" @click="toggleMessages"></div>

                  <div class="messages-panel glass-panel">
                    <header class="messages-header">
                      <button type="button" class="icon-button subtle" aria-label="Close messages" @click="toggleMessages">
                        <i class="fas fa-arrow-left"></i>
                      </button>
                      <h3>Messages</h3>
                      <div class="messages-actions">
                        <button type="button" class="icon-button subtle" aria-label="Search messages">
                          <i class="fas fa-magnifying-glass"></i>
                        </button>
                        <button type="button" class="icon-button subtle" aria-label="New message" @click="seedDraft">
                          <i class="fas fa-plus"></i>
                        </button>
                      </div>
                    </header>

                    <div class="messages-body">
                      <aside class="chat-list">
                        <button
                          v-for="conversation in safeConversations"
                          :key="conversation?.id"
                          type="button"
                          class="chat-row"
                          :class="{ active: activeConversationId === conversation?.id }"
                          @click="selectConversation(conversation?.id)"
                        >
                          <div class="chat-avatar">{{ conversation?.initials || 'GA' }}</div>
                          <div class="chat-copy">
                            <div class="chat-topline">
                              <strong>{{ conversation?.username || 'Gad AI' }}</strong>
                              <span>{{ conversation?.timestamp || 'now' }}</span>
                            </div>
                            <div class="chat-bottomline">
                              <p>{{ conversation?.preview || 'Hi! I am Gad AI, How can I help you today!' }}</p>
                              <span v-if="conversation?.unread" class="unread-dot"></span>
                            </div>
                          </div>
                        </button>
                      </aside>

                      <section class="active-chat">
                        <div class="active-chat-head">
                          <div class="active-chat-user">
                            <div class="chat-avatar large">{{ activeConversation?.initials || 'GA' }}</div>
                            <div>
                              <strong>{{ activeConversation?.username || 'Gad AI' }}</strong>
                              <p>AI-assisted social reply</p>
                            </div>
                          </div>
                          <span class="ai-pill">
                            <i class="fas fa-sparkles"></i>
                            AI
                          </span>
                        </div>

                        <div class="thread" ref="thread">
                          <article
                            v-for="message in activeMessages"
                            :key="message?.id"
                            class="message-row"
                            :class="message?.sender === 'me' ? 'sent' : 'received'"
                          >
                            <div class="message-bubble" :class="message?.sender === 'me' ? 'sent-bubble' : 'received-bubble'">
                              <span v-if="message?.ai" class="bubble-label">Gad Ai</span>
                              <p>{{ message?.text || '' }}</p>
                            </div>
                          </article>

                          <div v-if="isTyping" class="message-row received">
                            <div class="message-bubble received-bubble typing-bubble">
                              <span class="bubble-label">Gad AI</span>
                              <div class="spinner"></div>
                            </div>
                          </div>
                        </div>

                        <form class="composer glass-panel" @submit.prevent="sendMessage">
                          <input
                            ref="composer"
                            v-model="draftMessage"
                            type="text"
                            class="composer-input"
                            placeholder="Message DevGram AI..."
                          />
                          <button type="submit" class="send-button" :disabled="!draftMessage?.trim() || isTyping || isSending || !activeConversation">
                            <i class="fas fa-paper-plane"></i>
                          </button>
                        </form>
                      </section>
                    </div>
                  </div>
                </section>
              </transition>
            </div>
          </div>
        </div>

        <!-- MacBook base / keyboard deck (desktop only) -->
        <div class="macbook-base" aria-hidden="true">
          <div class="macbook-trackpad"></div>
        </div>
      </div>
    </section>

    <div v-if="showUsernameModal" class="username-modal-overlay">
      <div class="username-modal glass-panel">
        <div class="username-modal-icon">
          <i class="fas fa-sparkles"></i>
        </div>
        <h2>Welcome to DevGram</h2>
        <p>Enter your name so Gad AI can make your conversations feel personal.</p>
        <form @submit.prevent="saveUsername">
          <div class="mb-3">
            <label for="devgram-username" class="form-label">Your name</label>
            <input
              id="devgram-username"
              ref="usernameInput"
              v-model="usernameDraft"
              type="text"
              class="form-control username-input"
              placeholder="Enter your name"
              autocomplete="name"
              maxlength="40"
            />
            <div v-if="usernameError" class="username-error">{{ usernameError }}</div>
          </div>
          <button type="submit" class="btn username-continue w-100">Continue</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import logoImage from '../assets/logo.png'

export default {
  name: 'HomeView',
  data() {
    return {
      logoImage,
      isMessagesOpen: false,
      activeConversationId: 1,
      draftMessage: '',
      isTyping: false,
      isSending: false,
      statusMessage: 'Integrated AI messaging is available from the top-right button.',
      replyTimer: null,
      replyRequestId: 0,
      username: '',
      usernameDraft: '',
      usernameError: '',
      showUsernameModal: false,
      stories: [
        { label: 'Gad', image: true },
        { label: 'Apple', image: 'https://www.apple.com/favicon.ico' },
        { label: 'Google', image: 'https://www.citypng.com/public/uploads/preview/google-logo-icon-gsuite-hd-701751694791470gzbayltphh.png' },
        { label: 'Netflix', image: 'https://assets.nflxext.com/us/ffe/siteui/common/icons/nficon2016.ico' },
        { label: 'Meta', image: 'https://static.xx.fbcdn.net/rsrc.php/yb/r/hLRJ1GG_y0J.ico' },
        { label: 'Tesla', image: 'https://www.tesla.com/favicon.ico' },
        { label: 'GitHub', image: 'https://github.com/favicon.ico' },
        { label: 'Vue', image: 'https://avatars.githubusercontent.com/u/6128107?s=200&v=4' },
        { label: 'Spotify', image: 'https://open.spotify.com/favicon.ico' },
        { label: 'Amazon', image: 'https://www.amazon.com/favicon.ico' },
        { label: 'Microsoft', image: 'https://www.microsoft.com/favicon.ico' }
      ],
      posts: [
        {
          id: 1,
          badge: 'Vue Sprint',
          meta: 'Just now',
          likes: '12.8k',
          caption: 'Building modern web apps with Vue.js & JavaScript and refining the mobile experience.',
          previewClass: 'preview-blue',
          chatTarget: 1
        },
        {
          id: 2,
          badge: 'Dev System',
          meta: '1h ago',
          likes: '9.4k',
          caption: 'Designing a premium social product flow with dark mode, gradients, and AI-assisted messaging.',
          previewClass: 'preview-purple',
          chatTarget: 2
        }
      ],
      conversations: []
    }
  },
  computed: {
    safeConversations() {
      return Array.isArray(this.conversations) ? this.conversations : []
    },
    activeConversation() {
      return this.safeConversations.find((conversation) => conversation?.id === this.activeConversationId) || this.safeConversations[0] || null
    },
    activeMessages() {
      return Array.isArray(this.activeConversation?.messages) ? this.activeConversation.messages : []
    },
    unreadChats() {
      return this.safeConversations.filter((conversation) => conversation?.unread).length
    },
    safeStories() {
      return Array.isArray(this.stories) ? this.stories : []
    },
    safePosts() {
      return Array.isArray(this.posts) ? this.posts : []
    }
  },
  beforeUnmount() {
    this.replyRequestId += 1
    this.clearReplyTimer()
  },
  mounted() {
    this.loadUsername()
  },
  methods: {
    loadUsername() {
      const savedUsername = localStorage.getItem('devgram_username')?.trim()
      if (savedUsername) {
        this.username = savedUsername
        this.usernameDraft = savedUsername
        this.showUsernameModal = false
        return
      }

      this.showUsernameModal = true
      this.$nextTick(() => {
        this.$refs.usernameInput?.focus()
      })
    },
    saveUsername() {
      const nextUsername = this.usernameDraft?.trim()
      if (!nextUsername || nextUsername.length < 2) {
        this.usernameError = 'Please enter at least 2 characters.'
        return
      }

      this.username = nextUsername
      this.usernameDraft = nextUsername
      this.usernameError = ''
      localStorage.setItem('devgram_username', nextUsername)
      this.showUsernameModal = false
      this.statusMessage = `Welcome, ${nextUsername}. Gad AI is ready.`
    },
    requireUsername() {
      if (this.username?.trim()) return true

      this.showUsernameModal = true
      this.$nextTick(() => {
        this.$refs.usernameInput?.focus()
      })
      return false
    },
    createGadAIConversation(id = 1) {
      return {
        id,
        initials: 'GA',
        username: 'Gad AI',
        preview: 'Hi! I am Gad AI, How can I help you today!',
        timestamp: 'now',
        unread: false,
        messages: [
          {
            id: Date.now(),
            sender: 'other',
            text: 'Hi! I am Gad AI, How can I help today!',
            ai: true
          }
        ]
      }
    },
    ensureConversation(id = this.activeConversationId || 1) {
      if (!Array.isArray(this.conversations)) {
        this.conversations = []
      }

      let conversation = this.conversations.find((item) => item?.id === id)
      if (!conversation) {
        conversation = this.createGadAIConversation(id)
        this.conversations.push(conversation)
      }

      if (!Array.isArray(conversation.messages)) {
        conversation.messages = []
      }

      this.activeConversationId = conversation.id
      return conversation
    },
    clearReplyTimer() {
      if (this.replyTimer) {
        clearTimeout(this.replyTimer)
        this.replyTimer = null
      }
    },
    toggleMessages() {
      if (!this.requireUsername()) return

      this.isMessagesOpen = !this.isMessagesOpen
      if (this.isMessagesOpen) {
        this.statusMessage = 'Messages opened without leaving the home feed.'
        this.ensureConversation(this.activeConversationId || 1)
        this.scrollThreadToBottom()
      } else {
        this.clearReplyTimer()
        this.replyRequestId += 1
        this.isTyping = false
        this.isSending = false
      }
    },
    openMessagesFor(conversationId) {
      if (!this.requireUsername()) return

      this.isMessagesOpen = true
      this.ensureConversation(conversationId || 1)
      this.selectConversation(conversationId || 1)
    },
    selectConversation(id) {
      if (!id) return
      this.activeConversationId = id
      const conversation = this.ensureConversation(id)
      if (conversation) {
        conversation.unread = false
        this.statusMessage = `${conversation.username} opened.`
      }
      this.scrollThreadToBottom()
    },
    seedDraft() {
      if (!this.requireUsername()) return

      this.draftMessage = 'Hey, I wanted your thoughts on the new DevGram flow.'
      this.$refs.composer?.focus()
    },
    getConversationHistory(conversation) {
      const messages = Array.isArray(conversation?.messages) ? conversation.messages : []

      return messages.slice(-10).map((message) => ({
        sender: message?.sender || 'other',
        text: message?.text || '',
        ai: Boolean(message?.ai)
      })).filter((message) => message.text)
    },
    async sendMessage() {
      if (!this.requireUsername()) return

      const text = this.draftMessage?.trim()
      if (!text || this.isTyping || this.isSending) return
      const conversation = this.ensureConversation(this.activeConversationId || 1)
      const history = this.getConversationHistory(conversation)

      conversation.messages.push({
        id: Date.now(),
        sender: 'me',
        text,
        ai: false
      })
      conversation.preview = text
      conversation.timestamp = 'now'
      this.draftMessage = ''
      this.isSending = true
      this.scrollThreadToBottom()
      const requestId = this.replyRequestId + 1
      this.replyRequestId = requestId

      try {
        const response = await fetch('/api/auto-reply', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            username: this.username,
            message: text,
            history
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
          throw new Error(payload?.error || payload?.message || responseText || `Auto reply request failed (${response.status})`)
        }

        const reply = payload?.reply?.trim()
        if (!reply) {
          throw new Error('Auto-reply returned an empty response.')
        }

        if (!this.isMessagesOpen || requestId !== this.replyRequestId) {
          this.isTyping = false
          this.isSending = false
          return
        }

        this.isTyping = true
        this.statusMessage = 'Gad AI is typing...'
        this.clearReplyTimer()

        this.replyTimer = setTimeout(() => {
          if (requestId !== this.replyRequestId) {
            this.isTyping = false
            this.isSending = false
            this.replyTimer = null
            return
          }

          const activeConversation = this.safeConversations.find((item) => item?.id === conversation.id)
          if (!activeConversation || !this.isMessagesOpen) {
            this.isTyping = false
            this.isSending = false
            this.replyTimer = null
            return
          }

          if (!Array.isArray(activeConversation.messages)) {
            activeConversation.messages = []
          }

          activeConversation.messages.push({
            id: Date.now() + 1,
            sender: 'other',
            text: reply,
            ai: true
          })
          activeConversation.preview = reply
          activeConversation.timestamp = 'now'
          this.isTyping = false
          this.isSending = false
          this.replyTimer = null
          this.statusMessage = 'Gad AI reply received.'
          this.scrollThreadToBottom()
        }, 1500)
      } catch (error) {
        this.clearReplyTimer()
        this.isTyping = false
        this.isSending = false
        this.statusMessage = error?.message || 'Auto-reply is unavailable right now.'
      }
    },
    scrollThreadToBottom() {
      this.$nextTick(() => {
        const thread = this.$refs.thread
        if (thread) thread.scrollTop = thread.scrollHeight
      })
    }
  }
}
</script>

<style scoped>
/* ─── Base page ─────────────────────────────────────────────── */
.devgram-page {
  position: relative;
  isolation: isolate;
  max-width: 100%;
  min-height: calc(100vh - 76px);
  overflow-x: hidden;
  background:
    radial-gradient(circle at 18% 16%, rgba(56, 189, 248, 0.22), transparent 28%),
    radial-gradient(circle at 82% 18%, rgba(168, 85, 247, 0.18), transparent 26%),
    linear-gradient(180deg, #020617 0%, #08111f 36%, #0f172a 100%);
  color: #e2e8f0;
}

[data-theme="light"] .devgram-page {
  background:
    radial-gradient(circle at 18% 16%, rgba(56, 189, 248, 0.1), transparent 28%),
    radial-gradient(circle at 82% 18%, rgba(168, 85, 247, 0.08), transparent 26%),
    linear-gradient(180deg, #f8fafc 0%, #f1f5f9 50%, #e0e7ff 100%);
  color: #1e293b;
}

[data-theme="light"] .devgram-page * { color: #1e293b; }

[data-theme="light"] .devgram-page h1,
[data-theme="light"] .devgram-page h2,
[data-theme="light"] .devgram-page h3,
[data-theme="light"] .devgram-page h4,
[data-theme="light"] .devgram-page h5,
[data-theme="light"] .devgram-page h6,
[data-theme="light"] .devgram-page strong { color: #0f172a; }

/* ─── Ambient blobs ──────────────────────────────────────────── */
.ambient {
  position: absolute;
  width: 24rem;
  height: 24rem;
  border-radius: 50%;
  filter: blur(88px);
  opacity: 0.5;
  pointer-events: none;
}

@media (max-width: 768px) {
  .ambient { display: none; }
}

.ambient-left {
  top: 5rem;
  left: -8rem;
  background: rgba(34, 211, 238, 0.2);
}

.ambient-right {
  right: -7rem;
  bottom: 1rem;
  background: rgba(99, 102, 241, 0.22);
}

/* ─── Shell layout ───────────────────────────────────────────── */
.prototype-shell {
  position: relative;
  z-index: 1;
  min-height: calc(100vh - 76px);
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0;
  /* Comfortable left padding for copy, right padding as breathing room */
  padding: 4rem 5vw 5rem 6vw;
  box-sizing: border-box;
  max-width: 100%;
  overflow: visible;
}

/* ─── Intro copy ─────────────────────────────────────────────── */
.intro-copy {
  flex: 0 0 clamp(280px, 32vw, 460px);
  max-width: 460px;
  position: relative;
  padding-right: 2rem;
}

.eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  padding: 0.42rem 1rem 0.42rem 0.6rem;
  margin-bottom: 1.4rem;
  border-radius: 999px;
  border: 1px solid rgba(56, 189, 248, 0.22);
  background: rgba(56, 189, 248, 0.06);
  color: #7dd3fc;
  font-size: 0.75rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  font-weight: 600;
}

.eyebrow::before {
  content: "";
  display: inline-block;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #38bdf8;
  box-shadow: 0 0 8px rgba(56, 189, 248, 0.8);
  animation: pulse-dot 2s ease-in-out infinite;
}

@keyframes pulse-dot {
  0%, 100% { opacity: 1; transform: scale(1); }
  50%       { opacity: 0.55; transform: scale(0.7); }
}

.intro-copy h1 {
  margin: 0 0 1.2rem;
  color: #f0f6ff;
  font-size: clamp(1.9rem, 2.8vw, 3.4rem);
  line-height: 1.08;
  letter-spacing: -0.02em;
  font-weight: 800;
}

/* Gradient accent on last word */
.intro-copy h1 em {
  font-style: normal;
  background: linear-gradient(135deg, #38bdf8 0%, #818cf8 60%, #c084fc 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.intro-copy p {
  margin: 0 0 2rem;
  color: #94a3b8;
  line-height: 1.8;
  font-size: 1.02rem;
}

/* CTA button group */
.hero-cta {
  display: flex;
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;
}

.btn-primary {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.6rem;
  border-radius: 999px;
  background: linear-gradient(135deg, #2563eb, #7c3aed);
  color: #fff;
  font-size: 0.92rem;
  font-weight: 700;
  border: 0;
  cursor: pointer;
  box-shadow: 0 8px 24px rgba(37, 99, 235, 0.35);
  transition: transform 0.2s, box-shadow 0.2s;
  text-decoration: none;
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 14px 32px rgba(37, 99, 235, 0.45);
}

.btn-ghost {
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  padding: 0.72rem 1.3rem;
  border-radius: 999px;
  background: transparent;
  color: #94a3b8;
  font-size: 0.9rem;
  font-weight: 600;
  border: 1px solid rgba(148, 163, 184, 0.18);
  cursor: pointer;
  transition: color 0.2s, border-color 0.2s;
  text-decoration: none;
}

.btn-ghost:hover {
  color: #e2e8f0;
  border-color: rgba(148, 163, 184, 0.38);
}

/* Social proof strip */
.social-proof {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-top: 2.5rem;
}

.avatars-stack {
  display: flex;
}

.avatars-stack img {
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  border: 2px solid rgba(15, 23, 42, 0.9);
  object-fit: cover;
  margin-left: -0.55rem;
  background: rgba(30, 41, 59, 0.8);
}

.avatars-stack img:first-child { margin-left: 0; }

.social-proof p {
  margin: 0;
  color: #64748b;
  font-size: 0.82rem;
  line-height: 1.4;
}

.social-proof strong {
  color: #94a3b8;
}

/* ─── Phone stage ────────────────────────────────────────────── */
.phone-stage {
  display: flex;
  justify-content: center;
  flex: 1 1 0;
  min-width: 0;
  box-sizing: border-box;
  overflow: visible;
}

/* MacBook decorative elements — hidden on mobile/tablet */
.macbook-lid,
.macbook-base { display: none; }

/* ─── Phone frame (mobile default) ──────────────────────────── */
.phone-frame {
  position: relative;
  width: min(405px, 100%);
  max-width: 100%;
  box-sizing: border-box;
  padding: 14px;
  border-radius: 3.25rem;
  background: linear-gradient(145deg, rgba(15, 23, 42, 0.98), rgba(30, 41, 59, 0.92));
  border: 1px solid rgba(148, 163, 184, 0.12);
  box-shadow:
    0 28px 80px rgba(2, 6, 23, 0.65),
    inset 0 1px 0 rgba(255, 255, 255, 0.08),
    inset 0 -2px 8px rgba(0, 0, 0, 0.45);
}

.phone-frame,
.phone-screen,
.app-surface { box-sizing: border-box; }

.phone-notch {
  position: absolute;
  top: 22px;
  left: 50%;
  transform: translateX(-50%);
  width: 142px;
  height: 28px;
  border-radius: 999px;
  background: #020617;
  z-index: 5;
}

/* ─── Phone screen ───────────────────────────────────────────── */
.phone-screen {
  overflow: hidden;
  min-height: min(100svh, 835px);
  border-radius: 2.65rem;
  border: 1px solid rgba(148, 163, 184, 0.08);
  background: linear-gradient(180deg, rgba(15, 23, 42, 0.98), rgba(15, 23, 42, 0.94));
}

/* ─── App surface ────────────────────────────────────────────── */
.app-surface {
  position: relative;
  min-height: min(100svh, 835px);
  padding: 1.25rem 1rem 1rem;
  background:
    radial-gradient(circle at top left, rgba(56, 189, 248, 0.12), transparent 30%),
    radial-gradient(circle at top right, rgba(168, 85, 247, 0.12), transparent 26%),
    linear-gradient(180deg, rgba(2, 6, 23, 0.9), rgba(15, 23, 42, 0.98));
}

/* ─── Glass panels ───────────────────────────────────────────── */
.glass-panel {
  background: rgba(15, 23, 42, 0.52);
  border: 1px solid rgba(148, 163, 184, 0.12);
  box-shadow: 0 12px 32px rgba(15, 23, 42, 0.3);
  backdrop-filter: blur(18px);
  -webkit-backdrop-filter: blur(18px);
}

.feed-topbar,
.profile-hero,
.stories-strip,
.post-card,
.status-banner,
.messages-panel,
.composer { border-radius: 1.5rem; }

/* ─── Top bar ────────────────────────────────────────────────── */
.feed-topbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.55rem 1rem 1rem;
}

.brand-group {
  display: flex;
  align-items: center;
  gap: 0.8rem;
}

.brand-logo,
.hero-avatar,
.post-avatar,
.story-avatar { object-fit: cover; }

.brand-logo {
  width: 2.7rem;
  height: 2.7rem;
  border-radius: 0.95rem;
  border: 1px solid rgba(255, 255, 255, 0.12);
}

.brand-caption {
  display: block;
  color: #7dd3fc;
  font-size: 0.72rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.brand-group h2 {
  margin: 0.1rem 0 0;
  color: #f8fafc;
  font-size: 1.08rem;
}

/* ─── Buttons ────────────────────────────────────────────────── */
.icon-button,
.post-menu,
.action-button,
.banner-dismiss,
.chat-row,
.send-button { border: 0; cursor: pointer; }

.icon-button,
.post-menu,
.banner-dismiss {
  width: 2.45rem;
  height: 2.45rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  color: #e2e8f0;
  background: rgba(30, 41, 59, 0.7);
  border: 1px solid rgba(148, 163, 184, 0.1);
}

.icon-button.subtle { background: rgba(255, 255, 255, 0.05); }

.button-badge {
  position: absolute;
  top: -0.2rem;
  right: -0.2rem;
  min-width: 1rem;
  height: 1rem;
  padding: 0 0.22rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 999px;
  background: linear-gradient(135deg, #38bdf8, #8b5cf6);
  color: #fff;
  font-size: 0.62rem;
  font-weight: 700;
}

/* ─── Status banner ──────────────────────────────────────────── */
.status-banner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
  margin-top: 1rem;
  padding: 0.8rem 1rem;
  color: #cbd5e1;
  font-size: 0.84rem;
}

/* ─── Feed scroll ────────────────────────────────────────────── */
.feed-scroll {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 1rem;
  overflow-y: auto;
  overflow-x: hidden;
  padding-right: 0.2rem;
  scrollbar-width: none;
}

.feed-scroll::-webkit-scrollbar,
.chat-list::-webkit-scrollbar,
.thread::-webkit-scrollbar { display: none; }

/* ─── Profile hero ───────────────────────────────────────────── */
.profile-hero {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
}

.hero-avatar-wrap,
.story-ring {
  padding: 2px;
  border-radius: 999px;
  background: linear-gradient(135deg, #38bdf8, #8b5cf6, #22d3ee);
}

.hero-avatar {
  width: 4.8rem;
  height: 4.8rem;
  border-radius: 50%;
}

.live-pill,
.ai-pill,
.preview-chip,
.bubble-label {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  border-radius: 999px;
  font-weight: 600;
}

.live-pill {
  padding: 0.35rem 0.7rem;
  margin-bottom: 0.7rem;
  background: rgba(56, 189, 248, 0.12);
  border: 1px solid rgba(56, 189, 248, 0.18);
  color: #7dd3fc;
  font-size: 0.72rem;
}

.hero-copy h3,
.section-head h4,
.post-user strong,
.messages-header h3,
.active-chat-user strong {
  margin: 0;
  color: #f8fafc;
}

.hero-copy p,
.post-user p,
.active-chat-user p {
  margin: 0.35rem 0 0;
  color: #94a3b8;
  line-height: 1.5;
}

/* ─── Stories ────────────────────────────────────────────────── */
.stories-strip { padding: 1rem; }

.section-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0.9rem;
}

.section-head span {
  color: #94a3b8;
  font-size: 0.8rem;
}

.stories-row {
  display: flex;
  gap: 0.95rem;
  overflow-x: auto;
  scrollbar-width: none;
}

.story-item {
  min-width: 4.1rem;
  text-align: center;
}

.story-avatar,
.story-avatar.initials,
.chat-avatar {
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
}

.story-avatar,
.story-avatar.initials {
  width: 3.5rem;
  height: 3.5rem;
  background-color: #111827; /* fallback while loading */
}

.story-avatar.initials,
.chat-avatar {
  background: linear-gradient(180deg, #0f172a, #111827);
  color: #f8fafc;
  font-weight: 700;
}

.story-item span {
  display: block;
  margin-top: 0.5rem;
  color: #cbd5e1;
  font-size: 0.75rem;
}

/* ─── Post list ──────────────────────────────────────────────── */
.post-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.post-card { padding: 1rem; }

.post-head,
.post-actions,
.messages-header,
.active-chat-head,
.chat-topline,
.chat-bottomline {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.post-user,
.active-chat-user {
  display: flex;
  align-items: center;
  gap: 0.8rem;
}

.post-avatar {
  width: 2.85rem;
  height: 2.85rem;
  border-radius: 50%;
}

.post-preview {
  margin: 1rem 0;
  min-height: 13.5rem;
  border-radius: 1.35rem;
  padding: 1rem;
  border: 1px solid rgba(255, 255, 255, 0.08);
}

.preview-blue {
  background:
    radial-gradient(circle at top left, rgba(34, 211, 238, 0.35), transparent 30%),
    linear-gradient(145deg, rgba(15, 23, 42, 0.88), rgba(37, 99, 235, 0.52));
}

.preview-purple {
  background:
    radial-gradient(circle at top right, rgba(168, 85, 247, 0.3), transparent 30%),
    linear-gradient(145deg, rgba(15, 23, 42, 0.88), rgba(126, 34, 206, 0.52));
}

.preview-chip {
  padding: 0.45rem 0.75rem;
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.08);
  color: #e0f2fe;
  font-size: 0.8rem;
}

.preview-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.7rem;
  margin-top: 1rem;
}

.preview-grid span {
  height: 4rem;
  border-radius: 1rem;
  background: rgba(255, 255, 255, 0.08);
}

.action-button {
  width: 2.1rem;
  height: 2.1rem;
  border-radius: 50%;
  color: #e2e8f0;
  background: transparent;
}

.post-likes,
.post-caption strong { color: #f8fafc; }

.post-caption {
  margin: 0.4rem 0 0;
  color: #cbd5e1;
  line-height: 1.5;
}

/* ─── Messages overlay ───────────────────────────────────────── */
.messages-overlay {
  position: absolute;
  inset: 0;
  z-index: 10;
}

.overlay-backdrop {
  position: absolute;
  inset: 0;
  background: rgba(2, 6, 23, 0.44);
}

.messages-panel {
  position: absolute;
  top: 0.9rem;
  right: 0;
  bottom: 0.9rem;
  width: calc(100% - 0.4rem);
  max-width: 100%;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  padding: 1rem;
  overflow: hidden;
}

.messages-header {
  gap: 0.75rem;
  padding-bottom: 0.8rem;
  border-bottom: 1px solid rgba(148, 163, 184, 0.12);
}

.messages-actions { display: flex; gap: 0.45rem; }

.messages-body {
  flex: 1;
  display: grid;
  grid-template-columns: 0.95fr 1.2fr;
  gap: 0.95rem;
  min-height: 0;
  min-width: 0;
  margin-top: 1rem;
}

/* ─── Chat list ──────────────────────────────────────────────── */
.chat-list {
  display: flex;
  flex-direction: column;
  gap: 0.65rem;
  overflow-y: auto;
  overflow-x: hidden;
  min-width: 0;
  scrollbar-width: none;
}

.chat-row {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  width: 100%;
  min-width: 0;
  padding: 0.75rem;
  text-align: left;
  border-radius: 1.15rem;
  background: rgba(255, 255, 255, 0.03);
  color: inherit;
}

.chat-row.active {
  background: linear-gradient(135deg, rgba(37, 99, 235, 0.22), rgba(124, 58, 237, 0.22));
}

.chat-avatar {
  width: 2.8rem;
  height: 2.8rem;
  flex-shrink: 0;
}

.chat-avatar.large {
  width: 3.1rem;
  height: 3.1rem;
}

.chat-copy { min-width: 0; flex: 1; }

.chat-topline strong,
.active-chat-user strong { font-size: 0.88rem; }

.chat-topline span,
.chat-bottomline p,
.active-chat-user p {
  color: #94a3b8;
  font-size: 0.76rem;
}

.chat-bottomline p {
  margin: 0.2rem 0 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.unread-dot {
  width: 0.5rem;
  height: 0.5rem;
  margin-top: 0.2rem;
  border-radius: 50%;
  background: linear-gradient(135deg, #38bdf8, #8b5cf6);
  flex-shrink: 0;
}

/* ─── Active chat ────────────────────────────────────────────── */
.active-chat {
  display: flex;
  flex-direction: column;
  min-height: 0;
  min-width: 0;
}

.active-chat-head {
  gap: 0.75rem;
  padding-bottom: 0.85rem;
  border-bottom: 1px solid rgba(148, 163, 184, 0.12);
}

.ai-pill {
  padding: 0.32rem 0.65rem;
  background: rgba(56, 189, 248, 0.12);
  border: 1px solid rgba(56, 189, 248, 0.18);
  color: #7dd3fc;
  font-size: 0.7rem;
}

.thread {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  overflow-y: auto;
  overflow-x: hidden;
  padding: 1rem 0.15rem 0.25rem 0;
  scrollbar-width: none;
}

.message-row { display: flex; }
.message-row.sent { justify-content: flex-end; }
.message-row.received { justify-content: flex-start; }

.message-bubble {
  max-width: 80%;
  overflow-wrap: anywhere;
  word-break: break-word;
  padding: 0.82rem 0.95rem;
  border-radius: 1.25rem;
  box-shadow: 0 10px 24px rgba(15, 23, 42, 0.2);
}

.sent-bubble {
  border-bottom-right-radius: 0.45rem;
  color: #eff6ff;
  background: linear-gradient(135deg, #2563eb, #7c3aed);
}

.received-bubble {
  border-bottom-left-radius: 0.45rem;
  color: #e2e8f0;
  background: rgba(51, 65, 85, 0.9);
}

.bubble-label {
  padding: 0.2rem 0.5rem;
  margin-bottom: 0.4rem;
  background: rgba(255, 255, 255, 0.08);
  color: #cbd5e1;
  font-size: 0.62rem;
  letter-spacing: 0.04em;
  text-transform: uppercase;
}

.message-bubble p { margin: 0; line-height: 1.5; }

.typing-bubble {
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
}

.spinner {
  width: 16px;
  height: 16px;
  border: 2px solid rgba(203, 213, 225, 0.3);
  border-top: 2px solid #cbd5e1;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin { to { transform: rotate(360deg); } }

/* ─── Composer ───────────────────────────────────────────────── */
.composer {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  padding: 0.6rem;
}

.composer-input {
  flex: 1;
  min-width: 0;
  border: 0;
  outline: 0;
  background: transparent;
  color: #f8fafc;
  font-size: 0.92rem;
}

.composer-input::placeholder { color: #94a3b8; }

.send-button {
  width: 2.7rem;
  height: 2.7rem;
  border-radius: 50%;
  color: #eff6ff;
  background: linear-gradient(135deg, #2563eb, #7c3aed);
}

.send-button:disabled { opacity: 0.45; cursor: not-allowed; }

/* ─── Username modal ─────────────────────────────────────────── */
.username-modal-overlay {
  position: fixed;
  inset: 0;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  background: rgba(2, 6, 23, 0.72);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
}

.username-modal {
  width: min(100%, 420px);
  padding: 2rem;
  border-radius: 1.5rem;
  text-align: center;
}

.username-modal-icon {
  width: 3.25rem;
  height: 3.25rem;
  margin: 0 auto 1rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  color: #eff6ff;
  background: linear-gradient(135deg, #2563eb, #7c3aed);
}

.username-modal h2 {
  margin: 0 0 0.65rem;
  color: #f8fafc;
  font-size: 1.55rem;
}

.username-modal p {
  margin: 0 0 1.4rem;
  color: #cbd5e1;
  line-height: 1.55;
}

.username-modal .form-label {
  width: 100%;
  color: #cbd5e1;
  text-align: left;
  font-size: 0.86rem;
  font-weight: 600;
}

.username-input {
  min-height: 3rem;
  border-color: rgba(148, 163, 184, 0.18);
  border-radius: 0.95rem;
  background: rgba(15, 23, 42, 0.56);
  color: #f8fafc;
}

.username-input:focus {
  border-color: rgba(56, 189, 248, 0.65);
  background: rgba(15, 23, 42, 0.68);
  color: #f8fafc;
  box-shadow: 0 0 0 0.2rem rgba(56, 189, 248, 0.18);
}

.username-input::placeholder { color: #94a3b8; }

.username-error {
  margin-top: 0.45rem;
  color: #fca5a5;
  text-align: left;
  font-size: 0.82rem;
}

.username-continue {
  min-height: 3rem;
  border: 0;
  border-radius: 999px;
  color: #eff6ff;
  font-weight: 700;
  background: linear-gradient(135deg, #2563eb, #7c3aed);
}

.username-continue:hover {
  color: #fff;
  transform: translateY(-1px);
}

/* ─── DM slide transition ────────────────────────────────────── */
.dm-slide-enter-active,
.dm-slide-leave-active { transition: opacity 0.25s ease, transform 0.25s ease; }

.dm-slide-enter-from,
.dm-slide-leave-to { opacity: 0; transform: translateX(16px); }

/* ─── Hover states ───────────────────────────────────────────── */
.icon-button:hover,
.action-button:hover,
.post-menu:hover,
.banner-dismiss:hover,
.chat-row:hover,
.send-button:hover:not(:disabled) { transform: translateY(-1px); }

/* ═══════════════════════════════════════════════════════════════
   RESPONSIVE BREAKPOINTS
   ═══════════════════════════════════════════════════════════════ */

/* ─── Tablet / small laptop: stack columns ───────────────────── */
@media (max-width: 960px) {
  .prototype-shell {
    flex-direction: column;
    align-items: center;
    gap: 2.5rem;
    padding: 2.5rem 1.5rem;
  }

  .intro-copy {
    flex: none;
    max-width: 36rem;
    width: 100%;
    margin: 0 auto;
    text-align: center;
    padding-right: 0;
  }

  .hero-cta {
    justify-content: center;
  }

  .social-proof {
    justify-content: center;
  }

  .phone-stage {
    width: 100%;
    justify-content: center;
  }
}

/* ─── Mobile: strip iPhone chrome, go full-bleed ─────────────── */
@media (max-width: 768px) {
  .prototype-shell {
    padding: 1rem 0 0;
    gap: 1.5rem;
  }

  .phone-frame {
    background: transparent;
    border: 0;
    box-shadow: none;
    padding: 0;
    border-radius: 0;
    width: 100%;
  }

  .phone-notch { display: none; }

  .phone-screen {
    border-radius: 0;
    border: 0;
    min-height: 100svh;
  }

  .app-surface {
    padding: 1rem 0.75rem 0.75rem;
    min-height: 100svh;
  }

  .messages-overlay {
    position: fixed;
    inset: 0;
  }

  .messages-panel {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    width: 100%;
    border-radius: 0;
    padding: 1rem;
  }
}

/* ─── Small phones ───────────────────────────────────────────── */
@media (max-width: 480px) {
  .prototype-shell {
    padding-left: 0;
    padding-right: 0;
  }

  .phone-screen { min-height: 100svh; }
  .app-surface  { min-height: 100svh; }

  .messages-body {
    grid-template-columns: 1fr;
  }

  .chat-list {
    max-height: 30vh;
    overflow-y: auto;
  }

  .thread { min-height: 200px; }
}

/* ═══════════════════════════════════════════════════════════════
   DESKTOP ≥ 961px — Premium MacBook mockup, SaaS hero layout
   Mobile layout is completely untouched above this breakpoint.
   ═══════════════════════════════════════════════════════════════ */
@media (min-width: 961px) {

  /* ── Hero shell: text left, MacBook right, comfortable spacing ── */
  .prototype-shell {
    flex-direction: row;
    align-items: center;
    /* 6vw left for copy breathing room, 4vw right so MacBook has space */
    padding: 4rem 4vw 5rem 6vw;
    gap: 3vw;
  }

  /* ── Intro copy: generous left column, never shrinks ── */
  .intro-copy {
    flex: 0 0 clamp(300px, 34vw, 480px);
    max-width: 480px;
    padding-right: 0;
  }

  /* ── Phone stage: fills remaining space, MacBook right-of-center ── */
  .phone-stage {
    flex: 1 1 0;
    min-width: 0;
    display: flex;
    flex-direction: column;
    /* Right-align within stage but keep comfortable gap from edge */
    align-items: flex-end;
    justify-content: center;
    gap: 0;
    overflow: visible;
    /* Nudge toward right without overflowing — 2vw breathing room from edge */
    padding-right: 2vw;
  }

  /* ── MacBook lid: top bezel with camera notch ── */
  .macbook-lid {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    /* Comfortable scale: 55-62vw of viewport, 520–800px absolute range */
    width: clamp(520px, 58vw, 800px);
    height: 30px;
    background: linear-gradient(180deg,
      #1e2130 0%,
      #161824 100%
    );
    border-radius: 12px 12px 0 0;
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-bottom: none;
    box-shadow:
      0 -6px 20px rgba(0, 0, 0, 0.4),
      inset 0 1px 0 rgba(255, 255, 255, 0.07),
      inset 0 -1px 0 rgba(0, 0, 0, 0.3);
    position: relative;
    flex-shrink: 0;
  }

  .macbook-camera {
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background: radial-gradient(circle at 35% 35%, #5a5e70 0%, #22242e 100%);
    border: 1px solid rgba(0, 0, 0, 0.5);
    margin-top: 8px;
    box-shadow:
      0 0 0 1px rgba(255, 255, 255, 0.05),
      inset 0 1px 2px rgba(0, 0, 0, 0.4);
  }

  /* Inner gradient line — subtle screen edge */
  .macbook-screen-bezel {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(90deg,
      transparent 3%,
      rgba(56, 189, 248, 0.12) 25%,
      rgba(129, 140, 248, 0.15) 50%,
      rgba(168, 85, 247, 0.12) 75%,
      transparent 97%
    );
  }

  /* ── phone-frame → MacBook screen body with depth + elevation ── */
  .phone-frame {
    width: clamp(520px, 58vw, 800px);
    border-radius: 0;
    padding: 0;
    background: rgba(8, 12, 26, 0.98);
    border-left: 1px solid rgba(255, 255, 255, 0.07);
    border-right: 1px solid rgba(255, 255, 255, 0.07);
    border-top: none;
    border-bottom: none;
    /* Layered shadows for real depth and elevation */
    box-shadow:
      0 0 0 1px rgba(255, 255, 255, 0.04),
      0 24px 60px rgba(0, 0, 0, 0.55),
      0 48px 100px rgba(0, 0, 0, 0.35),
      0 0 80px rgba(56, 189, 248, 0.04),
      0 0 120px rgba(124, 58, 237, 0.06);
    height: 540px;
    flex-shrink: 0;
    position: relative;
  }

  /* Hairline glow at screen top — gives "lit screen" feel */
  .phone-frame::before {
    content: "";
    position: absolute;
    top: 0;
    left: 8%;
    right: 8%;
    height: 1px;
    background: linear-gradient(90deg,
      transparent,
      rgba(56, 189, 248, 0.5) 25%,
      rgba(129, 140, 248, 0.6) 50%,
      rgba(168, 85, 247, 0.5) 75%,
      transparent
    );
    pointer-events: none;
    z-index: 3;
  }

  /* Screen reflection vignette */
  .phone-frame::after {
    content: "";
    position: absolute;
    inset: 0;
    background: linear-gradient(180deg,
      rgba(255, 255, 255, 0.015) 0%,
      transparent 40%
    );
    pointer-events: none;
    z-index: 2;
  }

  /* Hide iPhone notch on desktop */
  .phone-notch { display: none; }

  /* ── phone-screen fills the MacBook screen area ── */
  .phone-screen {
    width: 100%;
    height: 100%;
    min-height: unset;
    border-radius: 0;
    border: none;
    overflow: hidden;
  }

  /* ── app-surface: well-padded UI inside the screen ── */
  .app-surface {
    height: 100%;
    min-height: unset;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    /* Comfortable interior padding — like a real app, not cramped */
    padding: 1.25rem 1.25rem 1rem;
  }

  /* ── feed-scroll: remaining height, scrollable ── */
  .feed-scroll {
    flex: 1 1 0;
    min-height: 0;
    overflow-y: auto;
    scrollbar-width: thin;
    scrollbar-color: rgba(148, 163, 184, 0.15) transparent;
    padding-right: 0.25rem;
  }

  .feed-scroll::-webkit-scrollbar {
    display: block;
    width: 3px;
  }
  .feed-scroll::-webkit-scrollbar-track { background: transparent; }
  .feed-scroll::-webkit-scrollbar-thumb {
    background: rgba(148, 163, 184, 0.15);
    border-radius: 2px;
  }

  /* ── messages panel scrolling ── */
  .messages-panel {
    display: flex;
    flex-direction: column;
    max-height: 100%;
    overflow: hidden;
  }

  .messages-body {
    flex: 1 1 0;
    min-height: 0;
    overflow: hidden;
  }

  .chat-list {
    overflow-y: auto;
    scrollbar-width: thin;
    scrollbar-color: rgba(148, 163, 184, 0.1) transparent;
  }

  .thread {
    overflow-y: auto;
    flex: 1 1 0;
    min-height: 0;
  }

  /* ── MacBook base / keyboard deck ── */
  .macbook-base {
    display: flex;
    align-items: flex-start;
    justify-content: center;
    /* Slightly wider than screen for authentic taper */
    width: clamp(548px, 60vw, 828px);
    height: 28px;
    background: linear-gradient(180deg,
      #161824 0%,
      #111318 50%,
      #0d0f14 100%
    );
    border-radius: 0 0 12px 12px;
    border: 1px solid rgba(255, 255, 255, 0.06);
    border-top: 1px solid rgba(255, 255, 255, 0.03);
    /* Deep elevation shadow under the laptop */
    box-shadow:
      0 16px 48px rgba(0, 0, 0, 0.6),
      0 32px 80px rgba(0, 0, 0, 0.4),
      0 4px 12px rgba(0, 0, 0, 0.5),
      inset 0 -1px 0 rgba(0, 0, 0, 0.4);
    flex-shrink: 0;
    position: relative;
  }

  /* Subtle keyboard rows etched into the deck */
  .macbook-base::before {
    content: "";
    position: absolute;
    top: 6px;
    left: 12%;
    right: 12%;
    height: 1px;
    background: rgba(255, 255, 255, 0.025);
    border-radius: 1px;
  }

  .macbook-base::after {
    content: "";
    position: absolute;
    top: 12px;
    left: 18%;
    right: 18%;
    height: 1px;
    background: rgba(255, 255, 255, 0.015);
    border-radius: 1px;
  }

  /* Trackpad pill */
  .macbook-trackpad {
    width: 88px;
    height: 11px;
    margin-top: 5px;
    border-radius: 4px;
    background: linear-gradient(180deg, rgba(255,255,255,0.05), rgba(255,255,255,0.025));
    border: 1px solid rgba(255, 255, 255, 0.055);
  }

  /* Ground shadow / ambient beneath entire MacBook */
  .phone-stage::after {
    content: "";
    display: block;
    /* Slightly narrower than the base for a realistic cast shadow */
    width: clamp(400px, 48vw, 680px);
    height: 24px;
    margin-top: 1px;
    background: radial-gradient(ellipse at center,
      rgba(0, 0, 0, 0.5) 0%,
      rgba(0, 0, 0, 0.2) 50%,
      transparent 80%
    );
    border-radius: 50%;
    flex-shrink: 0;
    /* Slight blur to soften the ground shadow */
    filter: blur(4px);
  }
}
</style>