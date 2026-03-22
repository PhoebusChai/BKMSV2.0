<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref, watch } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import { BookOpen } from 'lucide-vue-next'
import SiteNav from './SiteNav.vue'

const route = useRoute()
const scrollY = ref(0)
/** 超过该像素视为已离开首屏顶区，顶栏切为白底 */
const SCROLL_THRESHOLD = 32

function readScroll() {
  scrollY.value = window.scrollY || document.documentElement.scrollTop
}

const solidHeader = computed(() => {
  if (route.name !== 'home') return true
  return scrollY.value > SCROLL_THRESHOLD
})

onMounted(() => {
  readScroll()
  window.addEventListener('scroll', readScroll, { passive: true })
})

onUnmounted(() => {
  window.removeEventListener('scroll', readScroll)
})

watch(
  () => route.fullPath,
  () => {
    requestAnimationFrame(readScroll)
  },
)
</script>

<template>
  <header class="site-header" :class="{ 'site-header--solid': solidHeader }">
    <div class="site-header__inner">
      <RouterLink class="brand" to="/">
        <BookOpen :size="20" :stroke-width="1.75" aria-hidden="true" />
        <span class="brand__stack">
          <span class="brand__title">码了个BUG</span>
          <span class="brand__subtitle">——写代码我是认真的，看番我也是</span>
        </span>
      </RouterLink>
      <SiteNav :solid="solidHeader" />
    </div>
  </header>
</template>

<style scoped>
.site-header {
  position: sticky;
  top: 0;
  z-index: 20;
  width: 100vw;
  margin-left: calc(50% - 50vw);
  box-sizing: border-box;
  background: transparent;
  transition: background-color 0.28s ease;
}

.site-header--solid {
  background: #ffffff;
}

.site-header__inner {
  width: 100%;
  max-width: none;
  margin: 0;
  padding: 1.25rem 1.75rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1.5rem;
}

.brand {
  display: inline-flex;
  align-items: center;
  gap: 0.65rem;
  font-weight: 600;
  letter-spacing: -0.02em;
  color: #ffffff;
  text-decoration: none;
  flex-shrink: 0;
  min-width: 0;
  transition: color 0.28s ease, opacity 0.2s ease;
}

.site-header--solid .brand {
  color: var(--fg);
}

.brand__stack {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.2rem;
  min-width: 0;
}

.brand__title {
  font-size: 1rem;
  font-weight: 600;
  line-height: 1.2;
  letter-spacing: -0.02em;
}

.brand__subtitle {
  display: block;
  font-size: 0.6875rem;
  font-weight: 400;
  line-height: 1.35;
  letter-spacing: 0.02em;
  opacity: 0.82;
  white-space: nowrap;
}

.site-header--solid .brand__subtitle {
  opacity: 1;
  color: var(--muted);
}

.brand:hover {
  opacity: 0.75;
}

@media (max-width: 480px) {
  .brand__subtitle {
    font-size: 0.5625rem;
    letter-spacing: 0.01em;
  }
}
</style>
