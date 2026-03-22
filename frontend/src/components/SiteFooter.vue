<script setup lang="ts">
import { Github, Rss } from 'lucide-vue-next'

const year = new Date().getFullYear()
</script>

<template>
  <footer class="site-footer">
    <div class="site-footer__inner">
      <p class="site-footer__copy">© {{ year }} 个人博客 · 黑白极简</p>
      <div class="site-footer__social" aria-label="社交链接">
        <a
          class="icon-link"
          href="https://github.com"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub"
        >
          <Github :size="18" :stroke-width="1.75" />
        </a>
        <a class="icon-link" href="/" aria-label="RSS（占位）">
          <Rss :size="18" :stroke-width="1.75" />
        </a>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.site-footer {
  margin-top: auto;
  border-top: 1px solid var(--border);
  background: transparent;
}

.site-footer__inner {
  max-width: var(--content-max);
  margin: 0 auto;
  padding: 1.5rem 1.25rem;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
}

.site-footer__copy {
  margin: 0;
  font-size: 0.8125rem;
  color: var(--muted);
}

.site-footer__social {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.icon-link {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2.25rem;
  height: 2.25rem;
  border: 1px solid var(--border);
  color: var(--fg);
  text-decoration: none;
}

.icon-link:hover {
  background: var(--surface);
}
</style>
