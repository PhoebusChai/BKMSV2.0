<script setup lang="ts">
import { computed } from 'vue'
import { ChevronDown } from 'lucide-vue-next'
import { RouterLink } from 'vue-router'
import PostCard from '../components/PostCard.vue'
import { getPostsSorted } from '../data/posts'

const list = getPostsSorted()
const totalPosts = list.length
const totalTags = computed(() => {
  const set = new Set<string>()
  list.forEach((post) => post.tags.forEach((tag) => set.add(tag)))
  return set.size
})
const latestDate = list[0]?.date ?? '--'
const slogan = '写代码是工作，热爱才是续航。'
const sloganSub = 'Keep shipping, keep curious.'
const popularTags = computed(() => {
  const countMap = new Map<string, number>()
  list.forEach((post) => {
    post.tags.forEach((tag) => {
      countMap.set(tag, (countMap.get(tag) ?? 0) + 1)
    })
  })
  return [...countMap.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, 6)
})

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
      <div class="page-layout">
        <section class="page-main" aria-label="文章主栏">
          <header class="section-head">
            <div class="section-head__left">
              <h2 class="section-head__title">最新文章</h2>
              <p class="section-head__lead">按时间倒序排列</p>
            </div>
            <RouterLink class="section-head__more" to="/archive">查看更多</RouterLink>
          </header>

          <section class="page__list" aria-label="文章列表">
            <PostCard v-for="p in list" :key="p.id" :post="p" />
          </section>
        </section>

        <aside class="page-side" aria-label="侧栏">
          <section class="side-slogan" aria-label="标语展示">
            <p class="side-slogan__eyebrow">SLOGAN</p>
            <p class="side-slogan__main">{{ slogan }}</p>
            <p class="side-slogan__sub">{{ sloganSub }}</p>
          </section>

          <section class="side-box">
            <h3 class="side-box__title">站点笔记</h3>
            <p class="side-box__text">
              记录关于前端、写作与日常思考的短文，保持克制的排版与阅读节奏。
            </p>
          </section>

          <section class="side-box">
            <h3 class="side-box__title">概览</h3>
            <ul class="side-stats">
              <li>
                <span>文章数</span>
                <strong>{{ totalPosts }}</strong>
              </li>
              <li>
                <span>标签数</span>
                <strong>{{ totalTags }}</strong>
              </li>
              <li>
                <span>最近更新</span>
                <strong>{{ latestDate }}</strong>
              </li>
            </ul>
          </section>

          <section class="side-box side-box--fill">
            <h3 class="side-box__title">常见主题</h3>
            <div class="side-tags">
              <span v-for="[tag, count] in popularTags" :key="tag" class="side-tag">
                {{ tag }} · {{ count }}
              </span>
            </div>
          </section>
        </aside>
      </div>

      <section class="about-preview" aria-label="关于我预览">
        <h3 class="about-preview__title">关于我</h3>
        <p class="about-preview__text">
          这是一个保持黑白克制排版、专注代码与思考的小站。你可以从示例文章开始，或直接进入我的页面了解更多。
        </p>
        <RouterLink class="about-preview__link" to="/me">
          进入我的页面
        </RouterLink>
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
  max-width: min(72rem, 96vw);
  margin: 0 auto;
  padding: 1.75rem 1.25rem 2rem;
}

.page-layout {
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  gap: 1.5rem;
}

.page-main {
  min-width: 0;
}

.section-head {
  margin-bottom: 1.1rem;
  padding-bottom: 0.85rem;
  border-bottom: 1px solid var(--border);
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 1rem;
}

.section-head__left {
  min-width: 0;
}

.section-head__more {
  flex-shrink: 0;
  font-size: 0.875rem;
  color: var(--muted);
  text-decoration: none;
  border-bottom: 1px solid transparent;
  padding-bottom: 0.1rem;
  white-space: nowrap;
}

.section-head__more:hover {
  color: var(--fg);
  border-bottom-color: var(--fg);
}

.section-head__more:focus-visible {
  outline: 2px solid var(--fg);
  outline-offset: 3px;
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

.about-preview {
  margin-top: 1.1rem;
  padding-top: 1rem;
  border-top: 1px solid var(--border);
  width: 100%;
}

.about-preview__title {
  margin: 0 0 0.5rem;
  font-size: 1.05rem;
  font-weight: 600;
  letter-spacing: -0.01em;
}

.about-preview__text {
  margin: 0 0 0.85rem;
  font-size: 0.9375rem;
  line-height: 1.7;
  color: var(--muted);
}

.about-preview__link {
  display: inline-flex;
  align-items: center;
  color: var(--fg);
  text-decoration: none;
  border-bottom: 1px solid var(--fg);
  padding-bottom: 0.1rem;
  width: fit-content;
}

.about-preview__link:hover {
  opacity: 0.75;
}

.page-side {
  display: flex;
  flex-direction: column;
  gap: 0.7rem;
}

.side-slogan {
  padding: 1rem;
  border: 1px solid #0a0a0a;
  background: #0a0a0a;
  color: #ffffff;
}

.side-slogan__eyebrow {
  margin: 0 0 0.4rem;
  font-size: 0.6875rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  opacity: 0.72;
}

.side-slogan__main {
  margin: 0 0 0.35rem;
  font-size: 1rem;
  font-weight: 600;
  line-height: 1.45;
}

.side-slogan__sub {
  margin: 0;
  font-size: 0.75rem;
  letter-spacing: 0.04em;
  opacity: 0.82;
}

.side-box {
  border: 1px solid var(--border);
  background: #fff;
  padding: 0.8rem;
}

.side-box--fill {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.side-box__title {
  margin: 0 0 0.6rem;
  font-size: 0.95rem;
  font-weight: 600;
  letter-spacing: 0.01em;
}

.side-box__text {
  margin: 0;
  font-size: 0.875rem;
  line-height: 1.7;
  color: var(--muted);
}

.side-stats {
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 0.45rem;
}

.side-stats li {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 0.8rem;
  color: var(--muted);
  font-size: 0.875rem;
}

.side-stats strong {
  color: var(--fg);
  font-size: 0.875rem;
  font-weight: 500;
}

.side-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.45rem;
  align-content: flex-start;
}

.side-tag {
  display: inline-flex;
  align-items: center;
  padding: 0.15rem 0.45rem;
  border: 1px solid var(--border);
  color: var(--muted);
  font-size: 0.75rem;
}

@media (min-width: 960px) {
  .page-layout {
    grid-template-columns: minmax(0, 1fr) 18rem;
    align-items: stretch;
    gap: 2rem;
    min-height: calc(100vh - var(--site-header-height) - 6rem);
  }

  .page-side {
    position: sticky;
    top: calc(var(--site-header-height) + 1rem);
    height: calc(100vh - var(--site-header-height) - 2rem);
    min-height: 30rem;
  }
}

@media (max-width: 520px) {
  .section-head {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.4rem;
  }

  .section-head__more {
    align-self: flex-end;
  }
}
</style>
