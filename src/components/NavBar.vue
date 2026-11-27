<script setup>
import { ref, watch, onMounted, onBeforeUnmount } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import { motion, AnimatePresence } from 'motion-v'
import AppIcon from './AppIcon.vue'
import BaseButton from './BaseButton.vue'
import site from '../data/site.json'

const links = [
  { label: 'Work', to: '/#work' },
  { label: 'Projects', to: '/projects' },
  { label: 'Skills', to: '/#skills' },
  { label: 'About', to: '/#about' },
]

const scrolled = ref(false)
const open = ref(false)
const route = useRoute()
const onScroll = () => { scrolled.value = window.scrollY > 8 }
onMounted(() => { onScroll(); window.addEventListener('scroll', onScroll, { passive: true }) })
onBeforeUnmount(() => window.removeEventListener('scroll', onScroll))
watch(() => route.fullPath, () => { open.value = false })
</script>

<template>
  <header
    class="sticky top-0 z-50 border-b transition-colors duration-300"
    :class="scrolled || open ? 'border-line bg-bg/85 backdrop-blur-md' : 'border-transparent bg-bg'"
  >
    <nav class="container-page flex h-16 items-center justify-between" aria-label="Main">
      <RouterLink to="/" class="flex items-center gap-2.5 font-display text-[17px] font-bold text-ink">
        <span class="relative grid size-8 place-items-center rounded-xl bg-ink font-display text-[15px] font-bold text-white">{{ site.shortName[0] }}<span class="absolute -right-0.5 -top-0.5 size-2.5 rounded-full bg-orange ring-2 ring-bg" /></span>
        {{ site.name }}
      </RouterLink>

      <div class="hidden items-center gap-9 md:flex">
        <RouterLink
          v-for="l in links"
          :key="l.label"
          :to="l.to"
          class="relative text-sm text-ink-2 transition-colors hover:text-ink after:absolute after:-bottom-1 after:left-0 after:h-px after:w-full after:origin-left after:scale-x-0 after:bg-ink after:transition-transform after:duration-300 hover:after:scale-x-100"
        >{{ l.label }}</RouterLink>
        <BaseButton variant="secondary" to="/#contact" magnetic class="[&_a]:py-2">Contact</BaseButton>
      </div>

      <button
        class="grid size-10 place-items-center rounded-full text-ink md:hidden"
        :aria-expanded="open"
        aria-label="Toggle menu"
        @click="open = !open"
      >
        <AppIcon :name="open ? 'close' : 'menu'" :size="22" />
      </button>
    </nav>

    <AnimatePresence>
      <motion.div
        v-if="open"
        class="overflow-hidden border-t border-line md:hidden"
        :initial="{ height: 0, opacity: 0 }"
        :animate="{ height: 'auto', opacity: 1 }"
        :exit="{ height: 0, opacity: 0 }"
        :transition="{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }"
      >
        <div class="container-page flex flex-col py-3">
          <motion.div
            v-for="(l, i) in [...links, { label: 'Contact', to: '/#contact' }]"
            :key="l.label"
            :initial="{ opacity: 0, x: -8 }"
            :animate="{ opacity: 1, x: 0 }"
            :transition="{ delay: 0.05 + i * 0.04 }"
          >
            <RouterLink :to="l.to" class="flex items-center justify-between border-b border-line py-4 text-lg text-ink last:border-0">
              {{ l.label }} <AppIcon name="arrow-right" class="text-ink-3" />
            </RouterLink>
          </motion.div>
        </div>
      </motion.div>
    </AnimatePresence>
  </header>
</template>
