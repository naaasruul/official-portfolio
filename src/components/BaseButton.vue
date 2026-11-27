<script setup>
import { computed, ref } from 'vue'
import { RouterLink } from 'vue-router'
import { motion, useMotionValue, useSpring, useReducedMotion } from 'motion-v'
import AppIcon from './AppIcon.vue'

const props = defineProps({
  variant: { type: String, default: 'primary' }, // primary | secondary | ghost | light | outline-light
  to: { type: [String, Object], default: null },
  href: { type: String, default: null },
  icon: { type: String, default: null },
  magnetic: { type: Boolean, default: false },
  block: { type: Boolean, default: false },
  download: { type: [Boolean, String], default: undefined },
  external: { type: Boolean, default: false },
})

const tag = computed(() => (props.to ? RouterLink : props.href ? 'a' : 'button'))

const classes = computed(() => [
  'group inline-flex items-center justify-center gap-2 rounded-full text-[15px] font-medium leading-5 transition-colors duration-200',
  props.block && 'w-full',
  props.variant === 'primary' && 'bg-accent px-5 py-3 text-white shadow-[0_3px_0_var(--color-ink)] hover:bg-accent-hover active:translate-y-[2px] active:shadow-[0_1px_0_var(--color-ink)]',
  props.variant === 'secondary' && 'bg-surface px-5 py-3 text-ink ring-2 ring-inset ring-ink/15 shadow-[0_3px_0_var(--color-line-strong)] hover:ring-ink/35 active:translate-y-[2px] active:shadow-none',
  props.variant === 'light' && 'bg-white px-5 py-3 text-ink shadow-[0_3px_0_rgba(27,37,89,0.45)] hover:bg-orange-soft active:translate-y-[2px] active:shadow-none',
  props.variant === 'outline-light' && 'px-5 py-3 text-white ring-2 ring-inset ring-white/45 hover:bg-white/10 hover:ring-white',
  props.variant === 'ghost' && 'py-2 text-accent hover:text-accent-hover',
])

// Magnetic pull toward the cursor (fine pointers only, off for reduced motion).
const reduce = useReducedMotion()
const x = useMotionValue(0)
const y = useMotionValue(0)
const sx = useSpring(x, { stiffness: 260, damping: 18, mass: 0.4 })
const sy = useSpring(y, { stiffness: 260, damping: 18, mass: 0.4 })
const el = ref(null)

function onMove(e) {
  if (!props.magnetic || reduce.value || e.pointerType !== 'mouse') return
  const r = e.currentTarget.getBoundingClientRect()
  x.set(((e.clientX - r.left) / r.width - 0.5) * 12)
  y.set(((e.clientY - r.top) / r.height - 0.5) * 10)
}
function onLeave() {
  x.set(0)
  y.set(0)
}
</script>

<template>
  <motion.span
    class="inline-flex"
    :class="block && 'w-full'"
    :style="{ x: sx, y: sy }"
    @pointermove="onMove"
    @pointerleave="onLeave"
  >
    <component
      :is="tag"
      ref="el"
      :to="to || undefined"
      :href="href || undefined"
      :download="download"
      :target="external ? '_blank' : undefined"
      :rel="external ? 'noopener' : undefined"
      :class="classes"
    >
      <slot />
      <AppIcon
        v-if="icon"
        :name="icon"
        class="transition-transform duration-300 ease-out-soft"
        :class="{
          'group-hover:translate-x-0.5': icon === 'arrow-right',
          'group-hover:translate-y-0.5': icon === 'download',
          'group-hover:-translate-y-0.5 group-hover:translate-x-0.5': icon === 'arrow-up-right',
        }"
      />
    </component>
  </motion.span>
</template>
