<template>
  <!-- Decorative code editor visual — hidden from assistive tech -->
  <div class="code-panel" aria-hidden="true">
    <div class="code-panel__bar">
      <span class="code-panel__dot"></span>
      <span class="code-panel__dot"></span>
      <span class="code-panel__dot"></span>
      <span class="code-panel__title">profile.js</span>
    </div>

    <div class="code-panel__body">
      <div
        v-for="line in visibleLines"
        :key="line.index"
        class="code-panel__line"
      >
        <span class="code-panel__num">{{ line.index + 1 }}</span>
        <span class="code-panel__code">
          <span
            v-for="(segment, i) in line.segments"
            :key="i"
            :class="'tok-' + segment.k"
          >{{ segment.v }}</span>
        </span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onBeforeUnmount, onMounted, ref } from "vue";

// Short, honest snippets about the developer — no fake logs or metrics.
const LINES = [
  [
    { k: "fn", v: "console.log" },
    { k: "pun", v: "(" },
    { k: "str", v: '"Hello, world!"' },
    { k: "pun", v: ");" },
  ],
  [
    { k: "kw", v: "const " },
    { k: "var", v: "developer" },
    { k: "pun", v: " = " },
    { k: "str", v: '"Gad NiYoGiSuBiZo"' },
    { k: "pun", v: ";" },
  ],
  [
    { k: "kw", v: "const " },
    { k: "var", v: "focus" },
    { k: "pun", v: " = [" },
    { k: "str", v: '"AI"' },
    { k: "pun", v: ", " },
    { k: "str", v: '"Frontend"' },
    { k: "pun", v: ", " },
    { k: "str", v: '"Backend APIs"' },
    { k: "pun", v: "];" },
  ],
  [
    { k: "kw", v: "const " },
    { k: "var", v: "build" },
    { k: "pun", v: " = " },
    { k: "fn", v: "()" },
    { k: "pun", v: " => " },
    { k: "str", v: '"Useful web applications"' },
    { k: "pun", v: ";" },
  ],
  [{ k: "cm", v: "// Kigali, Rwanda" }],
];

const LINE_INTERVAL = 1800; // one line every 1.8s (within 1.5–3s)
const HOLD_BEFORE_CHANGE = 3000;

const visibleCount = ref(0);
let timer = null;

const visibleLines = computed(() =>
  LINES.slice(0, visibleCount.value).map((segments, index) => ({
    index,
    segments,
  }))
);

function scheduleNext() {
  const complete = visibleCount.value >= LINES.length;
  timer = window.setTimeout(
    () => {
      if (visibleCount.value < LINES.length) {
        // Stream: lines appear one at a time.
        visibleCount.value += 1;
      } else {
        // Pause on the finished block, then change (restart gently).
        visibleCount.value = 0;
      }
      scheduleNext();
    },
    complete ? HOLD_BEFORE_CHANGE : LINE_INTERVAL
  );
}

onMounted(() => {
  const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  if (reducedMotion) {
    // Static finished code block — no streaming, blinking, or looping.
    visibleCount.value = LINES.length;
    return;
  }

  scheduleNext();
});

onBeforeUnmount(() => {
  if (timer) {
    window.clearTimeout(timer);
  }
});
</script>

<style scoped>
.code-panel {
  width: 100%;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-card);
  overflow: hidden;
  font-family: var(--font-mono);
  font-size: 0.7rem;
  line-height: 1.9;
}

.code-panel__bar {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.6rem 0.85rem;
  background: var(--surface-muted);
  border-bottom: 1px solid var(--border);
}

.code-panel__dot {
  width: 9px;
  height: 9px;
  border-radius: 50%;
  background: var(--border);
}

.code-panel__title {
  margin-left: auto;
  color: var(--text-muted);
  font-size: 0.64rem;
}

/* Fixed min-height so lines appearing never shift the layout */
.code-panel__body {
  display: flex;
  flex-direction: column;
  gap: 0.1rem;
  padding: 0.85rem 0.9rem;
  min-height: 9.4rem;
}

.code-panel__line {
  display: flex;
  gap: 0.8rem;
  white-space: pre;
  animation: fade-up 0.4s var(--ease-out) both;
}

.code-panel__num {
  color: var(--text-muted);
  text-align: right;
  min-width: 1.2em;
  user-select: none;
}

.code-panel__code {
  color: var(--text);
  overflow: hidden;
}

/* Restrained syntax colors — existing tokens only */
.tok-kw,
.tok-fn {
  color: var(--accent);
}

.tok-str {
  color: var(--success);
}

.tok-var {
  color: var(--text);
}

.tok-pun,
.tok-cm {
  color: var(--text-muted);
}

@media (prefers-reduced-motion: reduce) {
  .code-panel__line {
    animation: none;
  }
}
</style>
