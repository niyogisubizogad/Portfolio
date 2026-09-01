<template>
  <div class="app">
    <a class="skip-link" href="#main-content">Skip to main content</a>

    <!-- One-time full-screen welcome experience -->
    <WelcomeScreen v-if="!entered" @enter="enterPortfolio" />

    <!-- Portfolio shell: home stage + sidebar + slide-over panels -->
    <template v-else>
      <PortfolioHome @open="openPanel" />

      <AppSidebar
        :active-panel="activePanel"
        :theme="theme"
        @navigate="navigate"
        @toggle-theme="toggleTheme"
      />

      <!-- Backdrop behind the open panel -->
      <Transition name="backdrop">
        <div
          v-if="activePanel"
          class="app__backdrop"
          aria-hidden="true"
          @click="closePanel"
        ></div>
      </Transition>

      <!-- Full-height slide-over panel -->
      <Transition name="panel">
        <SectionPanel
          v-if="activePanel"
          :key="activePanel"
          :title="panelMeta[activePanel].title"
          @close="closePanel"
        >
          <AboutPanel v-if="activePanel === 'about'" />
          <ExperiencePanel
            v-else-if="activePanel === 'experience'"
            @open-panel="openPanel"
          />
          <EducationPanel v-else-if="activePanel === 'education'" />
          <ProjectsPanel v-else-if="activePanel === 'projects'" />
          <CertificationsPanel v-else-if="activePanel === 'certifications'" />
          <ContactPanel v-else-if="activePanel === 'contact'" />
        </SectionPanel>
      </Transition>
    </template>
  </div>
</template>

<script setup>
import { ref } from "vue";
import WelcomeScreen from "./components/WelcomeScreen.vue";
import PortfolioHome from "./components/PortfolioHome.vue";
import AppSidebar from "./components/AppSidebar.vue";
import SectionPanel from "./components/SectionPanel.vue";
import AboutPanel from "./components/panels/AboutPanel.vue";
import ExperiencePanel from "./components/panels/ExperiencePanel.vue";
import EducationPanel from "./components/panels/EducationPanel.vue";
import ProjectsPanel from "./components/panels/ProjectsPanel.vue";
import CertificationsPanel from "./components/panels/CertificationsPanel.vue";
import ContactPanel from "./components/panels/ContactPanel.vue";

const THEMES = ["dark", "light"];

const entered = ref(false);
const activePanel = ref(null);
const theme = ref(getInitialTheme());

const panelMeta = {
  about: { title: "About" },
  experience: { title: "Experience" },
  education: { title: "Education" },
  projects: { title: "Projects" },
  certifications: { title: "Certifications" },
  contact: { title: "Contact" },
};

function getInitialTheme() {
  const attr = document.documentElement.getAttribute("data-theme");
  return THEMES.includes(attr) ? attr : "dark";
}

function enterPortfolio(targetPanel = null) {
  entered.value = true;
  if (targetPanel && panelMeta[targetPanel]) {
    activePanel.value = targetPanel;
  }
}

function openPanel(panelId) {
  if (panelMeta[panelId]) {
    activePanel.value = panelId;
  }
}

function navigate(panelId) {
  if (panelId === "home") {
    closePanel();
  } else {
    openPanel(panelId);
  }
}

function closePanel() {
  activePanel.value = null;
}

function toggleTheme() {
  const next = theme.value === "dark" ? "light" : "dark";
  theme.value = next;
  document.documentElement.setAttribute("data-theme", next);
  try {
    localStorage.setItem("theme", next);
  } catch (e) {
    /* storage unavailable — theme still applies for this session */
  }
}
</script>

<style scoped>
.app {
  min-height: 100dvh;
}

.app__backdrop {
  position: fixed;
  inset: 0;
  z-index: 40;
  background: var(--backdrop);
  backdrop-filter: blur(2px);
}
</style>
