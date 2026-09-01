<template>
  <aside
    ref="panelEl"
    class="panel"
    role="dialog"
    aria-modal="true"
    :aria-label="title + ' panel'"
  >
    <header class="panel__header">
      <p class="eyebrow">{{ title }}</p>
      <button
        ref="closeButton"
        type="button"
        class="panel__close"
        aria-label="Close panel"
        @click="emit('close')"
      >
        <X :size="20" aria-hidden="true" />
      </button>
    </header>

    <div class="panel__body">
      <slot />
    </div>
  </aside>
</template>

<script setup>
import { nextTick, onBeforeUnmount, onMounted, ref, watch } from "vue";
import { X } from "lucide-vue-next";

const props = defineProps({
  title: { type: String, required: true },
});

const emit = defineEmits(["close"]);

const panelEl = ref(null);
const closeButton = ref(null);
let previouslyFocused = null;

function handleKeydown(event) {
  if (event.key === "Escape") {
    event.stopPropagation();
    emit("close");
  }
}

onMounted(() => {
  previouslyFocused = document.activeElement;

  window.addEventListener("keydown", handleKeydown);
  document.body.style.overflow = "hidden";

  nextTick(() => {
    closeButton.value?.focus();
  });
});

onBeforeUnmount(() => {
  window.removeEventListener("keydown", handleKeydown);
  document.body.style.overflow = "";

  // Return focus to the element that opened the panel.
  if (previouslyFocused && typeof previouslyFocused.focus === "function") {
    previouslyFocused.focus();
  }
  previouslyFocused = null;
});

// Re-focus the close button if the panel content swaps in place.
watch(
  () => props.title,
  () => {
    nextTick(() => {
      closeButton.value?.focus();
    });
  }
);
</script>

<style scoped>
.panel {
  position: fixed;
  z-index: 60;
  top: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  max-width: var(--panel-max-width);
  display: flex;
  flex-direction: column;
  background: var(--surface);
  border-left: 1px solid var(--border);
  box-shadow: var(--shadow-panel);
}

.panel__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding: 1.25rem 1.75rem;
  border-bottom: 1px solid var(--border-soft);
}

.panel__header .eyebrow {
  font-size: 0.85rem;
  color: var(--accent);
}

.panel__close {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: var(--radius-sm);
  color: var(--text-muted);
  border: 1px solid transparent;
  transition: color var(--speed-fast) ease, background var(--speed-fast) ease,
    border-color var(--speed-fast) ease;
}

.panel__close:hover,
.panel__close:focus-visible {
  color: var(--text);
  background: var(--surface-muted);
  border-color: var(--border);
}

.panel__body {
  flex: 1;
  overflow-y: auto;
  padding: 1.75rem;
  /* leave room for the mobile bottom nav */
  padding-bottom: calc(var(--bottom-nav-height) + 2.5rem);
}

@media (max-width: 768px) {
  .panel {
    border-left: none;
  }

  .panel__header {
    padding: 1rem 1.25rem;
  }

  .panel__body {
    padding: 1.25rem;
  }
}
</style>
