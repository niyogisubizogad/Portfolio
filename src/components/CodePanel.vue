<template>
  <!-- Decorative code editor + terminal visual — hidden from assistive tech -->
  <div class="code-panel" aria-hidden="true">
    <div class="code-panel__bar">
      <span class="code-panel__dot"></span>
      <span class="code-panel__dot"></span>
      <span class="code-panel__dot"></span>
      <span class="code-panel__file">portfolio.js</span>
      <span class="code-panel__run">RUNNING</span>
    </div>

    <!-- Code section: typed character by character -->
    <div class="code-panel__code">
      <pre
        class="code-text__body"
        :class="{ 'code-text--caret': isTypingCode }"
      >{{ displayedCode }}<span v-if="isTypingCode" class="code-caret" aria-hidden="true"></span></pre
      >
    </div>

    <!-- Terminal output: lines revealed one by one -->
    <div class="code-panel__terminal">
      <p class="code-panel__terminal-label">TERMINAL · OUTPUT</p>
      <p
                v-for="(text, i) in shownTermLines
          ? termLines.slice(0, revealedTermLines)
          : []"
        :key="i"
        class="term-line"
      >
        {{ text }}
      </p>
      <p v-if="isComplete" class="code-panel__result">
        <span class="code-panel__result-dot"></span>
        Process completed successfully
      </p>
    </div>
  </div>
</template>

<script setup>
import { onBeforeUnmount, onMounted, ref } from "vue";

// Authentic portfolio-oriented code content — single short snippet.
const CODE_STRING = [
  `const gad = {`,
  `  name: "Gad NiYoGiSuBiZo",`,
  `  role: "Software Developer",`,
    `  stack: ["Frontend", "Backend APIs", "AI"],`,
  `};`,
  ``,
  `console.log("Hello, world!");`,
].join("\n");

const TERM_LINES = [
  "> Initializing portfolio...",
  "> Loading Gad's developer profile...",
  "> Frontend: ready",
  "> Backend APIs: ready",
  "> AI integrations: ready",
  "> Hello, world!",
  "> Status: Ready to build.",
];

// Reactive state
const displayedCode = ref("");
const isTypingCode = ref(false);
const shownTermLines = ref(false);
const revealedTermLines = ref(0);
const isComplete = ref(false);

// Timer IDs stored for cleanup
const timers = [];

onMounted(() => {
  const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  if (reducedMotion) {
    // Static finished state — no typing, streaming, or blinking.
    displayedCode.value = CODE_STRING;
        isTypingCode.value = false;
    shownTermLines.value = true;
    revealedTermLines.value = TERM_LINES.length;
    isComplete.value = true;
    return;
  }

  isTypingCode.value = true;

  // 1. Type the JavaScript code character by character.
  let codeIndex = 0;

  function typeCode() {
    if (codeIndex < CODE_STRING.length) {
      displayedCode.value = CODE_STRING.slice(0, codeIndex + 1);
      codeIndex++;
      const id = setTimeout(typeCode, 22); // 18–30ms per character
      timers.push(id);
    } else {
            // 2. Pause 500–800ms after full code is complete.
      const pauseId = setTimeout(() => {
        isTypingCode.value = false;
        // 3. Start terminal output — reveal one line every 400–600ms.
        shownTermLines.value = true;

        function revealTermLine() {
          if (revealedTermLines.value < TERM_LINES.length) {
            revealedTermLines.value++;
            const id = setTimeout(revealTermLine, 450); // 400–600ms per line
            timers.push(id);
          } else {
            // 4. After last terminal line, show success state.
                  const finalId = setTimeout(() => {
              isComplete.value = true;
            }, 500);
            timers.push(finalId);
          }
        }
        revealTermLine();
      }, 700); // 500–800ms pause
      timers.push(pauseId);
    }
  }

  const startId = setTimeout(typeCode, 0);
  timers.push(startId);
});

onBeforeUnmount(() => {
  timers.forEach((id) => clearTimeout(id));
  timers.length = 0;
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
  font-size: 0.68rem;
  line-height: 1.75;
}

/* Title bar */
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

.code-panel__file {
  margin-left: 0.5rem;
  color: var(--text-muted);
}

.code-panel__run {
  margin-left: auto;
  color: var(--accent);
  font-size: 0.62rem;
  letter-spacing: 0.12em;
}

/* Code section */
.code-panel__code {
  padding: 0.85rem 0.9rem;
}

.code-text__body {
  margin: 0;
  color: var(--text);
  white-space: pre-wrap;
  tab-size: 2;
  overflow-wrap: anywhere;
}

/* Subtle caret — only while code is being typed */
.code-caret {
  display: inline-block;
  width: 0.55em;
  height: 1em;
  margin-left: 0.1em;
  vertical-align: -0.15em;
  background: var(--accent);
  animation: caret-blink 1s step-end infinite;
}

/* Terminal output */
.code-panel__terminal {
  padding: 0.7rem 0.9rem 0.85rem;
  border-top: 1px solid var(--border);
  background: var(--surface-muted);
}

.code-panel__terminal-label {
  margin: 0 0 0.4rem;
  font-size: 0.6rem;
  letter-spacing: 0.14em;
  color: var(--text-muted);
}

.term-line {
  margin: 0;
  color: var(--text-muted);
  opacity: 1;
  transform: translateY(0);
  transition: opacity 240ms ease, transform 240ms ease;
}

.code-panel__result {
  display: flex;
  align-items: center;
  gap: 0.45rem;
  margin: 0.55rem 0 0;
  padding-top: 0.5rem;
  border-top: 1px dashed var(--border);
  color: var(--success);
}

.code-panel__result-dot {
  width: 7px;
  height: 7px;
  flex-shrink: 0;
  border-radius: 50%;
  background: var(--success);
}

@keyframes caret-blink {
  0%,
  50% {
    opacity: 1;
  }
  51%,
  100% {
    opacity: 0;
  }
}

@media (prefers-reduced-motion: reduce) {
  .code-text__body,
  .term-line {
    transition: none;
  }

  .code-caret {
    display: none;
  }
}
</style>
