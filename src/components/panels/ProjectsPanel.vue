<template>
  <div>
    <section class="panel-section" aria-labelledby="projects-title">
      <h2 id="projects-title" class="panel-section__title">Selected projects</h2>
      <p class="projects-note">
        A selection of products and experiments — from AI-powered platforms to
        collaborative bootcamp work.
      </p>

      <div class="projects-list">
        <ProjectCard v-for="project in projects" :key="project.id" :project="project" />
      </div>
    </section>

    <PanelFooter />
  </div>
</template>

<script setup>
import ProjectCard from "../ProjectCard.vue";
import { projects } from "../../data/projects.js";
import PanelFooter from "../PanelFooter.vue";
</script>

<style scoped>
.projects-note {
  color: var(--text-faint);
  font-size: 0.88rem;
  margin-bottom: 1.25rem;
}

.projects-list {
  display: flex;
  flex-direction: column;
  gap: 1.1rem;
}
</style>
