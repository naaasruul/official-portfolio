<script setup>
import RevealOnScroll from './RevealOnScroll.vue'
import SplitWords from './SplitWords.vue'

defineProps({
  eyebrow: { type: String, required: true },
  title: { type: String, required: true },
})
</script>

<template>
  <div class="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
    <div class="flex max-w-2xl flex-col gap-3">
      <RevealOnScroll :y="8">
        <p class="eyebrow inline-flex items-center gap-2 text-orange-ink"><span class="size-2 rounded-full bg-orange" />{{ eyebrow }}</p>
      </RevealOnScroll>
      <h2 class="text-[30px] font-bold leading-9 tracking-[-0.015em] text-ink md:text-[40px] md:leading-[46px] md:tracking-[-0.02em]">
        <SplitWords :lines="[title]" on-view :delay="0.08" />
      </h2>
    </div>
    <RevealOnScroll v-if="$slots.default" :delay="0.2" :y="8">
      <slot />
    </RevealOnScroll>
  </div>
</template>
