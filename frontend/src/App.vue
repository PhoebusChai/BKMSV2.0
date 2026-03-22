<script setup lang="ts">
import { RouterView } from 'vue-router'
import SiteHeader from './components/SiteHeader.vue'
import SiteFooter from './components/SiteFooter.vue'
</script>

<template>
  <div class="app">
    <SiteHeader />
    <RouterView />
    <SiteFooter />
  </div>
</template>

<style scoped>
.app {
  width: 100%;
  min-height: 100svh;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  background: var(--bg);
  color: var(--fg);
}
</style>
