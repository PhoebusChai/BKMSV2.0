<script setup lang="ts">
import { Archive } from 'lucide-vue-next'
</script>

<template>
  <main class="page">
    <header class="page__head">
      <p class="page__label">
        <Archive :size="16" :stroke-width="1.75" aria-hidden="true" />
        归档
      </p>
      <h1 class="page__title">按时间整理的文章索引</h1>
      <p class="page__lead">此处可接入按年/月分组或标签云。</p>
    </header>
  </main>
</template>

<style scoped>
.page {
  max-width: var(--content-max);
  margin: 0 auto;
  padding: 2.5rem 1.25rem 3rem;
}

.page__head {
  margin-bottom: 2rem;
}

.page__label {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  margin: 0 0 0.75rem;
  font-size: 0.8125rem;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--muted);
}

.page__title {
  margin: 0 0 0.75rem;
  font-size: clamp(1.75rem, 4vw, 2.25rem);
  font-weight: 600;
  letter-spacing: -0.03em;
  line-height: 1.2;
  color: var(--fg);
}

.page__lead {
  margin: 0;
  max-width: 36rem;
  font-size: 1rem;
  line-height: 1.65;
  color: var(--muted);
}
</style>
