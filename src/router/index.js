import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Features from '../views/Features.vue'
import Download from '../views/Download.vue'
import Shop from '../views/Shop.vue'
import Plans from '../views/Plans.vue'
import Projects from '../views/Projects.vue'

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/features', name: 'Features', component: Features },
  { path: '/download', name: 'Download', component: Download },
  { path: '/shop', name: 'Shop', component: Shop },
  { path: '/plans', name: 'Plans', component: Plans },
  { path: '/projects', name: 'Projects', component: Projects },
]

export default createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (to.hash) return { el: to.hash, behavior: 'smooth' }
    return savedPosition || { top: 0 }
  },
})
