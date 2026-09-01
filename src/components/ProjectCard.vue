<template>
  <article class="project-card" :class="{ 'project-card--featured': project.featured }">
    <header class="project-card__head">
      <div>
        <h3 class="project-card__name">
          {{ project.name }}
          <span v-if="project.featured" class="project-card__flag">Featured</span>
        </h3>
        <p class="project-card__tagline">{{ project.tagline }}</p>
      </div>
      <span class="project-card__monogram" aria-hidden="true">{{ monogram }}</span>
    </header>

    <div class="project-card__body">
      <div class="project-card__block">
        <h4>Problem</h4>
        <p>{{ project.problem }}</p>
      </div>
      <div class="project-card__block">
        <h4>My role</h4>
        <p>{{ project.role }}</p>
      </div>

      <ul class="project-card__stack" aria-label="Technology stack">
        <li v-for="tech in project.stack" :key="tech" class="tag">{{ tech }}</li>
      </ul>

      <div class="project-card__links">
        <a
          v-if="project.github"
          class="btn btn--ghost project-card__link"
          :href="project.github"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Github :size="16" aria-hidden="true" />
          View on GitHub
        </a>
        <a
          v-if="project.demo"
          class="btn btn--primary project-card__link"
          :href="project.demo"
          target="_blank"
          rel="noopener noreferrer"
        >
          <ExternalLink :size="16" aria-hidden="true" />
          Live demo
        </a>
      </div>
    </div>
  </article>
</template>

<script setup>
import { computed } from "vue";
import { ExternalLink, Github } from "lucide-vue-next";

const props = defineProps({
  project: { type: Object, required: true },
});

const monogram = computed(() => props.project.name.charAt(0).toUpperCase());
</script>

<style scoped>
.project-card {
  padding: 1.25rem;
  background: var(--surface);
  border: 1px solid var(--border-soft);
  border-radius: var(--radius-lg);
  transition: border-color var(--speed-fast) ease, transform var(--speed-fast) ease;
}

.project-card:hover {
  border-color: var(--border);
  transform: translateY(-2px);
}

.project-card--featured {
  border-color: var(--accent-border);
  background:
    linear-gradient(180deg, var(--accent-soft), transparent 40%),
    var(--surface);
}

.project-card__head {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 1rem;
}

.project-card__name {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  font-size: 1.1rem;
}

.project-card__flag {
  padding: 0.15rem 0.55rem;
  font-family: var(--font-mono);
  font-size: 0.66rem;
  font-weight: 500;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--accent);
  background: var(--accent-soft);
  border: 1px solid var(--accent-border);
  border-radius: var(--radius-pill);
}

.project-card__tagline {
  margin-top: 0.25rem;
  color: var(--text-muted);
  font-size: 0.88rem;
}

.project-card__monogram {
  display: grid;
  place-items: center;
  width: 44px;
  height: 44px;
  flex-shrink: 0;
  font-family: var(--font-mono);
  font-size: 1.1rem;
  font-weight: 700;
  color: var(--accent);
  background: var(--accent-soft);
  border: 1px solid var(--accent-border);
  border-radius: var(--radius-md);
}

.project-card__body {
  margin-top: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.9rem;
}

.project-card__block h4 {
  font-family: var(--font-mono);
  font-size: 0.7rem;
  font-weight: 500;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--text-faint);
  margin-bottom: 0.25rem;
}

.project-card__block p {
  color: var(--text-muted);
  font-size: 0.92rem;
}

.project-card__stack {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
}

.project-card__links {
  display: flex;
  flex-wrap: wrap;
  gap: 0.7rem;
}

.project-card__link {
  min-height: 38px;
  padding: 0.4rem 0.9rem;
  font-size: 0.85rem;
}
</style>
