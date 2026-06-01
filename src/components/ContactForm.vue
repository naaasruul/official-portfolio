<script setup>
import { ref } from 'vue'
import { Mail, Send, Github, Linkedin, Check, AlertCircle, Sparkles } from 'lucide-vue-next'
import ScrollReveal from './ScrollReveal.vue'

const form = ref({
  name: '',
  email: '',
  service: '',
  message: ''
})

const errors = ref({
  name: '',
  email: '',
  message: ''
})

const isSubmitting = ref(false)
const isSuccess = ref(false)
const shakeForm = ref(false)

const validateForm = () => {
  let isValid = true
  errors.value = { name: '', email: '', message: '' }

  if (!form.value.name.trim()) {
    errors.value.name = 'Please provide your name.'
    isValid = false
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!form.value.email) {
    errors.value.email = 'Please provide your email.'
    isValid = false
  } else if (!emailRegex.test(form.value.email)) {
    errors.value.email = 'Please provide a valid email address.'
    isValid = false
  }

  if (form.value.message.length < 10) {
    errors.value.message = 'Please write a message with at least 10 characters.'
    isValid = false
  }

  return isValid
}

const handleSubmit = () => {
  if (!validateForm()) {
    shakeForm.value = true
    setTimeout(() => {
      shakeForm.value = false
    }, 500)
    return
  }

  isSubmitting.value = true

  // Simulate API submission call
  setTimeout(() => {
    isSubmitting.value = false
    isSuccess.value = true
    
    // Clear form inputs
    form.value = {
      name: '',
      email: '',
      service: '',
      message: ''
    }
  }, 1500)
}
</script>

<template>
  <section id="contact" class="py-24 relative z-10 border-t border-white/5 bg-slate-950">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      <!-- Grid Layout -->
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        <!-- Left Side Info -->
        <div class="lg:col-span-5 space-y-6">
          <ScrollReveal :delay="100">
            <span class="text-xs uppercase tracking-widest font-bold text-cyan-400 mb-3 font-mono block">
              Let's Connect
            </span>
            <h3 class="text-3xl sm:text-4xl font-extrabold text-slate-100 font-display">
              Start a Conversation
            </h3>
            <p class="mt-4 text-base text-slate-400 leading-relaxed text-justify">
              Looking for a custom application, background automation, or a clean UI interface? Let's discuss your requirements and build a solution that drives actual business results.
            </p>
          </ScrollReveal>

          <!-- Contact items -->
          <ScrollReveal :delay="250" class="space-y-4 pt-4">
            <a 
              href="mailto:nasrulhaq.dev@gmail.com"
              class="flex items-center space-x-4 p-4 rounded-xl bg-slate-900/30 border border-white/5 hover:border-cyan-500/20 hover:bg-slate-900/60 transition-all group"
            >
              <div class="p-3 bg-cyan-950/20 border border-cyan-500/10 rounded-lg group-hover:border-cyan-500/30 text-cyan-400">
                <Mail class="w-5 h-5" />
              </div>
              <div>
                <span class="block text-xs font-semibold text-slate-500 uppercase font-mono">Email Directly</span>
                <span class="text-sm font-semibold text-slate-300 group-hover:text-cyan-400 transition-colors">nasrulhaq.dev@gmail.com</span>
              </div>
            </a>
          </ScrollReveal>

          <!-- Social Matrix -->
          <ScrollReveal :delay="300" class="pt-6">
            <div class="flex items-center space-x-3">
              <a 
                href="https://github.com/naaasruul" 
                target="_blank"
                class="flex items-center space-x-2 px-4 py-2 text-xs font-semibold rounded-lg bg-slate-900 border border-white/5 hover:border-white/15 text-slate-400 hover:text-slate-200 transition-all"
              >
                <Github class="w-4 h-4" />
                <span>GitHub</span>
              </a>
              <a 
                href="https://linkedin.com" 
                target="_blank"
                class="flex items-center space-x-2 px-4 py-2 text-xs font-semibold rounded-lg bg-slate-900 border border-white/5 hover:border-white/15 text-slate-400 hover:text-slate-200 transition-all"
              >
                <Linkedin class="w-4 h-4" />
                <span>LinkedIn</span>
              </a>
            </div>
          </ScrollReveal>
        </div>

        <!-- Right Side Form Card -->
        <div class="lg:col-span-7">
          <ScrollReveal :delay="200">
            <div 
              class="relative bg-slate-900/40 border border-white/10 rounded-2xl p-8 backdrop-blur-sm shadow-xl transition-all"
              :class="[
                shakeForm ? 'animate-shake' : '',
                isSuccess ? 'border-emerald-500/20 neon-glow-emerald/5' : 'neon-glow-cyan/5'
              ]"
            >
              
              <!-- Form Success State -->
              <transition name="fade-slide" mode="out-in">
                <div v-if="isSuccess" class="py-12 flex flex-col items-center text-center space-y-5">
                  <div class="relative">
                    <div class="absolute inset-0 bg-emerald-500/20 blur-md rounded-full" />
                    <div class="relative p-5 bg-emerald-500 text-slate-950 rounded-full border border-emerald-400/50 flex items-center justify-center animate-scale-up">
                      <Check class="w-8 h-8 stroke-[3]" />
                    </div>
                  </div>
                  
                  <div class="space-y-2">
                    <h4 class="text-2xl font-bold text-slate-100 font-display">Message Received!</h4>
                    <p class="text-sm text-slate-400 max-w-sm">
                      Thank you for reaching out, Nasrulhaq Hidayat will review your requirements and follow up with you within 24 hours.
                    </p>
                  </div>
                  
                  <button 
                    @click="isSuccess = false"
                    class="px-6 py-2.5 rounded-full text-xs font-bold bg-white/5 border border-white/10 hover:border-emerald-500/30 hover:bg-emerald-950/20 hover:text-emerald-400 transition-all cursor-pointer"
                  >
                    Send Another Message
                  </button>
                </div>

                <!-- Form Inputs -->
                <form v-else @submit.prevent="handleSubmit" class="space-y-6">
                  
                  <!-- Form Grid Name & Email -->
                  <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <!-- Name input -->
                    <div class="flex flex-col space-y-1 text-left">
                      <label for="name" class="text-xs font-bold text-slate-400 uppercase tracking-wide font-mono">Your Name</label>
                      <input 
                        id="name"
                        v-model="form.name"
                        type="text" 
                        placeholder="John Doe"
                        class="w-full px-4 py-3 rounded-lg bg-slate-950 border text-sm text-slate-200 placeholder-slate-600 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/30 transition-all"
                        :class="errors.name ? 'border-rose-500/50' : 'border-white/10'"
                      />
                      <span v-if="errors.name" class="flex items-center space-x-1.5 text-xs text-rose-400 pt-1">
                        <AlertCircle class="w-3.5 h-3.5" />
                        <span>{{ errors.name }}</span>
                      </span>
                    </div>

                    <!-- Email input -->
                    <div class="flex flex-col space-y-1 text-left">
                      <label for="email" class="text-xs font-bold text-slate-400 uppercase tracking-wide font-mono">Your Email</label>
                      <input 
                        id="email"
                        v-model="form.email"
                        type="email" 
                        placeholder="john@example.com"
                        class="w-full px-4 py-3 rounded-lg bg-slate-950 border text-sm text-slate-200 placeholder-slate-600 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/30 transition-all"
                        :class="errors.email ? 'border-rose-500/50' : 'border-white/10'"
                      />
                      <span v-if="errors.email" class="flex items-center space-x-1.5 text-xs text-rose-400 pt-1">
                        <AlertCircle class="w-3.5 h-3.5" />
                        <span>{{ errors.email }}</span>
                      </span>
                    </div>
                  </div>

                  <!-- Service Select -->
                  <div class="flex flex-col space-y-1 text-left">
                    <label for="service" class="text-xs font-bold text-slate-400 uppercase tracking-wide font-mono">What do you need?</label>
                    <div class="relative">
                      <select 
                        id="service"
                        v-model="form.service"
                        class="w-full px-4 py-3 rounded-lg bg-slate-950 border border-white/10 text-sm text-slate-300 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/30 transition-all appearance-none cursor-pointer"
                      >
                        <option value="">Select a service category...</option>
                        <option value="fullstack">Full-Stack Application Development</option>
                        <option value="automation">Process Automation & Integrations</option>
                        <option value="cloud">Cloud Setup & Infrastructure</option>
                        <option value="design">UI/UX Interface Engineering</option>
                        <option value="other">Consulting / Other</option>
                      </select>
                      <!-- Custom caret icon -->
                      <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-500">
                        <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                      </div>
                    </div>
                  </div>

                  <!-- Message input -->
                  <div class="flex flex-col space-y-1 text-left">
                    <label for="message" class="text-xs font-bold text-slate-400 uppercase tracking-wide font-mono">Project Details</label>
                    <textarea 
                      id="message"
                      v-model="form.message"
                      rows="4"
                      placeholder="Describe your project, timeline, and goals..."
                      class="w-full px-4 py-3 rounded-lg bg-slate-950 border text-sm text-slate-200 placeholder-slate-600 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/30 transition-all resize-none"
                      :class="errors.message ? 'border-rose-500/50' : 'border-white/10'"
                    ></textarea>
                    <span v-if="errors.message" class="flex items-center space-x-1.5 text-xs text-rose-400 pt-1">
                      <AlertCircle class="w-3.5 h-3.5" />
                      <span>{{ errors.message }}</span>
                    </span>
                  </div>

                  <!-- Submit button -->
                  <button 
                    type="submit"
                    :disabled="isSubmitting"
                    class="w-full flex items-center justify-center space-x-2 px-8 py-4 bg-gradient-to-r from-cyan-500 to-emerald-500 hover:from-cyan-600 hover:to-emerald-600 disabled:from-cyan-700 disabled:to-emerald-700 text-slate-950 font-bold rounded-xl transition-all duration-300 hover:scale-[1.01] active:scale-[0.99] cursor-pointer"
                  >
                    <!-- Spinner or icon -->
                    <svg v-if="isSubmitting" class="animate-spin h-5 w-5 text-slate-950" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <Send v-else class="w-4 h-4" />
                    <span>{{ isSubmitting ? 'Sending Request...' : 'Send Message' }}</span>
                  </button>

                </form>
              </transition>

            </div>
          </ScrollReveal>
        </div>

      </div>
    </div>
  </section>
</template>

<style scoped>
/* Shake animation for errors */
@keyframes shake {
  0%, 100% { transform: translateX(0); }
  20%, 60% { transform: translateX(-6px); }
  40%, 80% { transform: translateX(6px); }
}

.animate-shake {
  animation: shake 0.4s ease-in-out;
}

/* Scale up for checkmark */
@keyframes scaleUp {
  0% { transform: scale(0.6); opacity: 0; }
  100% { transform: scale(1); opacity: 1; }
}

.animate-scale-up {
  animation: scaleUp 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

/* Fade slide transition styles */
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: all 0.3s ease;
}

.fade-slide-enter-from {
  opacity: 0;
  transform: translateY(10px);
}

.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
