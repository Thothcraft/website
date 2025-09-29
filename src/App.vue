<template>
  <v-app>
    <v-app-bar
      app
      class="apple-nav-horizontal"
      flat
      height="72"
      elevation="0"
    >
      <v-container class="d-flex align-center justify-space-between pa-0" style="max-width: 1200px;">
        <!-- Logo Section -->
        <div class="d-flex align-center">
          <img 
            src="@/assets/thoth_logo.png" 
            alt="Thoth Logo" 
            class="logo mr-2"
          />
          <v-toolbar-title class="brand-title">
            Thothcraft
          </v-toolbar-title>
        </div>
        
        <!-- Desktop Navigation -->
        <div class="nav-links d-none d-md-flex align-center">
          <template v-for="item in navItems.filter(i => !i.isButton)" :key="item.to">
            <router-link
              :to="item.to"
              :class="['nav-link', { active: isActive(item.to) }]"
            >
              {{ item.title }}
            </router-link>
          </template>
        </div>
        
        <!-- CTA Button -->
        <div class="d-none d-md-flex">
          <v-btn
            v-for="item in navItems.filter(i => i.isButton)"
            :key="item.to"
            :href="item.external ? item.to : undefined"
            :to="!item.external ? item.to : undefined"
            :target="item.external ? '_blank' : undefined"
            class="portal-btn"
            size="small"
          >
            {{ item.title }}
          </v-btn>
        </div>
        
        <!-- Mobile Menu Icon -->
        <v-app-bar-nav-icon
          class="d-md-none"
          @click="drawer = !drawer"
        />
      </v-container>
    </v-app-bar>
    
    <!-- Mobile Drawer (kept for mobile devices) -->
    <v-navigation-drawer
      v-model="drawer"
      app
      temporary
      class="apple-drawer"
      width="280"
    >
      <v-list nav>
        <template v-for="item in navItems" :key="item.to">
          <v-list-item
            v-if="!item.isButton"
            :to="item.to"
            link
            :class="['nav-item-mobile', { active: isActive(item.to) }]"
          >
            <v-list-item-title class="nav-text">
              <v-icon class="nav-icon-item">
                {{ item.icon }}
              </v-icon>
              {{ item.title }}
            </v-list-item-title>
          </v-list-item>
          <div v-else class="pa-4">
            <v-btn 
              block 
              size="large"
              :href="item.external ? item.to : undefined"
              :to="!item.external ? item.to : undefined"
              :target="item.external ? '_blank' : undefined"
              class="apple-button-primary"
            >
              <v-icon class="mr-2">{{ item.icon }}</v-icon>
              {{ item.title }}
            </v-btn>
          </div>
        </template>
      </v-list>
    </v-navigation-drawer>
    <v-main style="padding-top: 72px;">
      <v-container class="pa-0" fluid>
        <router-view />
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup>
import { ref } from 'vue'
import { useRoute } from 'vue-router'
const drawer = ref(false)
const route = useRoute()

const navItems = [
  { title: 'Home', icon: 'mdi-home', to: '/' },
  { title: 'About', icon: 'mdi-information', to: '/about' },
  { title: 'Features', icon: 'mdi-feature-search', to: '/features' },
  { title: 'Shop', icon: 'mdi-shopping', to: '/shop' },
  { title: 'Community', icon: 'mdi-account-group', to: '/community' },
  { title: 'Plans', icon: 'mdi-currency-usd', to: '/plans' },
  { title: 'Login to Portal', icon: 'mdi-login', to: 'https://thothfrontend.vercel.app/', isButton: true, external: true },
]

const isActive = (path) => route.path === path
</script>

<style scoped>
/* Horizontal Navigation Bar */
.apple-nav-horizontal {
  background: rgba(251, 251, 253, 0.72) !important;
  backdrop-filter: blur(20px) saturate(180%);
  -webkit-backdrop-filter: blur(20px) saturate(180%);
  border-bottom: 1px solid rgba(0, 0, 0, 0.08);
  position: fixed !important;
  top: 0;
  z-index: 1000;
  box-shadow: 0 1px 0 0 rgba(0, 0, 0, 0.05);
  animation: slideDown 0.5s ease-out;
}

@keyframes slideDown {
  from {
    transform: translateY(-100%);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

/* Navigation Links */
.nav-links {
  gap: 8px;
}

.nav-link {
  position: relative;
  padding: 8px 16px;
  color: rgba(0, 0, 0, 0.8);
  text-decoration: none;
  font-size: 14px;
  font-weight: 500;
  letter-spacing: -0.01em;
  border-radius: 8px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  overflow: hidden;
}

.nav-link::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 0;
  height: 0;
  border-radius: 50%;
  background: rgba(0, 113, 227, 0.1);
  transform: translate(-50%, -50%);
  transition: width 0.6s ease, height 0.6s ease;
}

.nav-link::after {
  content: '';
  position: absolute;
  bottom: 6px;
  left: 50%;
  width: 0;
  height: 2px;
  background: linear-gradient(90deg, transparent, #0071e3, transparent);
  transform: translateX(-50%);
  transition: width 0.3s ease;
}

.nav-link:hover {
  color: #0071e3;
  transform: translateY(-1px);
}

.nav-link:hover::before {
  width: 100%;
  height: 100%;
}

.nav-link:hover::after {
  width: calc(100% - 32px);
}

.nav-link.active {
  color: #0071e3;
  background: rgba(0, 113, 227, 0.08);
  font-weight: 600;
}

.nav-link.active::after {
  width: calc(100% - 32px);
  background: #0071e3;
}

/* Portal Button with Glow Effect */
.portal-btn {
  position: relative;
  background: linear-gradient(135deg, #0071e3, #0077ed) !important;
  color: white !important;
  border-radius: 20px !important;
  padding: 8px 24px !important;
  font-weight: 500 !important;
  font-size: 14px !important;
  letter-spacing: -0.01em !important;
  text-transform: none !important;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;
  box-shadow: 0 4px 15px rgba(0, 113, 227, 0.25) !important;
  overflow: hidden;
}

.portal-btn::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
  transition: left 0.5s ease;
}

.portal-btn:hover {
  transform: translateY(-2px) scale(1.02);
  box-shadow: 0 6px 20px rgba(0, 113, 227, 0.35) !important;
  background: linear-gradient(135deg, #0077ed, #007ff5) !important;
}

.portal-btn:hover::before {
  left: 100%;
}

/* Mobile Drawer */
.apple-drawer {
  background: rgba(255, 255, 255, 0.98) !important;
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-right: 1px solid rgba(0, 0, 0, 0.08);
}

/* Mobile Navigation Items */
.nav-item-mobile {
  display: flex;
  align-items: center;
  padding: 10px 16px;
  margin: 2px 8px;
  border-radius: 8px;
  transition: all 0.2s ease;
  background: transparent;
}

.nav-item-mobile:hover {
  background: rgba(0, 0, 0, 0.04);
}

.nav-item-mobile.active {
  background: rgba(0, 113, 227, 0.08);
}

.nav-icon-item {
  color: rgba(0, 0, 0, 0.5);
  margin-right: 12px;
  font-size: 20px;
}

.nav-text {
  color: #1d1d1f;
  font-weight: 500;
  font-size: 15px;
  letter-spacing: -0.01em;
}

/* Apple-style Button (mobile) */
.apple-button-primary {
  background: #0071e3 !important;
  color: white !important;
  border-radius: 12px !important;
  font-weight: 500 !important;
  letter-spacing: -0.01em !important;
  transition: all 0.2s ease !important;
  text-transform: none !important;
}

.apple-button-primary:hover {
  background: #0077ed !important;
  transform: scale(1.02);
}

/* Logo with Pulse Effect */
.logo {
  height: 32px;
  width: 32px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1));
}

.logo:hover {
  transform: rotate(10deg) scale(1.1);
  filter: drop-shadow(0 4px 8px rgba(0, 113, 227, 0.3));
  animation: pulse 1s infinite;
}

@keyframes pulse {
  0%, 100% {
    transform: rotate(10deg) scale(1.1);
  }
  50% {
    transform: rotate(10deg) scale(1.15);
  }
}

/* Brand Title with Gradient Effect */
.brand-title {
  background: linear-gradient(135deg, #1d1d1f 0%, #1d1d1f 50%, #0071e3 50%, #0071e3 100%);
  background-size: 200% 100%;
  background-position: 0% 0%;
  -webkit-background-clip: text !important;
  -webkit-text-fill-color: transparent !important;
  background-clip: text !important;
  font-weight: 700 !important;
  font-size: 20px !important;
  letter-spacing: -0.02em !important;
  cursor: pointer;
  transition: all 0.3s ease;
}

.brand-title:hover {
  background-position: -100% 0%;
}

/* Smooth Animations */
* {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

/* Responsive adjustments */
@media (max-width: 960px) {
  .nav-link {
    padding: 6px 12px;
    font-size: 13px;
  }
}
</style>
