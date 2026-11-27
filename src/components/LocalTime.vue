<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

const props = defineProps({
  timezone: { type: String, required: true },
  place: { type: String, required: true },
})

const fmt = new Intl.DateTimeFormat('en-US', { timeZone: props.timezone, hour: 'numeric', minute: '2-digit' })
const now = ref(fmt.format(new Date()))
let timer
onMounted(() => { timer = setInterval(() => { now.value = fmt.format(new Date()) }, 15000) })
onBeforeUnmount(() => clearInterval(timer))
</script>

<template>
  <span class="eyebrow text-ink-3">{{ place }} · <time>{{ now }}</time></span>
</template>
