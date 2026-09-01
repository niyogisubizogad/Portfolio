<template>
  <footer class="panel-footer">
    <p class="panel-footer__stack">
      Built with Vue.js · JavaScript · CSS · Vite · Lucide Icons
    </p>
    <p class="panel-footer__made">Made with care by Gad NiYoGiSuBiZo</p>
    <p class="panel-footer__copy">© {{ year }} Gad NiYoGiSuBiZo</p>
  </footer>
</template>

<script setup>
// Current year, computed once per mount.
const year = new Date().getFullYear();
</script>

<style scoped>
.panel-footer {
  margin-top: 2.5rem;
  padding-top: 1.1rem;
  border-top: 1px solid var(--border-soft);
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
}

.panel-footer p {
  margin: 0;
}

.panel-footer__stack {
  font-family: var(--font-mono);
  font-size: 0.72rem;
  line-height: 1.7;
  color: var(--text-faint);
}

.panel-footer__made {
  color: var(--text-muted);
  font-size: 0.84rem;
}

.panel-footer__copy {
  font-family: var(--font-mono);
  font-size: 0.7rem;
  color: var(--text-faint);
}

@media (max-width: 480px) {
  .panel-footer {
    margin-top: 2rem;
  }
}
</style>
