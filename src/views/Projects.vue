<template>
  <div class="projects-page">
    <div class="ambient ambient-left"></div>
    <div class="ambient ambient-right"></div>

    <div class="projects-container">
      <!-- Hero Section -->
      <section class="hero-section glass-panel">
        <h1>My Projects</h1>
        <p>Showcasing my recent works and creative solutions</p>
      </section>

      <!-- Projects Grid -->
      <section class="projects-grid">
        <div v-for="(project, index) in projects" :key="index" class="project-card glass-panel">
          <div class="project-image">
            <img :src="project.image" :alt="project.title" />
            <div class="project-overlay">
              <div class="overlay-content">
                <a :href="project.github" target="_blank" rel="noopener noreferrer" class="project-link">
                  <i class="fab fa-github"></i>
                </a>
                <a v-if="project.demo" :href="project.demo" target="_blank" rel="noopener noreferrer" class="project-link">
                  <i class="fas fa-external-link-alt"></i>
                </a>
              </div>
            </div>
          </div>
          <div class="project-content">
            <h3>{{ project.title }}</h3>
            <p class="project-description">{{ project.description }}</p>
            <div class="tech-stack">
              <span v-for="tech in project.technologies" :key="tech" class="tech-badge">{{ tech }}</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProjectsView',
  data() {
    return {
      projects: [
        {
          title: 'E-commerce Platform',
          description: 'A full-featured e-commerce platform built with Vue.js and Node.js. Features include product catalog, shopping cart, and payment integration.',
          image: 'https://images.unsplash.com/photo-1556741533-6e6a62bd8b49?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
          technologies: ['Vue.js', 'Node.js', 'MongoDB', 'Express'],
          github: 'https://github.com/Gad-off',
          demo: ''
        },
        {
          title: 'Task Management App',
          description: 'A collaborative task management application with real-time updates. Includes team collaboration, task tracking, and progress monitoring.',
          image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
          technologies: ['Vue.js', 'Firebase', 'Vuex'],
          github: 'https://github.com/Gad-off',
          demo: ''
        },
        {
          title: 'Portfolio Website',
          description: 'A responsive portfolio website showcasing my work and skills. Built with modern web technologies and best practices for performance.',
          image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
          technologies: ['Vue.js', 'CSS3', 'Vue Router'],
          github: 'https://github.com/Gad-off',
          demo: ''
        }
      ]
    }
  }
}
</script>

<style scoped>
.projects-page {
  position: relative;
  min-height: calc(100vh - 76px);
  overflow: hidden;
  background:
    radial-gradient(circle at 18% 16%, rgba(56, 189, 248, 0.22), transparent 28%),
    radial-gradient(circle at 82% 18%, rgba(168, 85, 247, 0.18), transparent 26%),
    linear-gradient(180deg, #020617 0%, #08111f 36%, #0f172a 100%);
  color: #e2e8f0;
}

[data-theme="light"] .projects-page {
  background:
    radial-gradient(circle at 18% 16%, rgba(56, 189, 248, 0.1), transparent 28%),
    radial-gradient(circle at 82% 18%, rgba(168, 85, 247, 0.08), transparent 26%),
    linear-gradient(180deg, #f8fafc 0%, #f1f5f9 50%, #e0e7ff 100%);
  color: #1e293b;
}

[data-theme="light"] .projects-page * {
  color: #1e293b;
}

[data-theme="light"] .projects-page h1,
[data-theme="light"] .projects-page h2,
[data-theme="light"] .projects-page h3,
[data-theme="light"] .projects-page h4,
[data-theme="light"] .projects-page h5,
[data-theme="light"] .projects-page h6 {
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

.projects-container {
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

/* Projects Grid */
.projects-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;
}

.project-card {
  overflow: hidden;
  display: flex;
  flex-direction: column;
  transition: all 0.3s ease;
  cursor: pointer;
}

.project-card:hover {
  transform: translateY(-8px);
  border-color: rgba(56, 189, 248, 0.3);
  background: rgba(15, 23, 42, 0.6);
}

/* Project Image */
.project-image {
  position: relative;
  overflow: hidden;
  height: 200px;
}

.project-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.project-card:hover .project-image img {
  transform: scale(1.1);
}

.project-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(2, 6, 23, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.project-card:hover .project-overlay {
  opacity: 1;
}

.overlay-content {
  display: flex;
  gap: 1.5rem;
}

.project-link {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: rgba(56, 189, 248, 0.2);
  color: #38bdf8;
  border: 1px solid rgba(56, 189, 248, 0.3);
  transition: all 0.3s ease;
  font-size: 1.25rem;
}

.project-link:hover {
  background: rgba(56, 189, 248, 0.3);
  border-color: rgba(56, 189, 248, 0.5);
  transform: scale(1.1);
}

/* Project Content */
.project-content {
  padding: 1.5rem;
  flex: 1;
  display: flex;
  flex-direction: column;
}

.project-content h3 {
  font-size: 1.25rem;
  font-weight: 700;
  color: #f1f5f9;
  margin-bottom: 0.75rem;
}

.project-description {
  color: #cbd5e1;
  font-size: 0.95rem;
  line-height: 1.6;
  margin-bottom: 1rem;
  flex: 1;
}

/* Tech Stack */
.tech-stack {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.tech-badge {
  display: inline-block;
  padding: 0.4rem 0.8rem;
  background: rgba(56, 189, 248, 0.15);
  color: #38bdf8;
  border: 1px solid rgba(56, 189, 248, 0.3);
  border-radius: 6px;
  font-size: 0.8rem;
  font-weight: 600;
  transition: all 0.3s ease;
}

.tech-badge:hover {
  background: rgba(56, 189, 248, 0.25);
  border-color: rgba(56, 189, 248, 0.5);
}

/* Responsive */
@media (max-width: 768px) {
  .projects-container {
    padding: 1rem;
  }

  .hero-section {
    padding: 2rem;
  }

  .hero-section h1 {
    font-size: 2rem;
  }

  .projects-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
}

@media (max-width: 480px) {
  .hero-section h1 {
    font-size: 1.5rem;
  }

  .project-link {
    width: 40px;
    height: 40px;
    font-size: 1rem;
  }

  .overlay-content {
    gap: 1rem;
  }
}
</style>
