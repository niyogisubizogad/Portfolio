<template>
  <figure
    ref="cardEl"
    class="quote-card"
    :class="{ 'quote-card--visible': visible }"
  >
    <div class="quote-card__mark" aria-hidden="true">
      <Quote :size="18" />
    </div>

    <blockquote class="quote-card__body">
      <p class="quote-card__text">“{{ quote.text }}”</p>
    </blockquote>

    <figcaption class="quote-card__attribution">
      <span class="quote-card__author">
        — {{ quote.author }}, {{ quote.authorTitle }}
      </span>
      <span class="quote-card__context">{{ quote.context }}</span>
      <a
        class="quote-card__source"
        :href="quote.sourceUrl"
        target="_blank"
        rel="noopener noreferrer"
      >
        Source
        <ArrowUpRight :size="13" aria-hidden="true" />
      </a>
    </figcaption>
  </figure>
</template>

<script setup>
import { onBeforeUnmount, onMounted, ref } from "vue";
import { ArrowUpRight, Quote } from "lucide-vue-next";
import { inspirationalQuote as quote } from "../data/quote.js";

const cardEl = ref(null);
const visible = ref(false);
let observer = null;

onMounted(() => {
  const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  // Reduced motion (or missing observer support): show the final
  // state immediately, no scroll-triggered reveal.
  if (reducedMotion || !("IntersectionObserver" in window)) {
    visible.value = true;
    return;
  }

  observer = new IntersectionObserver(
    (entries) => {
      if (entries.some((entry) => entry.isIntersecting)) {
        visible.value = true;
        observer?.disconnect();
        observer = null;
      }
    },
    { threshold: 0.25 }
  );

  observer.observe(cardEl.value);
});

onBeforeUnmount(() => {
  observer?.disconnect();
  observer = null;
});
</script>

<style scoped>
.quote-card {
  margin: 0;
  display: flex;
  gap: 0.85rem;
  max-width: 560px;
  padding: 0.9rem 1.1rem 0.9rem 1.15rem;
  background: var(--surface-muted);
  border-left: 3px solid var(--border);
  border-radius: 0 var(--radius-md) var(--radius-md) 0;
}

/* Gentle one-time reveal when it enters the viewport */
.quote-card {
  opacity: 0;
  transform: translateY(12px);
  transition: opacity 600ms var(--ease-out), transform 600ms var(--ease-out);
}

.quote-card--visible {
  opacity: 1;
  transform: none;
}

.quote-card__mark {
  color: var(--accent);
  flex-shrink: 0;
  margin-top: 2px;
}

.quote-card__body {
  margin: 0;
  min-width: 0;
}

.quote-card__text {
  font-family: var(--font-body);
  font-size: 0.95rem;
  line-height: 1.65;
  color: var(--text-muted);
}

.quote-card__attribution {
  display: flex;
  flex-direction: column;
  gap: 0.15rem;
  margin-top: 0.6rem;
  font-family: var(--font-mono);
  font-size: 0.72rem;
  line-height: 1.5;
}

.quote-card__author {
  color: var(--text-muted);
}

.quote-card__context {
  color: var(--text-faint);
}

.quote-card__source {
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
  align-self: flex-start;
  min-height: 24px;
  margin-top: 0.35rem;
  color: var(--accent);
  font-weight: 500;
}

.quote-card__source:hover {
  color: var(--accent-hover);
}

@media (prefers-reduced-motion: reduce) {
  .quote-card {
    opacity: 1;
    transform: none;
    transition: none;
  }
}
</style>
