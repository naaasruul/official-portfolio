<script setup>
import { RouterView } from 'vue-router'
import { MotionConfig } from 'motion-v'
import NavBar from './components/NavBar.vue'
import SiteFooter from './components/SiteFooter.vue'
</script>

<template>
  <MotionConfig reduced-motion="user">
    <a href="#main" class="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-ink focus:px-4 focus:py-2 focus:text-white">Skip to content</a>
    <NavBar />
    <main id="main">
      <RouterView :key="$route.path" />
    </main>
    <SiteFooter />
  </MotionConfig>
</template>
