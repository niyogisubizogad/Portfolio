<template>
  <main
    id="main-content"
    class="home"
  >
    <div class="home__ambient home__ambient--one" aria-hidden="true"></div>
    <div class="home__ambient home__ambient--two" aria-hidden="true"></div>

        <div class="home__inner animate-fade-up">
      <div class="home__content">
        <p class="eyebrow">Portfolio</p>
        <h1 class="home__title">{{ profile.name }}</h1>
        <p class="home__role">
          {{ profile.role }} · {{ profile.location }}
        </p>
        <p class="home__lede">
          {{ profile.headline }} I design and build AI-powered products, backend
          APIs, and accessible interfaces — and I automate the busywork in
          between.
        </p>

        <ul class="home__focus" aria-label="Core professional focus">
          <li v-for="area in profile.focusAreas" :key="area" class="tag">
            {{ area }}
          </li>
        </ul>

        <div class="home__hint">
          <p class="home__hint-text">
            Use the navigation to explore my background — or start here:
          </p>
          <div class="home__actions">
            <button
              type="button"
              class="btn btn--primary"
              @click="emit('open', 'projects')"
            >
              View projects
            </button>
            <button
              type="button"
              class="btn btn--ghost"
              @click="emit('open', 'contact')"
            >
              Get in touch
            </button>
          </div>
        </div>

        <QuoteCard class="home__quote" />
      </div>

      <!-- Decorative code editor + terminal visual (desktop only) -->
      <CodePanel class="home__code" />
    </div>
  </main>
</template>

<script setup>
import QuoteCard from "./QuoteCard.vue";
import CodePanel from "./CodePanel.vue";
import { profile } from "../data/profile.js";

const emit = defineEmits(["open"]);
</script>

<style scoped>
.home {
  position: relative;
  min-height: 100dvh;
  display: grid;
  align-items: center;
  padding: 2rem clamp(1.5rem, 6vw, 5rem);
  padding-left: calc(var(--sidebar-width) + clamp(1.5rem, 6vw, 5rem));
  padding-bottom: calc(var(--bottom-nav-height) + 2rem);
  overflow: hidden;
  background:
    radial-gradient(
      55% 70% at 85% 15%,
      color-mix(in srgb, var(--accent) 10%, transparent),
      transparent 60%
    ),
    var(--bg);
}

.home__ambient {
  position: absolute;
  border-radius: 50%;
  filter: blur(90px);
  opacity: 0.45;
  pointer-events: none;
}

.home__ambient--one {
  width: 420px;
  height: 420px;
  right: -140px;
  top: -140px;
  background: color-mix(in srgb, var(--accent) 14%, transparent);
}

.home__ambient--two {
  width: 340px;
  height: 340px;
  left: 10%;
  bottom: -160px;
  background: color-mix(in srgb, var(--accent-hover) 10%, transparent);
}

.home__inner {
  position: relative;
  width: 100%;
  display: grid;
  grid-template-columns: 1fr;
  align-items: start;
  gap: 2rem;
  max-width: 720px;
}

.home__content {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1.1rem;
}

/* Code panel: two-column desktop layout, ~42% width */
@media (min-width: 900px) {
  .home__inner {
    max-width: 1280px;
    grid-template-columns: minmax(0, 1fr) minmax(0, 420px);
    gap: clamp(2rem, 6vw, 4rem);
    align-items: start;
  }
}

/* Hide code panel on tablet/mobile (< 900px) */
@media (max-width: 899px) {
  .home__code {
    display: none;
  }
}

.home__title {
  font-size: clamp(2.2rem, 5vw, 3.6rem);
  font-weight: 900;
}

.home__role {
  font-family: var(--font-mono);
  font-size: 0.85rem;
  color: var(--accent);
}

.home__lede {
  color: var(--text-muted);
  font-size: 1.08rem;
  max-width: 56ch;
}

.home__focus {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 0.25rem;
}

.home__hint {
  margin-top: 1.25rem;
  display: flex;
  flex-direction: column;
  gap: 0.9rem;
}

.home__hint-text {
  color: var(--text-faint);
  font-size: 0.92rem;
}

.home__actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.9rem;
}

.home__quote {
  margin-top: 0.75rem;
}

@media (max-width: 768px) {
  .home {
    padding-left: clamp(1.25rem, 5vw, 2.5rem);
  }
}
</style>
