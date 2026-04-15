<template>
  <div class="devgram-page">
    <div class="ambient ambient-left"></div>
    <div class="ambient ambient-right"></div>

    <section class="prototype-shell">
      <div class="intro-copy">
        <span class="eyebrow">DevGram</span>
        <h1>Modern social feed with AI messaging built into one premium mobile interface.</h1>
        <p>
          The home feed stays visible underneath while direct messages slide in as an overlay,
          creating a polished, social-first mobile experience inside an iPhone mockup.
        </p>
      </div>

      <div class="phone-stage">
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
                    <div class="story-item" v-for="story in stories" :key="story.label">
                      <div class="story-ring">
                        <img v-if="story.image === true" class="story-avatar" :src="logoImage" alt="Gad NiYoGiSuBiZo" />
                        <img v-else-if="typeof story.image === 'string'" class="story-avatar" :src="story.image" :alt="story.label" />
                        <div v-else class="story-avatar initials">{{ story.initials }}</div>
                      </div>
                      <span>{{ story.label }}</span>
                    </div>
                  </div>
                </section>

                <section class="post-list">
                  <article class="post-card glass-panel" v-for="post in posts" :key="post.id">
                    <div class="post-head">
                      <div class="post-user">
                        <img class="post-avatar" :src="logoImage" alt="Gad NiYoGiSuBiZo" />
                        <div>
                          <strong>Gad NiYoGiSuBiZo</strong>
                          <p>{{ post.meta }}</p>
                        </div>
                      </div>
                      <button type="button" class="post-menu" aria-label="Open post options">
                        <i class="fas fa-ellipsis-h"></i>
                      </button>
                    </div>

                    <div class="post-preview" :class="post.previewClass">
                      <div class="preview-chip">{{ post.badge }}</div>
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
                      <button type="button" class="action-button" @click="openMessagesFor(post.chatTarget)">
                        <i class="far fa-paper-plane"></i>
                      </button>
                    </div>

                    <p class="post-likes">{{ post.likes }} likes</p>
                    <p class="post-caption">
                      <strong>Gad NiYoGiSuBiZo</strong>
                      {{ post.caption }}
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
                          v-for="conversation in conversations"
                          :key="conversation.id"
                          type="button"
                          class="chat-row"
                          :class="{ active: activeConversationId === conversation.id }"
                          @click="selectConversation(conversation.id)"
                        >
                          <div class="chat-avatar">{{ conversation.initials }}</div>
                          <div class="chat-copy">
                            <div class="chat-topline">
                              <strong>{{ conversation.username }}</strong>
                              <span>{{ conversation.timestamp }}</span>
                            </div>
                            <div class="chat-bottomline">
                              <p>{{ conversation.preview }}</p>
                              <span v-if="conversation.unread" class="unread-dot"></span>
                            </div>
                          </div>
                        </button>
                      </aside>

                      <section class="active-chat">
                        <div class="active-chat-head">
                          <div class="active-chat-user">
                            <div class="chat-avatar large">{{ activeConversation.initials }}</div>
                            <div>
                              <strong>{{ activeConversation.username }}</strong>
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
                            v-for="message in activeConversation.messages"
                            :key="message.id"
                            class="message-row"
                            :class="message.sender === 'me' ? 'sent' : 'received'"
                          >
                            <div class="message-bubble" :class="message.sender === 'me' ? 'sent-bubble' : 'received-bubble'">
                              <span v-if="message.ai" class="bubble-label">Gad Ai</span>
                              <p>{{ message.text }}</p>
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
                          <button type="submit" class="send-button" :disabled="!draftMessage.trim() || isTyping || isSending">
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
      </div>
    </section>
  </div>
</template>

<script>
import logoImage from '../assets/pic.jpg'

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
      stories: [
        { label: 'Gad', image: true },
        { label: 'Google', image: 'https://www.citypng.com/public/uploads/preview/google-logo-icon-gsuite-hd-701751694791470gzbayltphh.png' },
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
    activeConversation() {
      return this.conversations.find((conversation) => conversation.id === this.activeConversationId) || this.conversations[0]
    },
    unreadChats() {
      return this.conversations.filter((conversation) => conversation.unread).length
    }
  },
  beforeUnmount() {
    if (this.replyTimer) {
      clearTimeout(this.replyTimer)
    }
  },
  methods: {
    toggleMessages() {
      this.isMessagesOpen = !this.isMessagesOpen
      if (this.isMessagesOpen) {
        this.statusMessage = 'Messages opened without leaving the home feed.'
        // Create Gad AI conversation if none exist
        if (this.conversations.length === 0) {
          const gadAIConversation = {
            id: 1,
            initials: 'GA',
            username: 'Gad AI',
            preview: 'Hi! I am Gad AI,How can i help you today!.',
            timestamp: 'now',
            unread: false,
            messages: [
              {
                id: 1,
                sender: 'other',
                text: 'Hi! I am Gad AI,How can i help today!',
                ai: true
              }
            ]
          }
          this.conversations.push(gadAIConversation)
          this.activeConversationId = 1
        }
        this.scrollThreadToBottom()
      }
    },
    openMessagesFor(conversationId) {
      this.isMessagesOpen = true
      this.selectConversation(conversationId)
    },
    selectConversation(id) {
      this.activeConversationId = id
      const conversation = this.conversations.find((item) => item.id === id)
      if (conversation) {
        conversation.unread = false
        this.statusMessage = `${conversation.username} opened.`
      }
      this.scrollThreadToBottom()
    },
    seedDraft() {
      this.draftMessage = 'Hey, I wanted your thoughts on the new DevGram flow.'
      this.$refs.composer?.focus()
    },
    async sendMessage() {
      const text = this.draftMessage.trim()
      if (!text || this.isTyping || this.isSending) return

      this.activeConversation.messages.push({
        id: Date.now(),
        sender: 'me',
        text,
        ai: false
      })
      this.activeConversation.preview = text
      this.activeConversation.timestamp = 'now'
      this.draftMessage = ''
      this.isSending = true
      this.scrollThreadToBottom()

      try {
        const response = await fetch('/api/auto-reply', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ message: text })
        })

        if (!response.ok) {
          throw new Error('Auto reply request failed')
        }

        const payload = await response.json()
        this.isTyping = true
        this.statusMessage = 'Gad AI is typing...'

        this.replyTimer = setTimeout(() => {
          this.activeConversation.messages.push({
            id: Date.now() + 1,
            sender: 'other',
            text: payload.reply,
            ai: true
          })
          this.activeConversation.preview = payload.reply
          this.activeConversation.timestamp = 'now'
          this.isTyping = false
          this.isSending = false
          this.statusMessage = 'Gad AI reply received.'
          this.scrollThreadToBottom()
        }, 1500)
      } catch (error) {
        this.isTyping = false
        this.isSending = false
        this.statusMessage = 'Auto-reply is unavailable right now.'
      }
    },
    scrollThreadToBottom() {
      this.$nextTick(() => {
        const thread = this.$refs.thread
        if (thread) {
          thread.scrollTop = thread.scrollHeight
        }
      })
    }
  }
}
</script>

<style scoped>
.devgram-page {
  position: relative;
  min-height: calc(100vh - 76px);
  overflow: hidden;
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

[data-theme="light"] .devgram-page * {
  color: #1e293b;
}

[data-theme="light"] .devgram-page h1,
[data-theme="light"] .devgram-page h2,
[data-theme="light"] .devgram-page h3,
[data-theme="light"] .devgram-page h4,
[data-theme="light"] .devgram-page h5,
[data-theme="light"] .devgram-page h6,
[data-theme="light"] .devgram-page strong {
  color: #0f172a;
}

.ambient {
  position: absolute;
  width: 24rem;
  height: 24rem;
  border-radius: 50%;
  filter: blur(88px);
  opacity: 0.5;
  pointer-events: none;
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

.prototype-shell {
  position: relative;
  z-index: 1;
  min-height: calc(100vh - 76px);
  display: grid;
  grid-template-columns: minmax(0, 320px) minmax(0, 470px);
  gap: 3.5rem;
  justify-content: center;
  align-items: center;
  padding: 3rem 1.5rem 4rem;
}

.intro-copy {
  max-width: 23rem;
}

.eyebrow {
  display: inline-flex;
  padding: 0.45rem 0.8rem;
  margin-bottom: 1rem;
  border-radius: 999px;
  border: 1px solid rgba(148, 163, 184, 0.18);
  background: rgba(15, 23, 42, 0.62);
  color: #7dd3fc;
  font-size: 0.78rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.intro-copy h1 {
  margin: 0 0 1rem;
  color: #f8fafc;
  font-size: clamp(2rem, 3vw, 3.1rem);
  line-height: 1.05;
}

.intro-copy p {
  margin: 0;
  color: #94a3b8;
  line-height: 1.75;
}

.phone-stage {
  display: flex;
  justify-content: center;
}

.phone-frame {
  position: relative;
  width: 405px;
  max-width: 100%;
  padding: 14px;
  border-radius: 3.25rem;
  background: linear-gradient(145deg, rgba(15, 23, 42, 0.98), rgba(30, 41, 59, 0.92));
  border: 1px solid rgba(148, 163, 184, 0.12);
  box-shadow:
    0 28px 80px rgba(2, 6, 23, 0.65),
    inset 0 1px 0 rgba(255, 255, 255, 0.08),
    inset 0 -2px 8px rgba(0, 0, 0, 0.45);
}

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

.phone-screen {
  overflow: hidden;
  min-height: 835px;
  border-radius: 2.65rem;
  border: 1px solid rgba(148, 163, 184, 0.08);
  background: linear-gradient(180deg, rgba(15, 23, 42, 0.98), rgba(15, 23, 42, 0.94));
}

.app-surface {
  position: relative;
  min-height: 835px;
  padding: 1.25rem 1rem 1rem;
  background:
    radial-gradient(circle at top left, rgba(56, 189, 248, 0.12), transparent 30%),
    radial-gradient(circle at top right, rgba(168, 85, 247, 0.12), transparent 26%),
    linear-gradient(180deg, rgba(2, 6, 23, 0.9), rgba(15, 23, 42, 0.98));
}

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
.composer {
  border-radius: 1.5rem;
}

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
.story-avatar {
  object-fit: cover;
}

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

.icon-button,
.post-menu,
.action-button,
.banner-dismiss,
.chat-row,
.send-button {
  border: 0;
  cursor: pointer;
}

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

.icon-button.subtle {
  background: rgba(255, 255, 255, 0.05);
}

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

.feed-scroll {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-height: 695px;
  margin-top: 1rem;
  overflow-y: auto;
  padding-right: 0.2rem;
  scrollbar-width: none;
}

.feed-scroll::-webkit-scrollbar,
.chat-list::-webkit-scrollbar,
.thread::-webkit-scrollbar {
  display: none;
}

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

.stories-strip {
  padding: 1rem;
}

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
  width: 3.35rem;
  height: 3.35rem;
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

.post-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.post-card {
  padding: 1rem;
}

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
.post-caption strong {
  color: #f8fafc;
}

.post-caption {
  margin: 0.4rem 0 0;
  color: #cbd5e1;
  line-height: 1.5;
}

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
  display: flex;
  flex-direction: column;
  padding: 1rem;
}

.messages-header {
  gap: 0.75rem;
  padding-bottom: 0.8rem;
  border-bottom: 1px solid rgba(148, 163, 184, 0.12);
}

.messages-actions {
  display: flex;
  gap: 0.45rem;
}

.messages-body {
  flex: 1;
  display: grid;
  grid-template-columns: 0.95fr 1.2fr;
  gap: 0.95rem;
  min-height: 0;
  margin-top: 1rem;
}

.chat-list {
  display: flex;
  flex-direction: column;
  gap: 0.65rem;
  overflow-y: auto;
  scrollbar-width: none;
}

.chat-row {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  width: 100%;
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

.chat-copy {
  min-width: 0;
  flex: 1;
}

.chat-topline strong,
.active-chat-user strong {
  font-size: 0.88rem;
}

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

.active-chat {
  display: flex;
  flex-direction: column;
  min-height: 0;
}

.active-chat-head {
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
  padding: 1rem 0.15rem 0.25rem 0;
  scrollbar-width: none;
}

.message-row {
  display: flex;
}

.message-row.sent {
  justify-content: flex-end;
}

.message-row.received {
  justify-content: flex-start;
}

.message-bubble {
  max-width: 80%;
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

.message-bubble p {
  margin: 0;
  line-height: 1.5;
}

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

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.composer {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  padding: 0.6rem;
}

.composer-input {
  flex: 1;
  border: 0;
  outline: 0;
  background: transparent;
  color: #f8fafc;
  font-size: 0.92rem;
}

.composer-input::placeholder {
  color: #94a3b8;
}

.send-button {
  width: 2.7rem;
  height: 2.7rem;
  border-radius: 50%;
  color: #eff6ff;
  background: linear-gradient(135deg, #2563eb, #7c3aed);
}

.send-button:disabled {
  opacity: 0.45;
  cursor: not-allowed;
}

.dm-slide-enter-active,
.dm-slide-leave-active {
  transition: opacity 0.25s ease, transform 0.25s ease;
}

.dm-slide-enter-from,
.dm-slide-leave-to {
  opacity: 0;
  transform: translateX(16px);
}

.icon-button:hover,
.action-button:hover,
.post-menu:hover,
.banner-dismiss:hover,
.chat-row:hover,
.send-button:hover:not(:disabled) {
  transform: translateY(-1px);
}

@keyframes bounce {
  0%, 80%, 100% {
    transform: translateY(0);
    opacity: 0.6;
  }
  40% {
    transform: translateY(-4px);
    opacity: 1;
  }
}

@media (max-width: 960px) {
  .prototype-shell {
    grid-template-columns: 1fr;
    gap: 2rem;
    padding-top: 2rem;
  }

  .intro-copy {
    max-width: 32rem;
    margin: 0 auto;
    text-align: center;
  }
}

@media (max-width: 480px) {
  .prototype-shell {
    padding-left: 0.75rem;
    padding-right: 0.75rem;
  }

  .phone-frame {
    width: 100%;
    padding: 10px;
    border-radius: 2.4rem;
  }

  .phone-screen {
    min-height: 780px;
    border-radius: 2rem;
  }

  .app-surface {
    min-height: 780px;
    padding-left: 0.85rem;
    padding-right: 0.85rem;
  }

  .messages-panel {
    top: 0.55rem;
    bottom: 0.55rem;
    width: 100%;
  }

  .messages-body {
    grid-template-columns: 1fr;
  }

  .chat-list {
    max-height: 220px;
  }

  .thread {
    min-height: 250px;
  }
}
</style>
