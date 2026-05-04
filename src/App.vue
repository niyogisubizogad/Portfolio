<template>
  <div class="portfolio-app">
    <!-- Three.js shared animated background: visible behind every routed page. -->
    <canvas ref="threeBackgroundCanvas" class="app-three-background" aria-hidden="true"></canvas>

    <nav class="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
      <div class="container">
        <router-link class="navbar-brand d-flex align-items-center" to="/">
          <div class="logo-text me-2">
            <span class="logo-inner">NG</span>
          </div>
          <span class="brand-name">Gad NiYoGiSuBiZo</span>
        </router-link>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
          ref="navbarToggler"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav" ref="navbarCollapse">
          <ul class="navbar-nav ms-auto">
            <li class="nav-item">
              <router-link class="nav-link" to="/" @click="closeNavbar">Home</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/about" @click="closeNavbar">About</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/projects" @click="closeNavbar">Projects</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/skills" @click="closeNavbar">Skills</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/contact" @click="closeNavbar">Contact</router-link>
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
import * as THREE from 'three'

export default {
  name: 'App',
  data() {
    return {
      isDarkTheme: false
    }
  },
  watch: {
    // FIX: watch for route changes and close the navbar each time
    $route() {
      this.closeNavbar()
    }
  },
  created() {
    const savedTheme = localStorage.getItem('theme')
    if (savedTheme) {
      this.isDarkTheme = savedTheme === 'dark'
    } else {
      this.isDarkTheme = window.matchMedia('(prefers-color-scheme: dark)').matches
    }
    this.applyTheme()
  },
  mounted() {
    this.initThreeBackground()
  },
  beforeUnmount() {
    this.destroyThreeBackground()
  },
  methods: {
    // Three.js: create one lightweight transparent scene shared by all pages.
    initThreeBackground() {
      const canvas = this.$refs.threeBackgroundCanvas
      if (!canvas) return

      const scene = new THREE.Scene()
      const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 100)
      const renderer = new THREE.WebGLRenderer({
        canvas,
        alpha: true,
        antialias: true,
        powerPreference: 'high-performance'
      })

      renderer.setClearColor(0x000000, 0)
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.7))
      renderer.setSize(window.innerWidth, window.innerHeight, false)

      camera.position.set(0, 0, 7)

      const geometry = new THREE.TorusKnotGeometry(1.2, 0.32, 96, 12)
      const material = new THREE.MeshStandardMaterial({
        color: 0x7c3aed,
        emissive: 0x172554,
        emissiveIntensity: 0.45,
        metalness: 0.35,
        roughness: 0.38,
        transparent: true,
        opacity: 0.62
      })
      const torusKnot = new THREE.Mesh(geometry, material)
      torusKnot.position.set(2.6, -0.35, -0.6)
      scene.add(torusKnot)

      const ringGeometry = new THREE.TorusGeometry(2.3, 0.015, 8, 96)
      const ringMaterial = new THREE.MeshBasicMaterial({
        color: 0x38bdf8,
        transparent: true,
        opacity: 0.38
      })
      const glowRing = new THREE.Mesh(ringGeometry, ringMaterial)
      glowRing.position.set(-2.15, 1.15, -1.25)
      glowRing.rotation.set(0.85, 0.25, -0.35)
      scene.add(glowRing)

      const ambientLight = new THREE.AmbientLight(0x93c5fd, 0.72)
      const keyLight = new THREE.PointLight(0x38bdf8, 2.2, 14)
      keyLight.position.set(-3, 3, 4)
      const fillLight = new THREE.PointLight(0xa855f7, 1.8, 12)
      fillLight.position.set(4, -2, 3)
      scene.add(ambientLight, keyLight, fillLight)

      this.threeScene = scene
      this.threeCamera = camera
      this.threeRenderer = renderer
      this.threeObjects = { torusKnot, glowRing, geometry, material, ringGeometry, ringMaterial }
      this.threeResizeHandler = this.resizeThreeBackground

      window.addEventListener('resize', this.threeResizeHandler, { passive: true })
      this.animateThreeBackground()
    },
    // Three.js: keep the shared canvas aligned with viewport changes.
    resizeThreeBackground() {
      if (!this.threeCamera || !this.threeRenderer) return

      this.threeCamera.aspect = window.innerWidth / window.innerHeight
      this.threeCamera.updateProjectionMatrix()
      this.threeRenderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.7))
      this.threeRenderer.setSize(window.innerWidth, window.innerHeight, false)
    },
    // Three.js: subtle continuous motion for the background object.
    animateThreeBackground() {
      if (!this.threeRenderer || !this.threeScene || !this.threeCamera || !this.threeObjects) return

      const { torusKnot, glowRing } = this.threeObjects
      const time = performance.now() * 0.001

      torusKnot.rotation.x += 0.003
      torusKnot.rotation.y += 0.004
      torusKnot.position.y = -0.35 + Math.sin(time * 0.8) * 0.16
      glowRing.rotation.z += 0.0018
      glowRing.position.y = 1.15 + Math.cos(time * 0.55) * 0.12

      this.threeRenderer.render(this.threeScene, this.threeCamera)
      this.threeAnimationFrame = window.requestAnimationFrame(this.animateThreeBackground)
    },
    // Three.js: clean up the shared scene and GPU resources when the app unmounts.
    destroyThreeBackground() {
      if (this.threeAnimationFrame) {
        window.cancelAnimationFrame(this.threeAnimationFrame)
      }

      if (this.threeResizeHandler) {
        window.removeEventListener('resize', this.threeResizeHandler)
      }

      if (this.threeObjects) {
        this.threeObjects.geometry.dispose()
        this.threeObjects.material.dispose()
        this.threeObjects.ringGeometry.dispose()
        this.threeObjects.ringMaterial.dispose()
      }

      if (this.threeRenderer) {
        this.threeRenderer.dispose()
        this.threeRenderer.forceContextLoss()
      }

      this.threeScene = null
      this.threeCamera = null
      this.threeRenderer = null
      this.threeObjects = null
      this.threeAnimationFrame = null
      this.threeResizeHandler = null
    },
    closeNavbar() {
      const collapse = this.$refs.navbarCollapse
      if (!collapse) return

      // Only close if the menu is actually open (has the 'show' class)
      if (!collapse.classList.contains('show')) return

      // Use Bootstrap's Collapse API if available, otherwise fall back to manual toggle
      if (window.bootstrap?.Collapse) {
        const bsCollapse = window.bootstrap.Collapse.getInstance(collapse)
          || new window.bootstrap.Collapse(collapse, { toggle: false })
        bsCollapse.hide()
      } else {
        // Fallback: manually remove Bootstrap classes
        collapse.classList.remove('show')
        const toggler = this.$refs.navbarToggler
        if (toggler) {
          toggler.setAttribute('aria-expanded', 'false')
          toggler.classList.add('collapsed')
        }
      }
    },
    toggleTheme() {
      this.isDarkTheme = !this.isDarkTheme
      localStorage.setItem('theme', this.isDarkTheme ? 'dark' : 'light')
      this.applyTheme()
    },
    applyTheme() {
      document.documentElement.setAttribute('data-theme', this.isDarkTheme ? 'dark' : 'light')
    }
  }
}
</script>

<style>
:root {
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

  --background-color: #f8fafc;
  --card-bg: #ffffff;
  --navbar-bg: #ffffff;
  --footer-bg: #f1f5f9;
  --input-bg: #f1f5f9;

  --text-color: #1e293b;
  --text-muted: #64748b;
  --text-light: #ffffff;
  --text-dark: #1e293b;
  --text-heading: #0f172a;

  --border-color: #e2e8f0;
  --border-light: #f1f5f9;
  --border-dark: #1e293b;

  --shadow-color: rgba(15, 23, 42, 0.08);
  --shadow-hover: rgba(15, 23, 42, 0.15);
}

[data-theme="dark"] {
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

  --background-color: #1a1a1a;
  --card-bg: #2c3034;
  --navbar-bg: #121212;
  --footer-bg: #121212;
  --input-bg: #2c3034;

  --text-color: #ffffff;
  --text-muted: #a0a0a0;
  --text-light: #ffffff;
  --text-dark: #000000;
  --text-heading: #ffffff;

  --border-color: #404040;
  --border-light: #505050;
  --border-dark: #212529;

  --shadow-color: rgba(0, 0, 0, 0.3);
  --shadow-hover: rgba(0, 0, 0, 0.4);
}

.portfolio-app {
  position: relative;
  isolation: isolate;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background:
    radial-gradient(circle at 18% 16%, rgba(56, 189, 248, 0.18), transparent 28%),
    radial-gradient(circle at 82% 18%, rgba(168, 85, 247, 0.16), transparent 26%),
    linear-gradient(180deg, #020617 0%, #08111f 42%, #0f172a 100%);
  color: var(--text-color);
  transition: all 0.3s ease;
}

.app-three-background {
  position: fixed;
  inset: 0;
  z-index: 0;
  width: 100vw;
  height: 100vh;
  pointer-events: none;
  opacity: 0.8;
}

.navbar {
  background-color: var(--navbar-bg) !important;
  box-shadow: 0 2px 4px var(--shadow-color);
  transition: background-color 0.3s ease;
  z-index: 20;
}

.main-content {
  position: relative;
  z-index: 1;
  flex: 1;
  padding-top: 76px;
  background: transparent;
}

.dark-theme {
  background: transparent;
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

.page-enter-active,
.page-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.page-enter-from,
.page-leave-to {
  opacity: 0;
  transform: translateY(20px);
}

.text-muted {
  color: var(--text-muted) !important;
}

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

.timeline-marker {
  background-color: var(--primary-color);
}

.timeline-item:not(:last-child)::after {
  background-color: var(--border-color);
}

.cv-item {
  border-bottom-color: var(--border-color);
}

.cv-item h4 {
  color: var(--primary-color);
}

.cv-item h4::after {
  background-color: var(--primary-color);
}

footer {
  position: relative;
  z-index: 1;
  background-color: rgba(15, 23, 42, 0.55);
  color: var(--text-light);
  transition: all 0.3s ease;
}

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

.progress {
  background-color: var(--border-color);
}

.progress-bar {
  transition: width 1s ease, background-color 0.3s ease;
}

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

h1, .h1 { font-size: 2.5rem; font-weight: 700; margin-bottom: 1rem; color: var(--text-color); transition: color 0.3s ease; }
h2, .h2 { font-size: 2rem; font-weight: 600; margin-bottom: 0.75rem; color: var(--text-color); transition: color 0.3s ease; }
h3, .h3 { font-size: 1.75rem; font-weight: 600; margin-bottom: 0.75rem; color: var(--text-color); transition: color 0.3s ease; }
h4, .h4 { font-size: 1.5rem; font-weight: 600; margin-bottom: 0.5rem; color: var(--text-color); transition: color 0.3s ease; }
h5, .h5 { font-size: 1.25rem; font-weight: 600; margin-bottom: 0.5rem; color: var(--text-color); transition: color 0.3s ease; }
h6, .h6 { font-size: 1rem; font-weight: 600; margin-bottom: 0.5rem; color: var(--text-color); transition: color 0.3s ease; }

.display-1 { font-size: 4.5rem; font-weight: 700; line-height: 1.2; margin-bottom: 1rem; color: var(--text-color); transition: color 0.3s ease; }
.display-2 { font-size: 4rem; font-weight: 700; line-height: 1.2; margin-bottom: 1rem; color: var(--text-color); transition: color 0.3s ease; }
.display-3 { font-size: 3.5rem; font-weight: 700; line-height: 1.2; margin-bottom: 1rem; color: var(--text-color); transition: color 0.3s ease; }
.display-4 { font-size: 3rem; font-weight: 700; line-height: 1.2; margin-bottom: 1rem; color: var(--text-color); transition: color 0.3s ease; }

.lead { font-size: 1.25rem; font-weight: 300; margin-bottom: 1rem; color: var(--text-muted); transition: color 0.3s ease; }

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

[data-theme="light"] .glass-panel {
  background: rgba(255, 255, 255, 0.42) !important;
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
[data-theme="light"] .glass-panel div { color: #1e293b !important; }

[data-theme="light"] .glass-panel:hover {
  border-color: rgba(56, 189, 248, 0.3) !important;
  background: rgba(255, 255, 255, 0.5) !important;
  box-shadow: 0 8px 12px rgba(15, 23, 42, 0.1) !important;
}

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

[data-theme="light"] .navbar {
  background-color: #ffffff !important;
  box-shadow: 0 1px 3px rgba(15, 23, 42, 0.1) !important;
}

[data-theme="light"] .nav-link { color: #1e293b !important; }

[data-theme="light"] .nav-link:hover,
[data-theme="light"] .router-link-exact-active { color: #38bdf8 !important; }

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

[data-theme="light"] .tech-badge {
  background: rgba(56, 189, 248, 0.1) !important;
  color: #0ea5e9 !important;
  border: 1px solid rgba(56, 189, 248, 0.3) !important;
}

[data-theme="light"] .tech-badge:hover {
  background: rgba(56, 189, 248, 0.2) !important;
  border-color: rgba(56, 189, 248, 0.5) !important;
}

[data-theme="light"] .submit-btn {
  background: linear-gradient(135deg, #38bdf8, #0ea5e9) !important;
  color: #ffffff !important;
}

[data-theme="light"] .submit-btn:hover:not(:disabled) {
  box-shadow: 0 8px 24px rgba(56, 189, 248, 0.4) !important;
}

[data-theme="light"] .skill-bar { background: rgba(56, 189, 248, 0.15) !important; }

[data-theme="light"] .tool-item {
  background: #f8fafc !important;
  border: 1px solid #e2e8f0 !important;
}

[data-theme="light"] .tool-item:hover {
  background: #f1f5f9 !important;
  border-color: #38bdf8 !important;
}

[data-theme="light"] .project-card { background: rgba(255, 255, 255, 0.7) !important; }
[data-theme="light"] .project-overlay { background: rgba(30, 41, 59, 0.8) !important; }

[data-theme="light"] .timeline-dot {
  background: #38bdf8 !important;
  border-color: #f8fafc !important;
}

[data-theme="light"] footer {
  background-color: rgba(248, 250, 252, 0.5) !important;
  color: #1e293b !important;
  border-top: 1px solid #e2e8f0 !important;
}

[data-theme="light"] {
  --text-color: #1e293b;
  --text-heading: #0f172a;
  --text-muted: #64748b;
}

[data-theme="light"] p,
[data-theme="light"] span,
[data-theme="light"] a,
[data-theme="light"] li,
[data-theme="light"] div { color: #1e293b !important; }

[data-theme="light"] h1,
[data-theme="light"] h2,
[data-theme="light"] h3,
[data-theme="light"] h4,
[data-theme="light"] h5,
[data-theme="light"] h6,
[data-theme="light"] strong { color: #0f172a !important; }

[data-theme="light"] .text-muted { color: #64748b !important; }

[data-theme="light"] .card {
  background-color: rgba(255, 255, 255, 0.48) !important;
  color: #1e293b !important;
  border-color: #e2e8f0 !important;
}

[data-theme="light"] input,
[data-theme="light"] textarea,
[data-theme="light"] select {
  background-color: #f1f5f9 !important;
  color: #1e293b !important;
  border-color: #e2e8f0 !important;
}

[data-theme="light"] input::placeholder,
[data-theme="light"] textarea::placeholder { color: #94a3b8 !important; }

[data-theme="light"] .btn-primary {
  background-color: #38bdf8 !important;
  border-color: #38bdf8 !important;
  color: #ffffff !important;
}

[data-theme="light"] .btn-primary:hover {
  background-color: #0ea5e9 !important;
  border-color: #0ea5e9 !important;
}

[data-theme="light"] a { color: #38bdf8 !important; }
[data-theme="light"] a:hover { color: #0ea5e9 !important; }

.devgram-page,
.about-page,
.projects-page,
.skills-page,
.contact-page {
  background: transparent !important;
}

.about-page .glass-panel,
.projects-page .glass-panel,
.skills-page .glass-panel,
.contact-page .glass-panel {
  background: rgba(15, 23, 42, 0.28) !important;
  border-color: rgba(148, 163, 184, 0.18) !important;
  box-shadow: 0 16px 44px rgba(2, 6, 23, 0.24) !important;
}

.about-page .glass-panel:hover,
.projects-page .glass-panel:hover,
.skills-page .glass-panel:hover,
.contact-page .glass-panel:hover {
  background: rgba(15, 23, 42, 0.36) !important;
}

.devgram-page .phone-frame,
.devgram-page .phone-screen,
.devgram-page .app-surface,
.devgram-page .glass-panel,
.devgram-page .messages-panel,
.devgram-page .composer {
  background-color: rgba(15, 23, 42, 0.3) !important;
}

.devgram-page .phone-frame,
.devgram-page .phone-screen,
.devgram-page .app-surface {
  background-image: none !important;
}

[data-theme="light"] .devgram-page,
[data-theme="light"] .about-page,
[data-theme="light"] .projects-page,
[data-theme="light"] .skills-page,
[data-theme="light"] .contact-page {
  background: transparent !important;
}

[data-theme="light"] .about-page .glass-panel,
[data-theme="light"] .projects-page .glass-panel,
[data-theme="light"] .skills-page .glass-panel,
[data-theme="light"] .contact-page .glass-panel {
  background: rgba(255, 255, 255, 0.42) !important;
}
</style>
