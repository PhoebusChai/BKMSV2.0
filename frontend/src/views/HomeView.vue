<script setup lang="ts">
import { ChevronDown } from 'lucide-vue-next'
import PostCard from '../components/PostCard.vue'
import { getPostsSorted } from '../data/posts'

const list = getPostsSorted()

/** 可改为本地图：将图片放到 public/ 后写 '/hero.jpg' */
const heroImage =
  'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1920&q=80'
</script>

<template>
  <main class="home">
    <section class="hero" aria-label="封面">
      <div
        class="hero__bg"
        :style="{ backgroundImage: `url(${heroImage})` }"
        aria-hidden="true"
      />
      <div class="hero__scrim" aria-hidden="true" />
      <div class="hero__content">
        <div class="hero__intro">
          <p class="hero__eyebrow">码了个BUG</p>
          <h1 class="hero__tagline">关于转生成程序员之后，我靠二次元续命这档事</h1>
        </div>
        <a class="hero__cta" href="#posts">
          浏览文章
          <ChevronDown :size="18" :stroke-width="2" aria-hidden="true" />
        </a>
      </div>
    </section>

    <div class="page-content" id="posts">
      <header class="section-head">
        <h2 class="section-head__title">最新文章</h2>
        <p class="section-head__lead">按时间倒序排列</p>
      </header>

      <section class="page__list" aria-label="文章列表">
        <PostCard v-for="p in list" :key="p.id" :post="p" />
      </section>
    </div>
  </main>
</template>

<style scoped>
.home {
  width: 100%;
  margin: 0;
  padding: 0;
  /* 整块主内容上移与顶栏重叠，首屏背景从视口最顶开始铺（顶栏透明时不再露白） */
  margin-top: calc(
    -1 * (var(--site-header-height) + env(safe-area-inset-top, 0px)) - 1px
  );
}

.hero {
  display:flex;
  height: 100vh;
}

.hero__bg {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 100vh;
  background-color: #000000;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

.hero__scrim {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 100%;
  background: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0.35) 0%,
    rgba(0, 0, 0, 0.5) 45%,
    rgba(0, 0, 0, 0.55) 100%
  );
}

.hero__content {
  position: relative;
  z-index: 1;
  flex: 1;
  width: 100%;
  max-width: min(44rem, 94vw);
  margin: 0 auto;
  padding: 0 1.5rem;
  padding-bottom: max(clamp(2.5rem, 8vh, 4.5rem), env(safe-area-inset-bottom, 0px));
  text-align: center;
  color: #ffffff;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;
}

.hero__intro {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  min-height: 0;
  padding-bottom: 1rem;
}

.hero__eyebrow {
  margin: 0 0 1.125rem;
  font-size: 0.75rem;
  letter-spacing: 0.28em;
  text-transform: uppercase;
  opacity: 0.82;
  font-weight: 500;
}

.hero__tagline {
  margin: 0 0 1.125rem;
  font-size: clamp(1.2rem, 3.4vw, 1.9rem);
  font-weight: 600;
  letter-spacing: 0.02em;
  line-height: 1.45;
  text-shadow: 0 2px 3rem rgba(0, 0, 0, 0.45);
  text-wrap: balance;
}

.hero__sub {
  margin: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.3rem;
  font-size: clamp(0.9375rem, 2.2vw, 1.0625rem);
  line-height: 1.55;
  letter-spacing: 0.08em;
  font-weight: 400;
  opacity: 0.88;
}

.hero__sub-line {
  display: block;
}

.hero__cta {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.45rem;
  flex-shrink: 0;
  margin-top: 0;
  padding: 0.85rem 1.75rem;
  border: 1px solid rgba(255, 255, 255, 0.9);
  border-radius: 0.25rem;
  color: #ffffff;
  text-decoration: none;
  font-size: 0.9375rem;
  font-weight: 500;
  transition:
    background-color 0.2s ease,
    color 0.2s ease,
    border-color 0.2s ease;
}

.hero__cta:hover {
  background-color: #ffffff;
  color: #0a0a0a;
  border-color: #ffffff;
}

.hero__cta:focus-visible {
  outline: 2px solid #ffffff;
  outline-offset: 3px;
}

.page-content {
  max-width: var(--content-max);
  margin: 0 auto;
  padding: 3rem 1.25rem 3.5rem;
}

.section-head {
  margin-bottom: 2rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid var(--border);
}

.section-head__title {
  margin: 0 0 0.35rem;
  font-size: 1.375rem;
  font-weight: 600;
  letter-spacing: -0.02em;
  color: var(--fg);
}

.section-head__lead {
  margin: 0;
  font-size: 0.9375rem;
  color: var(--muted);
}

.page__list {
  margin: 0;
}
</style>
