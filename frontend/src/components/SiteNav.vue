<script setup lang="ts">
import { ref, watch } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import { Github, Mail, Menu, X } from 'lucide-vue-next'
import BilibiliIcon from './icons/BilibiliIcon.vue'

withDefaults(
  defineProps<{
    /** 白底黑字顶栏（首页未滚动时为 false：透明底白字） */
    solid?: boolean
  }>(),
  { solid: true },
)

const route = useRoute()
const open = ref(false)

const links = [
  { to: '/', label: '首页' },
  { to: '/archive', label: '归档' },
  { to: '/share', label: '留言' },
  { to: '/me', label: '我的' },
] as const

const social = [
  {
    href: 'https://space.bilibili.com/',
    label: 'Bilibili',
    key: 'bilibili',
    external: true,
  },
  {
    href: 'https://github.com',
    label: 'GitHub',
    key: 'github',
    external: true,
  },
  {
    href: 'mailto:hello@example.com',
    label: '邮箱',
    key: 'mail',
    external: false,
  },
] as const

watch(
  () => route.fullPath,
  () => {
    open.value = false
  },
)

function linkActive(to: string) {
  if (to === '/') return route.path === '/'
  return route.path === to
}
</script>

<template>
  <div class="site-nav" :class="{ 'site-nav--light': !solid }">
    <nav class="nav-main nav-main--desktop" aria-label="功能导航">
      <RouterLink
        v-for="l in links"
        :key="l.to"
        :to="l.to"
        class="nav__link"
        :class="{ 'nav__link--active': linkActive(l.to) }"
      >
        {{ l.label }}
      </RouterLink>
    </nav>

    <div class="site-nav__aside">
      <nav class="nav-social" aria-label="社交链接">
        <a
          v-for="s in social"
          :key="s.key"
          class="nav-social__link"
          :href="s.href"
          :target="s.external ? '_blank' : undefined"
          :rel="s.external ? 'noopener noreferrer' : undefined"
          :aria-label="s.label"
        >
          <BilibiliIcon v-if="s.key === 'bilibili'" :size="18" :stroke-width="1.75" />
          <Github v-else-if="s.key === 'github'" :size="18" :stroke-width="1.75" />
          <Mail v-else :size="18" :stroke-width="1.75" />
        </a>
      </nav>

      <button
        type="button"
        class="nav__toggle"
        :aria-expanded="open"
        aria-controls="mobile-nav"
        @click="open = !open"
      >
        <Menu v-if="!open" :size="22" :stroke-width="1.75" />
        <X v-else :size="22" :stroke-width="1.75" />
        <span class="sr-only">{{ open ? '关闭菜单' : '打开菜单' }}</span>
      </button>
    </div>

    <div
      v-show="open"
      id="mobile-nav"
      class="nav-main nav-main--mobile"
      aria-label="移动端功能导航"
    >
      <RouterLink
        v-for="l in links"
        :key="l.to"
        :to="l.to"
        class="nav__link"
        :class="{ 'nav__link--active': linkActive(l.to) }"
      >
        {{ l.label }}
      </RouterLink>
    </div>
  </div>
</template>

<style scoped>
.site-nav {
  position: relative;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: flex-end;
  flex: 1;
  min-width: 0;
  gap: 1rem 1.5rem;
  background: transparent;
}

.nav-main {
  display: flex;
  align-items: center;
  gap: 0.65rem;
}

.nav-main--desktop {
  display: none;
  flex: 1;
  justify-content: center;
  min-width: 0;
}

@media (min-width: 768px) {
  .nav-main--desktop {
    display: flex;
  }
  .nav__toggle {
    display: none;
  }
}

.nav-main--mobile {
  flex-basis: 100%;
  flex-direction: column;
  align-items: stretch;
  order: 3;
  padding: 0.75rem 0 0;
  margin: 0;
  border-top: 1px solid var(--border);
}

@media (min-width: 768px) {
  .nav-main--mobile {
    display: none !important;
  }
}

.site-nav__aside {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  flex-shrink: 0;
}

.nav-social {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.nav-social__link {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2.25rem;
  height: 2.25rem;
  color: #ffffff;
  text-decoration: none;
  background: #0a0a0a;
  border: none;
  border-radius: 0.25rem;
  transition:
    background-color 0.28s ease,
    border-color 0.28s ease,
    color 0.28s ease;
}

.nav-social__link:hover {
  background: #262626;
}

.nav__link {
  padding: 0.5rem 0.85rem;
  color: var(--muted);
  text-decoration: none;
  font-size: 0.9375rem;
  border-bottom: 1px solid transparent;
  white-space: nowrap;
  transition:
    color 0.28s ease,
    border-color 0.28s ease;
}

.nav__link:hover {
  color: var(--fg);
}

.nav__link--active {
  color: var(--fg);
  border-bottom-color: var(--fg);
}

.nav-main--mobile .nav__link {
  padding: 0.65rem 0;
  border-bottom: 1px solid var(--border);
}

.nav-main--mobile .nav__link:last-child {
  border-bottom: none;
}

.nav__toggle {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2.5rem;
  height: 2.5rem;
  padding: 0;
  margin-left: 0.35rem;
  border: 1px solid var(--border);
  background: transparent;
  color: var(--fg);
  cursor: pointer;
  transition:
    background-color 0.28s ease,
    border-color 0.28s ease,
    color 0.28s ease;
}

@media (min-width: 768px) {
  .nav__toggle {
    display: none;
  }
}

.nav__toggle:hover {
  background: var(--surface);
}

/* 首页首屏顶栏：透明底 + 白字（需写在默认样式之后以覆盖） */
.site-nav--light .nav__link {
  color: rgba(255, 255, 255, 0.72);
}

.site-nav--light .nav__link:hover {
  color: #ffffff;
}

.site-nav--light .nav__link--active {
  color: #ffffff;
  border-bottom-color: #ffffff;
}

.site-nav--light .nav-main--mobile {
  border-top-color: rgba(255, 255, 255, 0.28);
}

.site-nav--light .nav-main--mobile .nav__link {
  border-bottom-color: rgba(255, 255, 255, 0.2);
}

.site-nav--light .nav-social__link {
  background: rgba(0, 0, 0, 0.4);
  border: 1px solid rgba(255, 255, 255, 0.5);
  color: #ffffff;
}

.site-nav--light .nav-social__link:hover {
  background: rgba(255, 255, 255, 0.14);
  border-color: rgba(255, 255, 255, 0.75);
}

.site-nav--light .nav__toggle {
  border-color: rgba(255, 255, 255, 0.55);
  color: #ffffff;
}

.site-nav--light .nav__toggle:hover {
  background: rgba(255, 255, 255, 0.12);
}

.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}
</style>
