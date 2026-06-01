<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { Menu, X } from 'lucide-vue-next'

const navItems = [
  { name: 'Home', href: '#hero' },
  { name: 'Services', href: '#services' },
  { name: 'Skills', href: '#skills' },
  { name: 'Projects', href: '#projects' }
]

const activeSection = ref('hero')
const isMobileMenuOpen = ref(false)
const scrollNavbar = ref(false)

// Handle active section change on scroll using IntersectionObserver
let observer = null
onMounted(() => {
  const handleScroll = () => {
    scrollNavbar.value = window.scrollY > 20
  }
  window.addEventListener('scroll', handleScroll)
  handleScroll() // Initial scroll state check

  // Intersection observer for section tracking
  const sectionIds = ['hero', 'services', 'skills', 'projects', 'contact']
  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          activeSection.value = entry.target.id
        }
      })
    },
    {
      threshold: 0.25,
      rootMargin: '-15% 0px -60% 0px' // Focus viewport center
    }
  )

  sectionIds.forEach((id) => {
    const el = document.getElementById(id)
    if (el) observer.observe(el)
  })
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
  if (observer) {
    observer.disconnect()
  }
})

const handleNavClick = (e, href) => {
  e.preventDefault()
  isMobileMenuOpen.value = false
  const target = document.querySelector(href)
  if (target) {
    // Scroll with custom offset for fixed headers
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
  <header
    class="sticky top-0 z-50 transition-all duration-300 w-full"
    :class="[
      scrollNavbar 
        ? 'bg-slate-950/70 backdrop-blur-md border-b border-white/5 shadow-lg shadow-cyan-950/5' 
        : 'bg-transparent border-b border-transparent'
    ]"
  >
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-20">
        <!-- Logo -->
        <a 
          href="#hero" 
          @click="handleNavClick($event, '#hero')"
          class="flex items-center space-x-2 group"
        >
          <span class="text-2xl font-black tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-400 group-hover:from-emerald-400 group-hover:to-cyan-400 transition-all duration-500 font-display">
            NAS
          </span>
          <span class="w-1.5 h-1.5 rounded-full bg-violet-500 animate-pulse"></span>
        </a>

        <!-- Desktop Navigation -->
        <nav class="hidden md:flex items-center space-x-8">
          <a
            v-for="item in navItems"
            :key="item.name"
            :href="item.href"
            @click="handleNavClick($event, item.href)"
            class="relative text-sm font-medium tracking-wide transition-colors py-1.5"
            :class="[
              activeSection === item.href.slice(1) 
                ? 'text-cyan-400 font-semibold' 
                : 'text-slate-400 hover:text-slate-100'
            ]"
          >
            {{ item.name }}
            <span
              class="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-cyan-400 to-emerald-400 transform origin-left transition-transform duration-300"
              :class="activeSection === item.href.slice(1) ? 'scale-x-100' : 'scale-x-0'"
            />
          </a>
        </nav>

        <!-- CTA Button -->
        <div class="hidden md:flex items-center">
          <a
            href="#contact"
            @click="handleNavClick($event, '#contact')"
            class="px-5 py-2.5 rounded-full text-sm font-semibold text-slate-100 bg-white/5 border border-white/10 hover:border-cyan-500/50 hover:bg-cyan-950/20 hover:text-cyan-400 transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer"
          >
            Get in Touch
          </a>
        </div>

        <!-- Mobile Menu Toggle -->
        <div class="flex md:hidden">
          <button
            @click="isMobileMenuOpen = !isMobileMenuOpen"
            class="p-2 rounded-lg text-slate-400 hover:text-slate-100 hover:bg-slate-900/50 transition-colors"
            aria-label="Toggle Menu"
          >
            <Menu v-if="!isMobileMenuOpen" class="w-6 h-6" />
            <X v-else class="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>

    <!-- Mobile Menu dropdown -->
    <transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="opacity-0 -translate-y-4"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 -translate-y-4"
    >
      <div 
        v-if="isMobileMenuOpen" 
        class="md:hidden absolute top-full left-0 w-full bg-slate-950/95 backdrop-blur-xl border-b border-white/5 px-4 pt-2 pb-6 space-y-3 shadow-xl"
      >
        <a
          v-for="item in navItems"
          :key="item.name"
          :href="item.href"
          @click="handleNavClick($event, item.href)"
          class="block px-3 py-2.5 rounded-lg text-base font-medium transition-colors"
          :class="[
            activeSection === item.href.slice(1) 
              ? 'bg-cyan-950/30 text-cyan-400 border-l-2 border-cyan-500 font-semibold' 
              : 'text-slate-400 hover:bg-slate-900 hover:text-slate-100'
          ]"
        >
          {{ item.name }}
        </a>
        <div class="pt-4 border-t border-white/5">
          <a
            href="#contact"
            @click="handleNavClick($event, '#contact')"
            class="block w-full text-center px-4 py-3 rounded-lg text-sm font-semibold text-slate-100 bg-gradient-to-r from-cyan-500 to-emerald-500 hover:from-cyan-600 hover:to-emerald-600 transition-all duration-300 shadow-md shadow-cyan-500/10"
          >
            Get in Touch
          </a>
        </div>
      </div>
    </transition>
  </header>
</template>
