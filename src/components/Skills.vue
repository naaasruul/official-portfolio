<script setup>
import { ref } from 'vue'
import { Terminal, Shield, Award, Layers } from 'lucide-vue-next'
import ScrollReveal from './ScrollReveal.vue'

const activeTab = ref('languages')

const skillCategories = [
  {
    id: 'languages',
    label: 'Languages',
    icon: Terminal,
    skills: [
      { name: 'PHP', level: 90, exp: '3+ Years', detail: 'Laravel backend systems, custom REST APIs, web integrations' },
      { name: 'JavaScript / ES6+', level: 85, exp: '3 Years', detail: 'Vue client states, asynchronous Express APIs, node automation' },
      { name: 'Python', level: 80, exp: '2 Years', detail: 'Data scrapers, script automation, system cron jobs' },
      { name: 'SQL (MySQL / Postgre)', level: 85, exp: '3 Years', detail: 'Relational database design, query optimization, indexing' },
      { name: 'HTML5 & CSS3', level: 95, exp: '4 Years', detail: 'Responsive design, semantic layout, animation, Tailwind' },
      { name: 'Dart', level: 75, exp: '1.5 Years', detail: 'Flutter mobile application code, states, and layouts' }
    ]
  },
  {
    id: 'frameworks',
    label: 'Frameworks',
    icon: Layers,
    skills: [
      { name: 'Laravel', level: 90, exp: '3+ Years', detail: 'MVC pattern, jobs/queues, Eloquent ORM, custom middlewares' },
      { name: 'Vue.js (Vue 2 & 3)', level: 85, exp: '2.5 Years', detail: 'Composition API, Script Setup, Pinia states, Vue Router' },
      { name: 'Flutter', level: 75, exp: '1.5 Years', detail: 'Cross-platform app dev, provider states, API parsing' },
      { name: 'Tailwind CSS', level: 95, exp: '3 Years', detail: 'Utility classes, theme design tokens, dark mode utilities' },
      { name: 'Express.js', level: 75, exp: '2 Years', detail: 'Node.js server routing, token auth, WebSocket systems' },
      { name: 'Bootstrap / Flowbite', level: 90, exp: '3+ Years', detail: 'Rapid UI layouts, responsive components, CSS wrappers' }
    ]
  },
  {
    id: 'tools',
    label: 'Architecture & Tools',
    icon: Shield,
    skills: [
      { name: 'Git & GitHub', level: 90, exp: '4 Years', detail: 'Team branching models, CI/CD actions, webhooks' },
      { name: 'Docker', level: 70, exp: '1.5 Years', detail: 'Containerization, dev environments, compose configurations' },
      { name: 'Nginx & Apache', level: 75, exp: '2 Years', detail: 'Virtual hosts setup, reverse proxying, SSL certificate encryption' },
      { name: 'Linux Server VPS', level: 80, exp: '2.5 Years', detail: 'VPS management, SSH keys, basic firewall setups, shell scripts' },
      { name: 'Figma', level: 80, exp: '2 Years', detail: 'Vector layout designs, UI/UX prototyping, developer handoff' },
      { name: 'Postman / API Design', level: 90, exp: '3 Years', detail: 'API mockups, request chaining, JSON schema validations' }
    ]
  }
]

const getActiveCategory = () => {
  return skillCategories.find(cat => cat.id === activeTab.value)
}
</script>

<template>
  <section id="skills" class="py-24 relative z-10 border-t border-white/5 bg-slate-950">
    <!-- Gradient orbs -->
    <div class="absolute top-1/3 right-1/4 w-[25rem] h-[25rem] rounded-full bg-violet-500/5 blur-[100px] pointer-events-none" />
    <div class="absolute bottom-1/3 left-1/4 w-[25rem] h-[25rem] rounded-full bg-cyan-500/5 blur-[100px] pointer-events-none" />

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      <!-- Section Header -->
      <ScrollReveal :delay="100">
        <div class="max-w-3xl mx-auto text-center mb-16">
          <span class="text-xs uppercase tracking-widest font-bold text-emerald-400 mb-3 font-mono block">
            Capabilities
          </span>
          <h3 class="text-3xl sm:text-4xl font-extrabold text-slate-100 font-display">
            Technical Skill Matrix
          </h3>
          <p class="mt-4 text-base sm:text-lg text-slate-400">
            A scannable mapping of technologies, libraries, and architecture systems I use to build robust digital products.
          </p>
        </div>
      </ScrollReveal>

      <!-- Category Selector Tabs -->
      <ScrollReveal :delay="200">
        <div class="flex items-center justify-center space-x-2 md:space-x-4 mb-12">
          <button
            v-for="cat in skillCategories"
            :key="cat.id"
            @click="activeTab = cat.id"
            class="group flex items-center space-x-2 px-5 py-3 rounded-full border text-sm font-semibold tracking-wide transition-all duration-300 cursor-pointer"
            :class="[
              activeTab === cat.id
                ? 'bg-gradient-to-r from-cyan-950 to-emerald-950 border-cyan-500/40 text-cyan-400 neon-glow-cyan/10'
                : 'bg-white/5 border-white/5 text-slate-400 hover:text-slate-200 hover:bg-white/10'
            ]"
          >
            <component 
              :is="cat.icon" 
              class="w-4 h-4 transition-colors" 
              :class="activeTab === cat.id ? 'text-cyan-400' : 'text-slate-400 group-hover:text-slate-200'"
            />
            <span>{{ cat.label }}</span>
          </button>
        </div>
      </ScrollReveal>

      <!-- Skills Matrix Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <!-- Render with transition -->
        <div 
          v-for="(skill, index) in getActiveCategory().skills"
          :key="skill.name + activeTab"
          class="opacity-0 translate-y-4 animate-fade-in-up"
          :style="{ animationDelay: `${index * 80}ms`, animationFillMode: 'forwards' }"
        >
          <div 
            class="group relative p-6 rounded-xl bg-slate-900/35 border border-white/5 backdrop-blur-sm transition-all duration-300 hover:scale-[1.03] hover:border-cyan-500/20 hover:bg-slate-900/60 hover:shadow-lg hover:shadow-cyan-950/10 cursor-pointer overflow-hidden flex flex-col justify-between h-[155px]"
          >
            <!-- Core Skill View -->
            <div>
              <div class="flex items-center justify-between mb-3">
                <span class="font-bold text-slate-100 group-hover:text-cyan-300 transition-colors duration-300 font-display text-base">
                  {{ skill.name }}
                </span>
                <span class="text-xs font-semibold font-mono text-cyan-400/90 group-hover:hidden bg-cyan-950/20 px-2 py-0.5 rounded">
                  {{ skill.level }}%
                </span>
                <!-- Reveal Experience on Hover -->
                <span class="hidden group-hover:inline text-[11px] font-bold font-mono text-emerald-400 uppercase tracking-wider bg-emerald-950/30 px-2 py-0.5 rounded animate-fade-in">
                  {{ skill.exp }}
                </span>
              </div>

              <!-- Proficiency Indicator -->
              <div class="relative w-full h-1.5 bg-slate-950 rounded-full overflow-hidden mb-3">
                <div 
                  class="absolute top-0 left-0 h-full bg-gradient-to-r from-cyan-500 to-emerald-500 rounded-full transition-all duration-1000 ease-out"
                  :style="{ width: `${skill.level}%` }"
                />
              </div>
            </div>

            <!-- Experience Depth / Details -->
            <div class="h-[44px] flex items-end">
              <!-- Regular state text -->
              <p class="text-xs text-slate-500 leading-normal line-clamp-2 group-hover:hidden transition-all duration-300 text-justify">
                Used extensively for backend orchestration, user workflows, and secure client APIs.
              </p>
              
              <!-- Hover detail text -->
              <p class="hidden group-hover:block text-xs text-slate-300 leading-relaxed font-sans transition-all duration-300 text-justify animate-fade-in">
                {{ skill.detail }}
              </p>
            </div>
          </div>
        </div>
      </div>

    </div>
  </section>
</template>

<style scoped>
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(16px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in-up {
  animation: fadeInUp 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.animate-fade-in {
  animation: fadeIn 0.3s ease forwards;
}
</style>