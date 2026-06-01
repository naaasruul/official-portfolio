<script setup>
import { Cpu, Layers, Globe, Sparkles } from 'lucide-vue-next'
import ScrollReveal from './ScrollReveal.vue'

const services = [
  {
    title: 'Full-Stack Web Architectures',
    description: 'Developing high-performance client portals, SaaS platforms, and internal business tools designed for peak scalability.',
    impact: 'Up to 60% faster page loads and 99.9% system uptime through clean MVC backend architectures and decoupled single-page frontends.',
    techs: ['Laravel', 'Vue 3', 'Node.js', 'REST APIs'],
    colorClass: 'group-hover:text-cyan-400',
    glowClass: 'neon-glow-cyan/5'
  },
  {
    title: 'Automation & Integration Systems',
    description: 'Designing custom scripting engines and workflow automation pipelines to sync legacy systems and process bulk datasets.',
    impact: 'Saves 15+ hours weekly of manual data input, reducing human errors by automating complex data flows and third-party webhooks.',
    techs: ['Python', 'Cron Jobs', 'Webhooks', 'OAuth / APIs'],
    colorClass: 'group-hover:text-emerald-400',
    glowClass: 'neon-glow-emerald/5'
  },
  {
    title: 'Cloud & Infrastructure Management',
    description: 'Configuring secure VPS environments, Docker virtualization, database clustering, and automated system backups.',
    impact: 'Zero data loss assurance with automated nightly off-site backups and server health alert reporting to prevent downtime.',
    techs: ['Docker', 'Nginx', 'MySQL Clustering', 'Linux VPS'],
    colorClass: 'group-hover:text-violet-400',
    glowClass: 'neon-glow-violet/5'
  },
  {
    title: 'Creative Frontend Engineering',
    description: 'Transforming custom wireframes into responsive, highly interactive web experiences utilizing micro-interactions.',
    impact: 'Dramatically improves user engagement rates and increases client conversion paths by up to 25% through sleek responsive UI.',
    techs: ['Tailwind CSS', 'Vite', 'motion-v / GSAP', 'Figma'],
    colorClass: 'group-hover:text-cyan-400',
    glowClass: 'neon-glow-cyan/5'
  }
]

// Map lucide components
const icons = [Layers, Cpu, Globe, Sparkles]
</script>

<template>
  <section id="services" class="py-24 relative z-10 border-t border-white/5 bg-slate-950/20">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      <!-- Section Header -->
      <ScrollReveal :delay="100">
        <div class="max-w-3xl mx-auto text-center mb-16">
          <h2 class="text-xs uppercase tracking-widest font-bold text-cyan-400 mb-3 font-mono">
            Expertise & Value
          </h2>
          <h3 class="text-3xl sm:text-4xl font-extrabold text-slate-100 font-display">
            High-Impact Technical Solutions
          </h3>
          <p class="mt-4 text-base sm:text-lg text-slate-400">
            Providing full-cycle software engineering focused on streamlining operations, boosting speeds, and driving conversions.
          </p>
        </div>
      </ScrollReveal>

      <!-- Services Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <ScrollReveal 
          v-for="(service, idx) in services" 
          :key="service.title"
          :delay="200 + (idx * 100)"
        >
          <div 
            class="group h-full p-8 rounded-2xl bg-slate-900/40 border border-white/10 backdrop-blur-sm transition-all duration-300 hover:scale-[1.02] hover:-translate-y-1 hover:border-white/15 cursor-default flex flex-col justify-between"
            :class="service.glowClass"
          >
            <div>
              <!-- Icon Header -->
              <div class="flex items-center justify-between mb-6">
                <div class="p-3.5 rounded-xl bg-white/5 border border-white/10 group-hover:border-cyan-500/30 transition-all duration-500">
                  <component 
                    :is="icons[idx]" 
                    class="w-6 h-6 text-slate-300 transition-colors duration-500" 
                    :class="service.colorClass"
                  />
                </div>
                <!-- Small technical indicator -->
                <span class="text-[10px] font-mono uppercase tracking-wider text-slate-600">0{{ idx + 1 }} // Service</span>
              </div>

              <!-- Content -->
              <h4 class="text-xl font-bold text-slate-100 mb-3 group-hover:text-cyan-300 transition-colors duration-300 font-display">
                {{ service.title }}
              </h4>
              
              <p class="text-sm sm:text-base text-slate-400 leading-relaxed mb-6 text-justify">
                {{ service.description }}
              </p>
            </div>

            <!-- Value Prop & Techs -->
            <div class="space-y-4 pt-4 border-t border-white/5">
              <!-- Value Statement -->
              <div class="p-4 rounded-xl bg-cyan-950/10 border border-cyan-500/10 group-hover:border-cyan-500/20 transition-all duration-300">
                <span class="block text-[10px] font-bold uppercase tracking-wider text-cyan-400 mb-1 font-mono">Business Impact</span>
                <p class="text-xs sm:text-sm text-slate-300">
                  {{ service.impact }}
                </p>
              </div>

              <!-- Tech Tags -->
              <div class="flex flex-wrap gap-2 pt-2">
                <span 
                  v-for="tech in service.techs" 
                  :key="tech"
                  class="text-[11px] font-semibold font-mono px-2.5 py-1 rounded bg-slate-950 border border-white/5 text-slate-400"
                >
                  {{ tech }}
                </span>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>

    </div>
  </section>
</template>
