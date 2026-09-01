<template>
  <div>
    <section class="panel-section" aria-labelledby="certs-title">
      <h2 id="certs-title" class="panel-section__title">Certifications</h2>

      <article v-for="cert in certifications" :key="cert.id" class="cert-card">
        <header class="cert-card__head">
          <Award :size="26" class="cert-card__icon" aria-hidden="true" />
          <div>
            <h3 class="cert-card__title">{{ cert.title }}</h3>
            <p class="cert-card__type">{{ cert.type }}</p>
          </div>
        </header>

        <dl class="cert-card__meta">
          <div class="cert-card__meta-row">
            <dt>Format</dt>
            <dd>{{ cert.format }}</dd>
          </div>
          <div class="cert-card__meta-row">
            <dt>Status</dt>
            <dd>
              <span class="cert-card__status">
                <span class="cert-card__status-dot" aria-hidden="true"></span>
                {{ cert.status }}
              </span>
            </dd>
          </div>
          <div v-if="cert.issuer" class="cert-card__meta-row">
            <dt>Issuer</dt>
            <dd>{{ cert.issuer }}</dd>
          </div>
          <div v-if="cert.completedDate" class="cert-card__meta-row">
            <dt>Completed</dt>
            <dd>{{ cert.completedDate }}</dd>
          </div>
          <div v-if="cert.credentialId" class="cert-card__meta-row">
            <dt>Credential ID</dt>
            <dd class="cert-card__mono">{{ cert.credentialId }}</dd>
          </div>
        </dl>

        <h4 class="cert-card__topics-title">Topics covered</h4>
        <ul class="cert-card__topics">
          <li v-for="topic in cert.topicsCovered" :key="topic" class="tag">
            {{ topic }}
          </li>
        </ul>

        <a
          v-if="cert.verificationUrl"
          class="btn btn--ghost cert-card__verify"
          :href="cert.verificationUrl"
          target="_blank"
          rel="noopener noreferrer"
        >
          <ExternalLink :size="16" aria-hidden="true" />
          Verify credential
        </a>
      </article>
    </section>

    <PanelFooter />
  </div>
</template>

<script setup>
import { Award, ExternalLink } from "lucide-vue-next";
import { certifications } from "../../data/certifications.js";
import PanelFooter from "../PanelFooter.vue";
</script>

<style scoped>
.cert-card {
  padding: 1.4rem;
  background: var(--surface);
  border: 1px solid var(--border-soft);
  border-radius: var(--radius-lg);
}

.cert-card__head {
  display: flex;
  align-items: flex-start;
  gap: 0.9rem;
}

.cert-card__icon {
  color: var(--accent);
  flex-shrink: 0;
  margin-top: 2px;
}

.cert-card__title {
  font-size: 1.05rem;
}

.cert-card__type {
  margin-top: 0.2rem;
  color: var(--text-muted);
  font-size: 0.88rem;
}

.cert-card__meta {
  margin: 1.1rem 0 0;
  display: flex;
  flex-direction: column;
  gap: 0.45rem;
}

.cert-card__meta-row {
  display: flex;
  gap: 0.75rem;
  font-size: 0.9rem;
}

.cert-card__meta-row dt {
  width: 110px;
  flex-shrink: 0;
  font-family: var(--font-mono);
  font-size: 0.74rem;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  color: var(--text-faint);
  padding-top: 2px;
}

.cert-card__meta-row dd {
  margin: 0;
  color: var(--text-muted);
}

.cert-card__mono {
  font-family: var(--font-mono);
  font-size: 0.82rem;
}

.cert-card__status {
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  color: var(--success);
  font-weight: 500;
}

.cert-card__status-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--success);
}

.cert-card__topics-title {
  margin-top: 1.2rem;
  margin-bottom: 0.5rem;
  font-family: var(--font-mono);
  font-size: 0.72rem;
  font-weight: 500;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--text-faint);
}

.cert-card__topics {
  display: flex;
  flex-wrap: wrap;
  gap: 0.45rem;
}

.cert-card__verify {
  margin-top: 1.2rem;
}
</style>
