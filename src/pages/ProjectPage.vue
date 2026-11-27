<script setup>
import { computed, ref, watch, onMounted, onBeforeUnmount } from 'vue'
import { RouterLink } from 'vue-router'
import { motion, AnimatePresence, useScroll, useSpring } from 'motion-v'
import { findProject, nextProject } from '../composables/useProjects'
import ProjectCover from '../components/ProjectCover.vue'
import ImageLightbox from '../components/ImageLightbox.vue'
import BaseButton from '../components/BaseButton.vue'
import AppIcon from '../components/AppIcon.vue'
import SplitWords from '../components/SplitWords.vue'
import RevealOnScroll from '../components/RevealOnScroll.vue'

const props = defineProps({ slug: { type: String, required: true } })
const project = computed(() => findProject(props.slug))
const next = computed(() => nextProject(props.slug))
const ease = [0.22, 1, 0.36, 1]
const viewing = ref(null)
// A project with a full showcase poster opens it as one scrollable screen.
// Otherwise the viewer steps through the cover, then every design.
const viewerItems = computed(() => {
  const p = project.value
  if (!p) return []
  if (p.showcase) return [{ src: p.showcase, caption: '', scroll: true }]
  return [...(p.cover ? [{ src: p.cover, caption: p.summary }] : []), ...p.gallery]
})
watch(() => props.slug, () => (viewing.value = null))

const { scrollYProgress } = useScroll()
const progress = useSpring(scrollYProgress, { stiffness: 200, damping: 30, restDelta: 0.001 })

// Compact title bar appears once the big title has scrolled away.
const titleEl = ref(null)
const showBar = ref(false)
let io
onMounted(() => {
  if (!titleEl.value) return
  io = new IntersectionObserver(([e]) => { showBar.value = !e.isIntersecting && e.boundingClientRect.top < 0 }, { rootMargin: '-64px 0px 0px 0px' })
  io.observe(titleEl.value)
})
onBeforeUnmount(() => io?.disconnect())

const meta = computed(() => project.value && [
  { label: 'Role', value: project.value.role },
  { label: 'Year', value: project.value.year },
  { label: 'Type', value: project.value.type },
  { label: 'Stack', value: project.value.tech.join(', ') },
])
</script>

<template>
  <article v-if="project" class="pb-8">
    <!-- Reading progress -->
    <motion.div class="fixed inset-x-0 top-0 z-[60] h-0.5 origin-left bg-accent" :style="{ scaleX: progress }" />

    <!-- Sticky compact title -->
    <AnimatePresence>
      <motion.div
        v-if="showBar"
        class="fixed inset-x-0 top-16 z-40 border-b border-line bg-bg/90 backdrop-blur-md"
        :initial="{ y: -12, opacity: 0 }"
        :animate="{ y: 0, opacity: 1 }"
        :exit="{ y: -12, opacity: 0 }"
        :transition="{ duration: 0.3, ease }"
      >
        <div class="container-page flex h-12 items-center justify-between gap-4">
          <p class="truncate text-sm font-medium text-ink">{{ project.title }}</p>
          <p class="eyebrow hidden text-ink-3 sm:block">{{ project.type }} · {{ project.year }}</p>
        </div>
      </motion.div>
    </AnimatePresence>

    <header class="container-page flex flex-col gap-6 pt-8 md:pt-14">
      <motion.div :initial="{ opacity: 0, x: -6 }" :animate="{ opacity: 1, x: 0 }" :transition="{ duration: 0.5, ease }">
        <RouterLink to="/projects" class="group inline-flex items-center gap-2 text-sm text-ink-2 hover:text-ink">
          <AppIcon name="arrow-left" class="transition-transform duration-300 group-hover:-translate-x-0.5" /> All projects
        </RouterLink>
      </motion.div>
      <p class="eyebrow text-orange-ink">{{ project.type }} · {{ project.year }}</p>
      <h1 ref="titleEl" class="text-[40px] font-bold leading-[44px] tracking-[-0.025em] md:text-[64px] md:leading-[68px] md:tracking-[-0.03em]">
        <SplitWords :lines="[project.title]" :delay="0.1" />
      </h1>
      <motion.p
        class="max-w-2xl text-lg leading-[30px] text-ink-2"
        :initial="{ opacity: 0, y: 10 }"
        :animate="{ opacity: 1, y: 0 }"
        :transition="{ duration: 0.7, ease, delay: 0.35 }"
      >{{ project.summary }}</motion.p>
    </header>

    <!-- Banner (morphs from the clicked card image) -->
    <div class="container-page mt-10 md:mt-14">
      <div class="overflow-hidden rounded-2xl border border-line bg-subtle px-4 pt-4 md:px-12 md:pt-12">
        <button
          v-if="project.cover"
          type="button"
          class="group relative block w-full cursor-zoom-in"
          :aria-label="project.showcase ? `Open the full ${project.title} design` : `Enlarge ${project.title} cover`"
          @click="viewing = 0"
        >
          <ProjectCover
            :project="project"
            eager
            img-class="aspect-[16/9] w-full rounded-t-lg border border-b-0 border-line object-cover object-top shadow-[0_12px_32px_-8px_rgba(15,23,42,0.18)]"
          />
          <span v-if="project.showcase" class="pointer-events-none absolute inset-x-0 bottom-6 flex justify-center md:bottom-8">
            <span class="inline-flex items-center gap-2 rounded-full bg-ink px-5 py-3 text-sm font-bold text-white shadow-[0_3px_0_var(--color-accent)] transition-transform duration-300 group-hover:-translate-y-0.5">
              View full design <AppIcon name="arrow-up-right" />
            </span>
          </span>
        </button>
        <ProjectCover
          v-else
          :project="project"
          eager
          img-class="aspect-[16/9] w-full rounded-t-lg border border-b-0 border-line object-cover object-top shadow-[0_12px_32px_-8px_rgba(15,23,42,0.18)]"
        />
      </div>
    </div>

    <!-- Meta -->
    <div class="container-page mt-10 md:mt-14">
      <dl class="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line md:grid-cols-4">
        <RevealOnScroll v-for="(m, i) in meta" :key="m.label" :delay="i * 0.05" class="flex flex-col gap-2 bg-surface p-5">
          <dt class="eyebrow text-ink-3">{{ m.label }}</dt>
          <dd class="text-sm leading-[22px] text-ink">{{ m.value }}</dd>
        </RevealOnScroll>
      </dl>
    </div>

    <!-- Designs -->
    <section v-if="!project.showcase && project.gallery.length" class="container-page mt-16 md:mt-24" aria-labelledby="designs-title">
      <div class="mb-6 flex flex-wrap items-end justify-between gap-3">
        <RevealOnScroll as="h2" id="designs-title" class="text-[28px] leading-9 tracking-[-0.015em] md:text-[36px] md:leading-[44px]">Designs</RevealOnScroll>
        <p class="text-sm text-ink-3">{{ project.gallery.length }} {{ project.gallery.length === 1 ? 'image' : 'images' }} · click any image to enlarge</p>
      </div>
      <div class="grid gap-8 md:gap-12">
        <RevealOnScroll
          v-for="(g, i) in project.gallery"
          :key="g.src"
          :delay="i * 0.06"
        >
          <figure class="flex flex-col gap-3">
            <button
              type="button"
              class="group block w-full cursor-zoom-in overflow-hidden rounded-[24px] border-2 border-line bg-subtle transition-[border-color,box-shadow] duration-500 ease-out-soft hover:border-ink/15 hover:shadow-[0_6px_0_var(--color-line-strong)]"
              :aria-label="`Enlarge: ${g.caption || `${project.title} design ${i + 1}`}`"
              @click="viewing = i + (project.cover ? 1 : 0)"
            >
              <img
                :src="g.src"
                :alt="g.caption || `${project.title} design ${i + 1}`"
                loading="lazy"
                class="w-full transition-transform duration-700 ease-out-soft group-hover:scale-[1.02]"
              />
            </button>
            <figcaption v-if="g.caption" class="text-sm leading-[22px] text-ink-2">{{ g.caption }}</figcaption>
          </figure>
        </RevealOnScroll>
      </div>
      
    </section>

    <ImageLightbox v-model="viewing" :items="viewerItems" :title="project.title" />

    <!-- Story -->
    <div class="container-page mt-16 grid gap-14 md:mt-24 md:grid-cols-[220px_1fr] md:gap-12">
      <RevealOnScroll as="h2" class="eyebrow pt-1.5 text-ink-3">The problem</RevealOnScroll>
      <RevealOnScroll as="p" class="max-w-2xl text-lg leading-[30px] text-ink md:text-xl md:leading-8">{{ project.problem }}</RevealOnScroll>

      <RevealOnScroll as="h2" class="eyebrow pt-1.5 text-ink-3">What I built</RevealOnScroll>
      <ol class="flex max-w-2xl flex-col">
        <RevealOnScroll
          v-for="(h, i) in project.highlights"
          :key="i"
          as="li"
          :delay="i * 0.06"
          class="grid grid-cols-[40px_1fr] gap-2 border-t border-line py-5 first:border-t-0 first:pt-0"
        >
          <span class="font-mono text-sm text-accent">{{ String(i + 1).padStart(2, '0') }}</span>
          <span class="text-base leading-[26px] text-ink-2">{{ h }}</span>
        </RevealOnScroll>
      </ol>

      <template v-if="project.links.live || project.links.github">
        <RevealOnScroll as="h2" class="eyebrow pt-1.5 text-ink-3">Links</RevealOnScroll>
        <RevealOnScroll class="flex flex-wrap gap-3">
          <BaseButton v-if="project.links.live" :href="project.links.live" external icon="arrow-up-right" magnetic>Visit live site</BaseButton>
          <BaseButton v-if="project.links.github" variant="secondary" :href="project.links.github" external icon="arrow-up-right" magnetic>View code</BaseButton>
        </RevealOnScroll>
      </template>
    </div>

    <!-- Next project -->
    <div class="container-page mt-20 md:mt-28">
      <RouterLink
        :to="`/projects/${next.slug}`"
        class="group flex items-center justify-between gap-6 rounded-2xl border border-line bg-surface p-6 transition-colors hover:border-line-strong md:p-8"
      >
        <div class="flex flex-col gap-2">
          <span class="eyebrow text-ink-3">Next project</span>
          <span class="text-2xl font-bold tracking-[-0.015em] text-ink md:text-[32px]">{{ next.title }}</span>
        </div>
        <span class="grid size-12 shrink-0 place-items-center rounded-full bg-ink text-white transition-transform duration-500 ease-out-soft group-hover:translate-x-1">
          <AppIcon name="arrow-right" :size="20" />
        </span>
      </RouterLink>
    </div>
  </article>

  <section v-else class="container-page flex flex-col items-start gap-4 py-24">
    <p class="eyebrow text-ink-3">404</p>
    <h1 class="text-4xl font-bold">Project not found</h1>
    <BaseButton to="/projects" icon="arrow-right">See all projects</BaseButton>
  </section>
</template>
