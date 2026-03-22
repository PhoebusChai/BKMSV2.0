<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, RouterLink } from 'vue-router'
import { ArrowLeft, Calendar } from 'lucide-vue-next'
import { getPostById } from '../data/posts'

const route = useRoute()
const id = computed(() => String(route.params.id))
const post = computed(() => getPostById(id.value))
</script>

<template>
  <main v-if="post" class="page">
    <RouterLink class="back" to="/">
      <ArrowLeft :size="16" :stroke-width="1.75" aria-hidden="true" />
      返回列表
    </RouterLink>

    <header class="article-head">
      <p class="article-head__meta">
        <span class="article-head__date">
          <Calendar :size="14" :stroke-width="1.75" aria-hidden="true" />
          <time :datetime="post.date">{{ post.date }}</time>
        </span>
        <span v-if="post.tags.length" class="article-head__tags">
          <span v-for="t in post.tags" :key="t" class="tag">{{ t }}</span>
        </span>
      </p>
      <h1 class="article-head__title">{{ post.title }}</h1>
    </header>

    <article class="prose" v-html="post.contentHtml" />
  </main>

  <main v-else class="page page--center">
    <p class="muted">未找到这篇文章。</p>
    <RouterLink class="back" to="/">返回首页</RouterLink>
  </main>
</template>

<style scoped>
.page {
  max-width: var(--article-max);
  margin: 0 auto;
  padding: 2rem 1.25rem 3.5rem;
}

.page--center {
  text-align: center;
  padding-top: 4rem;
}

.muted {
  margin: 0 0 1rem;
  color: var(--muted);
}

.back {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  margin-bottom: 2rem;
  font-size: 0.875rem;
  color: var(--muted);
  text-decoration: none;
}

.back:hover {
  color: var(--fg);
}

.article-head {
  margin-bottom: 2rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid var(--border);
}

.article-head__meta {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.75rem 1rem;
  margin: 0 0 0.75rem;
}

.article-head__date {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  font-size: 0.8125rem;
  color: var(--muted);
}

.article-head__tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.35rem;
}

.tag {
  font-size: 0.75rem;
  padding: 0.15rem 0.45rem;
  border: 1px solid var(--border);
  color: var(--muted);
}

.article-head__title {
  margin: 0;
  font-size: clamp(1.5rem, 3.5vw, 2rem);
  font-weight: 600;
  letter-spacing: -0.03em;
  line-height: 1.25;
  color: var(--fg);
}
</style>

<style>
/* 文章正文：全局 prose，与 scoped 标题分离 */
.prose {
  font-size: 1rem;
  line-height: 1.75;
  color: var(--fg);
}

.prose > * + * {
  margin-top: 1rem;
}

.prose p {
  margin: 0;
  color: var(--fg-muted);
}

.prose h2 {
  margin: 2rem 0 0.75rem;
  font-size: 1.125rem;
  font-weight: 600;
  letter-spacing: -0.02em;
  color: var(--fg);
}

.prose ul,
.prose ol {
  margin: 0.5rem 0 0;
  padding-left: 1.25rem;
  color: var(--fg-muted);
}

.prose li + li {
  margin-top: 0.35rem;
}

.prose code {
  font-family: var(--mono);
  font-size: 0.875em;
  padding: 0.15em 0.4em;
  border: 1px solid var(--border);
  background: var(--surface);
}

.prose pre {
  margin: 1rem 0 0;
  padding: 1rem 1.1rem;
  overflow-x: auto;
  border: 1px solid var(--border);
  background: var(--surface);
}

.prose pre code {
  padding: 0;
  border: none;
  background: none;
  font-size: 0.8125rem;
  line-height: 1.5;
}
</style>
