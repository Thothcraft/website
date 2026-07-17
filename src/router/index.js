import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Product from '../views/Shop.vue'
import Plans from '../views/Plans.vue'

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/product', name: 'Product', component: Product },
  { path: '/plans', name: 'Plans', component: Plans },
  { path: '/shop', redirect: '/product' },
  { path: '/features', redirect: '/' },
  { path: '/download', redirect: '/product' },
  { path: '/thothcraft/download', redirect: '/product' },
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
