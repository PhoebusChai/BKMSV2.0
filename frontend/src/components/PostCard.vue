<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { ArrowRight, Calendar } from 'lucide-vue-next'
import type { Post } from '../data/posts'

defineProps<{
  post: Post
}>()
</script>

<template>
  <article class="card">
    <div class="card__meta">
      <span class="card__date">
        <Calendar :size="14" :stroke-width="1.75" aria-hidden="true" />
        <time :datetime="post.date">{{ post.date }}</time>
      </span>
      <span v-if="post.tags.length" class="card__tags">
        <span v-for="t in post.tags" :key="t" class="tag">{{ t }}</span>
      </span>
    </div>
    <h2 class="card__title">
      <RouterLink :to="`/post/${post.id}`">{{ post.title }}</RouterLink>
    </h2>
    <p class="card__excerpt">{{ post.excerpt }}</p>
    <RouterLink class="card__more" :to="`/post/${post.id}`">
      阅读全文
      <ArrowRight :size="16" :stroke-width="1.75" aria-hidden="true" />
    </RouterLink>
  </article>
</template>

<style scoped>
.card {
  padding: 1.75rem 0;
  border-bottom: 1px solid var(--border);
}

.card:last-child {
  border-bottom: none;
}

.card__meta {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.75rem 1rem;
  margin-bottom: 0.5rem;
}

.card__date {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  font-size: 0.8125rem;
  color: var(--muted);
}

.card__tags {
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

.card__title {
  margin: 0 0 0.5rem;
  font-size: 1.375rem;
  font-weight: 600;
  letter-spacing: -0.02em;
  line-height: 1.3;
}

.card__title a {
  color: var(--fg);
  text-decoration: none;
}

.card__title a:hover {
  text-decoration: underline;
  text-underline-offset: 0.2em;
}

.card__excerpt {
  margin: 0 0 1rem;
  color: var(--muted);
  font-size: 0.9375rem;
  line-height: 1.65;
}

.card__more {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--fg);
  text-decoration: none;
  border-bottom: 1px solid var(--fg);
  padding-bottom: 0.1rem;
  width: fit-content;
}

.card__more:hover {
  opacity: 0.7;
}
</style>
