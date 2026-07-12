<template>
  <div class="home-page">
    <section class="hero">

      <h2 class="animated-pitch">Passive monitoring for<br><button :class="['changing-place', { leaving: isLeaving }]" @click="openCard(uses[placeIndex], placeIndex)">{{ places[placeIndex] }}.</button></h2>
      <div class="hero-foot">
        <p>Thoth gives your home a quiet understanding of people and place—No wearables, subscriptions, or a camera.</p><router-link to="/product">
          Meet the device <span>↗</span>
        </router-link>
      </div>
    </section>

    <section class="features section-pad">
      <div class="section-intro"><p class="kicker">WHAT IT DOES</p><h2>Your home,<br>more aware.</h2></div>
      <div class="feature-list">
        <article
          v-for="(item, i) in capabilities"
          :key="item.title"
          tabindex="0"
          @click="openCard(item, i)"
          @keydown.enter="openCard(item, i)"
        >
          <span>0{{ i + 1 }}</span><h3>{{ item.title }}</h3><p>{{ item.short }}</p><button :aria-label="`Learn more about ${item.title}`">
            ↗
          </button>
        </article>
      </div>
    </section>

    <section class="research section-pad">
      <p class="kicker">
        BUILT FOR RESEARCH
      </p>
      <div>
        <h2>Open by design.</h2><p>Hardware and software you can inspect, adapt, and extend. Built around accessible components and synchronized multimodal data.</p><button @click="openResearch">
          Explore the research stack <span>↗</span>
        </button>
      </div>
    </section>

    <section class="closing">
      <p class="kicker">
        THOTH, AT HOME
      </p><h2>Know what’s happening.<br>Keep it yours.</h2><router-link to="/product">
        View product
      </router-link>
    </section>

    <div
      v-if="modalOpen"
      class="modal-wrap"
      role="dialog"
      aria-modal="true"
      :aria-labelledby="`modal-${activeIndex}`"
      @click.self="closeModal"
    >
      <section class="modal">
        <header>
          <p class="kicker">
            {{ modalLabel }}
          </p><button
            aria-label="Close"
            @click="closeModal"
          >
            ×
          </button>
        </header>
        <div
          ref="modalTrack"
          class="modal-track"
        >
          <article
            v-for="(slide, i) in modalSlides"
            :key="slide.title"
            :class="slide.tone || ''"
          >
            <span>0{{ i + 1 }} / 0{{ modalSlides.length }}</span><h2 :id="`modal-${activeIndex}`">
              {{ slide.title }}
            </h2><p>{{ slide.text }}</p><small v-if="slide.detail">{{ slide.detail }}</small>
          </article>
        </div>
        <footer>
          <span>Scroll to explore</span><div>
            <button
              aria-label="Previous card"
              @click="scrollModal(-1)"
            >
              ←
            </button><button
              aria-label="Next card"
              @click="scrollModal(1)"
            >
              →
            </button>
          </div>
        </footer>
      </section>
    </div>
  </div>
</template>

<script setup>
import { nextTick, onBeforeUnmount, onMounted, ref } from 'vue'

const modalOpen = ref(false)
const modalSlides = ref([])
const modalLabel = ref('DETAILS')
const activeIndex = ref(0)
const modalTrack = ref(null)
const places = ['Home', 'Health care', 'Security', 'Research']
const placeIndex = ref(0)
const isLeaving = ref(false)
let placeTimer

const capabilities = [
  { title: 'Presence detection', short: 'Know when a room is occupied.', text: 'Private, passive human presence detection works out of the box—without requiring a camera or wearable.', detail: 'Camera-free by default.' },
  { title: 'Indoor localization', short: 'Understand position in 2D.', text: 'See where presence is located within a calibrated room and use that location to trigger context-aware automations.', detail: 'Room-scale spatial awareness.' },
  { title: 'Camera, by choice', short: 'Remote access only when enabled.', text: 'The camera remains an explicit choice. Enable it for remote access and richer context; keep it off for camera-free monitoring.', detail: 'You decide when vision exists.' },
  { title: 'A local home model', short: 'Ask your home in natural language.', text: 'Access a local LLM from the portal or app to understand activity, query room state, and interact with connected systems.', detail: 'Local intelligence, accessible anywhere.' },
]

const uses = [
  { title: 'Smart homes', short: 'Presence-driven comfort.', text: 'Let lights, climate, media, and scenes respond to real room occupancy through Home Assistant.', detail: 'Automations · 2D location · local control' },
  { title: 'Health care', short: 'Quiet reassurance.', text: 'Observe patterns and unexpected changes without wearables, cameras, or constant active check-ins.', detail: 'Passive presence · routines · privacy' },
  { title: 'Security', short: 'Awareness without surveillance.', text: 'Detect unexpected presence and location, then trigger local alerts or trusted automations.' },
  { title: 'Research', short: 'Synchronized, open data.', text: 'Build reproducible indoor sensing studies with open hardware, open software, aligned streams, and optional visual labels.' },
]

const researchSlides = [
  { title: 'Open source.', text: 'Thoth’s hardware and software are designed to be inspectable, modifiable, and useful as a foundation for new sensing work.', detail: 'Hardware + software', tone: 'ink' },
  { title: 'Raspberry Pi based.', text: 'Familiar edge compute makes deployment, integration, and extension approachable for researchers and builders.', detail: 'Accessible edge computing' },
  { title: 'Synchronized data collection.', text: 'Capture aligned sensor streams so multimodal experiments are easier to reproduce, compare, and understand.', detail: 'One timeline, many signals', tone: 'sage' },
  { title: 'VLM autolabeling.', text: 'When the camera is enabled, vision-language models can help label collected data and accelerate dataset creation.', detail: 'Optional camera · faster annotation', tone: 'clay' },
]

function openCard(item, index) { modalLabel.value = item.title.toUpperCase(); activeIndex.value = index; modalSlides.value = [{ ...item, title: item.title }, ...capabilities.filter(x => x.title !== item.title)]; openModal() }
function openResearch() { modalLabel.value = 'RESEARCH'; activeIndex.value = 0; modalSlides.value = researchSlides; openModal() }
function openModal() { modalOpen.value = true; document.body.style.overflow = 'hidden'; nextTick(() => modalTrack.value?.focus()) }
function closeModal() { modalOpen.value = false; document.body.style.overflow = '' }
function scrollModal(direction) { modalTrack.value?.scrollBy({ left: direction * modalTrack.value.clientWidth * .72, behavior: 'smooth' }) }
function onKey(event) { if (event.key === 'Escape' && modalOpen.value) closeModal() }
window.addEventListener('keydown', onKey)
onMounted(() => { placeTimer = window.setInterval(() => { isLeaving.value = true; window.setTimeout(() => { placeIndex.value = (placeIndex.value + 1) % places.length; isLeaving.value = false }, 650) }, 3200) })
onBeforeUnmount(() => { window.removeEventListener('keydown', onKey); window.clearInterval(placeTimer); document.body.style.overflow = '' })
</script>

<style scoped>
.home-page{padding-top:76px;background:#f4f1e9}.hero{min-height:calc(100vh - 76px);padding:11vh 34px 48px;display:flex;flex-direction:column;justify-content:space-between}.kicker{font-size:11px;font-weight:700;letter-spacing:.18em;margin:0}.hero h1{font-size:clamp(66px,8.6vw,132px);line-height:.89;letter-spacing:-.072em;font-weight:620;max-width:1500px;margin:54px 0 80px}.hero-foot{display:grid;grid-template-columns:1fr 1fr;gap:30px;align-items:end}.hero-foot p{font-size:clamp(18px,2vw,27px);line-height:1.25;letter-spacing:-.025em;max-width:720px;margin:0}.hero-foot a,.research button,.closing a{justify-self:end;color:#11110f;text-decoration:none;border-bottom:1px solid #11110f;padding:0 0 7px;font-weight:650}.statement{background:#11110f;color:#f4f1e9;padding:11vw 34px}.statement p{font-size:clamp(38px,5.8vw,88px);line-height:1.02;letter-spacing:-.055em;max-width:1400px;margin:0}.section-pad{padding:140px 34px}.section-intro{display:grid;grid-template-columns:1fr 2fr;gap:30px;margin-bottom:86px}.section-intro h2,.research h2,.closing h2{font-size:clamp(48px,6.4vw,94px);line-height:.96;letter-spacing:-.06em;font-weight:600;margin:0}.section-copy{max-width:460px;font-size:18px;line-height:1.45}.feature-list{border-top:1px solid #a8a49a}.feature-list article{display:grid;grid-template-columns:60px 1fr 1fr 48px;gap:22px;align-items:center;border-bottom:1px solid #a8a49a;padding:30px 0;cursor:pointer;transition:padding .2s}.feature-list article:hover{padding-left:12px}.feature-list h3{font-size:clamp(24px,3vw,40px);letter-spacing:-.04em;margin:0}.feature-list p{font-size:16px;color:#5c5a54}.feature-list button{border:1px solid #11110f;border-radius:50%;width:44px;height:44px;background:transparent;font-size:20px}.responsive{background:#dcd9cf}.card-strip{display:grid;grid-template-columns:repeat(4,minmax(260px,1fr));gap:12px;overflow-x:auto;padding-bottom:8px}.card-strip button{border:0;text-align:left;background:#f4f1e9;min-height:390px;padding:24px;display:flex;flex-direction:column;color:#11110f;cursor:pointer}.card-strip strong{font-size:35px;line-height:1;letter-spacing:-.05em;margin-top:70px}.card-strip em{font-style:normal;font-size:17px;margin-top:14px;color:#5c5a54}.card-strip b{margin-top:auto;font-size:13px}.research{display:grid;grid-template-columns:1fr 2fr;gap:30px;background:#c8d1b2}.research>div>p{font-size:24px;line-height:1.4;max-width:780px;margin:38px 0 66px}.research button{background:none;border:0;border-bottom:1px solid;padding:0 0 7px;font:650 15px inherit;cursor:pointer}.closing{padding:150px 34px 80px;min-height:86vh;display:flex;flex-direction:column}.closing h2{font-size:clamp(60px,9vw,140px);margin:auto 0 80px}.closing a{align-self:flex-start}.modal-wrap{position:fixed;inset:0;z-index:300;background:rgba(17,17,15,.55);padding:28px;display:flex;align-items:center}.modal{width:100%;background:#f4f1e9;padding:26px;overflow:hidden}.modal header,.modal footer{display:flex;align-items:center;justify-content:space-between}.modal header button{border:0;background:none;font-size:34px;cursor:pointer}.modal-track{display:flex;gap:12px;overflow-x:auto;scroll-snap-type:x mandatory;padding:26px 0 22px;scrollbar-width:none}.modal-track article{flex:0 0 min(620px,74vw);min-height:460px;padding:30px;background:#e5e1d7;scroll-snap-align:start;display:flex;flex-direction:column}.modal-track article.ink{background:#11110f;color:#f4f1e9}.modal-track article.sage{background:#c8d1b2}.modal-track article.clay{background:#d9b7a5}.modal-track h2{font-size:clamp(42px,5.5vw,78px);line-height:.94;letter-spacing:-.06em;margin:70px 0 25px}.modal-track p{font-size:20px;line-height:1.45;max-width:520px}.modal-track small{margin-top:auto;text-transform:uppercase;letter-spacing:.12em}.modal footer>span{font-size:12px;text-transform:uppercase;letter-spacing:.12em}.modal footer button{width:44px;height:44px;border:1px solid #11110f;border-radius:50%;background:transparent;margin-left:7px;font-size:20px}@media(max-width:800px){.home-page{padding-top:68px}.hero{min-height:calc(100svh - 68px);padding:70px 20px 30px}.hero h1{font-size:clamp(53px,16vw,78px);margin:42px 0 70px}.hero-foot{grid-template-columns:1fr;gap:34px}.hero-foot a{justify-self:start}.statement,.section-pad,.closing{padding:90px 20px}.section-intro,.research{grid-template-columns:1fr;gap:36px}.section-intro{margin-bottom:55px}.feature-list article{grid-template-columns:38px 1fr 42px}.feature-list article>p{display:none}.card-strip{grid-template-columns:repeat(4,82vw)}.research>div>p{font-size:19px}.modal-wrap{padding:10px}.modal{padding:18px}.modal-track article{flex-basis:84vw;min-height:430px;padding:24px}.modal footer>span{display:none}}
.hero h2{font-size:clamp(66px,8.6vw,132px);line-height:.89;letter-spacing:-.072em;font-weight:620;max-width:1500px;margin:54px 0 70px}.changing-place{position:relative;border:0;background:none;padding:0;color:inherit;font:inherit;letter-spacing:inherit;line-height:inherit;cursor:pointer;text-align:left;min-width:8ch;animation:wordIn .7s cubic-bezier(.2,.75,.2,1)}.changing-place::after{content:"";position:absolute;left:-1%;top:54%;width:0;height:.065em;background:#11110f;transform:rotate(-2deg);border-radius:50%;transition:width .55s cubic-bezier(.7,0,.25,1)}.changing-place.leaving::after{width:103%}.changing-place.leaving{animation:wordOut .65s ease forwards}@keyframes wordIn{from{opacity:0;transform:translateY(.32em) rotate(1.2deg)}to{opacity:1;transform:none}}@keyframes wordOut{0%,70%{opacity:1}100%{opacity:0;transform:translateY(-.12em) rotate(-1deg)}}@media(prefers-reduced-motion:reduce){.changing-place,.changing-place.leaving{animation:none}.changing-place::after{transition:none}}@media(max-width:800px){.hero h2{font-size:clamp(53px,16vw,78px);margin:42px 0 55px}}
</style>
