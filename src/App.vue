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
            {{ brandTitle }}
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
        <div class="d-none d-md-flex align-center">
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
          
          <!-- Theme Toggle (Sun Icon) -->
          <button class="theme-toggle-button" @click="toggleTheme" title="Toggle theme">
            <span class="theme-icon">{{ isDark ? '☀️' : '🌙' }}</span>
          </button>
          
          <!-- Language Selector -->
          <select 
            v-model="locale" 
            @change="setLocale($event.target.value)"
            class="language-selector"
          >
            <option v-for="(label, code) in LOCALE_LABELS" :key="code" :value="code">
              {{ label }}
            </option>
          </select>
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

    <!-- Chat Cat Icon (no theme slider) -->
    <div class="chat-cat-container">
      <button 
        class="chat-cat-button" 
        @click="toggleChat"
        title="Click to chat"
      >
        <span class="cat-icon">🐱</span>
      </button>
    </div>

    <!-- Chat Side Panel -->
    <div v-if="showChat" class="chat-side-panel">
      <div class="chat-side-header">
        <h3>🐱 ThothCraft AI Assistant</h3>
        <button class="close-button" @click="toggleChat">×</button>
      </div>
      <div class="chat-messages" ref="chatMessagesRef">
        <div v-for="(msg, index) in chatMessages" :key="index" :class="['message', msg.role]">
          <div class="message-content">{{ msg.content }}</div>
        </div>
      </div>
      <div class="chat-input">
        <textarea
          v-model="chatInput"
          @keydown.enter.prevent="sendMessage"
          placeholder="Type your message..."
          rows="2"
        />
        <button @click="sendMessage" :disabled="!chatInput.trim()">Send</button>
      </div>
    </div>
  </v-app>
</template>

<script setup>
import { ref, onMounted, nextTick, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useI18n } from './i18n'

const drawer = ref(false)
const route = useRoute()
const showChat = ref(false)
const chatInput = ref('')
const chatMessages = ref([
  { role: 'assistant', content: 'Hello! I\'m your ThothCraft AI assistant. How can I help you today?' }
])
const chatMessagesRef = ref(null)
const isLoading = ref(false)
const { locale, t, setLocale, isRTL, LOCALE_LABELS } = useI18n()

const navItems = computed(() => [
  { title: t('nav.home'), icon: 'mdi-home', to: '/' },
  { title: t('nav.features'), icon: 'mdi-feature-search', to: '/features' },
  { title: t('nav.download'), icon: 'mdi-download', to: '/download' },
  { title: t('nav.shop'), icon: 'mdi-shopping', to: '/shop' },
  { title: t('nav.plans'), icon: 'mdi-currency-usd', to: '/plans' },
  { title: t('nav.portal'), icon: 'mdi-login', to: 'https://portal-three-rho.vercel.app', isButton: true, external: true },
])

const brandTitle = computed(() => t('brand.title'))

function toggleChat() {
  showChat.value = !showChat.value
}

async function sendMessage() {
  if (!chatInput.value.trim() || isLoading.value) return

  chatMessages.value.push({ role: 'user', content: chatInput.value })
  const userMessage = chatInput.value
  chatInput.value = ''
  isLoading.value = true

  try {
    // Get token from localStorage (assuming auth is handled)
    const token = localStorage.getItem('auth_token')
    const headers = {
      'Content-Type': 'application/json',
    }
    if (token) {
      headers['Authorization'] = `Bearer ${token}`
    }

    const response = await fetch('https://web-production-d7d37.up.railway.app/query', {
      method: 'POST',
      headers,
      body: JSON.stringify({
        query: userMessage,
        context: {},
      }),
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()
    chatMessages.value.push({ role: 'assistant', content: data.response || data.message || 'No response received' })
  } catch (error) {
    console.error('Chat error:', error)
    chatMessages.value.push({
      role: 'assistant',
      content: 'Sorry, I encountered an error. Please make sure you\'re logged in to the Research Portal.',
    })
  } finally {
    isLoading.value = false
    await nextTick()
    if (chatMessagesRef.value) {
      chatMessagesRef.value.scrollTop = chatMessagesRef.value.scrollHeight
    }
  }
}

// ── Theme Toggle (Sun/Moon) ──
const isDark = ref(localStorage.getItem('theme-mode') === 'dark')

function toggleTheme() {
  isDark.value = !isDark.value
  applyTheme()
  localStorage.setItem('theme-mode', isDark.value ? 'dark' : 'light')
}

function applyTheme() {
  const root = document.documentElement.style
  
  if (isDark.value) {
    // Dark theme colors
    root.setProperty('--bg-primary', '#1e1e1e')
    root.setProperty('--bg-secondary', '#181818')
    root.setProperty('--bg-card', '#262626')
    root.setProperty('--bg-accent', '#2a2a2a')
    root.setProperty('--text-primary', '#f0f0f0')
    root.setProperty('--text-secondary', '#b0b0b0')
    root.setProperty('--text-muted', '#8a8a8a')
    root.setProperty('--accent', '#6b7f4a')
    root.setProperty('--accent-hover', '#7d9456')
    root.setProperty('--border-color', 'rgba(255,255,255,0.1)')
    root.setProperty('--shadow-light', 'rgba(0,0,0,0.3)')
    root.setProperty('--shadow-medium', 'rgba(0,0,0,0.5)')
  } else {
    // Light theme colors
    root.setProperty('--bg-primary', '#f2f0ed')
    root.setProperty('--bg-secondary', '#e8e6e3')
    root.setProperty('--bg-card', '#ffffff')
    root.setProperty('--bg-accent', '#b8c4a0')
    root.setProperty('--text-primary', '#1e1e1e')
    root.setProperty('--text-secondary', '#5a5a5a')
    root.setProperty('--text-muted', '#8a8a84')
    root.setProperty('--accent', '#6b7f4a')
    root.setProperty('--accent-hover', '#7d9456')
    root.setProperty('--border-color', 'rgba(0,0,0,0.06)')
    root.setProperty('--shadow-light', 'rgba(0,0,0,0.05)')
    root.setProperty('--shadow-medium', 'rgba(0,0,0,0.1)')
  }
}

onMounted(() => {
  applyTheme()
  document.documentElement.dir = isRTL() ? 'rtl' : 'ltr'
  document.documentElement.lang = locale
})

const isActive = (path) => route.path === path
</script>

<style scoped>
/* Horizontal Navigation Bar */
.apple-nav-horizontal {
  background: color-mix(in srgb, var(--bg-primary) 80%, transparent) !important;
  backdrop-filter: blur(20px) saturate(180%);
  -webkit-backdrop-filter: blur(20px) saturate(180%);
  border-bottom: 1px solid var(--border-color);
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
  color: var(--text-primary);
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
  background: color-mix(in srgb, var(--accent) 15%, transparent);
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
  background: linear-gradient(90deg, transparent, var(--accent), transparent);
  transform: translateX(-50%);
  transition: width 0.3s ease;
}

.nav-link:hover {
  color: var(--accent);
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
  color: var(--accent);
  background: color-mix(in srgb, var(--accent) 10%, transparent);
  font-weight: 600;
}

.nav-link.active::after {
  width: calc(100% - 32px);
  background: var(--accent);
}

/* Portal Button with Glow Effect */
.portal-btn {
  position: relative;
  background: linear-gradient(135deg, var(--accent), var(--accent-hover)) !important;
  color: white !important;
  border-radius: 20px !important;
  padding: 8px 24px !important;
  font-weight: 500 !important;
  font-size: 14px !important;
  letter-spacing: -0.01em !important;
  text-transform: none !important;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;
  box-shadow: 0 4px 15px color-mix(in srgb, var(--accent) 25%, transparent) !important;
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
  box-shadow: 0 6px 20px color-mix(in srgb, var(--accent) 35%, transparent) !important;
  background: linear-gradient(135deg, var(--accent-hover), var(--accent)) !important;
}

.portal-btn:hover::before {
  left: 100%;
}

/* Mobile Drawer */
.apple-drawer {
  background: color-mix(in srgb, var(--bg-card) 98%, transparent) !important;
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
  background: color-mix(in srgb, var(--accent) 10%, transparent);
}

.nav-icon-item {
  color: var(--text-muted);
  margin-right: 12px;
  font-size: 20px;
}

.nav-text {
  color: var(--text-primary);
  font-weight: 500;
  font-size: 15px;
  letter-spacing: -0.01em;
}

/* Apple-style Button (mobile) */
.apple-button-primary {
  background: var(--accent) !important;
  color: white !important;
  border-radius: 12px !important;
  font-weight: 500 !important;
  letter-spacing: -0.01em !important;
  transition: all 0.2s ease !important;
  text-transform: none !important;
}

.apple-button-primary:hover {
  background: var(--accent-hover) !important;
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
  background: linear-gradient(135deg, var(--text-primary) 0%, var(--text-primary) 50%, var(--accent) 50%, var(--accent) 100%);
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

/* ── Theme Toggle (Sun/Moon) ── */
.theme-toggle-button {
  margin-left: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: var(--bg-card);
  border: 2px solid var(--border-color);
  cursor: pointer;
  transition: all 0.3s ease;
}

.theme-toggle-button:hover {
  transform: scale(1.1);
  background: var(--bg-accent);
}

.theme-icon {
  font-size: 20px;
  transition: transform 0.3s ease;
}

.theme-toggle-button:hover .theme-icon {
  transform: rotate(180deg);
}

/* ── Language Selector ── */
.language-selector {
  margin-left: 12px;
  padding: 8px 12px;
  border-radius: 20px;
  background: var(--bg-card);
  border: 2px solid var(--border-color);
  color: var(--text-primary);
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  outline: none;
}

.language-selector:hover {
  border-color: var(--accent);
  background: var(--bg-accent);
}

.language-selector option {
  background: var(--bg-card);
  color: var(--text-primary);
}

/* ── Chat Cat Button (no theme slider) ── */
.chat-cat-container {
  position: fixed;
  bottom: 24px;
  right: 24px;
  z-index: 9999;
}

.chat-cat-button {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background: var(--bg-card);
  border: 2px solid var(--border-color);
  box-shadow: 0 4px 20px var(--shadow-medium);
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.chat-cat-button:hover {
  transform: scale(1.1);
  box-shadow: 0 6px 24px var(--shadow-medium);
}

.cat-icon {
  font-size: 28px;
  transition: transform 0.3s ease;
}

.chat-cat-button:hover .cat-icon {
  transform: scale(1.2);
}

/* ── Chat Side Panel ── */
.chat-side-panel {
  position: fixed;
  top: 72px;
  right: 0;
  width: 400px;
  height: calc(100vh - 72px);
  background: var(--bg-card);
  border-left: 1px solid var(--border-color);
  box-shadow: -4px 0 24px var(--shadow-medium);
  display: flex;
  flex-direction: column;
  z-index: 10000;
  animation: slideInRight 0.3s ease;
}

@keyframes slideInRight {
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

.chat-side-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 20px;
  border-bottom: 1px solid var(--border-color);
}

.chat-side-header h3 {
  margin: 0;
  font-size: 18px;
  font-weight: 600;
  color: var(--text-primary);
}

.close-button {
  background: none;
  border: none;
  font-size: 24px;
  color: var(--text-muted);
  cursor: pointer;
  padding: 4px 8px;
  border-radius: 8px;
  transition: all 0.2s ease;
}

.close-button:hover {
  background: var(--bg-secondary);
  color: var(--text-primary);
}

.chat-messages {
  flex: 1;
  overflow-y: auto;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.message {
  max-width: 80%;
  padding: 12px 16px;
  border-radius: 16px;
  animation: messageSlide 0.2s ease;
}

@keyframes messageSlide {
  from {
    transform: translateY(10px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

.message.user {
  align-self: flex-end;
  background: var(--accent);
  color: white;
}

.message.assistant {
  align-self: flex-start;
  background: var(--bg-secondary);
  color: var(--text-primary);
  border: 1px solid var(--border-color);
}

.message-content {
  font-size: 14px;
  line-height: 1.5;
  white-space: pre-wrap;
}

.chat-input {
  padding: 16px 20px;
  border-top: 1px solid var(--border-color);
  display: flex;
  gap: 12px;
}

.chat-input textarea {
  flex: 1;
  padding: 10px 14px;
  border: 1px solid var(--border-color);
  border-radius: 12px;
  background: var(--bg-secondary);
  color: var(--text-primary);
  font-size: 14px;
  font-family: inherit;
  resize: none;
  outline: none;
  transition: border-color 0.2s ease;
}

.chat-input textarea:focus {
  border-color: var(--accent);
}

.chat-input button {
  padding: 10px 20px;
  background: var(--accent);
  color: white;
  border: none;
  border-radius: 12px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}

.chat-input button:hover:not(:disabled) {
  background: var(--accent-hover);
  transform: translateY(-1px);
}

.chat-input button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>
