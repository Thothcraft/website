import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Product from '../views/Shop.vue'
import Plans from '../views/Plans.vue'
import Download from '../views/Download.vue'

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/product', name: 'Product', component: Product },
  { path: '/plans', name: 'Plans', component: Plans },
  { path: '/shop', redirect: '/product' },
  { path: '/features', redirect: '/' },
  { path: '/download', name: 'Download', component: Download },
  { path: '/thothcraft/download', redirect: '/download' },
  { path: '/projects', redirect: '/' },
  { path: '/:pathMatch(.*)*', redirect: '/' },
]

export default createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (to.hash) return { el: to.hash, behavior: 'smooth' }
    return savedPosition || { top: 0 }
  },
})
