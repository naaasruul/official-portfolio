import { createApp, nextTick } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import '@fontsource-variable/outfit'
import '@fontsource-variable/geist'
import '@fontsource-variable/geist-mono'
import './style.css'
import App from './App.vue'

const routes = [
  { path: '/', name: 'home', component: () => import('./pages/HomePage.vue') },
  { path: '/projects', name: 'projects', component: () => import('./pages/ProjectsPage.vue') },
  { path: '/projects/:slug', name: 'project', component: () => import('./pages/ProjectPage.vue'), props: true },
  { path: '/:pathMatch(.*)*', redirect: '/' },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, saved) {
    if (saved) return saved
    if (to.hash) return { el: to.hash, top: 88 }
    return { top: 0 }
  },
})

// Morph the clicked card image into the project banner where the browser supports it.
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
let finishTransition = null
router.beforeResolve((to, from) => {
  if (!document.startViewTransition || reduceMotion.matches || from.matched.length === 0) return
  if (to.path === from.path) return
  return new Promise((resolve) => {
    document.startViewTransition(() => {
      resolve()
      return new Promise((done) => { finishTransition = done })
    })
  })
})
router.afterEach(async () => {
  if (!finishTransition) return
  await nextTick()
  finishTransition()
  finishTransition = null
})

createApp(App).use(router).mount('#app')
