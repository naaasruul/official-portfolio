<script setup>
import { ref, onMounted } from 'vue'
import { ArrowRight, Download, Github, Linkedin, Mail } from 'lucide-vue-next'

const words = [
  'Full-Stack Developer',
  'UI/UX Design Enthusiast',
  'Automation Specialist',
  'Problem Solver'
]
const currentWord = ref('')
const isDeleting = ref(false)
const wordIdx = ref(0)
const charIdx = ref(0)
const typingSpeed = ref(100)

const type = () => {
  const fullWord = words[wordIdx.value]
  
  if (isDeleting.value) {
    currentWord.value = fullWord.substring(0, charIdx.value - 1)
    charIdx.value--
    typingSpeed.value = 40 // Faster deleting speed
  } else {
    currentWord.value = fullWord.substring(0, charIdx.value + 1)
    charIdx.value++
    typingSpeed.value = 80 // Typing speed
  }

  // State transitions
  if (!isDeleting.value && charIdx.value === fullWord.length) {
    typingSpeed.value = 2000 // Pause when fully typed
    isDeleting.value = true
  } else if (isDeleting.value && charIdx.value === 0) {
    isDeleting.value = false
    wordIdx.value = (wordIdx.value + 1) % words.length
    typingSpeed.value = 500 // Pause before starting next word
  }

  setTimeout(type, typingSpeed.value)
}

onMounted(() => {
  setTimeout(type, 800)
})

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
  <section 
    id="hero" 
    class="relative min-h-[calc(100vh-80px)] flex items-center py-20 lg:py-32 overflow-hidden z-10"
  >
    <!-- Background Gradient Orbs -->
    <div class="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[35rem] h-[35rem] rounded-full bg-cyan-500/10 blur-[120px] pointer-events-none" />
    <div class="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-[30rem] h-[30rem] rounded-full bg-emerald-500/10 blur-[120px] pointer-events-none" />
    <div class="absolute top-1/2 right-10 w-[20rem] h-[20rem] rounded-full bg-violet-600/5 blur-[100px] pointer-events-none" />

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
        
        <!-- Text Column -->
        <div class="lg:col-span-7 flex flex-col space-y-6 text-left">
          <!-- Small Badge -->
          <div class="inline-flex items-center space-x-2 px-3 py-1 bg-white/5 border border-white/10 rounded-full w-fit self-start backdrop-blur-sm">
            <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span class="text-xs font-semibold text-emerald-300 tracking-wide">Available for Freelance & Contracts</span>
          </div>

          <!-- Headline -->
          <h1 class="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight leading-[1.1] text-slate-100 font-display">
            Engineering High-Impact
            <span class="block mt-1 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-emerald-400 to-violet-500">
              Web & App Solutions
            </span>
          </h1>

          <!-- Animated Subheading -->
          <div class="text-xl sm:text-2xl font-semibold text-slate-300 h-10 flex items-center font-mono">
            <span>I'm a&nbsp;</span>
            <span class="text-cyan-400 relative">
              {{ currentWord }}<span class="w-1 ml-0.5 h-6 bg-cyan-400 inline-block align-middle animate-ping"></span>
            </span>
          </div>

          <!-- Short Bio -->
          <p class="text-base sm:text-lg text-slate-400 max-w-xl leading-relaxed text-justify">
            Based in Malaysia, I am a software developer with over 3 years of experience crafting robust APIs, responsive modern web frontends, and automated systems that drive real business impact.
          </p>

          <!-- Action buttons -->
          <div class="flex flex-col sm:flex-row gap-4 pt-4">
            <button
              @click="scrollTo('#projects')"
              class="group flex items-center justify-center space-x-2 px-8 py-4 bg-gradient-to-r from-cyan-500 to-emerald-500 hover:from-cyan-600 hover:to-emerald-600 text-slate-950 font-bold rounded-full transition-all duration-300 hover:scale-105 active:scale-95 hover:shadow-lg hover:shadow-cyan-500/25 cursor-pointer"
            >
              <span>Explore My Work</span>
              <ArrowRight class="w-5 h-5 group-hover:translate-x-1.5 transition-transform" />
            </button>
            
            <button
              @click="scrollTo('#contact')"
              class="flex items-center justify-center space-x-2 px-8 py-4 bg-white/5 border border-white/10 hover:border-white/20 text-slate-200 hover:text-white font-semibold rounded-full transition-all duration-300 hover:scale-105 active:scale-95 hover:bg-white/10 cursor-pointer"
            >
              <span>Let's Discuss a Project</span>
            </button>
          </div>

          <!-- Social Shortcuts -->
          <div class="flex items-center space-x-4 pt-6 text-slate-500">
            <span class="text-xs uppercase tracking-widest font-semibold text-slate-600">Connect:</span>
            <a href="https://github.com/naaasruul" target="_blank" class="hover:text-cyan-400 transition-colors">
              <Github class="w-5 h-5" />
            </a>
            <a href="https://linkedin.com" target="_blank" class="hover:text-cyan-400 transition-colors">
              <Linkedin class="w-5 h-5" />
            </a>
            <a href="mailto:nasrulhaq.dev@gmail.com" class="hover:text-cyan-400 transition-colors">
              <Mail class="w-5 h-5" />
            </a>
          </div>
        </div>

        <!-- Visual / Graphic Column -->
        <div class="lg:col-span-5 flex justify-center items-center relative">
          <!-- Decorative Mesh Circle behind Mock -->
          <div class="absolute w-80 h-80 rounded-full border border-dashed border-white/5 animate-spin [animation-duration:60s] pointer-events-none" />
          
          <!-- Mock Terminal / Window -->
          <div class="relative w-full max-w-md bg-slate-900/60 border border-white/10 backdrop-blur-md rounded-2xl overflow-hidden shadow-2xl shadow-cyan-950/20 neon-glow-cyan/5">
            <!-- Window header -->
            <div class="flex items-center justify-between px-4 py-3 bg-slate-950/80 border-b border-white/5">
              <div class="flex space-x-1.5">
                <div class="w-3 h-3 rounded-full bg-rose-500/80"></div>
                <div class="w-3 h-3 rounded-full bg-amber-500/80"></div>
                <div class="w-3 h-3 rounded-full bg-emerald-500/80"></div>
              </div>
              <div class="text-xs text-slate-500 font-mono">nasrul-profile.json</div>
              <div class="w-4"></div>
            </div>
            <!-- Editor body -->
            <div class="p-6 font-mono text-xs sm:text-sm text-slate-300 leading-relaxed overflow-x-auto">
              <div><span class="text-violet-400">const</span> <span class="text-cyan-300">developer</span> = <span class="text-yellow-400">{</span></div>
              <div class="pl-4"><span class="text-cyan-400">name</span>: <span class="text-emerald-300">'Nasrulhaq Hidayat'</span>,</div>
              <div class="pl-4"><span class="text-cyan-400">age</span>: <span class="text-amber-300">21</span>,</div>
              <div class="pl-4"><span class="text-cyan-400">role</span>: <span class="text-emerald-300">'Fullstack Web & Mobile Dev'</span>,</div>
              <div class="pl-4"><span class="text-cyan-400">location</span>: <span class="text-emerald-300">'Shah Alam, Selangor'</span>,</div>
              <div class="pl-4"><span class="text-cyan-400">experience</span>: <span class="text-amber-300">> 3 /* years */</span>,</div>
              <div class="pl-4"><span class="text-cyan-400">coreStack</span>: <span class="text-violet-400">[</span></div>
              <div class="pl-8"><span class="text-emerald-300">'Laravel'</span>, <span class="text-emerald-300">'Vue.js'</span>, <span class="text-emerald-300">'Tailwind CSS'</span>,</div>
              <div class="pl-8"><span class="text-emerald-300">'Flutter / Dart'</span>, <span class="text-emerald-300">'Node.js / Express'</span></div>
              <div class="pl-4"><span class="text-violet-400">]</span>,</div>
              <div class="pl-4"><span class="text-cyan-400">hobbies</span>: <span class="text-violet-400">[</span><span class="text-emerald-300">'Playing Music'</span>, <span class="text-emerald-300">'Coding'</span><span class="text-violet-400">]</span></div>
              <div><span class="text-yellow-400">}</span></div>
            </div>
          </div>
        </div>

      </div>
    </div>
  </section>
</template>
