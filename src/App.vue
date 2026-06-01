<script setup>
import { ref, reactive, onMounted, onUnmounted, computed } from 'vue'
import { 
  Lock, 
  Unlock, 
  Mail, 
  Github, 
  Linkedin, 
  Plus, 
  Trash2, 
  Edit2, 
  Download, 
  Upload, 
  X, 
  ExternalLink, 
  Check, 
  AlertCircle, 
  ArrowRight,
  Terminal,
  Settings,
  Database,
  Monitor,
  Activity,
  Cpu,
  Sun,
  Moon,
  ChevronRight,
  BookOpen,
  CheckCircle,
  Eye,
  EyeOff
} from 'lucide-vue-next'

// Default fallback mock data (Real high-fidelity projects)
const defaultData = {
  profile: {
    name: 'Nasrulhaq Hidayat',
    headline: 'Engineering high-throughput backend services and responsive client frontends.',
    location: 'Selangor, Malaysia',
    bio: 'I am a full-stack engineer and designer specialized in creating scalable systems, API architectures, and conversion-optimized interfaces. With over 3 years of hands-on experience, I bridge low-level code execution speed with structural design parameters to build software that satisfies recruiters and converts clients.',
    contactEmail: 'nasrulhaq.dev@gmail.com',
    github: 'https://github.com/naaasruul',
    linkedin: 'https://linkedin.com'
  },
  skills: [
    { name: 'PHP / Laravel', category: 'languages', detail: 'Advanced MVC architectures, queues, schedules' },
    { name: 'JavaScript / Node.js', category: 'languages', detail: 'Asynchronous event loops, REST API backends' },
    { name: 'Python Scripting', category: 'languages', detail: 'Automation flows, background workers, scrapers' },
    { name: 'SQL (MySQL / Postgre)', category: 'languages', detail: 'Query optimization, schema relations, indexing' },
    { name: 'Dart / Flutter', category: 'languages', detail: 'Cross-platform app states & clean widgets' },
    { name: 'Vue.js (Vue 3 Core)', category: 'frameworks', detail: 'Reactive composition setup, Pinia states' },
    { name: 'Express APIs', category: 'frameworks', detail: 'Node router middlewares, token decrypters' },
    { name: 'Tailwind CSS', category: 'frameworks', detail: 'Theme variable tokens, custom grids, glassmorphism' },
    { name: 'Docker Containers', category: 'tools', detail: 'Virtual runtime environment packages' },
    { name: 'Git & Git Flow', category: 'tools', detail: 'Team branch controls, CI/CD actions, commands' },
    { name: 'Linux Server VPS', category: 'tools', detail: 'Cron background tasks, SSH configurations' },
    { name: 'Postman / API Docs', category: 'tools', detail: 'Request chains, mocking, response validations' }
  ],
  projects: [
    {
      id: 1,
      title: 'EduExam Portal System',
      category: 'web',
      year: '2025',
      description: 'A high-concurrency examination management platform. Resolves student cheating risks through focus tracker triggers and database query bottlenecks through schema indexing.',
      challenge: 'Legacy testing engines crashed during peak logins and lacked browser cheating lockouts.',
      solution: 'Replaced with decoupled Vue 3 frontends communicating with a Laravel API, incorporating event state logging.',
      impact: 'Successfully processed 1,000+ candidates simultaneously, reducing server load times by 65% and cheating to zero.',
      imageUrl: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=800&auto=format&fit=crop',
      link: 'https://github.com/naaasruul'
    },
    {
      id: 2,
      title: 'KPMB Student Companion',
      category: 'mobile',
      year: '2026',
      description: 'A clean companion application for students to track schedules, notification alerts, and campus announcements in one interface.',
      challenge: 'Students relied on cluttered social feeds and separate portal web pages for schedules.',
      solution: 'Designed and compiled a native Flutter wrapper connected to a Firebase notification hub.',
      impact: 'Enrolled 50% of the active student body in the first semester, increasing calendar access speeds by 80%.',
      imageUrl: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=800&auto=format&fit=crop',
      link: 'https://github.com/naaasruul'
    },
    {
      id: 3,
      title: 'Lost & Found Claims Hub',
      category: 'web',
      year: '2025',
      description: 'A structured directory mapping reported lost items with secure claim validation modules and image uploads.',
      challenge: 'Verbal communication in chat threads caused lost items to go unclaimed.',
      solution: 'Formulated a database matching portal with status triggers and claim verification workflows.',
      impact: 'Resolved over 300 item claims in the first semester, cutting typical return cycles down to 48 hours.',
      imageUrl: 'https://images.unsplash.com/photo-1457369804613-52c61a468e7d?q=80&w=800&auto=format&fit=crop',
      link: 'https://github.com/naaasruul'
    }
  ],
  settings: {
    password: 'admin123'
  }
}

// State Control
const data = ref({ ...defaultData })
const isDark = ref(false)
const isAdmin = ref(false)
const showLoginModal = ref(false)
const showAdminDrawer = ref(false)
const adminPasswordInput = ref('')
const loginError = ref('')
const activeFilter = ref('all')
const activeAdminTab = ref('profile')
const showPassword = ref(false)
const selectedProject = ref(null)

// Custom Toast Alerts
const toasts = ref([])
const addToast = (message, type = 'success') => {
  const id = Date.now()
  toasts.value.push({ id, message, type })
  setTimeout(() => {
    toasts.value = toasts.value.filter(t => t.id !== id)
  }, 3500)
}

// Active Scroll Navigation Tracker
const activeSection = ref('hero')
let scrollObserver = null

const setupScrollObserver = () => {
  const ids = ['hero', 'services', 'projects', 'skills', 'game', 'contact']
  scrollObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          activeSection.value = entry.target.id
        }
      })
    },
    { threshold: 0.25, rootMargin: '-10% 0px -55% 0px' }
  )

  ids.forEach(id => {
    const el = document.getElementById(id)
    if (el) scrollObserver.observe(el)
  })
}

// LocalStorage Persistence
const loadData = () => {
  const local = localStorage.getItem('nasrul_dev_portfolio')
  if (local) {
    try {
      data.value = JSON.parse(local)
      if (!data.value.profile) data.value.profile = { ...defaultData.profile }
      if (!data.value.skills) data.value.skills = [ ...defaultData.skills ]
      if (!data.value.projects) data.value.projects = [ ...defaultData.projects ]
      if (!data.value.settings) data.value.settings = { ...defaultData.settings }
    } catch (e) {
      data.value = { ...defaultData }
    }
  } else {
    data.value = { ...defaultData }
    saveData()
  }

  // Load theme preference
  const savedTheme = localStorage.getItem('nasrul_dev_theme')
  isDark.value = savedTheme === 'dark'
  applyTheme()
}

const saveData = () => {
  localStorage.setItem('nasrul_dev_portfolio', JSON.stringify(data.value))
}

const applyTheme = () => {
  document.documentElement.classList.toggle('dark', isDark.value)
  localStorage.setItem('nasrul_dev_theme', isDark.value ? 'dark' : 'light')
}

const toggleTheme = () => {
  isDark.value = !isDark.value
  applyTheme()
  addToast(`Theme switched to ${isDark.value ? 'Dark Mode' : 'Light Mode'}`, 'info')
}

const heroMounted = ref(false)

onMounted(() => {
  loadData()
  setupScrollObserver()
  loadHighScore()
  setTimeout(() => {
    heroMounted.value = true
  }, 150)
})

onUnmounted(() => {
  if (scrollObserver) scrollObserver.disconnect()
})

// Authentication
const handleLogin = () => {
  if (adminPasswordInput.value === data.value.settings.password) {
    isAdmin.value = true
    showLoginModal.value = false
    adminPasswordInput.value = ''
    loginError.value = ''
    addToast('Admin mode enabled.', 'success')
  } else {
    loginError.value = 'Authentication failure: Invalid password.'
  }
}

const handleLogout = () => {
  isAdmin.value = false
  showAdminDrawer.value = false
  addToast('Signed out of admin dashboard.', 'info')
}

// Smooth scroll handler
const scrollTo = (id) => {
  const el = document.getElementById(id)
  if (el) {
    const offset = 80
    const top = el.getBoundingClientRect().top + window.scrollY - offset
    window.scrollTo({ top, behavior: 'smooth' })
  }
}

// Project computed filter
const filteredProjects = computed(() => {
  if (activeFilter.value === 'all') return data.value.projects
  return data.value.projects.filter(p => p.category.toLowerCase() === activeFilter.value)
})

// CMS Profile controller
const profileForm = reactive({
  name: '',
  headline: '',
  location: '',
  bio: '',
  contactEmail: '',
  github: '',
  linkedin: ''
})

const populateProfileForm = () => {
  Object.assign(profileForm, data.value.profile)
}

const saveProfile = () => {
  Object.assign(data.value.profile, profileForm)
  saveData()
  addToast('Profile info updated.', 'success')
}

// CMS Skills controller
const skillForm = reactive({
  name: '',
  category: 'languages',
  detail: ''
})

const addSkill = () => {
  if (!skillForm.name.trim()) {
    addToast('Please provide a skill name.', 'error')
    return
  }
  data.value.skills.push({
    name: skillForm.name,
    category: skillForm.category,
    detail: skillForm.detail
  })
  saveData()
  addToast(`Skill "${skillForm.name}" added.`, 'success')
  skillForm.name = ''
  skillForm.detail = ''
}

const deleteSkill = (idx) => {
  const name = data.value.skills[idx].name
  data.value.skills.splice(idx, 1)
  saveData()
  addToast(`Skill "${name}" deleted.`, 'info')
}

// CMS Projects CRUD with local file Base64 uploader
const projectForm = reactive({
  id: null,
  title: '',
  category: 'web',
  year: '',
  description: '',
  imageUrl: '',
  challenge: '',
  solution: '',
  impact: '',
  link: ''
})

const editProjectIndex = ref(-1)

const resetProjectForm = () => {
  projectForm.id = null
  projectForm.title = ''
  projectForm.category = 'web'
  projectForm.year = ''
  projectForm.description = ''
  projectForm.imageUrl = ''
  projectForm.challenge = ''
  projectForm.solution = ''
  projectForm.impact = ''
  projectForm.link = ''
  editProjectIndex.value = -1
}

const selectEditProject = (idx) => {
  editProjectIndex.value = idx
  Object.assign(projectForm, data.value.projects[idx])
}

const handleImageUpload = (event) => {
  const file = event.target.files[0]
  if (!file) return

  if (file.size > 1.8 * 1024 * 1024) {
    addToast('File too large. Max 1.8MB allowed.', 'error')
    return
  }

  const reader = new FileReader()
  reader.onload = (e) => {
    projectForm.imageUrl = e.target.result
    addToast('Image uploaded successfully.', 'success')
  }
  reader.readAsDataURL(file)
}

const saveProject = () => {
  if (!projectForm.title.trim()) {
    addToast('Project title is required.', 'error')
    return
  }

  const projectPayload = {
    id: projectForm.id || Date.now(),
    title: projectForm.title,
    category: projectForm.category,
    year: projectForm.year || new Date().getFullYear().toString(),
    description: projectForm.description,
    imageUrl: projectForm.imageUrl || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop',
    challenge: projectForm.challenge || 'Needs development tracking.',
    solution: projectForm.solution || 'Assembled frontend framework application modules.',
    impact: projectForm.impact || 'Delivered stable operations.',
    link: projectForm.link
  }

  if (editProjectIndex.value === -1) {
    data.value.projects.push(projectPayload)
    addToast(`Project "${projectForm.title}" added.`, 'success')
  } else {
    data.value.projects[editProjectIndex.value] = projectPayload
    addToast(`Project "${projectForm.title}" updated.`, 'success')
  }
  saveData()
  resetProjectForm()
}

const deleteProject = (idx) => {
  const title = data.value.projects[idx].title
  data.value.projects.splice(idx, 1)
  saveData()
  addToast(`Project "${title}" deleted.`, 'info')
  if (editProjectIndex.value === idx) resetProjectForm()
}

// Backup Dump Systems
const downloadBackup = () => {
  try {
    const jsonStr = JSON.stringify(data.value, null, 2)
    const blob = new Blob([jsonStr], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `nasrul_portfolio_backup_${Date.now()}.json`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
    addToast('Backup sector downloaded.', 'success')
  } catch (err) {
    addToast('Failed to dump backup sector.', 'error')
  }
}

const importBackup = (event) => {
  const file = event.target.files[0]
  if (!file) return

  const reader = new FileReader()
  reader.onload = (e) => {
    try {
      const parsed = JSON.parse(e.target.result)
      if (parsed.profile && parsed.skills && parsed.projects && parsed.settings) {
        data.value = parsed
        saveData()
        addToast('Portfolio database restored successfully.', 'success')
      } else {
        addToast('Invalid backup file structures.', 'error')
      }
    } catch (err) {
      addToast('Error reading database file.', 'error')
    }
  }
  reader.readAsText(file)
  event.target.value = ''
}

const resetToDefaults = () => {
  if (confirm('Format database memory back to defaults?')) {
    data.value = JSON.parse(JSON.stringify(defaultData))
    saveData()
    populateProfileForm()
    resetProjectForm()
    addToast('Database configurations formatted.', 'info')
  }
}

// Settings
const settingsForm = reactive({ password: '' })
const changePassword = () => {
  if (!settingsForm.password.trim()) {
    addToast('Password cannot be empty.', 'error')
    return
  }
  data.value.settings.password = settingsForm.password
  saveData()
  addToast('System password modified.', 'success')
  settingsForm.password = ''
}

// Dashboard Open Helper
const openAdminCMS = () => {
  populateProfileForm()
  resetProjectForm()
  activeAdminTab.value = 'profile'
  showAdminDrawer.value = true
}

const getCategoryLabel = (cat) => {
  if (cat === 'languages') return 'Languages'
  if (cat === 'frameworks') return 'Frameworks'
  return 'Tools / Utilities'
}

// ----------------------------------------------------
// SLEEK DEVELOPER SPEED-TYPIST MINI GAME LOGIC
// ----------------------------------------------------
const gameSnippets = [
  'npm run build',
  'const isDark = ref(true)',
  'git commit -m "feat: init"',
  'createApp(App).mount("#app")',
  'const local = localStorage.getItem("key")',
  'docker-compose up -d',
  'api.get("/users", handler)',
  'import { ref, computed } from "vue"',
  'npm i lucide-vue-next',
  'const filter = computed(() => projects)'
]

const gameStatus = ref('idle') // 'idle', 'playing', 'ended'
const currentSnippetIdx = ref(0)
const gameInput = ref('')
const timeRemaining = ref(30)
const totalKeystrokes = ref(0)
const correctKeystrokes = ref(0)
const currentWpm = ref(0)
const highScore = ref(0)

let gameTimerInterval = null

const loadHighScore = () => {
  const saved = localStorage.getItem('nasrul_typing_highscore')
  highScore.value = saved ? parseInt(saved) : 0
}

const startTypingGame = () => {
  gameStatus.value = 'playing'
  gameInput.value = ''
  currentSnippetIdx.value = Math.floor(Math.random() * gameSnippets.length)
  timeRemaining.value = 30
  totalKeystrokes.value = 0
  correctKeystrokes.value = 0
  currentWpm.value = 0
  loadHighScore()

  gameTimerInterval = setInterval(() => {
    if (timeRemaining.value > 0) {
      timeRemaining.value--
    } else {
      endTypingGame()
    }
  }, 1000)
}

const endTypingGame = () => {
  clearInterval(gameTimerInterval)
  gameStatus.value = 'ended'

  // Calculate WPM: (correct characters / 5) / minutes (0.5 minutes = 30s)
  const calcWpm = Math.round((correctKeystrokes.value / 5) / 0.5)
  currentWpm.value = calcWpm

  if (calcWpm > highScore.value) {
    highScore.value = calcWpm
    localStorage.setItem('nasrul_typing_highscore', calcWpm.toString())
    addToast(`New High Score! ${calcWpm} WPM`, 'success')
  }
}

const handleGameTyping = () => {
  if (gameStatus.value !== 'playing') return
  
  const target = gameSnippets[currentSnippetIdx.value]
  const typed = gameInput.value

  totalKeystrokes.value++
  if (target.startsWith(typed)) {
    correctKeystrokes.value++
  }

  if (typed === target) {
    // Snippet matched! Advance to the next one
    gameInput.value = ''
    currentSnippetIdx.value = Math.floor(Math.random() * gameSnippets.length)
  }
}

const gameSnippetLetters = computed(() => {
  const target = gameSnippets[currentSnippetIdx.value]
  const typed = gameInput.value
  return target.split('').map((char, index) => {
    let color = 'text-slate-400 dark:text-slate-500'
    if (index < typed.length) {
      color = typed[index] === char ? 'text-emerald-500 font-bold' : 'text-rose-500 font-bold underline bg-rose-500/10'
    }
    return { char, color }
  })
})

// ----------------------------------------------------
// CONTACT FORM VALIDATOR
// ----------------------------------------------------
const contactForm = reactive({ name: '', email: '', message: '' })
const contactErrors = reactive({ name: '', email: '', message: '' })
const isSending = ref(false)
const contactSuccess = ref(false)

const validateContact = () => {
  let valid = true
  contactErrors.name = ''
  contactErrors.email = ''
  contactErrors.message = ''

  if (!contactForm.name.trim()) {
    contactErrors.name = 'Please provide your name.'
    valid = false
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!contactForm.email.trim()) {
    contactErrors.email = 'Please provide an email address.'
    valid = false
  } else if (!emailRegex.test(contactForm.email)) {
    contactErrors.email = 'Invalid email address.'
    valid = false
  }

  if (contactForm.message.length < 10) {
    contactErrors.message = 'Message must be at least 10 characters long.'
    valid = false
  }

  return valid
}

const submitContact = () => {
  if (!validateContact()) return

  isSending.value = true
  setTimeout(() => {
    isSending.value = false
    contactSuccess.value = true
    contactForm.name = ''
    contactForm.email = ''
    contactForm.message = ''
    addToast('Message delivered successfully.', 'success')
  }, 1200)
}
</script>

<template>
  <div class="min-h-screen flex flex-col justify-between selection:bg-indigo-500 selection:text-white pb-12 transition-colors duration-300 relative">
    
    <!-- Decorative background glow rings -->
    <div class="absolute top-[10%] left-0 w-full h-[600px] pointer-events-none glow-cyan z-0" />
    <div class="absolute top-[50%] left-0 w-full h-[600px] pointer-events-none glow-violet z-0" />
    <div class="absolute top-[80%] left-0 w-full h-[600px] pointer-events-none glow-emerald z-0" />

    <!-- Toast Notification Portal -->
    <div class="fixed top-6 right-6 z-[9999] flex flex-col gap-3 pointer-events-none max-w-sm w-full font-sans">
      <transition-group 
        enter-active-class="transform transition ease-out duration-300"
        enter-from-class="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
        enter-to-class="translate-y-0 opacity-100 sm:translate-x-0"
        leave-active-class="transition ease-in duration-200"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <div 
          v-for="toast in toasts" 
          :key="toast.id"
          class="pointer-events-auto w-full max-w-sm overflow-hidden rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 shadow-lg flex items-center justify-between"
        >
          <div class="flex items-center space-x-3 text-slate-800 dark:text-slate-200">
            <Check v-if="toast.type === 'success'" class="w-5 h-5 text-emerald-500" />
            <AlertCircle v-else-if="toast.type === 'error'" class="w-5 h-5 text-rose-500" />
            <Activity v-else class="w-5 h-5 text-indigo-500" />
            <p class="text-sm font-semibold tracking-wide">{{ toast.message }}</p>
          </div>
        </div>
      </transition-group>
    </div>

    <!-- Active Root Edit Mode Banner -->
    <div 
      v-if="isAdmin"
      class="fixed top-0 left-0 w-full bg-indigo-600 text-white text-xs font-semibold py-2.5 px-4 flex items-center justify-between z-40 shadow-sm border-b border-indigo-700/50"
    >
      <div class="flex items-center space-x-2">
        <span class="w-2 h-2 rounded-full bg-white animate-pulse"></span>
        <span class="tracking-wide">CMS ACTIVE // LIVE DATA MODE</span>
      </div>
      <div class="flex items-center space-x-4">
        <button 
          @click="openAdminCMS"
          class="flex items-center space-x-1 hover:underline cursor-pointer"
        >
          <Settings class="w-3.5 h-3.5" />
          <span>Open Control Panel</span>
        </button>
        <button 
          @click="handleLogout"
          class="hover:underline text-rose-300 cursor-pointer"
        >
          Logout
        </button>
      </div>
    </div>

    <div :class="[isAdmin ? 'pt-10' : '']" class="relative z-10">
      <!-- Sticky Navigation Glassmorphic Header -->
      <header class="sticky top-0 z-30 w-full glass-navbar transition-all duration-300">
        <div class="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
          <!-- Logo -->
          <a href="#hero" @click.prevent="scrollTo('hero')" class="flex items-center space-x-2 group">
            <span class="text-xl font-bold tracking-widest text-[#18181A] dark:text-white uppercase transition-colors">
              {{ data.profile.name }}
            </span>
            <span class="w-1.5 h-1.5 rounded-full bg-indigo-500"></span>
          </a>

          <!-- Navigation Links -->
          <nav class="hidden md:flex items-center space-x-8 text-sm font-semibold">
            <a 
              v-for="link in [
                { id: 'services', label: 'Services' },
                { id: 'projects', label: 'Projects' },
                { id: 'skills', label: 'Skills' },
                { id: 'game', label: 'Playground' },
                { id: 'contact', label: 'Contact' }
              ]"
              :key="link.id"
              :href="`#${link.id}`"
              @click.prevent="scrollTo(link.id)"
              class="relative py-1.5 text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors"
              :class="activeSection === link.id ? 'text-indigo-600 dark:text-indigo-400 font-bold' : ''"
            >
              {{ link.label }}
              <span 
                class="absolute bottom-0 left-0 w-full h-[2px] bg-indigo-500 transform origin-left transition-transform duration-300"
                :class="activeSection === link.id ? 'scale-x-100' : 'scale-x-0'"
              />
            </a>
          </nav>

          <!-- Action block: availability switch + theme switcher -->
          <div class="flex items-center space-x-4">
            <!-- availability tag -->
            <div class="hidden sm:flex items-center space-x-1.5 px-3 py-1.5 bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 rounded-full">
              <span class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span class="text-[10px] font-bold uppercase tracking-wider">Booking Open</span>
            </div>

            <!-- theme toggle Sun/Moon -->
            <button 
              @click="toggleTheme"
              class="p-2 rounded-full border border-slate-200 dark:border-slate-800 hover:bg-slate-200/50 dark:hover:bg-slate-800/50 text-slate-600 dark:text-slate-300 transition-all cursor-pointer"
              aria-label="Toggle Theme"
            >
              <Sun v-if="isDark" class="w-4 h-4 text-amber-500" />
              <Moon v-else class="w-4 h-4 text-indigo-600" />
            </button>
          </div>
        </div>
      </header>

      <!-- Main Layout Body -->
      <main class="max-w-7xl mx-auto px-6 py-16 sm:py-24 space-y-24 sm:space-y-32">
        
        <!-- Hero Section -->
        <section id="hero" class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center min-h-[calc(100vh-200px)]">
          <div class="lg:col-span-8 space-y-6 text-left">
            
            <!-- availability mobile -->
            <div 
              class="sm:hidden inline-flex items-center space-x-1.5 px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 rounded-full mb-2 transition-all duration-700 ease-out transform"
              :class="heroMounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'"
            >
              <span class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span class="text-[9px] font-bold uppercase tracking-wider">Booking Open</span>
            </div>

            <!-- Headline statement -->
            <h1 
              class="text-4xl sm:text-5xl py-3 md:text-6xl font-extrabold tracking-tight leading-[1.08] text-slate-900 dark:text-white transition-all duration-700 ease-out delay-[150ms] transform"
              :class="heroMounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'"
            >
              Nasrulhaq 
              <span class="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-500 to-purple-700">
              Hidayat
              </span>
            </h1>

            <p 
              class="text-lg sm:text-xl font-medium text-indigo-600 dark:text-indigo-400 uppercase tracking-widest font-mono transition-all duration-700 ease-out delay-[300ms] transform"
              :class="heroMounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'"
            >
              &lt; {{ data.profile.headline }} &gt;
            </p>

            <!-- Bio descriptive paragraph -->
            <p 
              class="text-base sm:text-lg text-slate-600 dark:text-slate-400 max-w-xl leading-relaxed text-justify font-light transition-all duration-700 ease-out delay-[450ms] transform"
              :class="heroMounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'"
            >
              {{ data.profile.bio }}
            </p>

            <!-- Actions CTAs -->
            <div 
              class="flex flex-col sm:flex-row gap-4 pt-4 transition-all duration-700 ease-out delay-[600ms] transform"
              :class="heroMounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'"
            >
              <button 
                @click="scrollTo('projects')"
                class="flex items-center justify-center space-x-2 px-7 py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg transition-all hover:scale-102 active:scale-98 shadow-lg shadow-indigo-500/20 cursor-pointer"
              >
                <span>View My Work</span>
                <ArrowRight class="w-4 h-4" />
              </button>
              <button 
                @click="scrollTo('contact')"
                class="flex items-center justify-center space-x-2 px-7 py-3.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white font-semibold rounded-lg transition-all hover:scale-102 active:scale-98 cursor-pointer"
              >
                <span>Discuss a Project</span>
              </button>
            </div>
          </div>

          <!-- Decorative Code Box side panel (No Photo rules) -->
          <div 
            class="lg:col-span-4 flex justify-center items-center transition-all duration-1000 ease-out delay-[750ms] transform"
            :class="heroMounted ? 'opacity-100 translate-x-0 scale-100' : 'opacity-0 translate-x-8 scale-95'"
          >
            <div class="glass-panel w-full max-w-sm rounded-2xl overflow-hidden shadow-lg p-5 font-mono text-xs text-slate-700 dark:text-slate-300 relative border border-slate-200/80 dark:border-slate-800/80">
              <div class="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3 mb-4 text-slate-400">
                <span>nasrul-diagnostic.bin</span>
                <div class="flex space-x-1.5">
                  <span class="w-2.5 h-2.5 rounded-full bg-rose-500/60"></span>
                  <span class="w-2.5 h-2.5 rounded-full bg-amber-500/60"></span>
                  <span class="w-2.5 h-2.5 rounded-full bg-emerald-500/60"></span>
                </div>
              </div>
              <div class="space-y-2">
                <div><span class="text-indigo-500 dark:text-indigo-400">const</span> compiler = {</div>
                <div class="pl-4">name: <span class="text-emerald-500">'{{ data.profile.name }}'</span>,</div>
                <div class="pl-4">status: <span class="text-emerald-500">'ONLINE'</span>,</div>
                <div class="pl-4">location: <span class="text-emerald-500">'{{ data.profile.location }}'</span>,</div>
                <div class="pl-4">experience: <span class="text-amber-500">> 3 /* years */</span>,</div>
                <div class="pl-4">engineCode: <span class="text-emerald-500">'Laravel/Vue/Flutter'</span></div>
                <div>};</div>
              </div>
            </div>
          </div>
        </section>

        <!-- Services Section -->
        <section id="services" class="border-t border-slate-200/50 dark:border-slate-800/50 pt-20 space-y-12">
          <div class="max-w-3xl text-left">
            <span class="text-xs uppercase tracking-widest font-bold text-indigo-600 dark:text-indigo-400 font-mono">Expertise</span>
            <h2 class="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mt-1">High-Impact Technical Services</h2>
            <p class="text-slate-500 mt-3 font-light leading-relaxed">
              Providing full-cycle software engineering focused on structural reliability, performance speed, and business automation.
            </p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div class="glass-panel p-6 rounded-2xl hover:border-indigo-500/30 transition-editorial flex flex-col justify-between h-[210px]">
              <div class="space-y-3">
                <div class="p-2.5 bg-indigo-500/10 rounded-lg text-indigo-600 dark:text-indigo-400 w-fit">
                  <Layers class="w-5 h-5" />
                </div>
                <h3 class="text-lg font-bold text-slate-900 dark:text-white">Full-Stack Architectures</h3>
                <p class="text-xs text-slate-500 leading-normal text-justify font-light">
                  Developing high-performance MVC client portals and decoupled single-page frameworks communicating through REST APIs.
                </p>
              </div>
              <span class="text-[10px] font-mono text-indigo-500 block text-right">// LARAVEL + VUE</span>
            </div>

            <div class="glass-panel p-6 rounded-2xl hover:border-indigo-500/30 transition-editorial flex flex-col justify-between h-[210px]">
              <div class="space-y-3">
                <div class="p-2.5 bg-emerald-500/10 rounded-lg text-emerald-600 dark:text-emerald-400 w-fit">
                  <Cpu class="w-5 h-5" />
                </div>
                <h3 class="text-lg font-bold text-slate-900 dark:text-white">Process Automation</h3>
                <p class="text-xs text-slate-500 leading-normal text-justify font-light">
                  Custom server-side scripting, dataset cron handlers, and third-party API webhook integrations that eliminate manual inputs.
                </p>
              </div>
              <span class="text-[10px] font-mono text-emerald-500 block text-right">// PYTHON + CRON</span>
            </div>

            <div class="glass-panel p-6 rounded-2xl hover:border-indigo-500/30 transition-editorial flex flex-col justify-between h-[210px]">
              <div class="space-y-3">
                <div class="p-2.5 bg-purple-500/10 rounded-lg text-purple-600 dark:text-purple-400 w-fit">
                  <Monitor class="w-5 h-5" />
                </div>
                <h3 class="text-lg font-bold text-slate-900 dark:text-white">Mobile Companion Client</h3>
                <p class="text-xs text-slate-500 leading-normal text-justify font-light">
                  Designing and compiling lightweight cross-platform mobile apps featuring real-time caching and push notification triggers.
                </p>
              </div>
              <span class="text-[10px] font-mono text-purple-500 block text-right">// FLUTTER + FIREBASE</span>
            </div>
          </div>
        </section>

        <!-- System Developer Projects Grid -->
        <section id="projects" class="border-t border-slate-200/50 dark:border-slate-800/50 pt-20 space-y-10">
          <div class="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <span class="text-xs uppercase tracking-widest font-bold text-indigo-600 dark:text-indigo-400 font-mono">Case Studies</span>
              <h2 class="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mt-1">Featured Systems</h2>
            </div>

            <!-- Categories -->
            <div class="flex flex-wrap gap-2 text-xs font-semibold">
              <button 
                v-for="filter in ['all', 'web', 'mobile']" 
                :key="filter"
                @click="activeFilter = filter"
                class="px-4 py-2 border rounded-full capitalize transition-all cursor-pointer"
                :class="[
                  activeFilter === filter 
                    ? 'bg-indigo-600 text-white border-indigo-600 shadow-md shadow-indigo-500/10' 
                    : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                ]"
              >
                {{ filter }}
              </button>
            </div>
          </div>

          <!-- Project Cards Grid -->
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div 
              v-for="project in filteredProjects" 
              :key="project.id"
              @click="selectedProject = project"
              class="glass-panel rounded-2xl overflow-hidden cursor-pointer hover:border-indigo-500/30 transition-all hover:scale-[1.02] flex flex-col justify-between"
            >
              <div>
                <!-- Image frame -->
                <div class="relative overflow-hidden aspect-video bg-black/10 dark:bg-white/5">
                  <img 
                    :src="project.imageUrl" 
                    :alt="project.title"
                    class="w-full h-full object-cover transition-transform duration-500 filter grayscale hover:grayscale-0"
                  />
                  <!-- Category badge -->
                  <span class="absolute top-4 left-4 text-[9px] font-bold font-mono uppercase tracking-wider bg-slate-900/80 backdrop-blur-xs text-indigo-400 border border-white/10 px-2.5 py-1 rounded">
                    {{ project.category }}
                  </span>
                </div>

                <!-- Text Block -->
                <div class="p-6 space-y-2 text-left">
                  <h3 class="text-lg font-bold text-slate-900 dark:text-white">
                    {{ project.title }}
                  </h3>
                  <p class="text-xs text-slate-500 dark:text-slate-400 leading-normal text-justify line-clamp-3 font-light">
                    {{ project.description }}
                  </p>
                </div>
              </div>

              <!-- Action button bottom -->
              <div class="p-6 pt-0 border-t border-slate-200/40 dark:border-slate-800/40 flex items-center justify-between text-xs font-semibold text-slate-500">
                <span class="font-mono text-[10px]">// Release: {{ project.year }}</span>
                <span class="text-indigo-600 dark:text-indigo-400 flex items-center space-x-1 hover:underline">
                  <span>View Impact</span>
                  <ChevronRight class="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          </div>

          <!-- Empty Case -->
          <div 
            v-if="filteredProjects.length === 0" 
            class="py-16 text-center border border-dashed border-slate-200 dark:border-slate-800 rounded-2xl"
          >
            <p class="text-sm text-slate-400 font-mono">No active projects matching filter.</p>
          </div>
        </section>

        <!-- Technical Competencies Sections -->
        <section id="skills" class="border-t border-slate-200/50 dark:border-slate-800/50 pt-20 space-y-12">
          <div class="max-w-3xl text-left">
            <span class="text-xs uppercase tracking-widest font-bold text-indigo-600 dark:text-indigo-400 font-mono">Capabilities</span>
            <h2 class="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mt-1">Registry of Competencies</h2>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div 
              v-for="catId in ['languages', 'frameworks', 'tools']" 
              :key="catId"
              class="glass-panel p-6 rounded-2xl space-y-4 text-left"
            >
              <h3 class="text-sm font-bold uppercase tracking-wider text-slate-400 font-mono border-b border-slate-200/50 dark:border-slate-800/50 pb-2.5 flex items-center space-x-2">
                <Cpu class="w-4 h-4 text-indigo-500" />
                <span>{{ getCategoryLabel(catId) }}</span>
              </h3>

              <div class="space-y-3">
                <div 
                  v-for="skill in data.skills.filter(s => s.category === catId)" 
                  :key="skill.name"
                  class="flex flex-col space-y-1 p-3 bg-white/20 dark:bg-slate-950/20 border border-slate-200/40 dark:border-slate-800/40 rounded-xl"
                >
                  <span class="font-bold text-sm text-slate-900 dark:text-slate-100 uppercase">{{ skill.name }}</span>
                  <span class="text-[10px] text-slate-500 dark:text-slate-400 font-mono">{{ skill.detail }}</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- Interactive Developer Typing Mini Game (Catchy block) -->
        <section id="game" class="border-t border-slate-200/50 dark:border-slate-800/50 pt-20 space-y-12">
          <div class="max-w-3xl text-left">
            <span class="text-xs uppercase tracking-widest font-bold text-indigo-600 dark:text-indigo-400 font-mono">Playground</span>
            <h2 class="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mt-1">Developer Speed Typist</h2>
            <p class="text-slate-500 mt-2 font-light leading-relaxed">
              Test your typing speed by inputting active CLI and terminal commands. Designed to showcase frontend response latency.
            </p>
          </div>

          <div class="glass-panel rounded-2xl p-6 md:p-8 max-w-xl mx-auto shadow-xl relative border border-slate-200 dark:border-slate-800 overflow-hidden">
            <div class="absolute top-0 right-0 p-3 flex space-x-1.5 text-slate-300 dark:text-slate-700">
              <span class="w-2.5 h-2.5 rounded-full bg-rose-500/50"></span>
              <span class="w-2.5 h-2.5 rounded-full bg-amber-500/50"></span>
              <span class="w-2.5 h-2.5 rounded-full bg-emerald-500/50"></span>
            </div>

            <!-- Game screen conditional modes -->
            <div v-if="gameStatus === 'idle'" class="py-12 flex flex-col items-center justify-center space-y-5">
              <Terminal class="w-12 h-12 text-indigo-500 animate-pulse" />
              <div class="space-y-1.5 text-center">
                <h4 class="text-lg font-bold text-slate-900 dark:text-white">Ready to Execute?</h4>
                <p class="text-xs text-slate-500">30 seconds clock. Test your keyboard accuracy.</p>
              </div>
              <button 
                @click="startTypingGame"
                class="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs uppercase tracking-wider rounded-lg transition-all shadow-md cursor-pointer"
              >
                Press Start
              </button>
            </div>

            <div v-else-if="gameStatus === 'playing'" class="space-y-6">
              <!-- Indicators panel -->
              <div class="flex items-center justify-between text-xs font-semibold font-mono text-slate-500 border-b border-slate-200 dark:border-slate-800 pb-3">
                <span class="flex items-center space-x-1">
                  <span>TIME REMAINING:</span>
                  <span class="text-indigo-600 dark:text-indigo-400 font-bold">{{ timeRemaining }}s</span>
                </span>
                <span>HIGH SCORE: {{ highScore }} WPM</span>
              </div>

              <!-- Output visual letters block -->
              <div class="p-6 bg-slate-950 rounded-xl font-mono text-base md:text-lg border border-slate-800 text-center min-h-[90px] flex items-center justify-center flex-wrap gap-x-0.5">
                <span 
                  v-for="(letter, index) in gameSnippetLetters" 
                  :key="index"
                  :class="letter.color"
                >
                  {{ letter.char }}
                </span>
              </div>

              <!-- Input text form field -->
              <div class="flex flex-col space-y-2">
                <input 
                  v-model="gameInput"
                  @input="handleGameTyping"
                  type="text"
                  placeholder="Type snippet here..."
                  class="w-full px-4 py-3 bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-800 rounded-lg text-sm text-slate-900 dark:text-white font-mono focus:outline-none focus:border-indigo-500"
                  autofocus
                  autocomplete="off"
                  autocorrect="off"
                  autocapitalize="off"
                  spellcheck="false"
                />
              </div>
            </div>

            <div v-else-if="gameStatus === 'ended'" class="py-12 flex flex-col items-center justify-center space-y-5">
              <Activity class="w-12 h-12 text-[#FF007F] animate-bounce" />
              <div class="space-y-1.5 text-center">
                <h4 class="text-lg font-bold text-slate-900 dark:text-white">Game Over</h4>
                <p class="text-xs text-slate-500 font-mono">Your typing speed: <span class="font-bold text-indigo-600 dark:text-indigo-400">{{ currentWpm }} WPM</span></p>
                <p class="text-[10px] text-slate-400 font-mono">High Score: {{ highScore }} WPM</p>
              </div>
              <button 
                @click="startTypingGame"
                class="px-6 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs uppercase tracking-wider rounded-lg transition-all cursor-pointer"
              >
                Restart Game
              </button>
            </div>
          </div>
        </section>

        <!-- Contact Section -->
        <section id="contact" class="border-t border-slate-200/50 dark:border-slate-800/50 pt-20">
          <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <!-- Left Info Block -->
            <div class="lg:col-span-5 space-y-6">
              <div>
                <span class="text-xs uppercase tracking-widest font-bold text-indigo-600 dark:text-indigo-400 font-mono block">Let's Connect</span>
                <h2 class="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mt-1">Get In Touch</h2>
                <p class="text-slate-500 mt-4 font-light leading-relaxed text-justify">
                  Looking for a custom SaaS, backend API developer, or automation systems? Send me a message and let's compile a technical architecture that drives results.
                </p>
              </div>

              <div class="space-y-4 pt-4 font-mono text-xs text-slate-500">
                <a 
                  :href="`mailto:${data.profile.contactEmail}`"
                  class="flex items-center space-x-3 p-4 rounded-xl border border-slate-200/50 dark:border-slate-800/50 bg-white/20 dark:bg-slate-900/20 hover:border-indigo-500/20 group"
                >
                  <Mail class="w-4 h-4 text-indigo-600 group-hover:scale-105" />
                  <div>
                    <span class="block text-[9px] uppercase tracking-wider text-slate-400">Direct Email</span>
                    <span class="font-bold text-slate-700 dark:text-slate-300">{{ data.profile.contactEmail }}</span>
                  </div>
                </a>
              </div>
            </div>

            <!-- Right Form Block -->
            <div class="lg:col-span-7">
              <div class="glass-panel p-8 rounded-2xl shadow-xl text-left">
                <!-- Success State -->
                <div v-if="contactSuccess" class="py-12 flex flex-col items-center justify-center text-center space-y-4">
                  <div class="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-emerald-500">
                    <Check class="w-8 h-8" />
                  </div>
                  <h4 class="text-xl font-bold text-slate-900 dark:text-white font-display">Message Sent</h4>
                  <p class="text-xs text-slate-500 max-w-xs leading-normal">
                    Thank you. Nasrulhaq Hidayat will review your message log and follow up within 24 hours.
                  </p>
                  <button 
                    @click="contactSuccess = false"
                    class="px-5 py-2 rounded-lg border border-slate-200 dark:border-slate-800 text-xs font-semibold text-slate-500 hover:text-slate-900 cursor-pointer"
                  >
                    Send Another Message
                  </button>
                </div>

                <!-- Input Fields -->
                <form v-else @submit.prevent="submitContact" class="space-y-5">
                  <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div class="flex flex-col space-y-1">
                      <label for="cname" class="text-[10px] font-bold uppercase tracking-wide text-slate-400 font-mono">Your Name</label>
                      <input 
                        id="cname"
                        v-model="contactForm.name"
                        type="text"
                        placeholder="John Doe"
                        class="px-3.5 py-2.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-950/50 text-sm text-slate-800 dark:text-white focus:outline-none focus:border-indigo-500"
                      />
                      <span v-if="contactErrors.name" class="text-xs text-rose-500 pt-1 font-medium">{{ contactErrors.name }}</span>
                    </div>

                    <div class="flex flex-col space-y-1">
                      <label for="cemail" class="text-[10px] font-bold uppercase tracking-wide text-slate-400 font-mono">Your Email</label>
                      <input 
                        id="cemail"
                        v-model="contactForm.email"
                        type="email"
                        placeholder="john@example.com"
                        class="px-3.5 py-2.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-950/50 text-sm text-slate-800 dark:text-white focus:outline-none focus:border-indigo-500"
                      />
                      <span v-if="contactErrors.email" class="text-xs text-rose-500 pt-1 font-medium">{{ contactErrors.email }}</span>
                    </div>
                  </div>

                  <div class="flex flex-col space-y-1">
                    <label for="cmessage" class="text-[10px] font-bold uppercase tracking-wide text-slate-400 font-mono">Message Logs</label>
                    <textarea 
                      id="cmessage"
                      v-model="contactForm.message"
                      rows="4"
                      placeholder="Describe your project goals, scope, and timeline..."
                      class="px-3.5 py-2.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-950/50 text-sm text-slate-800 dark:text-white focus:outline-none focus:border-indigo-500 resize-none"
                    ></textarea>
                    <span v-if="contactErrors.message" class="text-xs text-rose-500 pt-1 font-medium">{{ contactErrors.message }}</span>
                  </div>

                  <button 
                    type="submit"
                    :disabled="isSending"
                    class="w-full py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-lg transition-all shadow-md cursor-pointer"
                  >
                    {{ isSending ? 'Transmitting Data...' : 'Transmit Message' }}
                  </button>
                </form>
              </div>
            </div>

          </div>
        </section>

      </main>

      <!-- Footer Section -->
      <footer class="max-w-7xl mx-auto px-6 py-10 border-t border-slate-200/50 dark:border-slate-800/50 flex flex-col sm:flex-row items-center justify-between gap-6 text-xs text-slate-500 font-mono">
        <div>
          &copy; {{ new Date().getFullYear() }} {{ data.profile.name }}. All compilation processes success.
        </div>

        <div class="flex items-center space-x-4">
          <a :href="data.profile.github" target="_blank" class="hover:text-indigo-500 transition-colors">GitHub</a>
          <span>/</span>
          <a :href="data.profile.linkedin" target="_blank" class="hover:text-indigo-500 transition-colors">LinkedIn</a>
          <span>/</span>
          <a :href="`mailto:${data.profile.contactEmail}`" class="hover:text-indigo-500 transition-colors">Email</a>
          
          <!-- Hidden login button disguised as root locks -->
          <button 
            @click="showLoginModal = true"
            class="p-1.5 ml-4 rounded hover:bg-slate-200/50 dark:hover:bg-slate-800/50 text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 transition-colors cursor-pointer"
            title="Database login"
          >
            <Lock v-if="!isAdmin" class="w-3.5 h-3.5" />
            <Unlock v-else class="w-3.5 h-3.5 text-indigo-500" />
          </button>
        </div>
      </footer>
    </div>

    <!-- Decrypting Admin Modal Popup -->
    <transition
      enter-active-class="transition duration-300 ease-out"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition duration-200 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div 
        v-if="showLoginModal" 
        class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 dark:bg-black/80 backdrop-blur-xs font-mono"
        @click="showLoginModal = false"
      >
        <div 
          class="relative w-full max-w-sm bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-2xl space-y-4"
          @click.stop
        >
          <div class="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
            <span class="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white">Admin Decryption Key</span>
            <button 
              @click="showLoginModal = false"
              class="text-slate-400 hover:text-slate-700"
            >
              <X class="w-4 h-4" />
            </button>
          </div>

          <form @submit.prevent="handleLogin" class="space-y-4 text-left">
            <div class="flex flex-col space-y-2">
              <label for="pass" class="text-[10px] font-bold uppercase tracking-wider text-slate-400 font-mono">Access Token</label>
              <div class="relative">
                <input 
                  id="pass"
                  v-model="adminPasswordInput"
                  :type="showPassword ? 'text' : 'password'"
                  placeholder="••••••••"
                  class="w-full px-3 py-2.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-sm text-slate-800 dark:text-white focus:outline-none focus:border-indigo-500 font-mono"
                  autofocus
                />
                <button 
                  type="button"
                  @click="showPassword = !showPassword"
                  class="absolute inset-y-0 right-0 px-3 flex items-center text-slate-400 hover:text-slate-700"
                >
                  <Eye v-if="!showPassword" class="w-4 h-4" />
                  <EyeOff v-else class="w-4 h-4" />
                </button>
              </div>
              <span v-if="loginError" class="text-xs text-rose-500 font-bold pt-1 block">{{ loginError }}</span>
            </div>

            <button 
              type="submit"
              class="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold uppercase tracking-wider rounded-lg transition-colors cursor-pointer"
            >
              Decrypt & Unlock
            </button>
          </form>
        </div>
      </div>
    </transition>

    <!-- Slide-Out CMS Drawer Panel (Full width mobile) -->
    <transition
      enter-active-class="transform transition ease-in-out duration-500"
      enter-from-class="translate-x-full"
      enter-to-class="translate-x-0"
      leave-active-class="transform transition ease-in-out duration-500"
      leave-from-class="translate-x-0"
      leave-to-class="translate-x-full"
    >
      <div 
        v-if="showAdminDrawer" 
        class="fixed inset-y-0 right-0 w-full md:w-[480px] bg-white dark:bg-slate-900 border-l border-slate-200 dark:border-slate-800 shadow-2xl z-50 p-6 flex flex-col justify-between font-sans text-slate-800 dark:text-slate-200"
      >
        <div>
          <!-- Title drawer -->
          <div class="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800">
            <div class="flex items-center space-x-2">
              <Database class="w-5 h-5 text-indigo-500" />
              <h3 class="text-lg font-bold font-display text-slate-900 dark:text-white">[ Console Database Editor ]</h3>
            </div>
            <button 
              @click="showAdminDrawer = false"
              class="p-1 rounded hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400"
            >
              <X class="w-5 h-5" />
            </button>
          </div>

          <!-- Drawer Tabs Selector -->
          <div class="flex border-b border-slate-200 dark:border-slate-800 mt-4 text-xs font-mono">
            <button 
              v-for="tab in ['profile', 'skills', 'projects', 'system']"
              :key="tab"
              @click="activeAdminTab = tab"
              class="flex-1 py-2 text-center capitalize border-b-2 transition-all cursor-pointer"
              :class="[
                activeAdminTab === tab 
                  ? 'border-indigo-500 text-indigo-600 dark:text-indigo-400 font-bold bg-slate-100/50 dark:bg-slate-800/30' 
                  : 'border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              ]"
            >
              {{ tab }}
            </button>
          </div>

          <!-- Tabs scrollable wrapper -->
          <div class="py-6 space-y-6 overflow-y-auto max-h-[calc(100vh-230px)] pr-1 text-xs">
            
            <!-- PROFILE TAB FORM -->
            <div v-if="activeAdminTab === 'profile'" class="space-y-4">
              <div class="flex flex-col space-y-1 text-left">
                <label class="text-[10px] font-bold uppercase tracking-wider text-slate-400 font-mono">Name</label>
                <input v-model="profileForm.name" type="text" class="px-3 py-2 border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 rounded-lg text-slate-800 dark:text-white focus:outline-none" />
              </div>
              
              <div class="flex flex-col space-y-1 text-left">
                <label class="text-[10px] font-bold uppercase tracking-wider text-slate-400 font-mono">Location Badge</label>
                <input v-model="profileForm.location" type="text" class="px-3 py-2 border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 rounded-lg text-slate-800 dark:text-white focus:outline-none" />
              </div>

              <div class="flex flex-col space-y-1 text-left">
                <label class="text-[10px] font-bold uppercase tracking-wider text-slate-400 font-mono">Headline Tagline</label>
                <textarea v-model="profileForm.headline" rows="2" class="px-3 py-2 border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 rounded-lg text-slate-800 dark:text-white focus:outline-none resize-none"></textarea>
              </div>

              <div class="flex flex-col space-y-1 text-left">
                <label class="text-[10px] font-bold uppercase tracking-wider text-slate-400 font-mono">Bio Data Logs</label>
                <textarea v-model="profileForm.bio" rows="4" class="px-3 py-2 border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 rounded-lg text-slate-800 dark:text-white focus:outline-none resize-none"></textarea>
              </div>

              <div class="flex flex-col space-y-1 text-left">
                <label class="text-[10px] font-bold uppercase tracking-wider text-slate-400 font-mono">Contact Email</label>
                <input v-model="profileForm.contactEmail" type="email" class="px-3 py-2 border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 rounded-lg text-slate-800 dark:text-white focus:outline-none" />
              </div>

              <div class="grid grid-cols-2 gap-4">
                <div class="flex flex-col space-y-1 text-left">
                  <label class="text-[10px] font-bold uppercase tracking-wider text-slate-400 font-mono">GitHub Link</label>
                  <input v-model="profileForm.github" type="text" class="px-3 py-2 border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 rounded-lg text-slate-800 dark:text-white focus:outline-none" />
                </div>
                <div class="flex flex-col space-y-1 text-left">
                  <label class="text-[10px] font-bold uppercase tracking-wider text-slate-400 font-mono">LinkedIn Link</label>
                  <input v-model="profileForm.linkedin" type="text" class="px-3 py-2 border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 rounded-lg text-slate-800 dark:text-white focus:outline-none" />
                </div>
              </div>

              <button 
                @click="saveProfile"
                class="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-[10px] font-bold uppercase tracking-wider rounded-lg transition-colors cursor-pointer"
              >
                Save Profile Parameters
              </button>
            </div>

            <!-- SKILLS TAB FORM -->
            <div v-if="activeAdminTab === 'skills'" class="space-y-6">
              <!-- Add new competency registry -->
              <div class="p-4 border border-slate-200 dark:border-slate-800 rounded-xl space-y-4 bg-slate-100/30 dark:bg-slate-950/20">
                <h4 class="text-[10px] font-bold uppercase tracking-wider text-slate-900 dark:text-white border-b border-slate-200 dark:border-slate-800 pb-2">Insert Competency</h4>
                
                <div class="grid grid-cols-2 gap-4">
                  <div class="flex flex-col space-y-1 text-left">
                    <label class="text-[9px] font-arcade text-slate-400">Name</label>
                    <input v-model="skillForm.name" type="text" placeholder="Laravel" class="px-3 py-2 border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 rounded-lg text-slate-800 dark:text-white focus:outline-none" />
                  </div>
                  
                  <div class="flex flex-col space-y-1 text-left">
                    <label class="text-[9px] font-arcade text-slate-400">Category</label>
                    <select v-model="skillForm.category" class="px-3 py-2 border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 rounded-lg text-slate-800 dark:text-white focus:outline-none cursor-pointer">
                      <option value="languages">Languages</option>
                      <option value="frameworks">Frameworks</option>
                      <option value="tools">Tools / Utilities</option>
                    </select>
                  </div>
                </div>

                <div class="flex flex-col space-y-1 text-left">
                  <label class="text-[9px] font-arcade text-slate-400">Details / Registers</label>
                  <input v-model="skillForm.detail" type="text" placeholder="MVC structures, custom plugins" class="px-3 py-2 border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 rounded-lg text-slate-800 dark:text-white focus:outline-none" />
                </div>

                <button 
                  @click="addSkill"
                  class="w-full py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-[10px] font-bold uppercase tracking-wider rounded-lg transition-colors cursor-pointer"
                >
                  Register Skill tag
                </button>
              </div>

              <!-- List current skills -->
              <div class="space-y-3">
                <h4 class="text-[9px] font-arcade text-slate-400 border-b border-slate-200 dark:border-slate-800 pb-1">Current Competencies</h4>
                <div class="divide-y divide-slate-200 dark:divide-slate-800">
                  <div 
                    v-for="(skill, idx) in data.skills" 
                    :key="idx"
                    class="py-2.5 flex items-center justify-between"
                  >
                    <div>
                      <span class="font-bold text-slate-900 dark:text-slate-100 uppercase">{{ skill.name }} </span>
                      <span class="text-[10px] text-slate-500 font-mono">({{ skill.category }}) // {{ skill.detail }}</span>
                    </div>
                    <button 
                      @click="deleteSkill(idx)"
                      class="p-1 hover:bg-rose-100 dark:hover:bg-rose-950/30 text-slate-400 hover:text-rose-600 rounded transition-colors cursor-pointer"
                    >
                      <Trash2 class="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <!-- PROJECTS TAB FORM -->
            <div v-if="activeAdminTab === 'projects'" class="space-y-6">
              <!-- Add / Edit project -->
              <div class="p-4 border border-slate-200 dark:border-slate-800 rounded-xl space-y-4 bg-slate-100/30 dark:bg-slate-950/20">
                <h4 class="text-[10px] font-bold uppercase tracking-wider text-slate-900 dark:text-white border-b border-slate-200 dark:border-slate-800 pb-2">
                  {{ editProjectIndex === -1 ? 'Create Case Study' : 'Edit Case Study' }}
                </h4>
                
                <div class="grid grid-cols-2 gap-4">
                  <div class="flex flex-col space-y-1 text-left">
                    <label class="text-[9px] font-arcade text-slate-400">Project Title</label>
                    <input v-model="projectForm.title" type="text" placeholder="EduExam Portal" class="px-3 py-2 border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 rounded-lg text-slate-800 dark:text-white focus:outline-none" />
                  </div>
                  <div class="flex flex-col space-y-1 text-left">
                    <label class="text-[9px] font-arcade text-slate-400">Release Year</label>
                    <input v-model="projectForm.year" type="text" placeholder="2025" class="px-3 py-2 border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 rounded-lg text-slate-800 dark:text-white focus:outline-none font-mono" />
                  </div>
                </div>

                <div class="grid grid-cols-2 gap-4">
                  <div class="flex flex-col space-y-1 text-left">
                    <label class="text-[9px] font-arcade text-slate-400">Category Tag</label>
                    <select v-model="projectForm.category" class="px-3 py-2 border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 rounded-lg text-slate-800 focus:outline-none cursor-pointer">
                      <option value="web">Web System</option>
                      <option value="mobile">Mobile App</option>
                    </select>
                  </div>
                  <div class="flex flex-col space-y-1 text-left">
                    <label class="text-[9px] font-arcade text-slate-400">Repository Link</label>
                    <input v-model="projectForm.link" type="text" placeholder="GitHub URL" class="px-3 py-2 border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 rounded-lg text-slate-800 dark:text-white focus:outline-none" />
                  </div>
                </div>

                <!-- Base64 File Uploader Field -->
                <div class="flex flex-col space-y-1.5 text-left">
                  <label class="text-[9px] font-arcade text-slate-400">Thumbnail Sprite Upload</label>
                  <div class="flex items-center space-x-4">
                    <label class="px-4 py-2 border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-slate-800 dark:text-slate-200 rounded-lg hover:border-slate-600 transition-colors cursor-pointer text-center flex-grow">
                      <span>CHOOSE COVER FILE</span>
                      <input type="file" accept="image/*" @change="handleImageUpload" class="hidden" />
                    </label>
                    
                    <!-- Cover image thumbnail preview -->
                    <div class="w-16 h-12 bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 overflow-hidden flex items-center justify-center flex-shrink-0 rounded-lg">
                      <img 
                        v-if="projectForm.imageUrl" 
                        :src="projectForm.imageUrl" 
                        class="w-full h-full object-cover" 
                      />
                      <span v-else class="text-[8px] text-slate-400 font-mono">NIL</span>
                    </div>
                  </div>
                </div>

                <div class="flex flex-col space-y-1 text-left">
                  <label class="text-[9px] font-arcade text-slate-400">The Challenge</label>
                  <input v-model="projectForm.challenge" type="text" class="px-3 py-2 border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 rounded-lg text-slate-800 dark:text-white focus:outline-none" />
                </div>
                
                <div class="flex flex-col space-y-1 text-left">
                  <label class="text-[9px] font-arcade text-slate-400">The Solution</label>
                  <input v-model="projectForm.solution" type="text" class="px-3 py-2 border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 rounded-lg text-slate-800 dark:text-white focus:outline-none" />
                </div>
                
                <div class="flex flex-col space-y-1 text-left">
                  <label class="text-[9px] font-arcade text-slate-400">Business Impact</label>
                  <input v-model="projectForm.impact" type="text" class="px-3 py-2 border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 rounded-lg text-slate-800 dark:text-white focus:outline-none" />
                </div>

                <div class="flex flex-col space-y-1 text-left">
                  <label class="text-[9px] font-arcade text-slate-400">Short Description</label>
                  <textarea v-model="projectForm.description" rows="3" class="px-3 py-2 border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 rounded-lg text-slate-800 dark:text-white focus:outline-none resize-none"></textarea>
                </div>

                <div class="flex space-x-3 pt-2">
                  <button 
                    @click="saveProject"
                    class="flex-grow py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-[10px] font-bold uppercase tracking-wider rounded-lg transition-colors cursor-pointer"
                  >
                    {{ editProjectIndex === -1 ? 'WRITE_ROM_SECTOR' : 'APPLY_PATCH' }}
                  </button>
                  <button 
                    v-if="editProjectIndex !== -1"
                    @click="resetProjectForm"
                    class="px-4 py-2 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg text-[9px] font-bold transition-all cursor-pointer"
                  >
                    CANCEL
                  </button>
                </div>
              </div>

              <!-- List current projects -->
              <div class="space-y-3">
                <h4 class="text-[9px] font-arcade text-slate-400 border-b border-slate-200 dark:border-slate-800 pb-1">Current Game Cards</h4>
                <div class="divide-y divide-slate-200 dark:divide-slate-800">
                  <div 
                    v-for="(project, idx) in data.projects" 
                    :key="project.id"
                    class="py-2.5 flex items-center justify-between"
                  >
                    <div>
                      <span class="font-bold text-slate-950 dark:text-white uppercase">{{ project.title }} </span>
                      <span class="text-[10px] text-slate-500 font-mono">({{ project.category }}, {{ project.year }})</span>
                    </div>
                    <div class="flex items-center space-x-2">
                      <button 
                        @click="selectEditProject(idx)"
                        class="p-1 hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-500 rounded transition-colors cursor-pointer"
                      >
                        <Edit2 class="w-3.5 h-3.5" />
                      </button>
                      <button 
                        @click="deleteProject(idx)"
                        class="p-1 hover:bg-rose-100 dark:hover:bg-rose-950/30 text-slate-400 hover:text-rose-600 rounded transition-colors cursor-pointer"
                      >
                        <Trash2 class="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- SYSTEM BACKUP / SETTINGS -->
            <div v-if="activeAdminTab === 'system'" class="space-y-6">
              <!-- Export backup data to JSON file -->
              <div class="p-4 border border-slate-200 dark:border-slate-800 rounded-xl space-y-3 bg-slate-100/30 dark:bg-slate-950/20">
                <h4 class="text-[10px] font-bold uppercase tracking-wider text-slate-900 dark:text-white flex items-center space-x-2">
                  <Download class="w-4 h-4 text-indigo-500" />
                  <span>Dump Backup Sector</span>
                </h4>
                <p class="text-[10px] text-slate-500 leading-normal">
                  Dumps the current profile configurations, custom skills registry, and case studies to a local JSON file.
                </p>
                <button 
                  @click="downloadBackup"
                  class="w-full flex items-center justify-center space-x-2 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-lg transition-colors cursor-pointer"
                >
                  <Download class="w-4 h-4" />
                  <span>Export Backup</span>
                </button>
              </div>

              <!-- Import backup data from JSON file -->
              <div class="p-4 border border-slate-200 dark:border-slate-800 rounded-xl space-y-3 bg-slate-100/30 dark:bg-slate-950/20">
                <h4 class="text-[10px] font-bold uppercase tracking-wider text-slate-900 dark:text-white flex items-center space-x-2">
                  <Upload class="w-4 h-4 text-indigo-500" />
                  <span>Write Backup Sector</span>
                </h4>
                <p class="text-[10px] text-slate-500 leading-normal">
                  Dumps and imports database parameters, overwriting your current local browser setup.
                </p>
                <label 
                  class="w-full flex items-center justify-center space-x-2 py-2.5 border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-slate-800 dark:text-slate-200 text-xs font-bold rounded-lg hover:border-slate-500 transition-all cursor-pointer text-center"
                >
                  <Upload class="w-4 h-4" />
                  <span>SELECT_BACKUP_FILE</span>
                  <input type="file" accept=".json" @change="importBackup" class="hidden" />
                </label>
              </div>

              <!-- Change decrypter password settings -->
              <div class="p-4 border border-slate-200 dark:border-slate-800 rounded-xl space-y-4 bg-slate-100/30 dark:bg-slate-950/20">
                <h4 class="text-[10px] font-bold uppercase tracking-wider text-slate-900 dark:text-white">Admin Settings</h4>
                
                <div class="flex flex-col space-y-1 text-left">
                  <label class="text-[10px] font-bold uppercase tracking-wider text-slate-400 font-mono">Change Password</label>
                  <input v-model="settingsForm.password" type="text" placeholder="Enter new password" class="px-3 py-2 border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 rounded-lg text-sm text-[#18181A] dark:text-white focus:outline-none focus:border-[#C85A32]" />
                </div>
                
                <button 
                  @click="changePassword"
                  class="w-full py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-lg transition-colors cursor-pointer"
                >
                  PATCH_ACCESS_PASSWORD
                </button>
              </div>

              <!-- Format Memory -->
              <div class="p-4 border border-dashed border-rose-200 dark:border-rose-800 rounded-xl space-y-3 bg-rose-500/10">
                <h4 class="text-xs font-bold uppercase tracking-wider text-rose-600">System Reset</h4>
                <p class="text-xs text-rose-500 leading-normal">
                  Format local cache. Resets all custom cards, skills registry, and profile parameters.
                </p>
                <button 
                  @click="resetToDefaults"
                  class="w-full py-2 bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold rounded-lg transition-colors cursor-pointer"
                >
                  FORMAT_DATABASE
                </button>
              </div>

            </div>

          </div>
        </div>

        <!-- logout drawer footer -->
        <div class="border-t border-slate-200 dark:border-slate-800 pt-4 flex space-x-3">
          <button 
            @click="showAdminDrawer = false"
            class="flex-grow py-2.5 border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-bold rounded-lg transition-colors cursor-pointer"
          >
            Minimize Panel
          </button>
          <button 
            @click="handleLogout"
            class="flex-grow py-2.5 bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold rounded-lg transition-all cursor-pointer animate-pulse"
          >
            Logout
          </button>
        </div>

      </div>
    </transition>

    <!-- Custom Project Detail Modal (Replacing cartridge look with premium details) -->
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
        class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm"
        @click="selectedProject = null"
      >
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
            class="relative w-full max-w-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl overflow-hidden text-left flex flex-col"
            @click.stop
          >
            <!-- Header Image -->
            <div class="relative h-48 sm:h-64 bg-slate-950">
              <img 
                :src="selectedProject.imageUrl" 
                :alt="selectedProject.title"
                class="w-full h-full object-cover"
              />
              <div class="absolute inset-0 bg-gradient-to-t from-white dark:from-slate-900 via-transparent to-transparent" />
              
              <!-- Close Button -->
              <button 
                @click="selectedProject = null"
                class="absolute top-4 right-4 p-2 bg-white/80 dark:bg-slate-950/80 hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white rounded-full border border-slate-200/50 dark:border-slate-800/50 transition-colors cursor-pointer"
              >
                <X class="w-4 h-4" />
              </button>
            </div>

            <!-- Body Contents -->
            <div class="p-6 sm:p-8 space-y-6 overflow-y-auto max-h-[calc(100vh-280px)] text-slate-800 dark:text-slate-200">
              <!-- Title -->
              <div>
                <h4 class="text-2xl font-extrabold text-slate-900 dark:text-white font-sans">
                  {{ selectedProject.title }}
                </h4>
                <div class="flex items-center space-x-2 text-xs font-mono text-slate-500 mt-2">
                  <span class="uppercase tracking-wider">Release: {{ selectedProject.year }}</span>
                  <span>/</span>
                  <span class="uppercase tracking-wider text-indigo-500">{{ selectedProject.category }}</span>
                </div>
              </div>

              <!-- Challenge vs Solution -->
              <div class="space-y-4 pt-2">
                <div class="flex items-start space-x-3">
                  <div class="p-1.5 rounded bg-rose-500/10 border border-rose-500/20 text-rose-500 mt-0.5">
                    <BookOpen class="w-4 h-4" />
                  </div>
                  <div>
                    <span class="block text-xs font-bold uppercase tracking-wider text-rose-500 font-mono mb-1">The Challenge</span>
                    <p class="text-sm text-slate-600 dark:text-slate-400 leading-relaxed text-justify">
                      {{ selectedProject.challenge }}
                    </p>
                  </div>
                </div>

                <div class="flex items-start space-x-3">
                  <div class="p-1.5 rounded bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 mt-0.5">
                    <CheckCircle class="w-4 h-4" />
                  </div>
                  <div>
                    <span class="block text-xs font-bold uppercase tracking-wider text-emerald-500 font-mono mb-1">The Solution</span>
                    <p class="text-sm text-slate-600 dark:text-slate-400 leading-relaxed text-justify">
                      {{ selectedProject.solution }}
                    </p>
                  </div>
                </div>
              </div>

              <!-- Business Impact Banner -->
              <div class="p-5 rounded-xl bg-indigo-500/5 dark:bg-indigo-950/20 border border-indigo-500/20 shadow-inner">
                <span class="block text-xs font-bold uppercase tracking-wider text-indigo-500 dark:text-indigo-400 font-mono mb-2">Business & User Impact</span>
                <p class="text-sm text-slate-700 dark:text-slate-300 leading-relaxed text-justify font-light">
                  {{ selectedProject.impact }}
                </p>
              </div>
            </div>

            <!-- Footer Actions -->
            <div class="px-6 py-4 bg-slate-100 dark:bg-slate-950 border-t border-slate-200/50 dark:border-slate-800/50 flex items-center justify-between gap-4">
              <a 
                v-if="selectedProject.link" 
                :href="selectedProject.link" 
                target="_blank"
                class="flex items-center space-x-2 px-5 py-2.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold transition-all cursor-pointer"
              >
                <Github class="w-4 h-4" />
                <span>Source Code</span>
              </a>
              <button 
                @click="selectedProject = null"
                class="px-5 py-2.5 border border-slate-200 dark:border-slate-800 hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white rounded-lg text-sm font-semibold transition-colors cursor-pointer"
              >
                Close Details
              </button>
            </div>

          </div>
        </transition>
      </div>
    </transition>

  </div>
</template>

<style scoped>
/* Grid line clamps */
.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;  
  overflow: hidden;
}

/* Tab sliding/fade transitions inside Drawer */
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: all 0.3s ease;
}
.fade-slide-enter-from {
  opacity: 0;
  transform: translateX(10px);
}
.fade-slide-leave-to {
  opacity: 0;
  transform: translateX(-10px);
}
</style>
