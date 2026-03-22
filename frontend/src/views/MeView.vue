<script setup lang="ts">
import { Mail, User } from 'lucide-vue-next'
</script>

<template>
  <main class="page">
    <header class="page__head">
      <p class="page__label">
        <User :size="16" :stroke-width="1.75" aria-hidden="true" />
        我的
      </p>
      <h1 class="page__title">你好，这里是个人博客</h1>
    </header>

    <div class="about">
      <p>
        本站前端使用 Vue 3 + Vite 构建，图标来自 Lucide，风格刻意保持黑白与大量留白，方便长时间阅读。
      </p>
      <p>
        你可以把这里的示例文章替换成自己的 Markdown / CMS 数据源；当前内容为本地静态示例，便于先搭好版式与路由。
      </p>

      <section class="contact" aria-label="联系">
        <h2 class="contact__title">联系</h2>
        <a class="contact__link" href="mailto:hello@example.com">
          <Mail :size="18" :stroke-width="1.75" aria-hidden="true" />
          hello@example.com
        </a>
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
  margin: 0;
  font-size: clamp(1.75rem, 4vw, 2.25rem);
  font-weight: 600;
  letter-spacing: -0.03em;
  line-height: 1.2;
  color: var(--fg);
}

.about {
  max-width: 40rem;
}

.about p {
  margin: 0 0 1rem;
  font-size: 1rem;
  line-height: 1.75;
  color: var(--fg-muted);
}

.contact {
  margin-top: 2.5rem;
  padding-top: 1.5rem;
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
</style>
