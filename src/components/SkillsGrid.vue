<template>
  <div class="skills-grid">
    <SkillCategoryCard
      v-for="(category, index) in skillCategories"
      :key="category.id"
      :category="category"
      :style="{ '--stagger-delay': index * 70 + 'ms' }"
      class="skills-grid__item"
    />
  </div>
</template>

<script setup>
import SkillCategoryCard from "./SkillCategoryCard.vue";
import { skillCategories } from "../data/skills.js";
</script>

<style scoped>
.skills-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1rem;
}

/* Staggered card reveal */
.skills-grid__item {
  animation: fade-up 0.5s var(--ease-out) both;
  animation-delay: var(--stagger-delay, 0ms);
}

@media (prefers-reduced-motion: reduce) {
  .skills-grid__item {
    animation: none;
  }
}
</style>
