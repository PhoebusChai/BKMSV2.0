<script setup lang="ts">
withDefaults(
  defineProps<{
    size?: number
    strokeWidth?: number
  }>(),
  { size: 18, strokeWidth: 1.75 },
)
</script>

<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    :width="size"
    :height="size"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    :stroke-width="strokeWidth"
    stroke-linecap="round"
    stroke-linejoin="round"
    aria-hidden="true"
  >
    <!-- 极简电视 + 播放三角，示意视频站外链 -->
    <rect x="2" y="4" width="20" height="13" rx="2" />
    <path d="M8 21h8" />
    <path d="M12 17v4" />
    <polygon points="10 8 15 10.5 10 13 10 8" fill="currentColor" stroke="none" />
  </svg>
</template>
