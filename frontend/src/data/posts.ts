export interface Post {
  id: string
  title: string
  date: string
  excerpt: string
  cover?: string
  tags: string[]
  contentHtml: string
}

export const posts: Post[] = [
  {
    id: 'minimal-writing',
    title: '极简写作：少即是多',
    date: '2026-03-18',
    excerpt: '在信息过载的时代，留白与克制反而让观点更清晰。',
    cover:
      'https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=1400&q=80',
    tags: ['写作', '思考'],
    contentHtml: `
      <p>极简不是偷懒，而是对读者的尊重。每一段只承担一个意思，每一屏只呈现一个焦点。</p>
      <p>黑白排版的优势在于：没有颜色替你「划重点」，你必须靠结构与节奏完成表达。</p>
      <h2>三个习惯</h2>
      <ul>
        <li>先写提纲，再填内容。</li>
        <li>删去形容词，保留动词与名词。</li>
        <li>发布前朗读一遍，听不顺就改。</li>
      </ul>
    `,
  },
  {
    id: 'vue-notes',
    title: 'Vue 3 组合式 API 随手记',
    date: '2026-03-10',
    excerpt: '用更小的函数块组织逻辑，而不是按选项类型拆分文件。',
    cover:
      'https://images.unsplash.com/photo-1526378722484-bd91ca387e72?auto=format&fit=crop&w=1400&q=80',
    tags: ['Vue', '前端'],
    contentHtml: `
      <p>当组件变大时，<code>setup</code> 里的逻辑可以按「功能」拆成 composable，而不是按 <code>data</code> / <code>methods</code> 机械分类。</p>
      <pre><code>// useTheme.ts
export function useTheme() {
  const dark = ref(false)
  function toggle() { dark.value = !dark.value }
  return { dark, toggle }
}</code></pre>
      <p>这样页面组件只负责拼装，阅读路径更短。</p>
    `,
  },
  {
    id: 'reading-list',
    title: '一季度书单（短评）',
    date: '2026-02-22',
    excerpt: '技术书与非虚构各半，读完再写一页笔记。',
    tags: ['读书', '生活'],
    contentHtml: `
      <p>本季原则：只读能改变行为的文字，否则只做速览。</p>
      <ol>
        <li>《程序员修炼之道》——常读常新。</li>
        <li>《风格的要素》——英文写作圣经。</li>
      </ol>
      <p>读完一本书，用一段话写「对我有什么用」，比摘抄十段更有价值。</p>
    `,
  },
]

export function getPostById(id: string): Post | undefined {
  return posts.find((p) => p.id === id)
}

export function getPostsSorted(): Post[] {
  return [...posts].sort((a, b) => (a.date < b.date ? 1 : -1))
}
