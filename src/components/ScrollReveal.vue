<script setup>
import { onMounted, ref, onUnmounted } from 'vue'

const props = defineProps({
  delay: {
    type: Number,
    default: 0
  },
  duration: {
    type: Number,
    default: 800
  },
  direction: {
    type: String,
    default: 'up' // 'up', 'down', 'left', 'right', 'none'
  }
})

const revealRef = ref(null)
const isVisible = ref(false)
let observer = null

onMounted(() => {
  // Support accessibility preferences (no animations if user prefers reduced motion)
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    isVisible.value = true
    return
  }

  observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        isVisible.value = true
        if (revealRef.value) {
          observer.unobserve(revealRef.value)
        }
      }
    },
    {
      threshold: 0.05,
      rootMargin: '0px 0px -40px 0px' // triggers slightly before entering the screen
    }
  )

  if (revealRef.value) {
    observer.observe(revealRef.value)
  }
})

onUnmounted(() => {
  if (observer && revealRef.value) {
    observer.disconnect()
  }
})

const getDirectionClass = () => {
  if (props.direction === 'up') return 'translate-y-12'
  if (props.direction === 'down') return '-translate-y-12'
  if (props.direction === 'left') return 'translate-x-12'
  if (props.direction === 'right') return '-translate-x-12'
  return ''
}
</script>

<template>
  <div
    ref="revealRef"
    class="transition-all ease-out"
    :class="[
      isVisible ? 'opacity-100 translate-x-0 translate-y-0' : `opacity-0 ${getDirectionClass()}`
    ]"
    :style="{
      transitionDelay: `${props.delay}ms`,
      transitionDuration: `${props.duration}ms`
    }"
  >
    <slot />
  </div>
</template>
