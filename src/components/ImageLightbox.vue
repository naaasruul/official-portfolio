<script setup>
import { computed, watch, onBeforeUnmount, ref, nextTick } from 'vue'
import { motion, AnimatePresence } from 'motion-v'
import AppIcon from './AppIcon.vue'

// Full-screen viewer for project designs. v-model is the open index (null = closed).
// An item with `scroll: true` (a long showcase poster) opens as one scrollable screen.
const props = defineProps({
  items: { type: Array, required: true },
  title: { type: String, default: '' },
})
const index = defineModel({ type: [Number, null], default: null })

const open = computed(() => index.value !== null)
const item = computed(() => (open.value ? props.items[index.value] : null))
const isScroll = computed(() => !!item.value?.scroll)
const closeBtn = ref(null)
const scroller = ref(null)
const scrolled = ref(0)
let returnFocus = null

const go = (step) => {
  const n = props.items.length
  index.value = (index.value + step + n) % n
}
const close = () => (index.value = null)

const onKey = (e) => {
  if (e.key === 'Escape') close()
  else if (isScroll.value) return
  else if (e.key === 'ArrowRight') go(1)
  else if (e.key === 'ArrowLeft') go(-1)
}

const onScroll = () => {
  const el = scroller.value
  if (!el) return
  const max = el.scrollHeight - el.clientHeight
  scrolled.value = max > 0 ? el.scrollTop / max : 0
}

watch(open, async (isOpen) => {
  if (isOpen) {
    returnFocus = document.activeElement
    document.addEventListener('keydown', onKey)
    document.documentElement.style.overflow = 'hidden'
    scrolled.value = 0
    await nextTick()
    // In scroll mode, focus the scroller so arrow keys and space scroll the poster.
    ;(isScroll.value ? scroller.value : closeBtn.value)?.focus({ preventScroll: true })
  } else {
    document.removeEventListener('keydown', onKey)
    document.documentElement.style.overflow = ''
    returnFocus?.focus?.()
  }
})
onBeforeUnmount(() => {
  document.removeEventListener('keydown', onKey)
  document.documentElement.style.overflow = ''
})
</script>

<template>
  <Teleport to="body">
    <AnimatePresence>
      <motion.div
        v-if="open"
        class="fixed inset-0 z-[80] flex flex-col bg-ink/95"
        role="dialog"
        aria-modal="true"
        :aria-label="`${title} designs`"
        :initial="{ opacity: 0 }"
        :animate="{ opacity: 1 }"
        :exit="{ opacity: 0 }"
        :transition="{ duration: 0.25 }"
        @click.self="close"
      >
        <div class="relative flex items-center justify-between gap-4 px-5 py-4 text-white md:px-8">
          <p class="eyebrow text-white/70">
            <template v-if="isScroll">{{ title }} · scroll to explore</template>
            <template v-else>{{ index + 1 }} / {{ items.length }}</template>
          </p>
          <button
            ref="closeBtn"
            type="button"
            class="grid size-11 place-items-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
            aria-label="Close"
            @click="close"
          >
            <AppIcon name="close" :size="20" />
          </button>
          <span
            v-if="isScroll"
            class="absolute inset-x-0 bottom-0 h-0.5 origin-left bg-orange"
            :style="{ transform: `scaleX(${scrolled})` }"
            aria-hidden="true"
          />
        </div>

        <!-- Long poster: one scrollable screen -->
        <div
          v-if="isScroll"
          ref="scroller"
          tabindex="0"
          class="min-h-0 flex-1 overflow-y-auto overscroll-contain px-3 pb-10 focus:outline-none md:px-10"
          @scroll.passive="onScroll"
          @click.self="close"
        >
          <motion.img
            :src="item.src"
            :alt="`${title} design showcase`"
            class="mx-auto w-full max-w-[1200px] rounded-2xl shadow-[0_30px_80px_-20px_rgba(0,0,0,0.6)]"
            :initial="{ opacity: 0, y: 24 }"
            :animate="{ opacity: 1, y: 0 }"
            :transition="{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }"
          />
        </div>

        <!-- Single images with prev / next -->
        <template v-else>
          <div class="relative flex min-h-0 flex-1 items-center justify-center px-4 md:px-20" @click.self="close">
            <AnimatePresence mode="wait">
              <motion.img
                :key="item.src"
                :src="item.src"
                :alt="item.caption || `${title} design ${index + 1}`"
                class="max-h-full max-w-full rounded-2xl object-contain shadow-[0_30px_80px_-20px_rgba(0,0,0,0.6)]"
                :initial="{ opacity: 0, scale: 0.97 }"
                :animate="{ opacity: 1, scale: 1 }"
                :exit="{ opacity: 0, scale: 0.97 }"
                :transition="{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }"
              />
            </AnimatePresence>

            <template v-if="items.length > 1">
              <button
                type="button"
                class="absolute left-2 top-1/2 grid size-12 -translate-y-1/2 place-items-center rounded-full bg-white text-ink shadow-lg transition-transform hover:-translate-x-0.5 md:left-6"
                aria-label="Previous design"
                @click="go(-1)"
              >
                <AppIcon name="arrow-left" :size="20" />
              </button>
              <button
                type="button"
                class="absolute right-2 top-1/2 grid size-12 -translate-y-1/2 place-items-center rounded-full bg-white text-ink shadow-lg transition-transform hover:translate-x-0.5 md:right-6"
                aria-label="Next design"
                @click="go(1)"
              >
                <AppIcon name="arrow-right" :size="20" />
              </button>
            </template>
          </div>

          <p class="min-h-14 px-5 py-4 text-center text-sm leading-[22px] text-white/80">{{ item.caption }}</p>
        </template>
      </motion.div>
    </AnimatePresence>
  </Teleport>
</template>
