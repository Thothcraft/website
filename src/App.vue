<template>
  <v-app class="site-shell">
    <header class="site-header">
      <router-link
        class="brand"
        to="/"
        aria-label="Thoth home"
      >
        <span class="brand-mark">T</span><span>Thoth</span>
      </router-link>
      <router-link
        class="product-link"
        to="/product"
      >
        Product
      </router-link>
      <a
        class="portal-link"
        href="https://portal-three-rho.vercel.app"
        target="_blank"
        rel="noopener"
      >Portal</a>
    </header>

    <main><router-view /></main>

    <button
      class="assistant-button"
      aria-label="Open Thoth local assistant"
      @click="showChat = true"
    >
      <span class="assistant-dot" /> Ask Thoth
    </button>
    <div
      v-if="showChat"
      class="chat-backdrop"
      @click.self="showChat = false"
    >
      <section
        class="chat-panel"
        role="dialog"
        aria-modal="true"
        aria-labelledby="assistant-title"
      >
        <header>
          <div>
            <small>LOCAL LLM</small><h2 id="assistant-title">
              Ask your home.
            </h2>
          </div><button
            aria-label="Close assistant"
            @click="showChat = false"
          >
            ×
          </button>
        </header>
        <div
          ref="chatMessagesRef"
          class="chat-messages"
        >
          <p
            v-for="(msg, index) in chatMessages"
            :key="index"
            :class="msg.role"
          >
            {{ msg.content }}
          </p>
          <p
            v-if="isLoading"
            class="assistant"
          >
            Thinking…
          </p>
        </div>
        <form @submit.prevent="sendMessage">
          <label
            class="sr-only"
            for="chat-input"
          >Message</label><input
            id="chat-input"
            v-model="chatInput"
            placeholder="What happened in the living room?"
            autocomplete="off"
          ><button :disabled="!chatInput.trim()">
            Send
          </button>
        </form>
      </section>
    </div>
  </v-app>
</template>

<script setup>
import { nextTick, ref } from 'vue'

const showChat = ref(false)
const chatInput = ref('')
const chatMessagesRef = ref(null)
const isLoading = ref(false)
const chatMessages = ref([{ role: 'assistant', content: 'I’m Thoth’s local assistant. Ask me about presence, rooms, routines, or your connected home.' }])
const API_BASE_URL = (import.meta.env.VITE_BRAIN_API_URL || 'https://web-production-d7d37.up.railway.app').replace(/\/$/, '')

async function sendMessage() {
  if (!chatInput.value.trim() || isLoading.value) return
  const query = chatInput.value
  chatMessages.value.push({ role: 'user', content: query })
  chatInput.value = ''
  isLoading.value = true
  try {
    const token = localStorage.getItem('auth_token')
    if (!token) throw new Error('Sign in through Portal to connect your local model.')
    const response = await fetch(`${API_BASE_URL}/query`, { method: 'POST', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` }, body: JSON.stringify({ query, context: {} }) })
    if (!response.ok) throw new Error('The local model is unavailable right now.')
    const data = await response.json()
    chatMessages.value.push({ role: 'assistant', content: data.response || data.message || 'No response received.' })
  } catch (error) {
    chatMessages.value.push({ role: 'assistant', content: error.message })
  } finally {
    isLoading.value = false
    await nextTick()
    if (chatMessagesRef.value) chatMessagesRef.value.scrollTop = chatMessagesRef.value.scrollHeight
  }
}
</script>

<style>
:root{font-family:Inter,"Helvetica Neue",Arial,sans-serif;color:#11110f;background:#f4f1e9;font-synthesis:none}*{box-sizing:border-box}html{scroll-behavior:smooth}body{margin:0;background:#f4f1e9;color:#11110f}.site-shell{background:#f4f1e9!important}.site-header{height:76px;position:fixed;inset:0 0 auto;z-index:100;display:grid;grid-template-columns:1fr auto 1fr;align-items:center;padding:0 34px;background:rgba(244,241,233,.94);backdrop-filter:blur(12px)}.brand,.product-link,.portal-link{color:#11110f;text-decoration:none}.brand{justify-self:start;display:flex;align-items:center;gap:10px;font-size:18px;font-weight:650;letter-spacing:-.03em}.brand-mark{width:30px;height:30px;display:grid;place-items:center;border:1.5px solid #11110f;border-radius:50%;font-size:14px}.product-link{font-size:15px;font-weight:550;transition:opacity .2s}.portal-link{justify-self:end;padding:11px 21px;border-radius:999px;background:#11110f;color:#fff;font-weight:650;font-size:14px;transition:opacity .2s}.product-link:hover,.portal-link:hover{opacity:.68}.brand:focus-visible,.product-link:focus-visible,.portal-link:focus-visible,.assistant-button:focus-visible,button:focus-visible,a:focus-visible{outline:2px solid #11110f;outline-offset:4px}.assistant-button{position:fixed;right:28px;bottom:28px;z-index:90;border:0;border-radius:999px;background:#11110f;color:white;padding:13px 18px;font:600 14px inherit;display:flex;align-items:center;gap:9px;cursor:pointer}.assistant-dot{width:7px;height:7px;border-radius:50%;background:#c8ff4b}.chat-backdrop{position:fixed;inset:0;z-index:200;background:rgba(17,17,15,.32);display:flex;justify-content:flex-end}.chat-panel{width:min(520px,100%);height:100%;background:#f4f1e9;padding:32px;display:flex;flex-direction:column}.chat-panel header{display:flex;justify-content:space-between;align-items:start;border-bottom:1px solid #cbc7bd;padding-bottom:24px}.chat-panel small{letter-spacing:.16em}.chat-panel h2{font-size:38px;letter-spacing:-.05em;margin:8px 0 0}.chat-panel header button{border:0;background:none;font-size:34px;cursor:pointer}.chat-messages{flex:1;overflow:auto;padding:28px 0}.chat-messages p{max-width:84%;padding:13px 15px;border-radius:15px;line-height:1.45}.chat-messages .assistant{background:#e8e4da}.chat-messages .user{background:#11110f;color:white;margin-left:auto}.chat-panel form{display:flex;gap:8px}.chat-panel input{flex:1;min-width:0;border:1px solid #aca89f;background:white;border-radius:999px;padding:14px 18px;font:inherit}.chat-panel form button{border:0;border-radius:999px;background:#11110f;color:white;padding:0 20px;font-weight:650}.sr-only{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border:0}@media(max-width:640px){.site-header{height:68px;padding:0 20px}.brand span:last-child{display:none}.product-link{font-size:14px}.portal-link{padding:10px 17px}.assistant-button{right:20px;bottom:20px}.chat-panel{padding:24px 20px}}
</style>
