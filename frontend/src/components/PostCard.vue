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
    <RouterLink v-if="post.cover" class="card__cover" :to="`/post/${post.id}`" :aria-label="post.title">
      <img :src="post.cover" :alt="post.title" loading="lazy" />
    </RouterLink>

    <div class="card__body">
      <h2 class="card__title">
        <RouterLink :to="`/post/${post.id}`">{{ post.title }}</RouterLink>
      </h2>
      <p class="card__excerpt">{{ post.excerpt }}</p>
    </div>

    <div class="card__footer">
      <div class="card__meta">
        <span class="card__date">
          <Calendar :size="14" :stroke-width="1.75" aria-hidden="true" />
          <time :datetime="post.date">{{ post.date }}</time>
        </span>
        <span v-if="post.tags.length" class="card__tags">
          <span v-for="t in post.tags" :key="t" class="tag">{{ t }}</span>
        </span>
      </div>

      <RouterLink class="card__more" :to="`/post/${post.id}`">
        阅读全文
        <ArrowRight :size="16" :stroke-width="1.75" aria-hidden="true" />
      </RouterLink>
    </div>
  </article>
</template>

<style scoped>
.card {
  padding: 1.05rem 0;
  border-bottom: 1px solid var(--border);
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  width: 100%;
  box-sizing: border-box;
}

.card:last-child {
  border-bottom: none;
}

.card__cover {
  display: block;
  width: 100%;
  aspect-ratio: 16 / 9;
  overflow: hidden;
  border: 1px solid var(--border);
  background: var(--surface);
}

.card__cover img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  transition: transform 0.25s ease;
}

.card__cover:hover img {
  transform: scale(1.03);
}

.card__body {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
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
  margin: 0;
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
  margin: 0;
  color: var(--muted);
  font-size: 0.9375rem;
  line-height: 1.6;
}

.card__footer {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 1rem;
}

.card__meta {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.55rem 0.75rem;
  min-width: 0;
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
  flex-shrink: 0;
}

.card__more:hover {
  opacity: 0.7;
}

@media (max-width: 680px) {
  .card__footer {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.6rem;
  }
}
</style>
