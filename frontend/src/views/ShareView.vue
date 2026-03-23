<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { MessageSquareText, Trash2, User } from 'lucide-vue-next'

type Comment = {
  id: string
  name: string
  content: string
  createdAt: number
}

const STORAGE_KEY = 'bkmsv2_comments'

const comments = ref<Comment[]>([])
const name = ref('')
const content = ref('')

const sortedComments = computed(() =>
  [...comments.value].sort((a, b) => b.createdAt - a.createdAt),
)

function formatDate(ts: number) {
  const d = new Date(ts)
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${y}-${m}-${day}`
}

function safeId() {
  // Prefer UUID when available; fallback to timestamp+random.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const c = (globalThis as any).crypto
  if (c?.randomUUID) return c.randomUUID() as string
  return `${Date.now()}_${Math.random().toString(16).slice(2)}`
}

function persist(next: Comment[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
  } catch {
    // Ignore storage errors (private mode / quota).
  }
}

function load() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return
    const parsed = JSON.parse(raw) as Comment[]
    if (!Array.isArray(parsed)) return
    comments.value = parsed.filter(
      (c) =>
        typeof c?.id === 'string' &&
        typeof c?.name === 'string' &&
        typeof c?.content === 'string' &&
        typeof c?.createdAt === 'number',
    )
  } catch {
    // Ignore parse errors.
  }
}

function submit() {
  const n = name.value.trim()
  const t = content.value.trim()
  if (!n || !t) return

  const next: Comment = {
    id: safeId(),
    name: n,
    content: t,
    createdAt: Date.now(),
  }

  const merged = [next, ...comments.value]
  comments.value = merged
  persist(merged)
  name.value = ''
  content.value = ''
}

function remove(id: string) {
  const next = comments.value.filter((c) => c.id !== id)
  comments.value = next
  persist(next)
}

onMounted(load)
</script>

<template>
  <main class="page">
    <header class="page__head">
      <p class="page__label">
        <MessageSquareText :size="16" :stroke-width="1.75" aria-hidden="true" />
        留言
      </p>
      <h1 class="page__title">留下你的想法</h1>
      <p class="page__lead">本页留言会保存在你的浏览器本地（刷新不丢）。</p>
    </header>

    <div class="comment-layout">
      <section class="composer" aria-label="留言表单">
        <h2 class="composer__title">发布留言</h2>

        <form class="form" @submit.prevent="submit">
          <label class="field">
            <span class="field__label">
              <User :size="14" :stroke-width="1.75" aria-hidden="true" />
              昵称
            </span>
            <input
              v-model="name"
              class="field__input"
              type="text"
              name="name"
              placeholder="比如：CGL"
              autocomplete="off"
              maxlength="24"
            />
          </label>

          <label class="field">
            <span class="field__label">内容</span>
            <textarea
              v-model="content"
              class="field__textarea"
              name="content"
              placeholder="写下你的问题或想法…"
              rows="5"
              maxlength="1000"
            />
          </label>

          <button class="submit" type="submit">
            发送留言
          </button>
        </form>
      </section>

      <section class="list" aria-label="留言列表">
        <h2 class="list__title">
          留言列表
          <span class="list__count">{{ comments.length }}</span>
        </h2>

        <ul v-if="sortedComments.length" class="comment-list">
          <li v-for="c in sortedComments" :key="c.id" class="comment">
            <div class="comment__meta">
              <span class="comment__name">{{ c.name }}</span>
              <time class="comment__date" :datetime="formatDate(c.createdAt)">
                {{ formatDate(c.createdAt) }}
              </time>
              <button
                type="button"
                class="comment__delete"
                aria-label="删除留言"
                @click="remove(c.id)"
              >
                <Trash2 :size="16" :stroke-width="1.75" aria-hidden="true" />
              </button>
            </div>
            <p class="comment__text">{{ c.content }}</p>
          </li>
        </ul>

        <p v-else class="empty">暂无留言，欢迎先写点什么。</p>
      </section>
    </div>
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

.comment-layout {
  display: grid;
  grid-template-columns: minmax(0, 26rem) minmax(0, 1fr);
  gap: 1.5rem;
  align-items: stretch;
}

.composer,
.list {
  border: 1px solid var(--border);
  background: #fff;
  padding: 1.1rem;
}

.list {
  display: flex;
  flex-direction: column;
}

.comment-list {
  flex: 1;
}

.composer__title,
.list__title {
  margin: 0 0 1rem;
  font-size: 1.05rem;
  font-weight: 650;
  letter-spacing: -0.01em;
}

.list__title {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 1rem;
}

.list__count {
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--muted);
}

.form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.field {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.field__label {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  color: var(--muted);
  font-size: 0.875rem;
}

.field__input,
.field__textarea {
  width: 100%;
  border: 1px solid var(--border);
  border-radius: 0.35rem;
  padding: 0.65rem 0.75rem;
  font-family: var(--sans);
  font-size: 0.95rem;
  color: var(--fg);
  outline: none;
  background: #fff;
}

.field__textarea {
  resize: vertical;
}

.field__input:focus,
.field__textarea:focus {
  border-color: rgba(10, 10, 10, 0.35);
}

.submit {
  width: fit-content;
  padding: 0.7rem 1.05rem;
  border-radius: 0.35rem;
  border: 1px solid var(--border);
  background: var(--fg);
  color: #ffffff;
  font-weight: 600;
  cursor: pointer;
  transition: opacity 0.2s ease, background-color 0.2s ease;
}

.submit:hover {
  opacity: 0.9;
}

.comment-list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.comment {
  border: 1px solid var(--border);
  border-radius: 0.5rem;
  padding: 0.85rem;
  background: #fff;
}

.comment__meta {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
}

.comment__name {
  font-weight: 650;
  color: var(--fg);
}

.comment__date {
  color: var(--muted);
  font-size: 0.875rem;
  flex: 1;
  text-align: right;
}

.comment__delete {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2rem;
  height: 2rem;
  border-radius: 0.35rem;
  border: 1px solid var(--border);
  background: transparent;
  cursor: pointer;
  color: var(--fg);
}

.comment__delete:hover {
  background: var(--surface);
}

.comment__text {
  margin: 0.65rem 0 0;
  color: var(--fg-muted);
  line-height: 1.7;
  font-size: 0.95rem;
  white-space: pre-wrap;
  word-break: break-word;
}

.empty {
  margin: 0;
  color: var(--muted);
  line-height: 1.7;
}

@media (max-width: 900px) {
  .comment-layout {
    grid-template-columns: 1fr;
  }
}
</style>
