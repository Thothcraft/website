import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import About from '../views/About.vue'
import Features from '../views/Features.vue'
import Shop from '../views/Shop.vue'
import Community from '../views/Community.vue'
import Plans from '../views/Plans.vue'
import Contact from '../views/Contact.vue'
import JoinUs from '../views/JoinUs.vue'
import Members from '../views/Members.vue'

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/about', name: 'About', component: About },
  { path: '/features', name: 'Features', component: Features },
  { path: '/shop', name: 'Shop', component: Shop },
  { path: '/community', name: 'Community', component: Community },
  { path: '/plans', name: 'Plans', component: Plans },
  { path: '/contact', name: 'Contact', component: Contact },
  { path: '/join', name: 'JoinUs', component: JoinUs },
  { path: '/members', name: 'Members', component: Members },
]

export default createRouter({
  history: createWebHistory(),
  routes,
})
