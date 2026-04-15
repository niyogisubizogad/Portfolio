<template>
  <div class="contact-page">
    <div class="ambient ambient-left"></div>
    <div class="ambient ambient-right"></div>

    <div class="contact-container">
      <!-- Hero Section -->
      <section class="hero-section glass-panel">
        <h1>Get In Touch</h1>
        <p>I would love to hear from you. Let's connect!</p>
      </section>

      <!-- Contact Content -->
      <div class="contact-content">
        <!-- Contact Form -->
        <section class="form-section glass-panel">
          <h2>Send a Message</h2>
          <form @submit.prevent="submitForm">
            <div class="form-group">
              <label for="name">Name</label>
              <input v-model="form.name" type="text" id="name" placeholder="Your name" required />
            </div>
            <div class="form-group">
              <label for="email">Email</label>
              <input v-model="form.email" type="email" id="email" placeholder="your@email.com" required />
            </div>
            <div class="form-group">
              <label for="subject">Subject</label>
              <input v-model="form.subject" type="text" id="subject" placeholder="Message subject" required />
            </div>
            <div class="form-group">
              <label for="message">Message</label>
              <textarea v-model="form.message" id="message" rows="5" placeholder="Your message here..." required></textarea>
            </div>
            <button type="submit" class="submit-btn" :disabled="isSubmitting">
              <span v-if="!isSubmitting">Send Message</span>
              <span v-else>Sending...</span>
            </button>
          </form>
        </section>

        <!-- Contact Info -->
        <section class="info-section">
          <!-- Quick Contact -->
          <div class="info-card glass-panel">
            <h3>Contact Information</h3>
            <div class="info-items">
              <div class="info-item">
                <i class="fas fa-envelope"></i>
                <div>
                  <span class="info-label">Email</span>
                  <p>offgad200@gmail.com</p>
                </div>
              </div>
              <div class="info-item">
                <i class="fas fa-phone"></i>
                <div>
                  <span class="info-label">Phone</span>
                  <p>+250 785 662 308</p>
                </div>
              </div>
              <div class="info-item">
                <i class="fab fa-whatsapp"></i>
                <div>
                  <span class="info-label">WhatsApp</span>
                  <p>Available 24/7</p>
                </div>
              </div>
              <div class="info-item">
                <i class="fas fa-map-marker-alt"></i>
                <div>
                  <span class="info-label">Location</span>
                  <p>Kigali, Rwanda</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Social Links -->
          <div class="social-card glass-panel">
            <h3>Connect With Me</h3>
            <div class="social-grid">
              <a v-for="social in socialLinks" :key="social.name" :href="social.url" target="_blank" rel="noopener noreferrer" :title="social.name" class="social-link">
                <i :class="social.icon"></i>
              </a>
            </div>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ContactView',
  data() {
    return {
      form: {
        name: '',
        email: '',
        subject: '',
        message: ''
      },
      isSubmitting: false,
      socialLinks: [
        { name: 'GitHub', url: 'https://github.com/Gad-off', icon: 'fab fa-github' },
        { name: 'LinkedIn', url: 'https://www.linkedin.com/in/gad-niyogisubizo/', icon: 'fab fa-linkedin' },
        { name: 'Facebook', url: 'https://www.facebook.com/profile.php?id=100092313189365', icon: 'fab fa-facebook' },
        { name: 'Instagram', url: 'https://www.instagram.com/g.a.d_o.f.f/', icon: 'fab fa-instagram' },
        { name: 'YouTube', url: 'https://www.youtube.com/@Gad_Off-v9h', icon: 'fab fa-youtube' },
        { name: 'TikTok', url: 'https://www.tiktok.com/@gad_off.2', icon: 'fab fa-tiktok' }
      ]
    }
  },
  methods: {
    submitForm() {
      this.isSubmitting = true
      setTimeout(() => {
        alert('Message sent successfully! I will get back to you soon.')
        this.form = {
          name: '',
          email: '',
          subject: '',
          message: ''
        }
        this.isSubmitting = false
      }, 1500)
    }
  }
}
</script>

<style scoped>
.contact-page {
  position: relative;
  min-height: calc(100vh - 76px);
  overflow: hidden;
  background:
    radial-gradient(circle at 18% 16%, rgba(56, 189, 248, 0.22), transparent 28%),
    radial-gradient(circle at 82% 18%, rgba(168, 85, 247, 0.18), transparent 26%),
    linear-gradient(180deg, #020617 0%, #08111f 36%, #0f172a 100%);
  color: #e2e8f0;
}

[data-theme="light"] .contact-page {
  background:
    radial-gradient(circle at 18% 16%, rgba(56, 189, 248, 0.1), transparent 28%),
    radial-gradient(circle at 82% 18%, rgba(168, 85, 247, 0.08), transparent 26%),
    linear-gradient(180deg, #f8fafc 0%, #f1f5f9 50%, #e0e7ff 100%);
  color: #1e293b;
}

[data-theme="light"] .contact-page * {
  color: #1e293b;
}

[data-theme="light"] .contact-page h1,
[data-theme="light"] .contact-page h2,
[data-theme="light"] .contact-page h3,
[data-theme="light"] .contact-page h4,
[data-theme="light"] .contact-page h5,
[data-theme="light"] .contact-page h6 {
  color: #0f172a;
}

.ambient {
  position: fixed;
  pointer-events: none;
  z-index: 0;
}

.ambient-left {
  top: -20%;
  left: -20%;
  width: 500px;
  height: 500px;
  background: radial-gradient(circle, rgba(56, 189, 248, 0.2), transparent 70%);
  border-radius: 50%;
  animation: float 20s ease-in-out infinite;
}

.ambient-right {
  bottom: -20%;
  right: -20%;
  width: 600px;
  height: 600px;
  background: radial-gradient(circle, rgba(168, 85, 247, 0.15), transparent 70%);
  border-radius: 50%;
  animation: float 25s ease-in-out infinite reverse;
}

@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(30px); }
}

.contact-container {
  position: relative;
  z-index: 1;
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1.5rem;
}

/* Glass Panel */
.glass-panel {
  background: rgba(15, 23, 42, 0.4);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  backdrop-filter: blur(10px);
}

/* Hero Section */
.hero-section {
  padding: 3rem;
  margin-bottom: 3rem;
  text-align: center;
}

.hero-section h1 {
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
  color: #f1f5f9;
}

.hero-section p {
  font-size: 1.1rem;
  color: #cbd5e1;
}

/* Contact Content */
.contact-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  margin-bottom: 3rem;
}

/* Form Section */
.form-section {
  padding: 2rem;
}

.form-section h2 {
  font-size: 1.5rem;
  font-weight: 700;
  color: #f1f5f9;
  margin-bottom: 2rem;
}

.form-group {
  margin-bottom: 1.5rem;
  display: flex;
  flex-direction: column;
}

.form-group label {
  color: #cbd5e1;
  font-weight: 600;
  margin-bottom: 0.5rem;
  font-size: 0.95rem;
}

.form-group input,
.form-group textarea {
  padding: 0.75rem 1rem;
  background: rgba(31, 41, 55, 0.5);
  border: 1px solid rgba(56, 189, 248, 0.2);
  border-radius: 8px;
  color: #e2e8f0;
  font-family: inherit;
  font-size: 1rem;
  transition: all 0.3s ease;
}

.form-group input::placeholder,
.form-group textarea::placeholder {
  color: #64748b;
}

.form-group input:focus,
.form-group textarea:focus {
  outline: none;
  border-color: rgba(56, 189, 248, 0.5);
  background: rgba(31, 41, 55, 0.8);
  box-shadow: 0 0 0 3px rgba(56, 189, 248, 0.1);
}

.submit-btn {
  width: 100%;
  padding: 0.75rem 1.5rem;
  background: linear-gradient(135deg, #38bdf8, #a855f7);
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: 700;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 1rem;
}

.submit-btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(56, 189, 248, 0.4);
}

.submit-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* Info Section */
.info-section {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.info-card,
.social-card {
  padding: 2rem;
}

.info-card h3,
.social-card h3 {
  font-size: 1.5rem;
  font-weight: 700;
  color: #f1f5f9;
  margin-bottom: 1.5rem;
}

/* Info Items */
.info-items {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.info-item {
  display: flex;
  align-items: flex-start;
  gap: 1.25rem;
}

.info-item i {
  font-size: 1.5rem;
  color: #38bdf8;
  min-width: 24px;
  margin-top: 0.25rem;
}

.info-item div {
  flex: 1;
}

.info-label {
  display: block;
  font-size: 0.85rem;
  color: #94a3b8;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: 0.25rem;
  font-weight: 600;
}

.info-item p {
  margin: 0;
  color: #e2e8f0;
  font-size: 1rem;
}

/* Social Links */
.social-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
}

.social-link {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 60px;
  height: 60px;
  border-radius: 8px;
  background: rgba(56, 189, 248, 0.15);
  color: #38bdf8;
  border: 1px solid rgba(56, 189, 248, 0.3);
  transition: all 0.3s ease;
  font-size: 1.5rem;
}

.social-link:hover {
  background: rgba(56, 189, 248, 0.25);
  border-color: rgba(56, 189, 248, 0.5);
  transform: translateY(-4px) scale(1.1);
}

/* Responsive */
@media (max-width: 768px) {
  .contact-container {
    padding: 1rem;
  }

  .hero-section {
    padding: 2rem;
  }

  .hero-section h1 {
    font-size: 2rem;
  }

  .contact-content {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }

  .social-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 480px) {
  .hero-section h1 {
    font-size: 1.5rem;
  }

  .form-section,
  .info-card,
  .social-card {
    padding: 1.5rem;
  }

  .social-grid {
    grid-template-columns: repeat(3, 1fr);
  }

  .social-link {
    width: 50px;
    height: 50px;
    font-size: 1.25rem;
  }
}
</style>
