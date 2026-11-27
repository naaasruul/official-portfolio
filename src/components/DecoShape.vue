<script setup>
import { motion } from 'motion-v'

// Decorative shape that pops in when it scrolls into view, then floats gently.
// Placed on section boundaries so the shapes tie one section to the next.
defineProps({
  shape: { type: String, default: 'blob' }, // blob | circle | ring | squiggle | dots
  delay: { type: Number, default: 0 },
  float: { type: Number, default: 6 }, // seconds per float cycle
})
</script>

<template>
  <motion.div
    aria-hidden="true"
    class="deco pointer-events-none absolute z-10"
    :initial="{ scale: 0, opacity: 0, rotate: -25 }"
    :while-in-view="{ scale: 1, opacity: 1, rotate: 0 }"
    :in-view-options="{ once: true, amount: 0.6 }"
    :transition="{ type: 'spring', stiffness: 240, damping: 14, delay }"
  >
    <div class="float" :style="{ animationDuration: `${float}s` }">
      <svg viewBox="0 0 100 100" class="block h-auto w-full overflow-visible">
        <path v-if="shape === 'blob'" fill="currentColor" d="M30 6C48 -2 74 4 88 22C102 40 98 66 82 82C66 98 38 102 20 88C2 74 -4 46 6 28C10 18 18 10 30 6Z" />
        <circle v-else-if="shape === 'circle'" cx="50" cy="50" r="50" fill="currentColor" />
        <circle v-else-if="shape === 'ring'" cx="50" cy="50" r="40" fill="none" stroke="currentColor" stroke-width="14" />
        <path v-else-if="shape === 'squiggle'" d="M6 60 Q18 30 30 60 T54 60 T78 60 T96 50" fill="none" stroke="currentColor" stroke-width="10" stroke-linecap="round" />
        <g v-else-if="shape === 'dots'" fill="currentColor">
          <template v-for="r in 3" :key="r"><circle v-for="c in 3" :key="c" :cx="c * 30 - 10" :cy="r * 30 - 10" r="8" /></template>
        </g>
      </svg>
    </div>
  </motion.div>
</template>

<style scoped>
.float { animation: float ease-in-out infinite alternate; }
@keyframes float {
  from { transform: translateY(0) rotate(0deg); }
  to { transform: translateY(-10px) rotate(6deg); }
}
@media (prefers-reduced-motion: reduce) {
  .float { animation: none; }
}
</style>
