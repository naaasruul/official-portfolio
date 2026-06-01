<script setup>
import { Github, Linkedin, Mail, Heart } from 'lucide-vue-next'

const currentYear = new Date().getFullYear()

const scrollTo = (selector) => {
  const target = document.querySelector(selector)
  if (target) {
    const offset = 80
    const targetPosition = target.getBoundingClientRect().top + window.scrollY - offset
    window.scrollTo({
      top: targetPosition,
      behavior: 'smooth'
    })
  }
}
</script>

<template>
  <footer class="bg-slate-950 border-t border-white/5 py-12 relative z-10">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
        
        <!-- About Column -->
        <div class="md:col-span-2 space-y-4">
          <a 
            href="#hero" 
            @click.prevent="scrollTo('#hero')"
            class="flex items-center space-x-2 w-fit"
          >
            <span class="text-xl font-black tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-400 font-display">
              NAS
            </span>
            <span class="w-1.5 h-1.5 rounded-full bg-violet-500"></span>
          </a>
          <p class="text-xs sm:text-sm text-slate-500 max-w-sm leading-relaxed text-justify">
            A software engineer specialized in building robust, performant web applications, automation pipelines, and modern interactive user interfaces.
          </p>
        </div>

        <!-- Links Column -->
        <div>
          <h5 class="text-xs font-bold uppercase tracking-widest text-slate-400 font-mono mb-4">Navigations</h5>
          <ul class="space-y-2.5 text-xs sm:text-sm text-slate-500">
            <li>
              <a href="#hero" @click.prevent="scrollTo('#hero')" class="hover:text-cyan-400 transition-colors">Home</a>
            </li>
            <li>
              <a href="#services" @click.prevent="scrollTo('#services')" class="hover:text-cyan-400 transition-colors">Services</a>
            </li>
            <li>
              <a href="#skills" @click.prevent="scrollTo('#skills')" class="hover:text-cyan-400 transition-colors">Skills</a>
            </li>
            <li>
              <a href="#projects" @click.prevent="scrollTo('#projects')" class="hover:text-cyan-400 transition-colors">Projects</a>
            </li>
          </ul>
        </div>

        <!-- Resources / Contact Column -->
        <div>
          <h5 class="text-xs font-bold uppercase tracking-widest text-slate-400 font-mono mb-4">Connect</h5>
          <ul class="space-y-2.5 text-xs sm:text-sm text-slate-500">
            <li>
              <a href="https://github.com/naaasruul" target="_blank" class="flex items-center space-x-2 hover:text-cyan-400 transition-colors">
                <Github class="w-4 h-4" />
                <span>GitHub</span>
              </a>
            </li>
            <li>
              <a href="https://linkedin.com" target="_blank" class="flex items-center space-x-2 hover:text-cyan-400 transition-colors">
                <Linkedin class="w-4 h-4" />
                <span>LinkedIn</span>
              </a>
            </li>
            <li>
              <a href="mailto:nasrulhaq.dev@gmail.com" class="flex items-center space-x-2 hover:text-cyan-400 transition-colors">
                <Mail class="w-4 h-4" />
                <span>Email</span>
              </a>
            </li>
          </ul>
        </div>
      </div>

      <!-- Copyright Bottom -->
      <div class="mt-12 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p class="text-xs text-slate-600">
          &copy; {{ currentYear }} Nasrulhaq Hidayat. All rights reserved.
        </p>
        
        <p class="text-[11px] text-slate-600 flex items-center space-x-1 font-mono">
          <span>Crafted with</span>
          <Heart class="w-3 h-3 text-rose-500 fill-rose-500 animate-pulse" />
          <span>using Vue 3 & Tailwind v4</span>
        </p>
      </div>

    </div>
  </footer>
</template>
