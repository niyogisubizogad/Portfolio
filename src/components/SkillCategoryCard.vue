<template>
  <article class="skill-card">
    <h3 class="skill-card__title">{{ category.name }}</h3>

    <ul class="skill-card__list">
      <li v-for="skill in category.skills" :key="skill.name" class="skill-row">
        <div class="skill-row__meta">
          <span class="skill-row__name">{{ skill.name }}</span>
          <span
            class="skill-row__percent"
            :aria-label="skill.name + ': ' + skill.level + ' percent, self-assessed'"
          >{{ animated ? skill.level : 0 }}%</span>
        </div>
        <div
          class="skill-row__bar"
          role="progressbar"
          :aria-valuenow="skill.level"
          aria-valuemin="0"
          aria-valuemax="100"
          :aria-label="skill.name + ' — self-assessed understanding ' + skill.level + ' percent'"
        >
          <div
            class="skill-row__fill"
            :style="{ width: (animated ? skill.level : 0) + '%' }"
          ></div>
        </div>
      </li>
    </ul>
  </article>
</template>

<script setup>
import { onMounted, ref } from "vue";

const props = defineProps({
  category: { type: Object, required: true },
});

// One-time animation: bars fill when the card mounts (i.e. when the
// About panel opens). With reduced motion, fill instantly.
const animated = ref(false);

onMounted(() => {
  const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  if (reducedMotion) {
    animated.value = true;
    return;
  }

  window.requestAnimationFrame(() => {
    window.setTimeout(() => {
      animated.value = true;
    }, 60);
  });
});
</script>

<style scoped>
.skill-card {
  padding: 1.25rem;
  background: var(--surface);
  border: 1px solid var(--border-soft);
  border-radius: var(--radius-lg);
  transition: border-color var(--speed-fast) ease;
}

.skill-card:hover {
  border-color: var(--border);
}

.skill-card__title {
  font-size: 0.95rem;
  margin-bottom: 1rem;
}

.skill-card__list {
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
}

.skill-row__meta {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 0.75rem;
  margin-bottom: 0.35rem;
}

.skill-row__name {
  font-size: 0.88rem;
  font-weight: 500;
  color: var(--text);
}

.skill-row__percent {
  font-family: var(--font-mono);
  font-size: 0.75rem;
  color: var(--accent);
}

.skill-row__bar {
  height: 6px;
  border-radius: var(--radius-pill);
  background: var(--surface-muted);
  overflow: hidden;
}

.skill-row__fill {
  height: 100%;
  border-radius: inherit;
  background: var(--accent);
  transition: width 900ms var(--ease-out);
}

@media (prefers-reduced-motion: reduce) {
  .skill-row__fill {
    transition: none;
  }
}
</style>
