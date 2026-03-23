<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { Archive, ChevronLeft, ChevronRight } from 'lucide-vue-next'
import PostCard from '../components/PostCard.vue'
import { getPostsSorted } from '../data/posts'

const allPosts = getPostsSorted()

const selectedTag = ref<string | null>(null)
const searchQuery = ref('')

const pageSize = ref(5)
const currentPage = ref(1)

function normalize(s: string) {
  return s.trim().toLowerCase()
}

const searchedPosts = computed(() => {
  const q = normalize(searchQuery.value)
  if (!q) return allPosts

  return allPosts.filter((p) => {
    const haystack = `${p.title}\n${p.excerpt}\n${p.tags.join(' ')}`.toLowerCase()
    return haystack.includes(q)
  })
})

const filteredPosts = computed(() => {
  if (!selectedTag.value) return searchedPosts.value
  return searchedPosts.value.filter((p) => p.tags.includes(selectedTag.value as string))
})

const tagCounts = computed(() => {
  const map = new Map<string, number>()
  searchedPosts.value.forEach((p) => {
    p.tags.forEach((t) => map.set(t, (map.get(t) ?? 0) + 1))
  })
  return [...map.entries()].sort((a, b) => b[1] - a[1])
})

const totalPages = computed(() => {
  return Math.max(1, Math.ceil(filteredPosts.value.length / pageSize.value))
})

watch([selectedTag, searchQuery], () => {
  currentPage.value = 1
})

watch(totalPages, (tp) => {
  if (currentPage.value > tp) currentPage.value = tp
})

const pagedPosts = computed(() => {
  const start = (currentPage.value - 1) * pageSize.value
  return filteredPosts.value.slice(start, start + pageSize.value)
})

function groupByYearMonth(posts: typeof allPosts) {
  const years = new Map<
    string,
    Map<
      string,
      {
        monthLabel: string
        items: typeof allPosts
      }
    >
  >()

  posts.forEach((p) => {
    const year = p.date.slice(0, 4)
    const month = p.date.slice(5, 7)
    const monthLabel = `${year}-${month}`

    if (!years.has(year)) years.set(year, new Map())
    const ym = years.get(year)!

    if (!ym.has(monthLabel)) ym.set(monthLabel, { monthLabel, items: [] as typeof allPosts })
    ym.get(monthLabel)!.items.push(p)
  })

  return [...years.entries()]
    .sort((a, b) => (a[0] < b[0] ? 1 : -1))
    .map(([year, monthsMap]) => ({
      year,
      months: [...monthsMap.values()].sort((a, b) => (a.monthLabel < b.monthLabel ? 1 : -1)),
    }))
}

const yearGroups = computed(() => groupByYearMonth(pagedPosts.value))
</script>

<template>
  <main class="page">
    <header class="page__head">
      <p class="page__label">
        <Archive :size="16" :stroke-width="1.75" aria-hidden="true" />
        归档
      </p>
      <h1 class="page__title">按时间整理的文章索引</h1>
      <p class="page__lead">支持搜索、标签筛选与分页浏览。</p>
    </header>

    <div class="archive-layout">
      <aside class="archive-side" aria-label="筛选">
        <section class="side-box side-box--sticky">
          <h3 class="side-title">筛选</h3>

          <label class="search-field" aria-label="搜索">
            <span class="search-field__label">搜索</span>
            <input
              v-model="searchQuery"
              class="search-field__input"
              type="text"
              placeholder="标题 / 摘要 / 标签"
              autocomplete="off"
              maxlength="40"
            />
          </label>

          <div class="chip-row">
            <button
              type="button"
              class="chip"
              :class="{ 'chip--active': !selectedTag }"
              aria-pressed="!selectedTag"
              @click="selectedTag = null"
            >
              全部
            </button>
          </div>

          <div class="chip-wrap" aria-label="标签列表">
            <button
              v-for="[t, c] in tagCounts"
              :key="t"
              type="button"
              class="chip"
              :class="{ 'chip--active': selectedTag === t }"
              :aria-pressed="selectedTag === t"
              @click="selectedTag = t"
            >
              {{ t }} <span class="chip__count">{{ c }}</span>
            </button>
          </div>
        </section>
      </aside>

      <section class="archive-main" aria-label="归档列表">
        <div class="main-topbar" aria-label="结果概览">
          <p class="result-summary">
            共 <strong>{{ filteredPosts.length }}</strong> 篇
          </p>
        </div>

        <div v-if="yearGroups.length" class="year-blocks">
          <section
            v-for="yg in yearGroups"
            :key="yg.year"
            class="year-block"
            aria-label="按年份分组"
          >
            <h2 class="year-title">{{ yg.year }}</h2>

            <div v-for="m in yg.months" :key="m.monthLabel" class="month-block">
              <h3 class="month-title">{{ m.monthLabel }}（{{ m.items.length }}）</h3>
              <div class="post-list">
                <PostCard v-for="p in m.items" :key="p.id" :post="p" />
              </div>
            </div>
          </section>
        </div>

        <p v-else class="empty">暂无符合条件的文章。</p>

        <div v-if="yearGroups.length" class="bottom-pagination" aria-label="分页控制">
          <button
            type="button"
            class="page-btn"
            :disabled="currentPage <= 1"
            aria-label="上一页"
            @click="currentPage = currentPage - 1"
          >
            <ChevronLeft :size="16" :stroke-width="1.75" aria-hidden="true" />
          </button>

          <span class="page-indicator">
            第 {{ currentPage }} / {{ totalPages }} 页
          </span>

          <button
            type="button"
            class="page-btn"
            :disabled="currentPage >= totalPages"
            aria-label="下一页"
            @click="currentPage = currentPage + 1"
          >
            <ChevronRight :size="16" :stroke-width="1.75" aria-hidden="true" />
          </button>
        </div>
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

.main-topbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  margin-bottom: 0.9rem;
  flex-wrap: wrap;
}

.result-summary {
  margin: 0;
  color: var(--muted);
  font-size: 0.95rem;
}

.pagination {
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
}

.page-btn {
  width: 2.1rem;
  height: 2.1rem;
  padding: 0;
  border-radius: 0.35rem;
  border: 1px solid var(--border);
  background: #fff;
  color: var(--fg);
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.page-btn:disabled {
  opacity: 0.45;
  cursor: not-allowed;
}

.page-indicator {
  color: var(--muted);
  font-size: 0.95rem;
  white-space: nowrap;
}

.archive-layout {
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
  align-items: start;
}

.archive-main {
  min-width: 0;
}

.year-block {
  margin-bottom: 1.6rem;
  width: 100%;
}

.year-title {
  margin: 0 0 1rem;
  font-size: 1.1rem;
  font-weight: 650;
  letter-spacing: -0.01em;
  color: var(--fg);
}

.month-block {
  margin-bottom: 1rem;
  width: 100%;
}

.month-title {
  margin: 0 0 0.75rem;
  font-size: 0.95rem;
  font-weight: 600;
  color: var(--muted);
}

.post-list {
  margin: 0;
  width: 100%;
}

.empty {
  margin: 0;
  color: var(--muted);
  line-height: 1.7;
}

.archive-side {
  min-width: 0;
}

.side-box {
  border: none;
  background: transparent;
  padding: 0;
}

.side-box--sticky {
  position: sticky;
  top: calc(var(--site-header-height) + 1rem);
}

@media (min-width: 0) {
  /* 单栏：不使用粘性定位，避免在窄屏/单列时产生奇怪的滚动行为 */
  .side-box--sticky {
    position: static;
  }
}

.side-title {
  margin: 0 0 0.75rem;
  font-size: 1rem;
  font-weight: 650;
}

.chip-row {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 0.75rem;
}

.chip-wrap {
  display: flex;
  flex-wrap: wrap;
  gap: 0.45rem;
}

.chip {
  border: 1px solid rgba(10, 10, 10, 0.12);
  border-radius: 999px;
  background: transparent;
  padding: 0.25rem 0.6rem;
  font-size: 0.8rem;
  color: var(--muted);
  cursor: pointer;
  transition:
    background-color 0.2s ease,
    border-color 0.2s ease,
    color 0.2s ease,
    opacity 0.2s ease;
}

.chip:hover {
  background: var(--surface);
  border-color: rgba(10, 10, 10, 0.28);
  color: var(--fg);
}

.chip--active {
  border-color: var(--fg);
  background: var(--fg);
  color: #ffffff;
}

.chip__count {
  margin-left: 0.35rem;
  color: inherit;
  font-weight: 550;
  font-size: 0.85em;
}

.chip:focus-visible {
  outline: 2px solid rgba(10, 10, 10, 0.35);
  outline-offset: 2px;
}

.search-field {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.search-field__label {
  font-size: 0.875rem;
  color: var(--muted);
}

.search-field__input {
  width: 100%;
  border: none;
  border-radius: 0.35rem;
  padding: 0.6rem 0.75rem;
  font-family: var(--sans);
  font-size: 0.95rem;
  color: var(--fg);
  outline: none;
  box-shadow: none;
  -webkit-appearance: none;
  appearance: none;
  background: var(--surface);
}

.search-field__input:focus {
  outline: none;
  box-shadow: none;
}

.bottom-pagination {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 0.6rem;
  margin-top: 1.25rem;
}

@media (max-width: 900px) {
  .archive-layout {
    grid-template-columns: 1fr;
  }

  .side-box--sticky {
    position: static;
  }
}
</style>
