<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { Home } from 'lucide-vue-next'
</script>

<template>
  <main class="page">
    <p class="code">404</p>
    <h1 class="title">页面不存在</h1>
    <p class="lead">链接可能已失效，或你输入了错误地址。</p>
    <RouterLink class="btn" to="/">
      <Home :size="18" :stroke-width="1.75" aria-hidden="true" />
      回到首页
    </RouterLink>
  </main>
</template>

<style scoped>
.page {
  max-width: var(--content-max);
  margin: 0 auto;
  padding: 4rem 1.25rem 3rem;
  text-align: center;
}

.code {
  margin: 0 0 0.5rem;
  font-family: var(--mono);
  font-size: 0.875rem;
  letter-spacing: 0.12em;
  color: var(--muted);
}

.title {
  margin: 0 0 0.75rem;
  font-size: 1.5rem;
  font-weight: 600;
  letter-spacing: -0.02em;
  color: var(--fg);
}

.lead {
  margin: 0 0 1.5rem;
  color: var(--muted);
  font-size: 0.9375rem;
}

.btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.6rem 1rem;
  border: 1px solid var(--border);
  color: var(--fg);
  text-decoration: none;
  font-size: 0.9375rem;
}

.btn:hover {
  background: var(--surface);
}
</style>
