<template>
  <div>
    <section class="panel-section" aria-labelledby="exp-title">
      <div class="exp-header">
        <h2 id="exp-title" class="panel-section__title">Experience</h2>
        <a
          class="btn btn--ghost exp-resume"
          :href="profile.resumePath"
          :download="profile.resumeFileName"
          aria-label="Download Gad NiYoGiSuBiZo's résumé as a PDF"
        >
          <Download :size="17" aria-hidden="true" />
          Download résumé
        </a>
      </div>

      <ol class="timeline">
        <li v-for="item in experience" :key="item.id" class="timeline__item">
          <span class="timeline__dot" :class="{ 'timeline__dot--current': item.current }" aria-hidden="true"></span>
          <article class="timeline__card">
            <header>
              <h3 class="timeline__role">{{ item.title }}</h3>
              <p class="timeline__org">{{ item.organization }}</p>
              <p class="timeline__meta">
                <span>{{ item.format }}</span>
                <span v-if="item.location"> · {{ item.location }}</span>
                <span class="timeline__period"> · {{ item.period }}</span>
              </p>
            </header>
            <p class="timeline__summary">{{ item.summary }}</p>
            <h4 class="timeline__highlights-title">Key areas</h4>
            <ul class="timeline__highlights">
              <li v-for="highlight in item.highlights" :key="highlight">
                {{ highlight }}
              </li>
            </ul>
          </article>
        </li>
      </ol>
    </section>

    <section class="panel-section" aria-labelledby="exp-cert-link">
      <h2 id="exp-cert-link" class="panel-section__title">Related certification</h2>
      <p class="exp-cert-note">
        Completed the
        <strong>AI Engineering and Workflow Automation with n8n</strong>
        certificate of completion — see the
        <button type="button" class="exp-link" @click="emit('open-panel', 'certifications')">
          Certifications panel
        </button>
        for details.
      </p>
    </section>

    <PanelFooter />
  </div>
</template>

<script setup>
import { Download } from "lucide-vue-next";
import { experience } from "../../data/experience.js";
import PanelFooter from "../PanelFooter.vue";
import { profile } from "../../data/profile.js";

const emit = defineEmits(["open-panel"]);
</script>

<style scoped>
.exp-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  flex-wrap: wrap;
}

.exp-header .panel-section__title {
  margin-bottom: 0;
}

.exp-resume {
  min-height: 40px;
  padding: 0.45rem 0.95rem;
  font-size: 0.85rem;
  margin-bottom: 1rem;
}

.timeline {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  padding-left: 1.4rem;
}

.timeline::before {
  content: "";
  position: absolute;
  left: 5px;
  top: 8px;
  bottom: 8px;
  width: 2px;
  background: var(--border);
}

.timeline__item {
  position: relative;
}

.timeline__dot {
  position: absolute;
  left: -1.4rem;
  top: 10px;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: var(--accent);
  box-shadow: 0 0 0 3px var(--accent-soft);
}

.timeline__dot--current {
  background: var(--success);
  box-shadow: 0 0 0 3px color-mix(in srgb, var(--success) 18%, transparent);
}

.timeline__card {
  padding: 1.25rem;
  background: var(--surface);
  border: 1px solid var(--border-soft);
  border-radius: var(--radius-lg);
}

.timeline__role {
  font-size: 1.02rem;
}

.timeline__org {
  margin-top: 0.2rem;
  color: var(--accent);
  font-size: 0.9rem;
  font-weight: 500;
}

.timeline__meta {
  margin-top: 0.3rem;
  font-family: var(--font-mono);
  font-size: 0.74rem;
  color: var(--text-faint);
}

.timeline__period {
  color: var(--text-muted);
}

.timeline__summary {
  margin-top: 0.85rem;
  color: var(--text-muted);
  font-size: 0.93rem;
}

.timeline__highlights-title {
  margin-top: 1rem;
  margin-bottom: 0.4rem;
  font-family: var(--font-mono);
  font-size: 0.72rem;
  font-weight: 500;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--text-faint);
}

.timeline__highlights {
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
}

.timeline__highlights li {
  position: relative;
  padding-left: 1rem;
  color: var(--text-muted);
  font-size: 0.9rem;
}

.timeline__highlights li::before {
  content: "";
  position: absolute;
  left: 0;
  top: 0.55em;
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: var(--accent);
}

.exp-cert-note {
  color: var(--text-muted);
  font-size: 0.93rem;
  max-width: 60ch;
}

.exp-link {
  color: var(--accent);
  font-weight: 700;
  text-decoration: underline;
  text-underline-offset: 3px;
}

.exp-link:hover {
  color: var(--accent-hover);
}
</style>
