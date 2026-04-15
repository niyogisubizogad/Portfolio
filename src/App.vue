<template>
  <div class="portfolio-app">
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
      <div class="container">
        <router-link class="navbar-brand d-flex align-items-center" to="/">
          <div class="logo-text me-2">
            <span class="logo-inner">NG</span>
          </div>
          <span class="brand-name">Gad NiYoGiSuBiZo</span>
        </router-link>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav ms-auto">
            <li class="nav-item">
              <router-link class="nav-link" to="/">Home</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/about">About</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/projects">Projects</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/skills">Skills</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/contact">Contact</router-link>
            </li>
            <li class="nav-item ms-2">
              <button class="btn btn-outline-light theme-toggle" @click="toggleTheme">
                <i :class="['fas', isDarkTheme ? 'fa-sun' : 'fa-moon']"></i>
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>

    <main class="main-content" :class="{ 'dark-theme': isDarkTheme }">
      <router-view/>
    </main>

    <footer class="py-4 mt-5" :class="{ 'bg-dark text-light': isDarkTheme, 'bg-light text-dark': !isDarkTheme }">
      <div class="container text-center">
        <p class="mb-0">&copy; 2025 Gad NiYoGiSuBiZo. All rights reserved.</p>
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      isDarkTheme: false
    }
  },
  created() {
    // Check for saved theme preference or use system preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      this.isDarkTheme = savedTheme === 'dark';
    } else {
      this.isDarkTheme = window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    this.applyTheme();
  },
  methods: {
    toggleTheme() {
      this.isDarkTheme = !this.isDarkTheme;
      localStorage.setItem('theme', this.isDarkTheme ? 'dark' : 'light');
      this.applyTheme();
    },
    applyTheme() {
      document.documentElement.setAttribute('data-theme', this.isDarkTheme ? 'dark' : 'light');
    }
  }
}
</script>

<style>
:root {
  /* Light Theme Colors */
  --primary-color: #38bdf8;
  --primary-color-rgb: 56, 189, 248;
  --primary-hover: #0ea5e9;
  --secondary-color: #64748b;
  --secondary-color-rgb: 100, 116, 139;
  --success-color: #10b981;
  --info-color: #06b6d4;
  --warning-color: #f59e0b;
  --danger-color: #ef4444;
  --light-color: #f8f9fa;
  --dark-color: #1e293b;

  /* Background Colors */
  --background-color: #f8fafc;
  --card-bg: #ffffff;
  --navbar-bg: #ffffff;
  --footer-bg: #f1f5f9;
  --input-bg: #f1f5f9;

  /* Text Colors */
  --text-color: #1e293b;
  --text-muted: #64748b;
  --text-light: #ffffff;
  --text-dark: #1e293b;
  --text-heading: #0f172a;

  /* Border Colors */
  --border-color: #e2e8f0;
  --border-light: #f1f5f9;
  --border-dark: #1e293b;

  /* Shadow Colors */
  --shadow-color: rgba(15, 23, 42, 0.08);
  --shadow-hover: rgba(15, 23, 42, 0.15);
}

[data-theme="dark"] {
  /* Dark Theme Colors */
  --primary-color: #0d6efd;
  --primary-color-rgb: 13, 110, 253;
  --primary-hover: #0b5ed7;
  --secondary-color: #adb5bd;
  --secondary-color-rgb: 173, 181, 189;
  --success-color: #198754;
  --info-color: #0dcaf0;
  --warning-color: #ffc107;
  --danger-color: #dc3545;
  --light-color: #f8f9fa;
  --dark-color: #212529;
  
  /* Background Colors */
  --background-color: #1a1a1a;
  --card-bg: #2c3034;
  --navbar-bg: #121212;
  --footer-bg: #121212;
  --input-bg: #2c3034;
  
  /* Text Colors */
  --text-color: #ffffff;
  --text-muted: #a0a0a0;
  --text-light: #ffffff;
  --text-dark: #000000;
  --text-heading: #ffffff;
  
  /* Border Colors */
  --border-color: #404040;
  --border-light: #505050;
  --border-dark: #212529;
  
  /* Shadow Colors */
  --shadow-color: rgba(0, 0, 0, 0.3);
  --shadow-hover: rgba(0, 0, 0, 0.4);
}

.portfolio-app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: var(--background-color);
  color: var(--text-color);
  transition: all 0.3s ease;
}

.navbar {
  background-color: var(--navbar-bg) !important;
  box-shadow: 0 2px 4px var(--shadow-color);
  transition: background-color 0.3s ease;
}

.main-content {
  flex: 1;
  padding-top: 76px;
}

.dark-theme {
  background-color: var(--background-color);
  color: var(--text-color);
}

.card {
  background-color: var(--card-bg);
  border-color: var(--border-color);
  box-shadow: 0 2px 4px var(--shadow-color);
  transition: all 0.3s ease;
}

.card:hover {
  transform: translateY(-5px);
  box-shadow: 0 5px 15px var(--shadow-hover);
}

.theme-toggle {
  padding: 0.375rem 0.75rem;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  background-color: transparent;
  border-color: var(--text-light);
  color: var(--text-light);
}

.theme-toggle:hover {
  transform: rotate(180deg);
  background-color: var(--primary-color);
  border-color: var(--primary-color);
}

.nav-link {
  color: var(--text-light) !important;
  transition: color 0.3s ease;
}

.nav-link:hover {
  color: var(--primary-color) !important;
}

.router-link-exact-active {
  color: var(--primary-color) !important;
  font-weight: 600;
}

.form-control {
  background-color: var(--input-bg);
  border-color: var(--border-color);
  color: var(--text-color);
  transition: all 0.3s ease;
}

.form-control:focus {
  background-color: var(--input-bg);
  border-color: var(--primary-color);
  color: var(--text-color);
  box-shadow: 0 0 0 0.2rem rgba(13, 110, 253, 0.25);
}

.btn {
  transition: all 0.3s ease;
}

.btn-primary {
  background-color: var(--primary-color);
  border-color: var(--primary-color);
  color: var(--text-light);
}

.btn-primary:hover {
  background-color: var(--primary-hover);
  border-color: var(--primary-hover);
}

.btn-outline-primary {
  color: var(--primary-color);
  border-color: var(--primary-color);
}

.btn-outline-primary:hover {
  background-color: var(--primary-color);
  color: var(--text-light);
}

.logo-text {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background: linear-gradient(135deg, #007bff 0%, #0056b3 100%);
  color: white;
  border-radius: 50%;
  font-weight: bold;
  font-size: 1.2rem;
  box-shadow: 0 2px 4px rgba(0,0,0,.1);
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease;
}

.logo-text::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(45deg, transparent 0%, rgba(255,255,255,0.1) 50%, transparent 100%);
  transform: translateX(-100%);
  transition: transform 0.6s ease;
}

.logo-text:hover {
  transform: scale(1.1);
  box-shadow: 0 4px 8px rgba(0,0,0,.2);
}

.logo-text:hover::before {
  transform: translateX(100%);
}

.logo-inner {
  position: relative;
  z-index: 1;
  text-shadow: 0 1px 2px rgba(0,0,0,0.2);
}

.brand-name {
  font-weight: 600;
  transition: color 0.3s ease;
}

.navbar-brand:hover .brand-name {
  color: #007bff;
}

@media (max-width: 576px) {
  .logo-text {
    width: 35px;
    height: 35px;
    font-size: 1rem;
  }
  
  .brand-name {
    font-size: 0.9rem;
  }
}

/* Page transition animations */
.page-enter-active,
.page-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.page-enter-from,
.page-leave-to {
  opacity: 0;
  transform: translateY(20px);
}

/* Text Styles */
.text-muted {
  color: var(--text-muted) !important;
}

/* Social Icons */
.social-icon {
  background-color: var(--card-bg);
  color: var(--text-color);
  transition: all 0.3s ease;
}

.social-icon:hover {
  background-color: var(--primary-color);
  color: var(--text-light);
  transform: translateY(-3px);
}

/* Timeline Styles */
.timeline-marker {
  background-color: var(--primary-color);
}

.timeline-item:not(:last-child)::after {
  background-color: var(--border-color);
}

/* CV Section Styles */
.cv-item {
  border-bottom-color: var(--border-color);
}

.cv-item h4 {
  color: var(--primary-color);
}

.cv-item h4::after {
  background-color: var(--primary-color);
}

/* Footer Styles */
footer {
  background-color: var(--footer-bg);
  color: var(--text-light);
  transition: all 0.3s ease;
}

/* Text color transitions */
h1, h2, h3, h4, h5, h6 {
  color: var(--text-heading);
  font-weight: 600;
  transition: color 0.3s ease;
}

[data-theme="dark"] h1, 
[data-theme="dark"] h2, 
[data-theme="dark"] h3, 
[data-theme="dark"] h4, 
[data-theme="dark"] h5, 
[data-theme="dark"] h6 {
  color: var(--text-light);
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
}

p, span, div, a {
  color: var(--text-color);
  transition: color 0.3s ease;
}

[data-theme="dark"] p,
[data-theme="dark"] span,
[data-theme="dark"] div,
[data-theme="dark"] a {
  color: var(--text-light);
}

.text-muted {
  color: var(--text-muted) !important;
}

[data-theme="dark"] .text-muted {
  color: #a0a0a0 !important;
}

/* Cards */
.card, .card-body {
  background-color: var(--card-bg);
  color: var(--text-color);
  transition: all 0.3s ease;
}

[data-theme="dark"] .card,
[data-theme="dark"] .card-body {
  background-color: var(--card-bg);
  color: var(--text-light);
}

/* Buttons */
.btn {
  transition: all 0.3s ease;
}

.btn-primary {
  background-color: var(--primary-color);
  border-color: var(--primary-color);
  color: var(--text-light);
}

.btn-outline-primary {
  color: var(--primary-color);
  border-color: var(--primary-color);
}

.btn-outline-primary:hover {
  background-color: var(--primary-color);
  color: var(--text-light);
}

/* Progress bars */
.progress {
  background-color: var(--border-color);
}

.progress-bar {
  transition: width 1s ease, background-color 0.3s ease;
}

/* Additional dark theme enhancements */
[data-theme="dark"] {
  --scrollbar-thumb: #404040;
  --scrollbar-track: #1a1a1a;
}

[data-theme="dark"] ::-webkit-scrollbar {
  width: 8px;
}

[data-theme="dark"] ::-webkit-scrollbar-track {
  background: var(--scrollbar-track);
}

[data-theme="dark"] ::-webkit-scrollbar-thumb {
  background: var(--scrollbar-thumb);
  border-radius: 4px;
}

[data-theme="dark"] ::-webkit-scrollbar-thumb:hover {
  background: #505050;
}

/* Global heading styles */
h1, .h1 {
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
  color: var(--text-color);
  transition: color 0.3s ease;
}

h2, .h2 {
  font-size: 2rem;
  font-weight: 600;
  margin-bottom: 0.75rem;
  color: var(--text-color);
  transition: color 0.3s ease;
}

h3, .h3 {
  font-size: 1.75rem;
  font-weight: 600;
  margin-bottom: 0.75rem;
  color: var(--text-color);
  transition: color 0.3s ease;
}

h4, .h4 {
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: var(--text-color);
  transition: color 0.3s ease;
}

h5, .h5 {
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: var(--text-color);
  transition: color 0.3s ease;
}

h6, .h6 {
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: var(--text-color);
  transition: color 0.3s ease;
}

/* Display classes */
.display-1 {
  font-size: 4.5rem;
  font-weight: 700;
  line-height: 1.2;
  margin-bottom: 1rem;
  color: var(--text-color);
  transition: color 0.3s ease;
}

.display-2 {
  font-size: 4rem;
  font-weight: 700;
  line-height: 1.2;
  margin-bottom: 1rem;
  color: var(--text-color);
  transition: color 0.3s ease;
}

.display-3 {
  font-size: 3.5rem;
  font-weight: 700;
  line-height: 1.2;
  margin-bottom: 1rem;
  color: var(--text-color);
  transition: color 0.3s ease;
}

.display-4 {
  font-size: 3rem;
  font-weight: 700;
  line-height: 1.2;
  margin-bottom: 1rem;
  color: var(--text-color);
  transition: color 0.3s ease;
}

/* Lead text */
.lead {
  font-size: 1.25rem;
  font-weight: 300;
  margin-bottom: 1rem;
  color: var(--text-muted);
  transition: color 0.3s ease;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  h1, .h1 { font-size: 2rem; }
  h2, .h2 { font-size: 1.75rem; }
  h3, .h3 { font-size: 1.5rem; }
  h4, .h4 { font-size: 1.25rem; }
  h5, .h5 { font-size: 1.1rem; }
  h6, .h6 { font-size: 1rem; }
  
  .display-1 { font-size: 3.5rem; }
  .display-2 { font-size: 3rem; }
  .display-3 { font-size: 2.5rem; }
  .display-4 { font-size: 2rem; }
  
  .lead { font-size: 1.1rem; }
}

@media (max-width: 576px) {
  h1, .h1 { font-size: 1.75rem; }
  h2, .h2 { font-size: 1.5rem; }
  h3, .h3 { font-size: 1.25rem; }
  h4, .h4 { font-size: 1.1rem; }
  h5, .h5 { font-size: 1rem; }
  h6, .h6 { font-size: 0.9rem; }
  
  .display-1 { font-size: 3rem; }
  .display-2 { font-size: 2.5rem; }
  .display-3 { font-size: 2rem; }
  .display-4 { font-size: 1.75rem; }
  
  .lead { font-size: 1rem; }
}

/* Light Theme Glass Panel Styles */
[data-theme="light"] .glass-panel {
  background: rgba(255, 255, 255, 0.85) !important;
  border: 1px solid rgba(56, 189, 248, 0.25) !important;
  box-shadow: 0 4px 12px rgba(15, 23, 42, 0.1) !important;
}

[data-theme="light"] .glass-panel h1,
[data-theme="light"] .glass-panel h2,
[data-theme="light"] .glass-panel h3,
[data-theme="light"] .glass-panel h4,
[data-theme="light"] .glass-panel h5,
[data-theme="light"] .glass-panel h6,
[data-theme="light"] .glass-panel p,
[data-theme="light"] .glass-panel span,
[data-theme="light"] .glass-panel div {
  color: #1e293b !important;
}

[data-theme="light"] .glass-panel:hover {
  border-color: rgba(56, 189, 248, 0.3) !important;
  background: rgba(255, 255, 255, 0.8) !important;
  box-shadow: 0 8px 12px rgba(15, 23, 42, 0.1) !important;
}

/* Light Theme Form Styles */
[data-theme="light"] .form-control,
[data-theme="light"] textarea {
  background-color: #f1f5f9 !important;
  border-color: #e2e8f0 !important;
  color: #1e293b !important;
}

[data-theme="light"] .form-control:focus,
[data-theme="light"] textarea:focus {
  background-color: #ffffff !important;
  border-color: #38bdf8 !important;
  color: #1e293b !important;
  box-shadow: 0 0 0 3px rgba(56, 189, 248, 0.1) !important;
}

/* Light Theme Navbar */
[data-theme="light"] .navbar {
  background-color: #ffffff !important;
  box-shadow: 0 1px 3px rgba(15, 23, 42, 0.1) !important;
}

[data-theme="light"] .nav-link {
  color: #1e293b !important;
}

[data-theme="light"] .nav-link:hover,
[data-theme="light"] .router-link-exact-active {
  color: #38bdf8 !important;
}

/* Light Theme Social Icons */
[data-theme="light"] .social-icon {
  background-color: #f1f5f9 !important;
  color: #1e293b !important;
  border-color: #e2e8f0 !important;
}

[data-theme="light"] .social-icon:hover {
  background-color: #38bdf8 !important;
  color: #ffffff !important;
  border-color: #38bdf8 !important;
}

/* Light Theme Tech Badges */
[data-theme="light"] .tech-badge {
  background: rgba(56, 189, 248, 0.1) !important;
  color: #0ea5e9 !important;
  border: 1px solid rgba(56, 189, 248, 0.3) !important;
}

[data-theme="light"] .tech-badge:hover {
  background: rgba(56, 189, 248, 0.2) !important;
  border-color: rgba(56, 189, 248, 0.5) !important;
}

/* Light Theme Buttons */
[data-theme="light"] .submit-btn {
  background: linear-gradient(135deg, #38bdf8, #0ea5e9) !important;
  color: #ffffff !important;
}

[data-theme="light"] .submit-btn:hover:not(:disabled) {
  box-shadow: 0 8px 24px rgba(56, 189, 248, 0.4) !important;
}

/* Light Theme Skill Progress Bar */
[data-theme="light"] .skill-bar {
  background: rgba(56, 189, 248, 0.15) !important;
}

/* Light Theme Tool Items */
[data-theme="light"] .tool-item {
  background: #f8fafc !important;
  border: 1px solid #e2e8f0 !important;
}

[data-theme="light"] .tool-item:hover {
  background: #f1f5f9 !important;
  border-color: #38bdf8 !important;
}

/* Light Theme Project Cards */
[data-theme="light"] .project-card {
  background: rgba(255, 255, 255, 0.7) !important;
}

[data-theme="light"] .project-overlay {
  background: rgba(30, 41, 59, 0.8) !important;
}

/* Light Theme Timeline */
[data-theme="light"] .timeline-dot {
  background: #38bdf8 !important;
  border-color: #f8fafc !important;
}

/* Light Theme Footer */
[data-theme="light"] footer {
  background-color: #f1f5f9 !important;
  color: #1e293b !important;
  border-top: 1px solid #e2e8f0 !important;
}

/* Light Theme Text Visibility */
[data-theme="light"] {
  --text-color: #1e293b;
  --text-heading: #0f172a;
  --text-muted: #64748b;
}

[data-theme="light"] p,
[data-theme="light"] span,
[data-theme="light"] a,
[data-theme="light"] li,
[data-theme="light"] div {
  color: #1e293b !important;
}

[data-theme="light"] h1,
[data-theme="light"] h2,
[data-theme="light"] h3,
[data-theme="light"] h4,
[data-theme="light"] h5,
[data-theme="light"] h6,
[data-theme="light"] strong {
  color: #0f172a !important;
}

[data-theme="light"] .text-muted {
  color: #64748b !important;
}

/* Light Theme Card Background */
[data-theme="light"] .card {
  background-color: #ffffff !important;
  color: #1e293b !important;
  border-color: #e2e8f0 !important;
}

/* Light Theme Input Styling */
[data-theme="light"] input,
[data-theme="light"] textarea,
[data-theme="light"] select {
  background-color: #f1f5f9 !important;
  color: #1e293b !important;
  border-color: #e2e8f0 !important;
}

[data-theme="light"] input::placeholder,
[data-theme="light"] textarea::placeholder {
  color: #94a3b8 !important;
}

/* Light Theme Buttons */
[data-theme="light"] .btn-primary {
  background-color: #38bdf8 !important;
  border-color: #38bdf8 !important;
  color: #ffffff !important;
}

[data-theme="light"] .btn-primary:hover {
  background-color: #0ea5e9 !important;
  border-color: #0ea5e9 !important;
}

/* Light Theme Link Colors */
[data-theme="light"] a {
  color: #38bdf8 !important;
}

[data-theme="light"] a:hover {
  color: #0ea5e9 !important;
}
</style>
