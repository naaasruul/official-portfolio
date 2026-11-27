<script setup>
import { computed, ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { motion, AnimatePresence } from 'motion-v'
import { projects, allTypes, allTech, projectKinds } from '../composables/useProjects'
import ProjectCard from '../components/ProjectCard.vue'
import AppIcon from '../components/AppIcon.vue'
import SplitWords from '../components/SplitWords.vue'

const route = useRoute()
const router = useRouter()
const ease = [0.22, 1, 0.36, 1]
// Stagger cards on first load only; later filter changes animate immediately.
const entered = ref(false)
onMounted(() => setTimeout(() => { entered.value = true }, 900))

const sorts = [
  { value: 'newest', label: 'Newest' },
  { value: 'oldest', label: 'Oldest' },
  { value: 'az', label: 'A – Z' },
]

// Filters live in the URL (?type=Mobile&tech=Flutter,Firebase&sort=az&q=movie) so a filtered view can be shared.
const asList = (v) => (v ? String(v).split(',').filter(Boolean) : [])
const type = computed(() => route.query.type || 'All')
const tech = computed(() => asList(route.query.tech))
const sort = computed(() => route.query.sort || 'newest')
const q = computed(() => route.query.q || '')

function update(patch) {
  const next = { ...route.query, ...patch }
  for (const k of Object.keys(next)) if (!next[k] || next[k] === 'All' || next[k] === 'newest') delete next[k]
  router.replace({ query: next })
}
const setType = (t) => update({ type: t })
const toggleTech = (t) => {
  const set = new Set(tech.value)
  set.has(t) ? set.delete(t) : set.add(t)
  update({ tech: [...set].join(',') })
}
const clearAll = () => router.replace({ query: {} })

const results = computed(() => {
  const term = q.value.trim().toLowerCase()
  let list = projects.filter((p) => {
    if (type.value !== 'All' && !projectKinds(p).includes(type.value)) return false
    if (tech.value.length && !tech.value.some((t) => p.tech.includes(t))) return false
    if (term && !`${p.title} ${p.summary} ${p.tech.join(' ')}`.toLowerCase().includes(term)) return false
    return true
  })
  if (sort.value === 'oldest') list = [...list].sort((a, b) => a.year - b.year || a.title.localeCompare(b.title))
  if (sort.value === 'az') list = [...list].sort((a, b) => a.title.localeCompare(b.title))
  return list
})

const activeCount = computed(() => (type.value !== 'All' ? 1 : 0) + tech.value.length + (q.value ? 1 : 0))
const countFor = (t) => (t === 'All' ? projects.length : projects.filter((p) => projectKinds(p).includes(t)).length)

const chip = 'inline-flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-sm transition-colors duration-200'
</script>

<template>
  <section class="container-page flex flex-col gap-10 pb-24 pt-10 md:gap-12 md:pt-20">
    <header class="flex flex-col gap-4">
      <motion.p
        class="eyebrow text-orange-ink"
        :initial="{ opacity: 0, y: 8 }"
        :animate="{ opacity: 1, y: 0 }"
        :transition="{ duration: 0.6, ease }"
      >All projects</motion.p>
      <h1 class="max-w-3xl text-[40px] font-bold leading-[44px] tracking-[-0.025em] md:text-[56px] md:leading-[60px]">
        <SplitWords :lines="['Everything I have built,', 'sorted your way.']" :delay="0.05" :line-classes="['text-ink', 'text-accent']" />
      </h1>
    </header>

    <!-- Controls -->
    <motion.div
      class="flex flex-col gap-5 rounded-2xl border border-line bg-surface p-4 md:p-5"
      :initial="{ opacity: 0, y: 12 }"
      :animate="{ opacity: 1, y: 0 }"
      :transition="{ duration: 0.7, ease, delay: 0.3 }"
    >
      <div class="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <label class="relative flex-1 md:max-w-sm">
          <span class="sr-only">Search projects</span>
          <AppIcon name="search" class="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-3" />
          <input
            :value="q"
            type="search"
            placeholder="Search by name or tech"
            class="w-full rounded-full border border-line bg-bg py-2.5 pl-10 pr-4 text-sm text-ink placeholder:text-ink-3 focus:border-accent focus:outline-none"
            @input="update({ q: $event.target.value })"
          />
        </label>

        <div class="flex items-center gap-1 rounded-full bg-subtle p-1" role="radiogroup" aria-label="Sort projects">
          <AppIcon name="sort" class="ml-2 mr-1 text-ink-3" />
          <button
            v-for="s in sorts"
            :key="s.value"
            role="radio"
            :aria-checked="sort === s.value"
            class="relative rounded-full px-3.5 py-1.5 text-sm transition-colors"
            :class="sort === s.value ? 'text-ink' : 'text-ink-2 hover:text-ink'"
            @click="update({ sort: s.value })"
          >
            <motion.span
              v-if="sort === s.value"
              layout-id="sort-pill"
              class="absolute inset-0 rounded-full bg-surface shadow-[0_1px_2px_rgba(15,23,42,0.08)]"
              :transition="{ type: 'spring', stiffness: 420, damping: 34 }"
            />
            <span class="relative">{{ s.label }}</span>
          </button>
        </div>
      </div>

      <div class="flex flex-col gap-3">
        <div class="flex flex-wrap items-center gap-2">
          <span class="eyebrow mr-1 w-14 text-ink-3">Type</span>
          <button
            v-for="t in ['All', ...allTypes]"
            :key="t"
            :class="[chip, type === t ? 'border-ink bg-ink text-white' : 'border-line bg-surface text-ink-2 hover:border-line-strong hover:text-ink']"
            :aria-pressed="type === t"
            @click="setType(t)"
          >
            {{ t }} <span class="font-mono text-xs opacity-60">{{ countFor(t) }}</span>
          </button>
        </div>
        <div class="flex flex-wrap items-center gap-2">
          <span class="eyebrow mr-1 w-14 text-ink-3">Tech</span>
          <button
            v-for="t in allTech"
            :key="t"
            :class="[chip, 'font-mono text-xs', tech.includes(t) ? 'border-accent bg-accent-soft text-accent-hover' : 'border-line bg-surface text-ink-2 hover:border-line-strong hover:text-ink']"
            :aria-pressed="tech.includes(t)"
            @click="toggleTech(t)"
          >
            <AppIcon v-if="tech.includes(t)" name="check" :size="12" />
            {{ t }}
          </button>
        </div>
      </div>
    </motion.div>

    <div class="flex items-center justify-between">
      <p class="eyebrow text-ink-3" aria-live="polite">
        Showing {{ results.length }} of {{ projects.length }}
      </p>
      <button v-if="activeCount" class="text-sm text-accent hover:text-accent-hover" @click="clearAll">
        Clear filters ({{ activeCount }})
      </button>
    </div>

    <motion.ul layout class="grid gap-6 md:grid-cols-2 md:gap-8 lg:grid-cols-3">
      <AnimatePresence mode="popLayout">
        <motion.li
          v-for="(p, i) in results"
          :key="p.slug"
          layout
          :initial="{ opacity: 0, y: 16, scale: 0.98 }"
          :animate="{ opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease, delay: entered ? 0.05 : 0.35 + i * 0.05 } }"
          :exit="{ opacity: 0, scale: 0.96, transition: { duration: 0.2 } }"
          :transition="{ layout: { type: 'spring', stiffness: 300, damping: 32 } }"
        >
          <ProjectCard :project="p" compact />
        </motion.li>
      </AnimatePresence>
    </motion.ul>

    <motion.div
      v-if="!results.length"
      class="flex flex-col items-center gap-3 rounded-2xl border border-dashed border-line-strong px-6 py-16 text-center"
      :initial="{ opacity: 0 }"
      :animate="{ opacity: 1 }"
    >
      <p class="text-lg font-medium text-ink">No projects match those filters.</p>
      <p class="text-sm text-ink-2">Try a different type or fewer tech tags.</p>
      <button class="mt-2 text-sm font-medium text-accent hover:text-accent-hover" @click="clearAll">Clear filters</button>
    </motion.div>
  </section>
</template>
