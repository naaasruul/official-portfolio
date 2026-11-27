<script setup>
import { motion } from 'motion-v'

defineProps({ label: { type: String, required: true } })
</script>

<template>
  <span class="inline-flex items-center gap-2 rounded-full bg-surface ring-2 ring-inset ring-line py-1.5 pl-2.5 pr-3 text-sm text-ink">
    <span class="relative flex size-2">
      <motion.span
        class="absolute inset-0 rounded-full bg-ok"
        :animate="{ scale: [1, 2.6], opacity: [0.5, 0] }"
        :transition="{ duration: 2, repeat: Infinity, ease: 'easeOut' }"
      />
      <span class="relative size-2 rounded-full bg-ok" />
    </span>
    {{ label }}
  </span>
</template>
