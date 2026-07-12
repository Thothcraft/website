<template>
  <main class="home-page">
    <section class="hero">
      <div class="hero-copy">
        <div class="eyebrow">Raspberry Pi–based ambient intelligence</div>
        <h1>Thoth understands a space without demanding attention.</h1>
        <p>One compact device combines radar, Wi‑Fi sensing, and an optional camera to detect occupancy and activity, keep data local, and connect your environment to useful automations.</p>
        <div class="actions">
          <v-btn class="primary-action" size="large" to="/download">Set up Thoth</v-btn>
          <v-btn class="secondary-action" size="large" href="https://portal-three-rho.vercel.app" target="_blank">Open portal</v-btn>
        </div>
      </div>
      <div class="device-card">
        <div class="device-top"><span class="status-dot"></span> Thoth online</div>
        <div class="pi-mark">T</div>
        <div class="sensor-row"><span>Radar</span><span>Wi‑Fi CSI</span><span>Camera</span></div>
        <div class="occupancy"><small>Room state</small><strong>Occupied</strong><span>408 / 585 frames detected</span></div>
      </div>
    </section>

    <section class="sensor-section">
      <div class="section-heading"><span>One device</span><h2>Purpose-built sensing</h2></div>
      <div class="sensor-grid">
        <article><v-icon>mdi-radar</v-icon><h3>Millimeter-wave radar</h3><p>Tracks presence and movement without recording identifiable imagery.</p></article>
        <article><v-icon>mdi-wifi</v-icon><h3>Wi‑Fi sensing</h3><p>Uses channel-state changes to add passive context from the wireless environment.</p></article>
        <article><v-icon>mdi-camera-outline</v-icon><h3>Optional camera</h3><p>Add visual context when you choose, with capture and retention under your control.</p></article>
      </div>
    </section>

    <section class="use-section">
      <div class="section-heading"><span>Use Thoth in</span><h2>Spaces that should respond naturally</h2></div>
      <div class="uses">
        <article v-for="item in uses" :key="item.title"><v-icon>{{ item.icon }}</v-icon><div><h3>{{ item.title }}</h3><p>{{ item.text }}</p></div></article>
      </div>
    </section>

    <section class="closing">
      <div><span>Local first</span><h2>Your space. Your signals. Your rules.</h2><p>Review captures, tune detection, connect Home Assistant, and decide exactly what leaves the Raspberry Pi.</p></div>
      <v-btn class="primary-action" size="large" to="/features">Explore Thoth</v-btn>
    </section>
  </main>
</template>

<script setup>
const uses = [
  { title: 'Smart home', text: 'Drive lights, climate, and scenes from room occupancy.', icon: 'mdi-home-automation' },
  { title: 'Personal productivity', text: 'Build assistants that understand focus, breaks, and routines.', icon: 'mdi-lightning-bolt-outline' },
  { title: 'Parental monitoring & control', text: 'Create transparent household routines and presence-based controls.', icon: 'mdi-account-child-outline' },
  { title: 'Passive monitoring', text: 'Observe patterns without wearables or active check-ins.', icon: 'mdi-chart-timeline-variant' },
  { title: 'Security', text: 'Detect unexpected presence and trigger local alerts or automations.', icon: 'mdi-shield-home-outline' },
]
</script>

<style scoped>
.home-page{background:#f6f7f9;color:#111827}.hero{min-height:calc(100vh - 72px);display:grid;grid-template-columns:minmax(0,1.2fr) minmax(320px,.8fr);gap:72px;align-items:center;max-width:1180px;margin:auto;padding:80px 28px}.eyebrow,.section-heading span,.closing span{text-transform:uppercase;letter-spacing:.16em;font-size:.75rem;font-weight:800;color:#64748b}.hero h1{font-size:clamp(3rem,7vw,6.6rem);line-height:.94;letter-spacing:-.065em;max-width:850px;margin:22px 0}.hero-copy>p{font-size:clamp(1.05rem,2vw,1.35rem);line-height:1.65;color:#475569;max-width:720px}.actions{display:flex;gap:12px;margin-top:34px;flex-wrap:wrap}.primary-action{background:#0f172a!important;color:white!important;border-radius:14px!important;text-transform:none!important;font-weight:700!important}.secondary-action{background:white!important;color:#0f172a!important;border:1px solid #dbe1e8;border-radius:14px!important;text-transform:none!important;font-weight:700!important}.device-card{background:#0f172a;color:white;border-radius:32px;padding:28px;box-shadow:0 30px 80px rgba(15,23,42,.22)}.device-top{font-size:.85rem;color:#cbd5e1}.status-dot{display:inline-block;width:8px;height:8px;border-radius:50%;background:#34d399;margin-right:8px}.pi-mark{height:180px;display:grid;place-items:center;font-size:5rem;font-weight:900;letter-spacing:-.08em}.sensor-row{display:grid;grid-template-columns:repeat(3,1fr);gap:8px}.sensor-row span{background:#1e293b;border-radius:10px;padding:10px 6px;text-align:center;font-size:.75rem}.occupancy{margin-top:18px;padding:20px;border-radius:18px;background:#ecfeff;color:#164e63;display:flex;flex-direction:column}.occupancy strong{font-size:1.8rem}.occupancy span{font-size:.75rem;color:#0e7490}.sensor-section,.use-section{max-width:1180px;margin:auto;padding:100px 28px}.section-heading h2,.closing h2{font-size:clamp(2.2rem,5vw,4.2rem);letter-spacing:-.05em;margin:10px 0 42px}.sensor-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:18px}.sensor-grid article,.uses article{background:white;border:1px solid #e2e8f0;border-radius:22px;padding:28px}.sensor-grid .v-icon,.uses .v-icon{color:#0891b2;font-size:30px}.sensor-grid h3,.uses h3{margin:18px 0 8px;font-size:1.15rem}.sensor-grid p,.uses p,.closing p{color:#64748b;line-height:1.6}.use-section{padding-top:40px}.uses{display:grid;grid-template-columns:repeat(2,1fr);gap:14px}.uses article{display:flex;gap:18px}.uses h3{margin:0 0 5px}.closing{max-width:1124px;margin:30px auto 100px;background:#e0f2fe;border-radius:32px;padding:56px;display:flex;align-items:end;justify-content:space-between;gap:30px}.closing h2{margin-bottom:12px}.closing p{max-width:680px}@media(max-width:800px){.hero{grid-template-columns:1fr;gap:40px;padding-top:55px}.hero h1{font-size:3.4rem}.device-card{border-radius:24px}.sensor-grid,.uses{grid-template-columns:1fr}.sensor-section,.use-section{padding:70px 18px}.closing{margin:20px 18px 70px;padding:32px;display:block}.closing .v-btn{margin-top:22px;width:100%}}
</style>
