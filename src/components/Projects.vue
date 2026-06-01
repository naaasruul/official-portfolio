<script setup>
import { ref, computed } from 'vue'
import { Github, ExternalLink, X, BookOpen, CheckCircle } from 'lucide-vue-next'
import ScrollReveal from './ScrollReveal.vue'

const activeFilter = ref('all')
const selectedProject = ref(null)

const projects = [
  {
    id: 1,
    title: 'Examination System Portal',
    category: 'fullstack',
    image: 'examinationSystemBanner.jpg',
    short: 'High-concurrency online examination portal with student lock-down controls.',
    challenge: 'A legacy test engine suffered from severe database bottlenecks and student tab-switching cheating behaviors during peak exam sessions.',
    solution: 'Designed a decoupled architecture using a Laravel API backend and responsive Vue 3 components, introducing secure state logging and real-time tab focus listeners.',
    impact: 'Handled over 1,000+ simultaneous test sessions without failure, reducing server response times by 65% and preventing cheating attempts.',
    techs: ['Laravel', 'Vue.js', 'REST API', 'MySQL'],
    github: 'https://github.com/naaasruul/exam-portal',
    demo: null
  },
  {
    id: 2,
    title: 'KPMB Student Hub Companion',
    category: 'mobile',
    image: 'kpmbhub.jpg',
    short: 'Comprehensive student companion mobile app for KPMB announcements and schedules.',
    challenge: 'Fragmented communication portals and local scheduling pages made it hard for students to track schedules and official announcements.',
    solution: 'Built a cross-platform mobile companion featuring unified news widgets, offline calendar caching, and instant notification routing.',
    impact: 'Improved student portal interaction rates by 55% within the first month of deployment across campus groups.',
    techs: ['Flutter', 'Dart', 'Firebase', 'Push Notifications'],
    github: 'https://github.com/naaasruul/kpmb-hub',
    demo: null
  },
  {
    id: 3,
    title: 'Lost & Found Claim Portal',
    category: 'fullstack',
    image: 'lostNfound.jpg',
    short: 'Unified campus lost items listing database and matching system.',
    challenge: 'Students relied on chaotic social media group chat histories, which resulted in low claim rates and repeated posts.',
    solution: 'Structured a database matching portal equipped with secure photo uploads, status updates, and claims validation processes.',
    impact: 'Resolved 300+ lost item claims in the first semester, helping students retrieve their assets within 48 hours on average.',
    techs: ['Laravel', 'Vue.js', 'Tailwind CSS', 'MySQL'],
    github: 'https://github.com/naaasruul/lost-and-found',
    demo: null
  },
  {
    id: 4,
    title: 'MudahJe Micro-Task Platform',
    category: 'mobile',
    image: 'mudahJeWeb.jpg',
    short: 'A combined web portal and mobile gig marketplace for campus freelancers.',
    challenge: 'Local students seeking micro-jobs or deliveries had no secure way to coordinate tasks, leading to payment disputes.',
    solution: 'Created a service marketplace that matches student freelancers with tasks, incorporating order statuses and review profiles.',
    impact: 'Successfully matched over 450+ campus orders, allowing student micro-contractors to earn income securely.',
    techs: ['Vue.js', 'Ionic / Cordova', 'Laravel API', 'MySQL'],
    github: 'https://github.com/naaasruul/mudah-je',
    demo: null
  },
  {
    id: 5,
    title: 'Movie Aggregator Engine',
    category: 'frontend',
    image: 'findmovie.png',
    short: 'A fast API-driven movie database with customized scoring profiles.',
    challenge: 'Aggregation engines loaded slowly, offering poor mobile viewports and cluttered navigation interfaces.',
    solution: 'Developed a lightweight single-page application using Vite, with localized search caching and custom rating cards.',
    impact: 'Achieved sub-100ms search results and a 95% user satisfaction rate on mobile devices.',
    techs: ['Vue.js', 'TMDB API', 'Tailwind CSS', 'Vite'],
    github: 'https://github.com/naaasruul/find-movie',
    demo: null
  }
]

// Resolve image assets dynamically in Vite
const getImageUrl = (name) => {
  return new URL(`../assets/projects/${name}`, import.meta.url).href
}

const filteredProjects = computed(() => {
  if (activeFilter.value === 'all') return projects
  return projects.filter(p => p.category === activeFilter.value)
})

const openProject = (project) => {
  selectedProject.value = project
  document.body.style.overflow = 'hidden' // Lock scroll
}

const closeProject = () => {
  selectedProject.value = null
  document.body.style.overflow = '' // Restore scroll
}
</script>

<template>
  <section id="projects" class="py-24 relative z-10 border-t border-white/5 bg-slate-950/20">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      <!-- Section Header -->
      <ScrollReveal :delay="100">
        <div class="max-w-3xl mx-auto text-center mb-16">
          <span class="text-xs uppercase tracking-widest font-bold text-cyan-400 mb-3 font-mono block">
            Portfolio
          </span>
          <h3 class="text-3xl sm:text-4xl font-extrabold text-slate-100 font-display">
            Featured Projects
          </h3>
          <p class="mt-4 text-base sm:text-lg text-slate-400">
            A review of real systems I have designed and deployed, illustrating solution-oriented software engineering.
          </p>
        </div>
      </ScrollReveal>

      <!-- Category Filter Tabs -->
      <ScrollReveal :delay="200">
        <div class="flex flex-wrap items-center justify-center gap-2 mb-12">
          <button
            v-for="filter in [
              { id: 'all', label: 'All Projects' },
              { id: 'fullstack', label: 'Full-Stack Apps' },
              { id: 'mobile', label: 'Mobile Apps' },
              { id: 'frontend', label: 'Creative Frontends' }
            ]"
            :key="filter.id"
            @click="activeFilter = filter.id"
            class="px-4 py-2 text-xs sm:text-sm font-semibold rounded-full border transition-all duration-300 cursor-pointer"
            :class="[
              activeFilter === filter.id
                ? 'bg-cyan-500 text-slate-950 border-cyan-500 neon-glow-cyan/15'
                : 'bg-white/5 border-white/5 text-slate-400 hover:text-slate-200 hover:bg-white/10'
            ]"
          >
            {{ filter.label }}
          </button>
        </div>
      </ScrollReveal>

      <!-- Project Cards Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div
          v-for="project in filteredProjects"
          :key="project.id"
          @click="openProject(project)"
          class="group bg-slate-900/40 border border-white/10 rounded-2xl overflow-hidden backdrop-blur-sm cursor-pointer hover:border-cyan-500/20 transition-all duration-300 hover:scale-[1.02] flex flex-col justify-between"
        >
          <!-- Image Section -->
          <div class="relative overflow-hidden aspect-video bg-slate-950">
            <img 
              :src="getImageUrl(project.image)" 
              :alt="project.title"
              class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div class="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
            <!-- Category Tag -->
            <span class="absolute top-4 left-4 text-[10px] font-bold font-mono uppercase tracking-wider bg-slate-950/80 border border-white/10 px-2.5 py-1 rounded text-cyan-400">
              {{ project.category }}
            </span>
          </div>

          <!-- Card Content -->
          <div class="p-6 flex flex-col justify-between flex-grow">
            <div>
              <h4 class="text-lg font-bold text-slate-100 mb-2 group-hover:text-cyan-300 transition-colors font-display">
                {{ project.title }}
              </h4>
              <p class="text-xs sm:text-sm text-slate-400 leading-relaxed mb-4 text-justify">
                {{ project.short }}
              </p>
            </div>

            <!-- Tags & Actions -->
            <div class="pt-4 border-t border-white/5">
              <div class="flex flex-wrap gap-1.5 mb-4">
                <span 
                  v-for="tech in project.techs" 
                  :key="tech"
                  class="text-[10px] font-mono font-semibold px-2 py-0.5 rounded bg-slate-900 border border-white/5 text-slate-500"
                >
                  {{ tech }}
                </span>
              </div>
              
              <button 
                class="w-full flex items-center justify-center space-x-1.5 px-4 py-2 border border-white/10 rounded-lg text-xs font-semibold text-slate-300 group-hover:bg-cyan-500 group-hover:text-slate-950 group-hover:border-cyan-500 transition-all duration-300 cursor-pointer"
              >
                <span>View Details & Impact</span>
              </button>
            </div>
          </div>
        </div>
      </div>

    </div>

    <!-- Custom Reactive Vue Modal (Portal emulation inside single page) -->
    <transition
      enter-active-class="transition duration-300 ease-out"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition duration-200 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div 
        v-if="selectedProject" 
        class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-sm"
        @click="closeProject"
      >
        <!-- Modal Wrapper -->
        <transition
          enter-active-class="transition duration-300 ease-out transform"
          enter-from-class="opacity-0 scale-95 translate-y-4"
          enter-to-class="opacity-100 scale-100 translate-y-0"
          leave-active-class="transition duration-200 ease-in transform"
          leave-from-class="opacity-100 scale-100 translate-y-0"
          leave-to-class="opacity-0 scale-95 translate-y-4"
        >
          <div 
            v-if="selectedProject"
            class="relative w-full max-w-2xl bg-slate-900 border border-white/10 rounded-2xl shadow-2xl overflow-hidden text-left flex flex-col"
            @click.stop
          >
            <!-- Header Image -->
            <div class="relative h-48 sm:h-64 bg-slate-950">
              <img 
                :src="getImageUrl(selectedProject.image)" 
                :alt="selectedProject.title"
                class="w-full h-full object-cover"
              />
              <div class="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent" />
              
              <!-- Close Button -->
              <button 
                @click="closeProject"
                class="absolute top-4 right-4 p-2 bg-slate-950/80 hover:bg-slate-800 text-slate-400 hover:text-slate-100 rounded-full border border-white/10 transition-colors cursor-pointer"
                aria-label="Close modal"
              >
                <X class="w-4 h-4" />
              </button>
            </div>

            <!-- Body Contents -->
            <div class="p-6 sm:p-8 space-y-6 overflow-y-auto max-h-[calc(100vh-280px)]">
              <!-- Title -->
              <div>
                <h4 class="text-2xl font-extrabold text-slate-100 font-display">
                  {{ selectedProject.title }}
                </h4>
                <div class="flex flex-wrap gap-2 mt-3">
                  <span 
                    v-for="tech in selectedProject.techs" 
                    :key="tech"
                    class="text-[11px] font-semibold font-mono px-2.5 py-1 rounded bg-slate-950 border border-white/5 text-slate-400"
                  >
                    {{ tech }}
                  </span>
                </div>
              </div>

              <!-- Challenge vs Solution -->
              <div class="space-y-4 pt-2">
                <div class="flex items-start space-x-3">
                  <div class="p-1.5 rounded bg-rose-500/10 border border-rose-500/20 text-rose-400 mt-0.5">
                    <BookOpen class="w-4 h-4" />
                  </div>
                  <div>
                    <span class="block text-xs font-bold uppercase tracking-wider text-rose-400 font-mono mb-1">The Challenge</span>
                    <p class="text-sm text-slate-300 leading-relaxed text-justify">
                      {{ selectedProject.challenge }}
                    </p>
                  </div>
                </div>

                <div class="flex items-start space-x-3">
                  <div class="p-1.5 rounded bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 mt-0.5">
                    <CheckCircle class="w-4 h-4" />
                  </div>
                  <div>
                    <span class="block text-xs font-bold uppercase tracking-wider text-emerald-400 font-mono mb-1">The Solution</span>
                    <p class="text-sm text-slate-300 leading-relaxed text-justify">
                      {{ selectedProject.solution }}
                    </p>
                  </div>
                </div>
              </div>

              <!-- Business Impact Banner -->
              <div class="p-5 rounded-xl bg-cyan-950/20 border border-cyan-500/20 shadow-inner">
                <span class="block text-xs font-bold uppercase tracking-wider text-cyan-400 font-mono mb-2">Business & User Impact</span>
                <p class="text-sm text-slate-200 leading-relaxed text-justify">
                  {{ selectedProject.impact }}
                </p>
              </div>
            </div>

            <!-- Footer Actions -->
            <div class="px-6 py-4 bg-slate-950 border-t border-white/5 flex items-center justify-between gap-4">
              <a 
                v-if="selectedProject.github" 
                :href="selectedProject.github" 
                target="_blank"
                class="flex items-center space-x-2 px-5 py-2.5 rounded-lg bg-slate-900 border border-white/10 hover:border-white/20 text-slate-300 hover:text-slate-100 text-sm font-semibold transition-all"
              >
                <Github class="w-4 h-4" />
                <span>Source Code</span>
              </a>
              <a 
                v-if="selectedProject.demo" 
                :href="selectedProject.demo" 
                target="_blank"
                class="flex items-center space-x-2 px-5 py-2.5 rounded-lg bg-gradient-to-r from-cyan-500 to-emerald-500 text-slate-950 text-sm font-bold transition-all"
              >
                <ExternalLink class="w-4 h-4" />
                <span>Live Demo</span>
              </a>
              <button 
                @click="closeProject"
                class="px-5 py-2.5 bg-white/5 hover:bg-white/10 text-slate-300 hover:text-slate-100 rounded-lg text-sm font-semibold transition-colors cursor-pointer"
              >
                Close
              </button>
            </div>

          </div>
        </transition>
      </div>
    </transition>
  </section>
</template>
