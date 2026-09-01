<template>
  <aside class="app-sidebar" aria-label="Portfolio navigation">
    <!-- Profile picture — the Home action on desktop -->
    <div class="sidebar-profile">
      <button
        type="button"
        class="sidebar-profile__button"
        aria-label="Return to home"
        @click="emit('navigate', 'home')"
      >
        <img
          :src="portrait"
          alt=""
          class="sidebar-profile__image"
          width="52"
          height="52"
        />
      </button>
    </div>

    <!-- Navigation icons — centered as one group in the middle space -->
    <nav class="sidebar-nav" aria-label="Portfolio sections">
      <ul class="sidebar__list">
        <li
          v-for="item in items"
          :key="item.id"
          class="sidebar__item"
          :class="{ 'sidebar__item--home': item.id === 'home' }"
        >
          <button
            type="button"
            class="sidebar__button"
            :class="{ 'sidebar__button--active': isActive(item.id) }"
            :aria-label="item.label"
            :aria-current="isActive(item.id) ? 'true' : undefined"
            @click="emit('navigate', item.id)"
          >
            <component :is="item.icon" class="sidebar__icon" :size="20" aria-hidden="true" />
            <span class="sidebar__label" aria-hidden="true">{{ item.label }}</span>
          </button>
        </li>
      </ul>
    </nav>

    <!-- Theme toggle — fixed at the bottom -->
    <div class="sidebar-footer">
      <button
        type="button"
        class="sidebar__button theme-button"
        :aria-label="theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'"
        :aria-pressed="theme === 'dark' ? 'false' : 'true'"
        @click="emit('toggle-theme')"
      >
        <!-- Smooth fade/rotate swap between Sun and Moon -->
        <Transition name="theme-icon" mode="out-in">
          <Sun
            v-if="theme === 'dark'"
            key="sun"
            class="sidebar__icon"
            :size="20"
            aria-hidden="true"
          />
          <Moon
            v-else
            key="moon"
            class="sidebar__icon"
            :size="20"
            aria-hidden="true"
          />
        </Transition>
        <span class="sidebar__label" aria-hidden="true">
          {{ theme === "dark" ? "Switch to light mode" : "Switch to dark mode" }}
        </span>
      </button>
    </div>
  </aside>
</template>

<script setup>
import {
  Home,
  User,
  BriefcaseBusiness,
  GraduationCap,
  FolderGit2,
  Award,
  Mail,
  Moon,
  Sun,
} from "lucide-vue-next";
import portrait from "../assets/images/gad-portrait.png";

const props = defineProps({
  activePanel: { type: String, default: null },
  theme: { type: String, default: "dark" },
});

const emit = defineEmits(["navigate", "toggle-theme"]);

const items = [
  { id: "home", label: "Home", icon: Home },
  { id: "about", label: "About", icon: User },
  { id: "experience", label: "Experience", icon: BriefcaseBusiness },
  { id: "education", label: "Education", icon: GraduationCap },
  { id: "projects", label: "Projects", icon: FolderGit2 },
  { id: "certifications", label: "Certifications", icon: Award },
  { id: "contact", label: "Contact", icon: Mail },
];

function isActive(id) {
  return id !== "home" && props.activePanel === id;
}
</script>

<style scoped>
/* ---- Desktop sidebar: profile / centered nav / footer ---- */
.app-sidebar {
  position: fixed;
  inset: 0 auto 0 0;
  z-index: 50;

  display: flex;
  flex-direction: column;
  align-items: center;

  width: var(--sidebar-width);
  min-height: 100dvh;

  background: var(--surface);
  border-right: 1px solid var(--border);
}

.sidebar-profile {
  display: flex;
  flex: 0 0 auto;
  justify-content: center;
  width: 100%;
  padding: 20px 0 16px;
}

.sidebar-profile__button {
  display: block;
  padding: 0;
  border-radius: 50%;
  line-height: 0;
}

.sidebar-profile__image {
  display: block;
  width: 52px;
  height: 52px;
  border-radius: 50%;
  object-fit: cover;
  background: var(--surface-muted);
  border: 1px solid var(--border);
  transition: border-color var(--speed-fast) ease;
}

.sidebar-profile__button:hover .sidebar-profile__image,
.sidebar-profile__button:focus-visible .sidebar-profile__image {
  border-color: var(--accent);
}

/* Navigation group — centered as one unit in the available middle space */
.sidebar-nav {
  display: flex;
  flex: 1 1 auto;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  width: 100%;
  min-height: 0;
  gap: 12px;
}

.sidebar__list {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
}

/* Home is the profile picture on desktop; its icon stays mobile-only */
.sidebar__item--home {
  display: none;
}

.sidebar-footer {
  display: flex;
  flex: 0 0 auto;
  justify-content: center;
  width: 100%;
  padding: 16px 0 20px;
}

.theme-button {
  color: var(--text-muted);
}

.theme-button svg {
  display: block;
  width: 20px;
  height: 20px;
  stroke: currentColor;
}

.sidebar__button {
  position: relative;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  min-width: 44px;
  height: 44px;
  min-height: 44px;
  color: var(--text-muted);
  background: transparent;
  border: 1px solid transparent;
  border-radius: var(--radius-md);
  opacity: 1;
  visibility: visible;
  transition: color var(--speed-fast) ease, background var(--speed-fast) ease,
    border-color var(--speed-fast) ease;
}

.sidebar__button:hover,
.sidebar__button:focus-visible {
  color: var(--accent);
  background: var(--accent-soft);
}

.sidebar__button--active {
  color: var(--accent);
  background: var(--accent-soft);
  box-shadow: inset 0 0 0 1px var(--accent-border);
}

/* Icon visibility safeguards: Lucide SVGs must always render */
.sidebar__icon {
  display: block;
  width: 20px;
  height: 20px;
  flex-shrink: 0;
  stroke: currentColor;
  opacity: 1;
  visibility: visible;
}

/* Tooltip label — appears on hover AND keyboard focus */
.sidebar__label {
  position: absolute;
  left: calc(100% + 10px);
  top: 50%;
  translate: 0 -50%;
  padding: 0.35rem 0.65rem;
  white-space: nowrap;
  font-size: 0.8rem;
  font-weight: 500;
  color: var(--text);
  background: var(--surface-raised);
  border: 1px solid var(--border);
  border-radius: var(--radius-sm);
  box-shadow: var(--shadow-card);
  opacity: 0;
  visibility: hidden;
  transform: translateX(-6px);
  transition: opacity var(--speed-fast) ease, transform var(--speed-fast) ease,
    visibility 0s linear var(--speed-fast);
  pointer-events: none;
  z-index: 60;
}

.sidebar__button:hover .sidebar__label,
.sidebar__button:focus-visible .sidebar__label {
  opacity: 1;
  visibility: visible;
  transform: translateX(0);
  transition-delay: 0ms;
}

/* Icon-only theme toggle: smooth 200ms fade/rotate between Sun and Moon */
.theme-icon-enter-active,
.theme-icon-leave-active {
  transition: opacity 200ms ease, transform 200ms ease;
}

.theme-icon-enter-from {
  opacity: 0;
  transform: rotate(-90deg) scale(0.6);
}

.theme-icon-leave-to {
  opacity: 0;
  transform: rotate(90deg) scale(0.6);
}

/* ---- Mobile: fixed bottom navigation (desktop layout does not apply) ---- */
@media (max-width: 768px) {
  .app-sidebar {
    inset: auto 0 0 0;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    min-height: 0;
    height: var(--bottom-nav-height);
    padding: 0 4px;
    padding-bottom: env(safe-area-inset-bottom);
    border-right: none;
    border-top: 1px solid var(--border-soft);
  }

  /* Bottom nav already contains a Home button */
  .sidebar-profile {
    display: none;
  }

  .sidebar-nav {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    flex: 1 1 auto;
    gap: 0;
  }

  .sidebar__list {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    flex: 1;
    gap: 0;
  }

  .sidebar__item--home {
    display: block;
  }

  .sidebar-footer {
    flex: 0 0 auto;
    width: auto;
    padding: 0;
  }

  /* Full 44×44 touch targets; 8 of them fit a 375px viewport */
  .sidebar__button {
    width: 44px;
    height: 44px;
  }

  .sidebar__label {
    left: 50%;
    top: auto;
    bottom: calc(100% + 10px);
    translate: -50% 0;
    transform: translateY(6px);
  }

  .sidebar__button:hover .sidebar__label,
  .sidebar__button:focus-visible .sidebar__label {
    transform: translateY(0);
  }
}

/* Very narrow screens: keep the 44px height, slightly narrower targets
   (no overflow clipping — tooltips must stay visible) */
@media (max-width: 340px) {
  .sidebar__button {
    width: 38px;
    min-width: 0;
    height: 44px;
    flex-shrink: 0;
  }
}
</style>
