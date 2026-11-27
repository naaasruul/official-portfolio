<script setup>
import { computed } from 'vue'

// Icons live in src/assets/icons/<slug>.svg (from simpleicons.org). Unknown slug → initials tile.
const files = import.meta.glob('../assets/icons/*.svg', { query: '?raw', import: 'default', eager: true })
const paths = Object.fromEntries(
  Object.entries(files).map(([file, raw]) => [file.split('/').pop().replace('.svg', ''), raw.match(/ d="([^"]+)"/)?.[1]]),
)

const props = defineProps({
  name: { type: String, required: true },
  icon: { type: String, default: '' },
  color: { type: String, default: '' },
})
const d = computed(() => paths[props.icon])
const initials = computed(() => props.name.split(/\s+/).map((w) => w[0]).join('').slice(0, 2).toUpperCase())
</script>

<template>
  <span class="grid size-10 shrink-0 place-items-center rounded-xl bg-surface ring-2 ring-inset ring-line">
    <svg v-if="d" viewBox="0 0 24 24" class="size-5" :style="{ fill: color || 'var(--color-ink)' }" aria-hidden="true"><path :d="d" /></svg>
    <span v-else class="font-display text-xs font-bold text-ink-2" aria-hidden="true">{{ initials }}</span>
  </span>
</template>
