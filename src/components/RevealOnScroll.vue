<script setup>
import { motion } from 'motion-v'

defineProps({
  as: { type: String, default: 'div' },
  delay: { type: Number, default: 0 },
  y: { type: Number, default: 18 },
  amount: { type: Number, default: 0.25 },
})
</script>

<template>
  <component
    :is="motion[as]"
    :initial="{ opacity: 0, y }"
    :while-in-view="{ opacity: 1, y: 0 }"
    :in-view-options="{ once: true, amount }"
    :transition="{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay }"
  >
    <slot />
  </component>
</template>
