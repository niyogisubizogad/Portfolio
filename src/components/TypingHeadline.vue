<template>
  <h1 class="typing" :id="id">
    <!--
      Screen readers get one complete, non-animated introduction.
      The animated text below is purely decorative.
    -->
    <span class="visually-hidden">{{ staticLine }}</span>
    <span aria-hidden="true">
      <span>{{ displayedText }}</span><span
        v-if="showCaret"
        class="typing__caret"
      ></span>
    </span>
  </h1>
</template>

<script setup>
import { onBeforeUnmount, onMounted, ref } from "vue";

const props = defineProps({
  /** Sentences shown one at a time: type -> hold -> delete -> next. */
  lines: { type: Array, required: true },
  id: { type: String, default: undefined },
  speed: { type: Number, default: 42 },
  deleteSpeed: { type: Number, default: 22 },
  /** Pause after a line finishes typing. */
  holdTime: { type: Number, default: 1800 },
  /** Gentler, longer pause before the sequence restarts. */
  restartHold: { type: Number, default: 2800 },
});

const displayedText = ref("");
const showCaret = ref(true);
let timer = null;

// The stable, complete introduction for assistive tech and
// reduced-motion users (never animated away).
const staticLine = props.lines[0] ?? "";

function schedule(fn, delay) {
  timer = window.setTimeout(fn, delay);
}

function typeLine(index) {
  const line = props.lines[index];
  let i = 0;

  const tick = () => {
    i += 1;
    displayedText.value = line.slice(0, i);

    if (i < line.length) {
      schedule(tick, props.speed);
    } else {
      schedule(() => eraseLine(index), props.holdTime);
    }
  };

  tick();
}

function eraseLine(index) {
  const line = props.lines[index];
  let i = line.length;

  const tick = () => {
    i -= 1;
    displayedText.value = line.slice(0, i);

    if (i > 0) {
      schedule(tick, props.deleteSpeed);
    } else {
      const next = (index + 1) % props.lines.length;
      // After the final line, pause a little longer before repeating.
      const delay = next === 0 ? props.restartHold : 420;
      schedule(() => typeLine(next), delay);
    }
  };

  tick();
}

onMounted(() => {
  const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  if (reducedMotion) {
    // No typing/deleting: show the static introduction immediately.
    displayedText.value = staticLine;
    showCaret.value = false;
    return;
  }

  typeLine(0);
});

onBeforeUnmount(() => {
  if (timer) {
    window.clearTimeout(timer);
  }
});
</script>

<style scoped>
.typing {
  min-height: 1.2em;
}

.typing__caret {
  display: inline-block;
  width: 0.08em;
  min-width: 3px;
  height: 0.95em;
  margin-left: 0.08em;
  vertical-align: -0.12em;
  background: var(--accent);
  animation: caret-blink 1s step-end infinite;
}

/* Reserve space for the longest line on narrow screens so the
   supporting paragraph and CTAs do not jump while typing. */
@media (max-width: 640px) {
  .typing {
    min-height: 2.3em;
  }
}

@media (prefers-reduced-motion: reduce) {
  .typing__caret {
    animation: none;
  }
}
</style>
