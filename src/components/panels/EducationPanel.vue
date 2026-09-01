<template>
  <div>
    <section class="panel-section" aria-labelledby="education-title">
      <p class="eyebrow edu-intro__eyebrow">{{ educationIntro.eyebrow }}</p>
      <h2 id="education-title" class="edu-intro__title">
        {{ educationIntro.title }}
      </h2>
      <p class="edu-intro__supporting">{{ educationIntro.supporting }}</p>
    </section>

    <section class="panel-section" aria-label="Education timeline">
      <ol class="edu-timeline">
        <li
          v-for="(record, index) in educationRecords"
          :key="record.id"
          class="edu-item"
          :class="{ 'edu-item--current': isCurrent(record) }"
          :style="{ '--stagger-delay': index * 90 + 'ms' }"
        >
          <!-- Timeline node with the record's icon -->
          <span class="edu-item__node" aria-hidden="true">
            <component :is="iconFor(record)" :size="17" />
          </span>

          <article class="edu-card">
            <header class="edu-card__header">
              <span
                class="edu-card__badge"
                :class="
                  isCurrent(record)
                    ? 'edu-card__badge--current'
                    : 'edu-card__badge--done'
                "
              >
                <span
                  v-if="isCurrent(record)"
                  class="edu-card__badge-dot"
                  aria-hidden="true"
                ></span>
                {{ isCurrent(record) ? "Currently studying" : "Completed" }}
              </span>

              <h3 class="edu-card__school">{{ record.school }}</h3>
              <p class="edu-card__program">{{ record.program }}</p>

              <p class="edu-card__period">
                <CalendarDays :size="14" aria-hidden="true" />
                <span>{{ record.period }}</span>
              </p>
            </header>

            <p class="edu-card__description">{{ record.description }}</p>
          </article>
        </li>
      </ol>
    </section>

    <PanelFooter />
  </div>
</template>

<script setup>
import { CalendarDays, GraduationCap, School } from "lucide-vue-next";
import { educationIntro, educationRecords } from "../../data/education.js";
import PanelFooter from "../PanelFooter.vue";

const icons = {
  "graduation-cap": GraduationCap,
  school: School,
};

function iconFor(record) {
  return icons[record.icon] ?? School;
}

function isCurrent(record) {
  return record.status === "current";
}
</script>


<style scoped>
/* Intro */
.edu-intro__eyebrow {
  color: var(--accent);
  margin-bottom: 0.4rem;
}

.edu-intro__title {
  font-size: 1.35rem;
  font-weight: 700;
}

.edu-intro__supporting {
  margin-top: 0.6rem;
  color: var(--text-muted);
  font-size: 0.95rem;
  max-width: 58ch;
}

/* Vertical timeline rail */
.edu-timeline {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  padding-left: 2.4rem;
}

.edu-timeline::before {
  content: "";
  position: absolute;
  left: 17px;
  top: 10px;
  bottom: 10px;
  width: 2px;
  background: var(--border);
}

.edu-item {
  position: relative;
  animation: fade-up 0.5s var(--ease-out) both;
  animation-delay: var(--stagger-delay, 0ms);
}

/* Timeline node holding the record icon */
.edu-item__node {
  position: absolute;
  left: -2.4rem;
  top: 14px;
  display: grid;
  place-items: center;
  width: 36px;
  height: 36px;
  color: var(--accent);
  background: var(--surface);
  border: 1px solid var(--accent-border);
  border-radius: 50%;
  box-shadow: 0 0 0 4px color-mix(in srgb, var(--accent) 12%, transparent);
}

.edu-item--current .edu-item__node {
  background: var(--accent-soft);
  box-shadow: 0 0 0 4px color-mix(in srgb, var(--accent) 18%, transparent);
}

/* Card */
.edu-card {
  padding: 1.25rem 1.4rem;
  background: var(--surface);
  border: 1px solid var(--border-soft);
  border-radius: var(--radius-lg);
  transition: border-color var(--speed-fast) ease,
    transform var(--speed-fast) ease, box-shadow var(--speed-fast) ease;
}

.edu-card:hover {
  border-color: var(--border);
  transform: translateY(-3px);
  box-shadow: var(--shadow-card);
}

/* Current program: subtle blue accent border */
.edu-item--current .edu-card {
  border-color: var(--accent-border);
  background:
    linear-gradient(180deg, var(--accent-soft), transparent 32%),
    var(--surface);
}

.edu-item--current .edu-card:hover {
  border-color: var(--accent);
}

/* Status badge */
.edu-card__badge {
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  padding: 0.22rem 0.6rem;
  margin-bottom: 0.7rem;
  font-family: var(--font-mono);
  font-size: 0.66rem;
  font-weight: 500;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  border-radius: var(--radius-pill);
}

.edu-card__badge--current {
  color: var(--accent);
  background: var(--accent-soft);
  border: 1px solid var(--accent-border);
}

.edu-card__badge--done {
  color: var(--text-muted);
  background: var(--surface-muted);
  border: 1px solid var(--border-soft);
}

.edu-card__badge-dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: var(--accent);
  animation: pulse-dot 2.4s ease-out infinite;
}

.edu-card__school {
  font-size: 1.02rem;
  font-weight: 700;
}

.edu-card__program {
  margin-top: 0.2rem;
  color: var(--text-muted);
  font-size: 0.92rem;
  font-weight: 500;
}

.edu-card__period {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  margin-top: 0.5rem;
  font-family: var(--font-mono);
  font-size: 0.74rem;
  color: var(--text-faint);
}

.edu-card__period svg {
  color: var(--accent);
  flex-shrink: 0;
}

.edu-card__description {
  margin-top: 0.85rem;
  color: var(--text-muted);
  font-size: 0.92rem;
  line-height: 1.6;
}

/* Mobile: stacked cards without the rail */
@media (max-width: 640px) {
  .edu-timeline {
    padding-left: 0;
  }

  .edu-timeline::before {
    display: none;
  }

  .edu-item__node {
    position: static;
    margin-bottom: 0.7rem;
    width: 34px;
    height: 34px;
  }
}

/* Reduced motion: show final states immediately, no looping pulse */
@media (prefers-reduced-motion: reduce) {
  .edu-item {
    animation: none;
  }

  .edu-card:hover {
    transform: none;
  }

  .edu-card__badge-dot {
    animation: none;
  }
}
</style>

