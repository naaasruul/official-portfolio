<script setup>
import { ref, watch } from 'vue'
import { transitionName } from '../composables/useProjects'

// Shows the project's cover image. If there is no cover, or it fails to load,
// it draws a title card in the site's style instead of a broken image.
const props = defineProps({
  project: { type: Object, required: true },
  imgClass: { type: String, default: '' },
  eager: { type: Boolean, default: false },
})

const failed = ref(false)
watch(() => props.project.cover, () => (failed.value = false))
</script>

<template>
  <img
    v-if="project.cover && !failed"
    :src="project.cover"
    :alt="`${project.title} screenshot`"sds
    :loading="eager ? 'eager' : 'lazy'"
    :class="imgClass"
    :style="{ viewTransitionName: transitionName(project.slug), transformOrigin: 'center top' }"
    @error="failed = true"
  />
  <div
    v-else
    :class="imgClass"
    class="relative flex flex-col justify-end gap-2 overflow-hidden bg-ink p-6 text-white md:p-10"
    :style="{ viewTransitionName: transitionName(project.slug) }"
    role="img"
    :aria-label="`${project.title}, ${project.type} project`"
  >
    <svg class="absolute -right-10 -top-10 w-1/2 max-w-[260px] text-orange" viewBox="0 0 100 100" aria-hidden="true">
      <circle cx="50" cy="50" r="50" fill="currentColor" />
    </svg>
    <svg class="absolute right-[18%] top-[38%] w-[14%] max-w-[70px] text-white/20" viewBox="0 0 100 100" aria-hidden="true">
      <circle cx="50" cy="50" r="42" fill="none" stroke="currentColor" stroke-width="14" />
    </svg>
    <p class="eyebrow relative text-white/70">{{ project.type }} · {{ project.year }}</p>
    <p class="relative font-display text-[clamp(28px,5vw,56px)] font-bold leading-[1.05] tracking-[-0.02em]">{{ project.title }}</p>
    <ul class="relative mt-1 flex flex-wrap gap-1.5">
      <li v-for="t in project.tech" :key="t" class="rounded-full bg-white/12 px-2.5 py-1 font-mono text-xs text-white/85">{{ t }}</li>
    </ul>
  </div>
</template>
