<template>
  <div class="about-page">
    <div class="ambient ambient-left"></div>
    <div class="ambient ambient-right"></div>

    <div class="about-container">
      <!-- Hero Section -->
      <section class="hero-section glass-panel">
        <div class="hero-content">
          <div class="hero-avatar-wrap">
            <img class="hero-avatar" :src="logoImage" alt="Gad NiYoGiSuBiZo" />
          </div>
          <div class="hero-info">
            <h1>Gad NiYoGiSuBiZo</h1>
            <p class="title">Frontend Developer</p>
            <p class="description">
              Crafting polished social products with Vue.js and JavaScript. Passionate about building beautiful, responsive, and user-friendly applications.
            </p>
            <div class="social-links">
              <a v-for="social in validSocialLinks" :key="social.label" :href="social.url" target="_blank" rel="noopener noreferrer" class="social-btn">
                <i :class="social.icon"></i>
              </a>
            </div>
          </div>
        </div>
      </section>

      <!-- Info Cards Section -->
      <section class="info-section">
        <div class="section-header">
          <h2>About Me</h2>
        </div>
        <div class="info-grid">
          <div v-for="info in personalInfo" :key="info.label" class="info-card glass-panel">
            <div class="info-icon">
              <i :class="info.icon"></i>
            </div>
            <div class="info-content">
              <span class="info-label">{{ info.label }}</span>
              <p class="info-value">{{ info.value }}</p>
            </div>
          </div>
        </div>
      </section>

      <!-- Experience Section -->
      <section class="experience-section">
        <div class="section-header">
          <h2>Experience</h2>
        </div>
        <div class="timeline">
          <div v-for="(exp, index) in experience" :key="index" class="timeline-item">
            <div class="timeline-dot"></div>
            <div class="timeline-content glass-panel">
              <h3>{{ exp.position }}</h3>
              <p class="company">{{ exp.company }}</p>
              <p class="duration">{{ exp.duration }}</p>
              <p class="description">{{ exp.description }}</p>
            </div>
          </div>
        </div>
      </section>

      <!-- CV Section -->
      <section class="cv-section">
        <div class="section-header">
          <h2>Curriculum Vitae</h2>
          <button class="toggle-btn" @click="isCVVisible = !isCVVisible">
            <i :class="['fas', isCVVisible ? 'fa-chevron-up' : 'fa-chevron-down']"></i>
          </button>
        </div>
        <div v-if="isCVVisible" class="cv-content">
          <div v-for="(item, index) in cvItems" :key="index" class="cv-item glass-panel">
            <h3>{{ item.title }}</h3>
            <p v-for="(line, i) in item.content" :key="i">{{ line }}</p>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import logoImage from '../assets/pic.jpg'

export default {
  name: 'AboutView',
  data() {
    return {
      logoImage,
      isCVVisible: false,
      socialLinks: [
        { label: 'GitHub', icon: 'fab fa-github', url: 'https://github.com/Gad-off' },
        { label: 'WhatsApp', icon: 'fab fa-whatsapp', url: 'https://wa.me/250785662308' }
      ],
      personalInfo: [
        { label: 'Email', value: 'offgad200@gmail.com', icon: 'fas fa-envelope' },
        { label: 'Phone', value: '+250 785 662 308', icon: 'fas fa-phone' },
        { label: 'Location', value: 'Kigali, Rwanda', icon: 'fas fa-map-marker-alt' },
        { label: 'Status', value: 'Available for Freelance', icon: 'fas fa-check-circle' }
      ],
      experience: [
        {
          position: 'Senior Frontend Developer',
          company: 'Tech Company Inc.',
          duration: '2020 - Present',
          description: 'Leading frontend development team, implementing modern web technologies and best practices. Building scalable and performant applications.'
        },
        {
          position: 'Frontend Developer',
          company: 'Web Solutions Ltd.',
          duration: '2018 - 2020',
          description: 'Developed responsive web applications using Vue.js and modern JavaScript frameworks. Focused on user experience and code quality.'
        },
        {
          position: 'Junior Web Developer',
          company: 'Digital Agency',
          duration: '2016 - 2018',
          description: 'Created and maintained websites, focusing on user experience and responsive design. Learned best practices from senior developers.'
        }
      ],
      cvItems: [
        {
          title: 'Personal Information',
          content: [
            'Name: Gad Niyogisubizo',
            'Location: Kigali, Rwanda',
            'Email: offgad200@gmail.com'
          ]
        },
        {
          title: 'Education',
          content: [
            'Primary School: GS Karama (2015-2020)',
            'Ordinary Level: (2021-2024)',
            'Advanced Level: Collegio Santo Antonio Maria Zaccaria (2025-2028)'
          ]
        },
        {
          title: 'Skills',
          content: [
            'Frontend Development: Vue.js, JavaScript, HTML, CSS',
            'Backend Development: Node.js, Express, Databases',
            'Tools & Technologies: Git, webpack, responsive design'
          ]
        },
        {
          title: 'Languages',
          content: [
            'Kinyarwanda (Native)',
            'English (Fluent)',
            'French (Basic)'
          ]
        }
      ]
    }
  },
  computed: {
    validSocialLinks() {
      return this.socialLinks.filter((social) => /^https?:\/\//.test(social.url))
    }
  }
}
</script>

<style scoped>
.about-page {
  position: relative;
  min-height: calc(100vh - 76px);
  overflow: hidden;
  background:
    radial-gradient(circle at 18% 16%, rgba(56, 189, 248, 0.22), transparent 28%),
    radial-gradient(circle at 82% 18%, rgba(168, 85, 247, 0.18), transparent 26%),
    linear-gradient(180deg, #020617 0%, #08111f 36%, #0f172a 100%);
  color: #e2e8f0;
}

[data-theme="light"] .about-page {
  background:
    radial-gradient(circle at 18% 16%, rgba(56, 189, 248, 0.1), transparent 28%),
    radial-gradient(circle at 82% 18%, rgba(168, 85, 247, 0.08), transparent 26%),
    linear-gradient(180deg, #f8fafc 0%, #f1f5f9 50%, #e0e7ff 100%);
  color: #1e293b;
}

[data-theme="light"] .about-page * {
  color: #1e293b;
}

[data-theme="light"] .about-page h1,
[data-theme="light"] .about-page h2,
[data-theme="light"] .about-page h3,
[data-theme="light"] .about-page h4,
[data-theme="light"] .about-page h5,
[data-theme="light"] .about-page h6 {
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

.about-container {
  position: relative;
  z-index: 1;
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1.5rem;
}

/* Hero Section */
.hero-section {
  padding: 3rem;
  border-radius: 16px;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  margin-bottom: 3rem;
  background: rgba(15, 23, 42, 0.4);
}

.hero-content {
  display: flex;
  align-items: center;
  gap: 3rem;
}

.hero-avatar-wrap {
  flex-shrink: 0;
}

.hero-avatar {
  width: 150px;
  height: 150px;
  border-radius: 12px;
  object-fit: cover;
  border: 2px solid rgba(56, 189, 248, 0.3);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
}

.hero-info {
  flex: 1;
}

.hero-info h1 {
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  color: #f1f5f9;
}

.hero-info .title {
  font-size: 1.25rem;
  color: #38bdf8;
  margin-bottom: 1rem;
}

.hero-info .description {
  font-size: 1rem;
  color: #cbd5e1;
  margin-bottom: 1.5rem;
  line-height: 1.6;
}

.social-links {
  display: flex;
  gap: 1rem;
}

.social-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  border-radius: 8px;
  background: rgba(56, 189, 248, 0.1);
  color: #38bdf8;
  border: 1px solid rgba(56, 189, 248, 0.2);
  transition: all 0.3s ease;
  font-size: 1.2rem;
}

.social-btn:hover {
  background: rgba(56, 189, 248, 0.2);
  transform: translateY(-4px);
  border-color: rgba(56, 189, 248, 0.4);
}

/* Glass Panel */
.glass-panel {
  background: rgba(15, 23, 42, 0.4);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  backdrop-filter: blur(10px);
}

/* Info Section */
.info-section,
.experience-section,
.cv-section {
  margin-bottom: 3rem;
}

.section-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 2rem;
}

.section-header h2 {
  font-size: 1.75rem;
  font-weight: 700;
  color: #f1f5f9;
  margin: 0;
}

.toggle-btn {
  background: rgba(56, 189, 248, 0.1);
  border: 1px solid rgba(56, 189, 248, 0.2);
  color: #38bdf8;
  width: 40px;
  height: 40px;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.toggle-btn:hover {
  background: rgba(56, 189, 248, 0.2);
  border-color: rgba(56, 189, 248, 0.4);
}

/* Info Grid */
.info-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
}

.info-card {
  padding: 2rem;
  display: flex;
  align-items: center;
  gap: 1.5rem;
  transition: all 0.3s ease;
  cursor: pointer;
}

.info-card:hover {
  transform: translateY(-4px);
  border-color: rgba(56, 189, 248, 0.3);
  background: rgba(15, 23, 42, 0.6);
}

.info-icon {
  font-size: 1.75rem;
  color: #38bdf8;
  min-width: 44px;
  text-align: center;
}

.info-content {
  flex: 1;
}

.info-label {
  display: block;
  font-size: 0.875rem;
  color: #94a3b8;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: 0.25rem;
}

.info-value {
  font-size: 1rem;
  color: #e2e8f0;
  margin: 0;
}

/* Timeline */
.timeline {
  position: relative;
  padding-left: 2rem;
}

.timeline::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 2px;
  background: linear-gradient(to bottom, #38bdf8, #a855f7, transparent);
}

.timeline-item {
  position: relative;
  margin-bottom: 2rem;
  padding-left: 2rem;
}

.timeline-dot {
  position: absolute;
  left: -10px;
  top: 0;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: #38bdf8;
  border: 3px solid #0f172a;
  box-shadow: 0 0 0 4px rgba(56, 189, 248, 0.2);
}

.timeline-content {
  padding: 1.5rem;
  transition: all 0.3s ease;
}

.timeline-content h3 {
  margin: 0 0 0.5rem 0;
  font-size: 1.125rem;
  color: #f1f5f9;
}

.timeline-content .company {
  color: #38bdf8;
  font-size: 0.95rem;
  margin: 0 0 0.25rem 0;
}

.timeline-content .duration {
  color: #94a3b8;
  font-size: 0.875rem;
  margin: 0 0 1rem 0;
}

.timeline-content .description {
  color: #cbd5e1;
  margin: 0;
  line-height: 1.6;
}

.timeline-content:hover {
  transform: translateX(8px);
  border-color: rgba(56, 189, 248, 0.3);
  background: rgba(15, 23, 42, 0.6);
}

/* CV Section */
.cv-content {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
}

.cv-item {
  padding: 2rem;
  transition: all 0.3s ease;
}

.cv-item h3 {
  color: #38bdf8;
  font-size: 1.125rem;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.cv-item p {
  color: #cbd5e1;
  margin: 0.5rem 0;
  font-size: 0.95rem;
  line-height: 1.5;
}

.cv-item:hover {
  transform: translateY(-4px);
  border-color: rgba(56, 189, 248, 0.3);
  background: rgba(15, 23, 42, 0.6);
}

/* Responsive */
@media (max-width: 768px) {
  .about-container {
    padding: 1rem;
  }

  .hero-content {
    flex-direction: column;
    text-align: center;
    gap: 2rem;
  }

  .hero-info h1 {
    font-size: 2rem;
  }

  .hero-section {
    padding: 2rem;
  }

  .social-links {
    justify-content: center;
  }

  .timeline {
    padding-left: 1.5rem;
  }

  .timeline-dot {
    left: -12px;
  }

  .timeline-item {
    padding-left: 1.5rem;
  }

  .info-grid {
    grid-template-columns: 1fr;
  }

  .cv-content {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 480px) {
  .hero-avatar {
    width: 120px;
    height: 120px;
  }

  .hero-info h1 {
    font-size: 1.5rem;
  }

  .info-card {
    padding: 1.5rem;
  }

  .cv-item,
  .timeline-content {
    padding: 1.5rem;
  }
}
</style>
