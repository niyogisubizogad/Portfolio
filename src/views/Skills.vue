<template>
  <div class="skills-page">
    <div class="ambient ambient-left"></div>
    <div class="ambient ambient-right"></div>

    <div class="skills-container">
      <!-- Hero Section -->
      <section class="hero-section glass-panel">
        <h1>My Skills</h1>
        <p>Technologies and tools I work with</p>
      </section>

      <!-- Skills Categories -->
      <section class="skills-section">
        <div class="skills-grid">
          <div v-for="category in skillCategories" :key="category.name" class="skill-category glass-panel">
            <div class="category-header">
              <i :class="category.icon"></i>
              <h3>{{ category.name }}</h3>
            </div>
            <div class="skills-list">
              <div v-for="skill in category.skills" :key="skill.name" class="skill-item">
                <div class="skill-info">
                  <span class="skill-name">{{ skill.name }}</span>
                  <span class="skill-percentage">{{ skill.percentage }}%</span>
                </div>
                <div class="skill-bar">
                  <div class="skill-progress" :style="{ width: skill.percentage + '%' }"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Tools Section -->
      <section class="tools-section">
        <div class="section-header">
          <h2>Tools & Technologies</h2>
        </div>
        <div class="tools-grid">
          <div v-for="tool in tools" :key="tool.name" class="tool-item glass-panel">
            <i :class="tool.icon"></i>
            <span>{{ tool.name }}</span>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SkillsView',
  data() {
    return {
      skillCategories: [
        {
          name: 'Frontend Development',
          icon: 'fas fa-code',
          skills: [
            { name: 'Vue.js', percentage: 90 },
            { name: 'JavaScript', percentage: 85 },
            { name: 'HTML5', percentage: 95 },
            { name: 'CSS3', percentage: 90 },
            { name: 'Bootstrap', percentage: 85 }
          ]
        },
        {
          name: 'Backend Development',
          icon: 'fas fa-server',
          skills: [
            { name: 'Node.js', percentage: 80 },
            { name: 'Express', percentage: 75 },
            { name: 'MongoDB', percentage: 70 },
            { name: 'RESTful APIs', percentage: 85 }
          ]
        },
        {
          name: 'Development Tools',
          icon: 'fas fa-tools',
          skills: [
            { name: 'Git', percentage: 85 },
            { name: 'Webpack', percentage: 75 },
            { name: 'VS Code', percentage: 90 },
            { name: 'Chrome DevTools', percentage: 80 }
          ]
        },
        {
          name: 'Soft Skills',
          icon: 'fas fa-users',
          skills: [
            { name: 'Communication', percentage: 90 },
            { name: 'Problem Solving', percentage: 85 },
            { name: 'Team Collaboration', percentage: 95 },
            { name: 'Time Management', percentage: 80 }
          ]
        }
      ],
      tools: [
        { name: 'Vue.js', icon: 'fab fa-vuejs' },
        { name: 'JavaScript', icon: 'fab fa-js' },
        { name: 'HTML5', icon: 'fab fa-html5' },
        { name: 'CSS3', icon: 'fab fa-css3-alt' },
        { name: 'Bootstrap', icon: 'fab fa-bootstrap' },
        { name: 'Node.js', icon: 'fab fa-node-js' },
        { name: 'Git', icon: 'fab fa-git-alt' },
        { name: 'VS Code', icon: 'fas fa-code' }
      ]
    }
  }
}
</script>

<style scoped>
.skills-page {
  position: relative;
  min-height: calc(100vh - 76px);
  overflow: hidden;
  background:
    radial-gradient(circle at 18% 16%, rgba(56, 189, 248, 0.22), transparent 28%),
    radial-gradient(circle at 82% 18%, rgba(168, 85, 247, 0.18), transparent 26%),
    linear-gradient(180deg, #020617 0%, #08111f 36%, #0f172a 100%);
  color: #e2e8f0;
}

[data-theme="light"] .skills-page {
  background:
    radial-gradient(circle at 18% 16%, rgba(56, 189, 248, 0.1), transparent 28%),
    radial-gradient(circle at 82% 18%, rgba(168, 85, 247, 0.08), transparent 26%),
    linear-gradient(180deg, #f8fafc 0%, #f1f5f9 50%, #e0e7ff 100%);
  color: #1e293b;
}

[data-theme="light"] .skills-page * {
  color: #1e293b;
}

[data-theme="light"] .skills-page h1,
[data-theme="light"] .skills-page h2,
[data-theme="light"] .skills-page h3,
[data-theme="light"] .skills-page h4,
[data-theme="light"] .skills-page h5,
[data-theme="light"] .skills-page h6 {
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

.skills-container {
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

/* Skills Grid */
.skills-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;
}

.skill-category {
  padding: 2rem;
  transition: all 0.3s ease;
}

.skill-category:hover {
  transform: translateY(-4px);
  border-color: rgba(56, 189, 248, 0.3);
  background: rgba(15, 23, 42, 0.6);
}

/* Category Header */
.category-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.category-header i {
  font-size: 1.75rem;
  color: #38bdf8;
}

.category-header h3 {
  font-size: 1.25rem;
  font-weight: 700;
  color: #f1f5f9;
  margin: 0;
}

/* Skills List */
.skills-list {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.skill-item {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.skill-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.skill-name {
  color: #e2e8f0;
  font-weight: 600;
  font-size: 0.95rem;
}

.skill-percentage {
  color: #38bdf8;
  font-size: 0.85rem;
  font-weight: 700;
}

/* Skill Bar */
.skill-bar {
  height: 8px;
  background: rgba(56, 189, 248, 0.15);
  border-radius: 4px;
  overflow: hidden;
}

.skill-progress {
  height: 100%;
  background: linear-gradient(90deg, #38bdf8, #a855f7);
  border-radius: 4px;
  animation: fillBar 1s ease forwards;
}

@keyframes fillBar {
  from {
    width: 0;
  }
}

/* Tools Section */
.tools-section {
  margin-bottom: 2rem;
}

.section-header {
  text-align: center;
  margin-bottom: 3rem;
}

.section-header h2 {
  font-size: 2rem;
  font-weight: 700;
  color: #f1f5f9;
  margin: 0;
}

/* Tools Grid */
.tools-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 1.5rem;
}

.tool-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 1.5rem;
  transition: all 0.3s ease;
  cursor: pointer;
}

.tool-item:hover {
  transform: translateY(-8px) scale(1.05);
  border-color: rgba(56, 189, 248, 0.3);
  background: rgba(15, 23, 42, 0.6);
}

.tool-item i {
  font-size: 2.5rem;
  color: #38bdf8;
  margin-bottom: 0.75rem;
  transition: all 0.3s ease;
}

.tool-item:hover i {
  transform: scale(1.2);
  color: #60a5fa;
}

.tool-item span {
  color: #e2e8f0;
  font-size: 0.9rem;
  font-weight: 600;
  text-align: center;
}

/* Responsive */
@media (max-width: 768px) {
  .skills-container {
    padding: 1rem;
  }

  .hero-section {
    padding: 2rem;
  }

  .hero-section h1 {
    font-size: 2rem;
  }

  .skills-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }

  .tools-grid {
    grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
    gap: 1rem;
  }
}

@media (max-width: 480px) {
  .hero-section h1 {
    font-size: 1.5rem;
  }

  .category-header i {
    font-size: 1.5rem;
  }

  .tool-item {
    padding: 1rem;
  }

  .tool-item i {
    font-size: 2rem;
  }
}
</style>
