<template>
  <div>
    <section class="panel-section" aria-labelledby="about-bio-title">
      <h2 id="about-bio-title" class="panel-section__title">About me</h2>
      <div class="about-bio">
        <p v-for="(paragraph, index) in profile.bio" :key="index">
          {{ paragraph }}
        </p>
      </div>

      <h3 class="about-focus-title">Core professional focus</h3>
      <ul class="about-focus">
        <li v-for="area in profile.focusAreas" :key="area" class="tag tag--accent">
          {{ area }}
        </li>
      </ul>
    </section>

    <section class="panel-section" aria-labelledby="about-skills-title">
      <h2 id="about-skills-title" class="panel-section__title">Technical skills</h2>
      <p class="about-skills-note">
        Percentages describe my self-assessed practical confidence from project
        work and learning — not formal certifications or test scores.
      </p>
      <SkillsGrid />
    </section>

    <PanelFooter />
  </div>
</template>

<script setup>
import SkillsGrid from "../SkillsGrid.vue";
import PanelFooter from "../PanelFooter.vue";
import { profile } from "../../data/profile.js";
</script>

<style scoped>
.about-bio {
  display: flex;
  flex-direction: column;
  gap: 0.9rem;
  color: var(--text-muted);
  max-width: 62ch;
}

.about-focus-title {
  margin-top: 1.5rem;
  margin-bottom: 0.75rem;
  font-size: 0.95rem;
}

.about-focus {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.about-skills-note {
  color: var(--text-faint);
  font-size: 0.88rem;
  margin-bottom: 1.25rem;
  max-width: 60ch;
}
</style>
