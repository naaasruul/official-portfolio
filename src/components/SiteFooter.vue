<script setup>
import site from '../data/site.json'
const year = new Date().getFullYear()
</script>

<template>
  <footer class="border-t border-line">
    <div class="container-page flex flex-col gap-2 py-7 md:flex-row md:items-center md:justify-between">
      <p class="text-sm text-ink-3">© {{ year }} {{ site.name }}</p>
      <p class="eyebrow text-ink-3">Built with Vue + Motion</p>
    </div>
  </footer>
</template>
