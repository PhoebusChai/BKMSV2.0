<script setup lang="ts">
import { Mail, User, ChevronLeft, ChevronRight } from 'lucide-vue-next'
import { computed, onMounted, onUnmounted, ref } from 'vue'

const portraitImage =
  'https://images.unsplash.com/photo-1520975916090-3105956dac38?auto=format&fit=crop&w=1000&q=80'

const aboutSlogan = '把热爱写进代码里。'
const aboutSloganSub = 'Less noise. More intent.'

const aboutMe = {
  basic: {
    '年龄': '23岁',
    '邮箱': 'chaiguoliang8888@163.com',
    '博客': 'chaiguoliang8888.top',
  },
  skills: [
    'Java SE / Spring Boot',
    'FastAPI：异步与高并发',
    'WebSocket / SSE 流式',
    'LLM API + ASR-LLM-TTS',
    'MCP 协同 + Agent Registry',
    '统一任务调用接口',
    '工程化：Redis / MySQL / SQLite',
    'Vue3 / 状态管理 / Tauri',
    'Docker Compose 一键部署',
    'vLLM 本地推理 + OpenAI 兼容',
  ],
  education: {
    '学校': '牡丹江师范学院',
    '专业': '计算机科学与技术',
    '主修课程': 'Java 程序设计与开发、Web 应用与开发、算法竞赛、数据库应用、软件工程等。',
    '时间': '2022.06 - 2026.06',
    'GPA': '3.3/4.0（年级前 5%）',
  },
  internships: [
    {
      company: '北京聚流沙科技有限公司',
      role: '全栈研发工程师',
      product: 'AI 办公与知识服务平台（知识库+智能体协同平台）',
      period: '2025.10 - 2026.03',
      location: '北京',
    },
    {
      company: '上海哲演信息科技有限公司',
      role: '全栈研发工程师（AI应用方向）',
      product: 'AI 互动娱乐产品（音视频与多模态对话）',
      period: '2025.07 - 2025.09',
      location: '上海',
    },
  ],
  projects: [
    {
      name: '智能文件翻译系统',
      period: '2025.12 - 2026.02',
      stack:
        '核心技术栈：Java、Spring Boot、FastAPI、PaddleOCR 3.3、PyMuPDF、BabelDOC、MySQL、Docker Compose、HTTPX',
    },
    {
      name: '智能体协同平台（AI 办公与知识服务平台）',
      period: '2025.10 - 2026.03',
      stack: '核心技术栈：Python、FastAPI、Redis、WebSocket、SSE、MCP、多智能体调度',
    },
    {
      name: 'AI 多模态对话桌面助手',
      period: '2025.06 - 2025.09',
      stack:
        '核心技术栈：Vue3、Tauri、FastAPI、OpenAI API、WhisperX、DeepSeek、Redis、LangChain、MCP、SQLite、GPT-SoVITS',
    },
  ],
} as const

const latestPhotos = [
  {
    src: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1400&q=80',
    date: '2026-03-21',
    location: '上海',
  },
  {
    src: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1400&q=80',
    date: '2026-03-18',
    location: '杭州',
  },
  {
    src: 'https://images.unsplash.com/photo-1520975682031-ae3e3b1d2f8b?auto=format&fit=crop&w=1400&q=80',
    date: '2026-03-12',
    location: '北京',
  },
  {
    src: 'https://images.unsplash.com/photo-1520975958225-9f6b0a9c7b2b?auto=format&fit=crop&w=1400&q=80',
    date: '2026-03-04',
    location: '成都',
  },
]

const active = ref(0)
let timer: ReturnType<typeof setInterval> | undefined

const activePhoto = computed(() => latestPhotos[active.value])

function prev() {
  active.value = (active.value - 1 + latestPhotos.length) % latestPhotos.length
}

function next() {
  active.value = (active.value + 1) % latestPhotos.length
}

onMounted(() => {
  // 4.5s 自动播放；如果用户手动切换也能继续轮播
  timer = setInterval(next, 4500)
})

onUnmounted(() => {
  if (timer) clearInterval(timer)
})
</script>

<template>
  <main class="page">
    <header class="page__head">
      <p class="page__label">
        <User :size="16" :stroke-width="1.75" aria-hidden="true" />
        我的
      </p>
      <h1 class="page__title">你好，这里是码了个BUG个人博客</h1>
    </header>

    <section class="about-layout" aria-label="关于我布局">
      <figure class="about-portrait" aria-label="个人大图">
        <img :src="portraitImage" alt="关于我大图" />
      </figure>

      <div class="about-right">
        <section class="intro-card" aria-label="个人介绍">
          <div class="intro-slogan" aria-label="标语">
            <p class="intro-slogan__eyebrow">SLOGAN</p>
            <p class="intro-slogan__main">{{ aboutSlogan }}</p>
            <p class="intro-slogan__sub">{{ aboutSloganSub }}</p>
          </div>
          <h2 class="intro-card__title">关于我</h2>
          <div class="about-section">
            <h3 class="about-section__title">联系与联系方式</h3>
            <dl class="about-dl">
              <template v-for="(value, key) in aboutMe.basic" :key="key">
                <div class="about-dl__row">
                  <dt class="about-dl__key">{{ key }}</dt>
                  <dd class="about-dl__value">{{ value }}</dd>
                </div>
              </template>
            </dl>
          </div>

          <div class="about-section">
            <h3 class="about-section__title">核心技术栈</h3>
            <div class="tech-tags" aria-label="技术标签">
              <span v-for="s in aboutMe.skills" :key="s" class="tech-tag">
                {{ s }}
              </span>
            </div>
          </div>
        </section>

        <section class="latest-card" aria-label="最新照片">
          <header class="latest-card__head">
            <h3 class="latest-card__title">最新照片</h3>
            <div class="carousel__controls" aria-label="轮播控制">
              <button type="button" class="carousel__btn" @click="prev" aria-label="上一张">
                <ChevronLeft :size="18" :stroke-width="1.75" aria-hidden="true" />
              </button>
              <button type="button" class="carousel__btn" @click="next" aria-label="下一张">
                <ChevronRight :size="18" :stroke-width="1.75" aria-hidden="true" />
              </button>
            </div>
          </header>

          <div class="carousel" aria-label="轮播图片">
            <div class="carousel__viewport">
              <div class="carousel__frame">
                <img
                  v-for="(photo, idx) in latestPhotos"
                  :key="photo.src"
                  class="carousel__img"
                  :class="{ 'carousel__img--active': idx === active }"
                  :src="photo.src"
                  :alt="`最新照片 ${idx + 1}`"
                  loading="lazy"
                />
              </div>
              <div class="carousel__caption" aria-label="图片日期地点">
                <div class="carousel__caption-row">
                  <span class="carousel__cap-label">日期</span>
                  <span class="carousel__cap-value">{{ activePhoto.date }}</span>
                </div>
                <div class="carousel__caption-row">
                  <span class="carousel__cap-label">地点</span>
                  <span class="carousel__cap-value">{{ activePhoto.location }}</span>
                </div>
              </div>
            </div>

            <div class="carousel__dots" aria-label="轮播指示器">
              <button
                v-for="(photo, idx) in latestPhotos"
                :key="photo.src"
                type="button"
                class="carousel__dot"
                :class="{ 'carousel__dot--active': idx === active }"
                :aria-label="`跳转到第 ${idx + 1} 张`"
                @click="active = idx"
              />
            </div>
          </div>
        </section>
      </div>
    </section>

    <section class="contact" aria-label="联系">
      <h2 class="contact__title">联系</h2>
      <a class="contact__link" href="mailto:hello@example.com">
        <Mail :size="18" :stroke-width="1.75" aria-hidden="true" />
        hello@example.com
      </a>
    </section>
  </main>
</template>

<style scoped>
.page {
  max-width: min(80rem, 96vw);
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
  margin: 0;
  font-size: clamp(1.75rem, 4vw, 2.25rem);
  font-weight: 600;
  letter-spacing: -0.03em;
  line-height: 1.2;
  color: var(--fg);
}

.about-layout {
  display: grid;
  grid-template-columns: minmax(0, 0.42fr) minmax(0, 0.58fr);
  gap: 1.5rem;
  align-items: stretch;
}

.about-portrait {
  margin: 0;
  padding: 0;
  border: 1px solid var(--border);
  background: var(--surface);
  overflow: hidden;
}

.about-portrait img {
  width: 100%;
  aspect-ratio: 9 / 16;
  height: auto;
  object-fit: cover;
  display: block;
}

.about-right {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  height: 100%;
}

.intro-card,
.latest-card {
  border: 1px solid var(--border);
  background: #fff;
  padding: 1rem;
}

.latest-card {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.intro-slogan {
  border-left: 2px solid var(--fg);
  padding-left: 0.75rem;
  margin-bottom: 0.75rem;
}

.intro-slogan__eyebrow {
  margin: 0 0 0.25rem;
  font-size: 0.6875rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--muted);
}

.intro-slogan__main {
  margin: 0 0 0.25rem;
  font-size: 1.05rem;
  font-weight: 650;
  letter-spacing: -0.01em;
  line-height: 1.45;
}

.intro-slogan__sub {
  margin: 0;
  font-size: 0.8125rem;
  color: var(--fg-muted);
  line-height: 1.6;
}

.intro-card__title {
  margin: 0 0 0.65rem;
  font-size: 1.05rem;
  font-weight: 600;
  letter-spacing: -0.01em;
}

.intro-card__text {
  margin: 0 0 0.9rem;
  font-size: 0.95rem;
  line-height: 1.75;
  color: var(--fg-muted);
}

.intro-card__text:last-child {
  margin-bottom: 0;
}

.about-section {
  margin-top: 1rem;
  padding-top: 0.85rem;
  border-top: 1px solid var(--border);
}

.about-section:first-of-type {
  margin-top: 0;
  padding-top: 0;
  border-top: none;
}

.about-section__title {
  margin: 0 0 0.75rem;
  font-size: 0.95rem;
  font-weight: 650;
  letter-spacing: -0.01em;
  color: var(--fg);
}

.about-dl {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
}

.about-dl__row {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 1rem;
  min-width: 0;
}

.about-dl__key {
  font-size: 0.85rem;
  color: var(--muted);
  white-space: nowrap;
}

.about-dl__value {
  margin: 0;
  font-size: 0.9rem;
  color: var(--fg);
  font-weight: 500;
  text-align: right;
  overflow-wrap: anywhere;
}

.about-ul {
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 0.55rem;
}

.about-ul--tight {
  gap: 0.4rem;
}

.about-education__line {
  margin: 0 0 0.55rem;
  color: var(--fg-muted);
  line-height: 1.7;
  font-size: 0.95rem;
}

.about-education__line strong {
  color: var(--fg);
  font-weight: 650;
}

.about-education__line:last-child {
  margin-bottom: 0;
}

.about-periods {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.about-period {
  padding: 0.5rem 0 0;
}

.about-period__head {
  margin: 0 0 0.35rem;
  color: var(--fg);
  font-size: 0.95rem;
  font-weight: 600;
}

.about-period__meta {
  margin: 0 0 0.55rem;
  color: var(--muted);
  font-size: 0.9rem;
  line-height: 1.6;
}

.about-paragraph {
  margin: 0;
  color: var(--fg-muted);
  font-size: 0.95rem;
  line-height: 1.75;
}

.about-paragraph--compact {
  margin: 0 0 0.55rem;
}

.about-paragraph--compact:last-child {
  margin-bottom: 0;
}

.tech-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.tech-tag {
  display: inline-flex;
  align-items: center;
  padding: 0.25rem 0.6rem;
  border: 1px solid var(--border);
  border-radius: 999px;
  background: var(--surface);
  color: var(--muted);
  font-size: 0.82rem;
  line-height: 1.5;
  max-width: 100%;
}

.tech-tag:hover {
  border-color: rgba(10, 10, 10, 0.35);
  color: var(--fg);
}

@media (max-width: 520px) {
  .about-dl__row {
    flex-direction: column;
    align-items: flex-start;
  }

  .about-dl__key {
    white-space: normal;
  }

  .about-dl__value {
    text-align: left;
  }
}

.latest-card__head {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 1rem;
  margin-bottom: 0.75rem;
  flex-shrink: 0;
}

.latest-card__title {
  margin: 0;
  font-size: 1rem;
  font-weight: 600;
  letter-spacing: -0.01em;
}

.carousel__controls {
  display: inline-flex;
  gap: 0.35rem;
}

.carousel__btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2.2rem;
  height: 2.2rem;
  padding: 0;
  border: 1px solid var(--border);
  border-radius: 0.25rem;
  background: transparent;
  color: var(--fg);
  cursor: pointer;
  transition: background-color 0.2s ease, border-color 0.2s ease, opacity 0.2s ease;
}

.carousel__btn:hover {
  background: var(--surface);
}

.carousel__viewport {
  width: 100%;
  background: #ffffff;
  border: 1px solid var(--border);
  border-radius: 0.25rem;
  padding: 0.6rem 0.6rem 0.45rem;
  box-shadow: 0 6px 22px rgba(10, 10, 10, 0.06);
}

.carousel__frame {
  width: 100%;
  aspect-ratio: 16 / 9;
  overflow: hidden;
  border-radius: 0.15rem;
  background: var(--surface);
  border: 1px solid rgba(10, 10, 10, 0.05);
  position: relative;
  max-height: 14.5rem;
}

.carousel__caption {
  padding: 0.65rem 0.15rem 0;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.45rem;
}

.carousel__caption-row {
  display: flex;
  align-items: baseline;
  gap: 0.5rem;
  min-width: 0;
}

.carousel__cap-label {
  font-size: 0.7rem;
  letter-spacing: 0.08em;
  color: var(--muted);
  text-transform: uppercase;
}

.carousel__cap-value {
  font-size: 0.85rem;
  color: var(--fg);
  font-weight: 500;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.carousel__track {
  width: 100%;
  height: 100%;
  display: flex;
  transition: transform 0.35s ease;
}

.carousel__img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  position: absolute;
  inset: 0;
  opacity: 0;
  transition: opacity 0.35s ease;
}

.carousel__img--active {
  opacity: 1;
}

.carousel__dots {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  margin-top: 0.7rem;
}

.carousel__dot {
  width: 0.5rem;
  height: 0.5rem;
  padding: 0;
  border-radius: 999px;
  border: 1px solid var(--border);
  background: transparent;
  cursor: pointer;
}

.carousel__dot--active {
  background: var(--fg);
  border-color: var(--fg);
}

.contact {
  margin-top: 2.25rem;
  padding-top: 1.25rem;
  border-top: 1px solid var(--border);
}

.contact__title {
  margin: 0 0 0.75rem;
  font-size: 1rem;
  font-weight: 600;
  color: var(--fg);
}

.contact__link {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--fg);
  text-decoration: none;
  border-bottom: 1px solid var(--fg);
  padding-bottom: 0.1rem;
  width: fit-content;
}

.contact__link:hover {
  opacity: 0.7;
}

@media (max-width: 900px) {
  .about-layout {
    grid-template-columns: 1fr;
    align-items: start;
  }

  .about-portrait img {
    aspect-ratio: 9 / 16;
  }
}

@media (max-width: 480px) {
  .carousel__caption {
    grid-template-columns: 1fr;
  }
}
</style>
