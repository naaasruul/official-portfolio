<script setup>
import { ref, onMounted } from 'vue'
import { RouterLink } from 'vue-router'
import { motion } from 'motion-v'
import site from '../data/site.json'
import skills from '../data/skills.json'
import { projects, featuredProjects } from '../composables/useProjects'
import BaseButton from '../components/BaseButton.vue'
import StatusPill from '../components/StatusPill.vue'
import LocalTime from '../components/LocalTime.vue'
import SplitWords from '../components/SplitWords.vue'
import SectionHeader from '../components/SectionHeader.vue'
import RevealOnScroll from '../components/RevealOnScroll.vue'
import ProjectCard from '../components/ProjectCard.vue'
import HeroScene from '../components/HeroScene.vue'
import ToolIcon from '../components/ToolIcon.vue'
import AppIcon from '../components/AppIcon.vue'
import DecoShape from '../components/DecoShape.vue'

const ease = [0.22, 1, 0.36, 1]
const homeProjects = featuredProjects

// Horizontal project track: arrow buttons + progress bar
const track = ref(null)
const atStart = ref(true)
const atEnd = ref(false)
const trackProgress = ref(0)
function onTrackScroll() {
  const el = track.value
  if (!el) return
  const max = el.scrollWidth - el.clientWidth
  atStart.value = el.scrollLeft <= 4
  atEnd.value = el.scrollLeft >= max - 4
  trackProgress.value = max > 0 ? el.scrollLeft / max : 1
}
function slide(dir) {
  const el = track.value
  const card = el?.firstElementChild
  if (!card) return
  el.scrollBy({ left: dir * (card.getBoundingClientRect().width + 28), behavior: 'smooth' })
}
onMounted(onTrackScroll)
const fadeUp = (delay) => ({
  initial: { opacity: 0, y: 14 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, ease, delay },
})
</script>

<template>
  <!-- HERO -->
  <section class="relative">
    <!-- Shapes pop in and sit across section edges to link sections together -->
    <DecoShape shape="blob" class="left-[1.5%] top-16 hidden w-20 text-orange lg:block xl:w-24" />
    <DecoShape shape="dots" :delay="0.15" class="left-[7%] top-48 hidden w-12 text-accent/40 xl:block" />
    <DecoShape shape="blob" :delay="0.1" class="-bottom-16 left-[3%] w-20 text-accent md:w-28 lg:w-36" />
    <DecoShape shape="squiggle" :delay="0.25" class="bottom-6 left-[24%] hidden w-14 text-orange md:block lg:left-[12%]" />
    <div class="container-page relative grid items-center gap-8 pb-20 pt-10 md:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] md:gap-10 md:pb-28 md:pt-16">
      <div class="flex flex-col gap-7">
        <motion.div class="flex flex-wrap items-center gap-x-4 gap-y-2" v-bind="fadeUp(0.05)">
          <StatusPill v-if="site.status.show" :label="site.status.label" />
          <LocalTime :timezone="site.timezone" :place="site.location" />
        </motion.div>

        <h1 class="text-[44px] leading-[48px] tracking-[-0.02em] md:text-[58px] md:leading-[62px] lg:text-[68px] lg:leading-[72px]">
          <SplitWords :lines="site.headline" :delay="0.15" :line-classes="['text-ink', 'text-accent']" />
        </h1>

        <motion.p class="max-w-[520px] text-base leading-[26px] text-ink-2 md:text-lg md:leading-[30px]" v-bind="fadeUp(0.55)">
          {{ site.intro }}
        </motion.p>

        <motion.div class="flex flex-col gap-2.5 sm:flex-row sm:gap-3" v-bind="fadeUp(0.65)">
          <BaseButton :href="site.resume" download icon="download" magnetic>Download resume</BaseButton>
          <BaseButton variant="secondary" to="/#contact" icon="arrow-right" magnetic>Get in touch</BaseButton>
        </motion.div>

        <motion.div class="flex flex-col gap-1.5 pt-2 sm:flex-row sm:items-center sm:gap-3" v-bind="fadeUp(0.8)">
          <span class="eyebrow whitespace-nowrap text-orange-ink">Currently building</span>
          <span class="hidden h-0.5 w-6 rounded-full bg-orange sm:block" />
          <span class="text-sm text-ink">{{ site.currentlyBuilding }}</span>
        </motion.div>
      </div>

      <motion.div
        class="relative order-first -mx-2 md:order-none md:mx-0"
        :initial="{ opacity: 0, y: 24, scale: 0.97 }"
        :animate="{ opacity: 1, y: 0, scale: 1 }"
        :transition="{ duration: 1, ease, delay: 0.2 }"
      >
        <HeroScene />
      </motion.div>
    </div>
  </section>

  <!-- WORK: horizontal scroller -->
  <section id="work" class="relative flex flex-col gap-10 py-16 md:gap-12 md:py-24">
    <DecoShape shape="ring" class="-bottom-10 right-[3%] w-14 text-orange md:w-20 lg:w-24" />
    <div class="container-page">
      <SectionHeader eyebrow="01 — Selected work" title="Projects I've designed and built">
        <div class="flex items-center gap-4">
          <BaseButton variant="ghost" to="/projects" icon="arrow-right">All {{ projects.length }} projects</BaseButton>
          <div class="hidden gap-2 md:flex">
            <button
              v-for="dir in [-1, 1]"
              :key="dir"
              class="grid size-11 place-items-center rounded-full bg-surface text-ink ring-2 ring-inset ring-line transition hover:ring-ink/30 disabled:cursor-default disabled:opacity-35 disabled:hover:ring-line"
              :disabled="dir < 0 ? atStart : atEnd"
              :aria-label="dir < 0 ? 'Previous projects' : 'Next projects'"
              @click="slide(dir)"
            >
              <AppIcon :name="dir < 0 ? 'arrow-left' : 'arrow-right'" />
            </button>
          </div>
        </div>
      </SectionHeader>
    </div>

    <div
      ref="track"
      class="track flex snap-x snap-mandatory gap-5 overflow-x-auto pb-4 md:gap-7"
      tabindex="0"
      aria-label="Selected projects, scroll sideways"
      @scroll.passive="onTrackScroll"
    >
      <RevealOnScroll
        v-for="(p, i) in homeProjects"
        :key="p.slug"
        :delay="Math.min(i, 3) * 0.08"
        :amount="0.1"
        class="w-[84vw] shrink-0 snap-start sm:w-[420px] lg:w-[480px]"
      >
        <ProjectCard :project="p" />
      </RevealOnScroll>
      <RevealOnScroll :delay="0.3" :amount="0.1" class="w-[70vw] shrink-0 snap-start sm:w-[300px]">
        <RouterLink
          to="/projects"
          class="group flex h-full min-h-[320px] flex-col justify-between rounded-[28px] bg-ink p-7 text-white transition-colors hover:bg-accent"
        >
          <span class="eyebrow text-white/70">Filter &amp; sort</span>
          <span class="flex flex-col gap-4">
            <span class="font-display text-[28px] font-bold leading-8">See all {{ projects.length }} projects</span>
            <span class="grid size-12 place-items-center rounded-full bg-orange transition-transform duration-500 ease-out-soft group-hover:translate-x-1">
              <AppIcon name="arrow-right" :size="20" />
            </span>
          </span>
        </RouterLink>
      </RevealOnScroll>
    </div>

    <div class="container-page">
      <div class="h-1 overflow-hidden rounded-full bg-line" aria-hidden="true">
        <div class="h-full origin-left rounded-full bg-orange transition-transform duration-150" :style="{ transform: `scaleX(${Math.max(0.08, trackProgress)})` }" />
      </div>
    </div>
  </section>

  <!-- SKILLS -->
  <section id="skills" class="relative">
    <DecoShape shape="dots" class="-bottom-12 left-[3%] hidden w-16 text-accent md:block" />
    <DecoShape shape="circle" :delay="0.15" class="-bottom-2 left-[8%] hidden w-7 text-orange md:block" />
    <div class="container-page flex flex-col gap-10 py-16 md:gap-12 md:py-24">
    <SectionHeader eyebrow="02 — Skills" title="Tools I use every day" />
    <div class="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
      <RevealOnScroll
        v-for="(group, i) in skills"
        :key="group.category"
        :delay="i * 0.08"
        class="flex flex-col gap-5 rounded-[28px] bg-surface p-6 ring-2 ring-inset ring-line"
      >
        <p class="eyebrow text-orange-ink">{{ group.category }}</p>
        <ul class="flex flex-col gap-3">
          <li v-for="item in group.items" :key="item.name" class="group flex items-center gap-3">
            <ToolIcon v-bind="item" class="transition-transform duration-300 ease-out-soft group-hover:-rotate-6 group-hover:scale-110" />
            <span class="text-base font-medium text-ink">{{ item.name }}</span>
          </li>
        </ul>
      </RevealOnScroll>
    </div>
    </div>
  </section>

  <!-- ABOUT -->
  <section id="about" class="relative bg-surface py-16 md:rounded-[48px] md:py-24 md:mx-4 lg:mx-8">
    <DecoShape shape="blob" class="-bottom-16 right-[3%] w-20 text-orange md:w-28 lg:w-32" />
    <DecoShape shape="squiggle" :delay="0.2" class="-bottom-6 right-[16%] hidden w-14 text-accent lg:block" />
    <div class="container-page flex flex-col gap-10 md:gap-12">
      <SectionHeader eyebrow="03 — About" title="A bit more about me" />
      <div class="grid gap-10 md:grid-cols-[1fr_360px] md:gap-24">
        <RevealOnScroll class="flex flex-col gap-5">
          <p v-for="(p, i) in site.about.paragraphs" :key="i" class="text-base leading-[26px] text-ink-2 md:text-lg md:leading-[30px]">{{ p }}</p>
        </RevealOnScroll>
        <RevealOnScroll as="dl" :delay="0.1">
          <div v-for="f in site.about.facts" :key="f.label" class="flex items-center justify-between gap-4 border-t border-line py-3.5">
            <dt class="eyebrow text-ink-3">{{ f.label }}</dt>
            <dd class="text-right text-sm text-ink">{{ f.value }}</dd>
          </div>
        </RevealOnScroll>
      </div>
    </div>
  </section>

  <!-- CONTACT -->
  <section id="contact" class="container-page py-16 md:py-24">
    <div class="relative rounded-[36px] bg-accent px-6 py-14 text-white md:rounded-[48px] md:px-16 md:py-20">
      <DecoShape shape="ring" :delay="0.2" class="bottom-10 right-10 hidden w-24 text-white/15 md:block" />
      <DecoShape shape="dots" :delay="0.3" class="right-36 top-16 hidden w-14 text-orange lg:block" />
      <div class="relative flex flex-col gap-6 md:gap-8">
        <RevealOnScroll :y="8"><p class="eyebrow inline-flex items-center gap-2 text-white/85"><span class="size-2 rounded-full bg-orange" />04 — Contact</p></RevealOnScroll>
        <h2 class="max-w-3xl text-[40px] leading-[44px] tracking-[-0.02em] md:text-[68px] md:leading-[72px]">
          <SplitWords :lines="site.contactHeadline" on-view :line-classes="['text-white', 'text-[#FFC9AE]']" />
        </h2>
        <RevealOnScroll :delay="0.2">
          <a
            :href="`mailto:${site.email}`"
            class="text-lg font-bold text-white underline decoration-white/40 underline-offset-[6px] transition-colors hover:decoration-white md:text-[22px]"
          >{{ site.email }}</a>
        </RevealOnScroll>
        <RevealOnScroll :delay="0.3" class="flex flex-col gap-2.5 pt-2 sm:flex-row sm:flex-wrap sm:gap-3">
          <BaseButton variant="light" :href="site.resume" download icon="download" magnetic>Download resume</BaseButton>
          <BaseButton
            v-for="s in site.socials"
            :key="s.label"
            variant="outline-light"
            :href="s.url"
            external
            icon="arrow-up-right"
            magnetic
          >{{ s.label }}</BaseButton>
        </RevealOnScroll>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* Track lines up with the page container but bleeds to the screen edge */
.track {
  padding-inline: max(20px, calc((100% - 1120px) / 2));
  scroll-padding-inline: max(20px, calc((100% - 1120px) / 2));
  scrollbar-width: none;
}
.track::-webkit-scrollbar { display: none; }
@media (width >= 768px) {
  .track {
    padding-inline: max(32px, calc((100% - 1120px) / 2));
    scroll-padding-inline: max(32px, calc((100% - 1120px) / 2));
  }
}
</style>
