<template>
  <section
    class="welcome"
    aria-labelledby="welcome-heading"
  >
    <div class="welcome__ambient welcome__ambient--left" aria-hidden="true"></div>
    <div class="welcome__ambient welcome__ambient--right" aria-hidden="true"></div>

    <div class="welcome__inner">
      <!-- Portrait side -->
      <figure class="welcome__portrait">
        <img
          :src="portrait"
          alt="Professional portrait of Gad NiYoGiSuBiZo"
          width="929"
          height="1396"
          fetchpriority="high"
        />
      </figure>

      <!-- Copy side -->
      <div class="welcome__copy animate-fade-up">
        <p class="eyebrow">Gad NiY0GiSUBiZ0 · Software Developer</p>

        <TypingHeadline
          id="welcome-heading"
          class="welcome__headline"
          :lines="profile.introLines"
        />

        <p class="welcome__sub">
          Based in {{ profile.location }} — building AI-powered products,
          backend APIs, and accessible interfaces.
        </p>

        <ul class="welcome__status">
          <li class="welcome__status-item">
            <MapPin class="welcome__status-icon" :size="16" aria-hidden="true" />
            <span>{{ profile.location }}</span>
          </li>
          <li class="welcome__status-item">
            <span class="welcome__status-dot" aria-hidden="true"></span>
            <span>{{ profile.availability }}</span>
          </li>
        </ul>

        <div class="welcome__actions">
          <button type="button" class="btn btn--primary" @click="enter()">
            <ArrowRight :size="18" aria-hidden="true" />
            Explore my work
          </button>
          <button
            type="button"
            class="btn btn--ghost"
            @click="enter('contact')"
          >
            <Mail :size="18" aria-hidden="true" />
            Get in touch
          </button>
        </div>
      </div>

    </div>
  </section>
</template>

<script setup>
import { ArrowRight, Mail, MapPin } from "lucide-vue-next";
import TypingHeadline from "./TypingHeadline.vue";
import { profile } from "../data/profile.js";
import portrait from "../assets/images/gad-portrait.png";

const emit = defineEmits(["enter"]);

function enter(targetPanel = null) {
  emit("enter", targetPanel);
}
</script>

<style scoped>
.welcome {
  position: relative;
  min-height: 100dvh;
  display: grid;
  place-items: center;
  padding: clamp(1.5rem, 4vw, 4rem);
  overflow: hidden;
  background:
    radial-gradient(
      60% 80% at 80% 10%,
      color-mix(in srgb, var(--accent) 12%, transparent),
      transparent 60%
    ),
    radial-gradient(
      50% 70% at 10% 90%,
      color-mix(in srgb, var(--accent) 8%, transparent),
      transparent 60%
    ),
    var(--bg);
}

.welcome__ambient {
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
  opacity: 0.5;
  pointer-events: none;
}

.welcome__ambient--left {
  width: 380px;
  height: 380px;
  left: -120px;
  bottom: -120px;
  background: color-mix(in srgb, var(--accent) 16%, transparent);
}

.welcome__ambient--right {
  width: 300px;
  height: 300px;
  right: -100px;
  top: -100px;
  background: color-mix(in srgb, var(--accent-hover) 14%, transparent);
}

.welcome__inner {
  position: relative;
  display: grid;
  grid-template-columns: minmax(280px, 420px) minmax(0, 1fr);
  align-items: center;
  gap: clamp(2rem, 6vw, 5rem);
  max-width: 1080px;
  width: 100%;
}

.welcome__portrait {
  margin: 0;
  justify-self: center;
  position: relative;
  border-radius: var(--radius-lg);
  overflow: hidden;
  border: 1px solid var(--border);
  box-shadow: var(--shadow-card);
  max-height: 72dvh;
}

.welcome__portrait img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: top center;
}

.welcome__copy {
  min-width: 0;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1.25rem;
}

.welcome__headline {
  font-size: clamp(2rem, 4.5vw, 3.4rem);
  font-weight: 900;
  line-height: 1.12;
}

.welcome__sub {
  color: var(--text-muted);
  font-size: 1.05rem;
  max-width: 46ch;
}

.welcome__status {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem 1.5rem;
}

.welcome__status-item {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-family: var(--font-mono);
  font-size: 0.78rem;
  color: var(--text-muted);
}

.welcome__status-icon {
  color: var(--accent);
}

.welcome__status-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--success);
  animation: pulse-dot 2.4s ease-out infinite;
}

.welcome__actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.9rem;
  margin-top: 0.5rem;
}

@media (max-width: 820px) {
  .welcome__inner {
    grid-template-columns: 1fr;
    text-align: left;
    gap: 2rem;
  }

  .welcome__portrait {
    width: min(320px, 78vw);
    max-height: none;
    aspect-ratio: 4 / 5;
  }

  .welcome__copy {
    align-items: flex-start;
  }
}

@media (prefers-reduced-motion: reduce) {
  .welcome__status-dot {
    animation: none;
  }
}
</style>
