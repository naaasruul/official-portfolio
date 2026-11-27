<script setup>
import { RouterLink } from 'vue-router'
import { motion } from 'motion-v'
import AppIcon from './AppIcon.vue'
import ProjectCover from './ProjectCover.vue'

defineProps({
  project: { type: Object, required: true },
  compact: { type: Boolean, default: false },
})
</script>

<template>
  <motion.article
    class="group relative h-full overflow-hidden rounded-[28px] border-2 border-line bg-surface transition-[box-shadow,border-color] duration-500 ease-out-soft hover:border-ink/15 hover:shadow-[0_6px_0_var(--color-line-strong),0_24px_44px_-18px_rgba(27,37,89,0.25)]"
    :while-hover="{ y: -4 }"
    :transition="{ type: 'spring', stiffness: 300, damping: 26 }"
  >
    <RouterLink :to="`/projects/${project.slug}`" class="flex h-full flex-col focus-visible:outline-offset-[-2px]">
      <div class="relative overflow-hidden bg-subtle px-5 pt-5 md:px-7 md:pt-7 [&]:bg-[radial-gradient(circle_at_85%_0%,var(--color-orange-soft)_0,transparent_45%),radial-gradient(circle_at_0%_100%,var(--color-accent-soft)_0,transparent_50%)]" :class="compact ? 'aspect-[16/10]' : 'aspect-[16/10]'">
        <ProjectCover
          :project="project"
          img-class="size-full rounded-t-lg border border-b-0 border-line object-cover object-top shadow-[0_8px_24px_-6px_rgba(15,23,42,0.12)] transition-transform duration-700 ease-out-soft group-hover:scale-[1.035]"
        />
      </div>
      <div class="flex flex-1 flex-col gap-3 px-6 pb-6 pt-5">
        <div class="flex items-center justify-between gap-3">
          <p class="eyebrow text-ink-3">{{ project.type }} · {{ project.year }}</p>
          <AppIcon
            name="arrow-up-right"
            :size="20"
            class="text-ink-3 transition duration-300 ease-out-soft group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent"
          />
        </div>
        <h3 class="text-[23px] font-bold leading-[30px] tracking-[-0.01em] text-ink">{{ project.title }}</h3>
        <p class="text-sm leading-[22px] text-ink-2">{{ project.summary }}</p>
        <ul class="mt-auto flex flex-wrap gap-1.5 pt-1">
          <li v-for="t in project.tech" :key="t" class="rounded-full bg-accent-soft px-2.5 py-1 font-mono text-xs text-accent-hover">{{ t }}</li>
        </ul>
      </div>
    </RouterLink>
  </motion.article>
</template>
