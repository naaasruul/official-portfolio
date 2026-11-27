<script setup>
import { computed, ref } from 'vue'
import { motion, useInView } from 'motion-v'

// Reveals text word by word. `lines` lets a headline keep its own line breaks.
// With `onView`, the whole block waits until it scrolls into view.
const props = defineProps({
  lines: { type: Array, required: true },
  delay: { type: Number, default: 0 },
  stagger: { type: Number, default: 0.045 },
  onView: { type: Boolean, default: false },
  lineClasses: { type: Array, default: () => [] },
})

const root = ref(null)
const inView = useInView(root, { once: true, amount: 0.4 })
const show = computed(() => !props.onView || inView.value)

const words = computed(() => {
  let i = 0
  return props.lines.map((line) => line.split(' ').map((w) => ({ text: w, i: i++ })))
})

const hidden = { opacity: 0, y: '60%', filter: 'blur(6px)' }
const visible = { opacity: 1, y: '0%', filter: 'blur(0px)' }
</script>

<template>
  <span ref="root" class="block">
    <span v-for="(line, li) in words" :key="li" class="block" :class="lineClasses[li]">
      <span
        v-for="word in line"
        :key="word.i"
        class="inline-block overflow-hidden pb-[0.08em] align-top"
      >
        <motion.span
          class="inline-block"
          :initial="hidden"
          :animate="show ? visible : hidden"
          :transition="{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: delay + word.i * stagger }"
        >{{ word.text }}</motion.span>&nbsp;
      </span>
    </span>
  </span>
</template>
