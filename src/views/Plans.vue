<template>
  <div class="plans-page">
    <section class="plans-hero">
      <div>
        <p class="eyebrow">PORTAL ACCESS / 2026</p>
        <h1>One room.<br>Then many.</h1>
      </div>
      <div class="hero-copy">
        <p>Start with full local occupancy and XY location. Upgrade when multiple rooms, private models, or research workflows need Portal.</p>
        <p class="note">The $500 Thoth device is purchased separately. Taxes and shipping are handled at checkout.</p>
      </div>
    </section>

    <section class="billing-strip">
      <span class="eyebrow">BILLING CADENCE</span>
      <div class="billing-pill">Monthly billing</div>
    </section>

    <section class="plan-grid">
      <article v-for="(plan, index) in plans" :key="plan.id" :class="['plan-card', { featured: plan.featured }]">
        <div class="plan-meta">
          <span>0{{ index + 1 }}</span>
          <span>{{ plan.devices }}</span>
        </div>
        <h2>{{ plan.title }}</h2>
        <div class="plan-price">{{ plan.price }}</div>
        <p class="plan-note">{{ plan.note }}</p>
        <ul>
          <li v-for="feature in plan.features" :key="feature">{{ feature }}</li>
        </ul>
        <a :href="plan.id === 'free' ? 'https://portal-three-rho.vercel.app/auth' : 'https://portal-three-rho.vercel.app/auth'">
          {{ plan.id === 'free' ? 'Get started' : 'Choose plan' }}
        </a>
      </article>
    </section>

    <section class="device-band">
      <div>
        <span class="eyebrow">HARDWARE</span>
        <h2>Radar + camera.<br>$500 once.</h2>
      </div>
      <div class="device-copy">
        <p>Every plan begins with the same local-first sensing device. A subscription changes scale and remote access, not core sensing.</p>
        <a href="/product">See the Thoth device</a>
      </div>
    </section>

    <section class="compare-wrap">
      <h2>Compare Plans</h2>
      <div class="compare-card">
        <table class="compare-table">
          <thead>
            <tr>
              <th class="feature-col">Feature</th>
              <th v-for="plan in plans" :key="plan.id" :class="{ highlighted: plan.featured }">{{ plan.title }}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="row in compareRows" :key="row.feature">
              <td class="feature-name">{{ row.feature }}</td>
              <td v-for="plan in plans" :key="plan.id" :class="{ highlighted: plan.featured }" v-html="renderCell(row[plan.id])" />
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <section class="faq-wrap">
      <h2>Frequently Asked Questions</h2>
      <div class="faq-list">
        <article v-for="faq in faqs" :key="faq.q">
          <h3>{{ faq.q }}</h3>
          <p>{{ faq.a }}</p>
        </article>
      </div>
    </section>
  </div>
</template>

<script setup>
const plans = [
  { id: 'free', title: 'Free', price: '$0', devices: '01 device', note: 'A complete local room.', features: ['Occupancy detection', 'Normalized XY location', 'Home Assistant integration', 'Data download and annotation'] },
  { id: 'home', title: 'Home', price: '$5', devices: '05 devices', featured: true, note: 'A connected set of smart rooms.', features: ['Everything in Free', 'Multiple smart rooms', 'Remote Portal management', 'Unified capture timeline'] },
  { id: 'pro', title: 'Pro', price: '$10', devices: '10 devices', note: 'Private intelligence at the edge.', features: ['Everything in Home', 'Private AI detection models', 'Federated learning', 'Local training data'] },
  { id: 'research', title: 'Research', price: '$15', devices: '10 devices', note: 'The full research workflow.', features: ['Everything in Pro', 'Detailed labels and export', 'Research workspaces', 'Academy and assistant'] },
]

const compareRows = [
  { feature: 'Devices online', free: '1', home: '5', pro: '10', research: '10' },
  { feature: 'Occupancy and XY location', free: true, home: true, pro: true, research: true },
  { feature: 'Home Assistant', free: true, home: true, pro: true, research: true },
  { feature: 'Multi-room Portal', free: false, home: true, pro: true, research: true },
  { feature: 'Private AI models', free: false, home: false, pro: true, research: true },
  { feature: 'Research workspaces', free: false, home: false, pro: false, research: true },
  { feature: 'Price (USD / month)', free: 'Free', home: '$5', pro: '$10', research: '$15' },
]

function renderCell(val) {
  if (val === true) return '<span class="check">✓</span>'
  if (val === false) return '<span class="dash">—</span>'
  return `<span class="value">${val}</span>`
}

const faqs = [
  { q: 'Can I switch plans anytime?', a: 'Yes. Upgrades take effect immediately; downgrades apply at the start of the next billing cycle.' },
  { q: 'What happens to my data if I downgrade?', a: 'Your data stays safe. Features above your new tier become read-only. You have 30 days to export anything before restrictions apply.' },
  { q: 'Is pricing in US dollars?', a: 'Yes. Stripe calculates applicable taxes during checkout.' },
  { q: 'Does live presence require a camera?', a: 'No. The live view is generated locally from radio reflections and reports presence and location without images.' },
  { q: 'Do I need to install anything for the free plan?', a: 'Yes. Download the client for your platform from the download page and run it.' },
]
</script>

<style scoped>
.plans-page{background:#f4f1e9;color:#11110f;min-height:100vh;padding:34px}.eyebrow{font-size:11px;font-weight:700;letter-spacing:.18em}.plans-hero{display:grid;grid-template-columns:1.25fr .75fr;gap:70px;min-height:58vh;align-items:end;padding:40px 0 64px}.plans-hero h1,.device-band h2,.compare-wrap h2,.faq-wrap h2{font-size:clamp(58px,7.4vw,112px);line-height:.9;letter-spacing:-.068em;font-weight:610;margin:20px 0 0}.hero-copy{font-size:20px;line-height:1.45;max-width:560px;align-self:end}.note{margin-top:24px;color:#5b5953;font-size:14px}.billing-strip{display:flex;justify-content:space-between;align-items:center;border-top:1px solid #aaa59b;border-bottom:1px solid #aaa59b;padding:20px 0}.billing-pill{border:1px solid #8f8a81;border-radius:999px;padding:10px 18px;font-size:14px}.plan-grid{display:grid;grid-template-columns:repeat(4,1fr);border-bottom:1px solid #aaa59b}.plan-card{display:flex;flex-direction:column;min-height:560px;padding:28px;border-right:1px solid #aaa59b}.plan-card:first-child{border-left:1px solid #aaa59b}.plan-card.featured{background:#c8d1b2}.plan-meta{display:flex;justify-content:space-between;font-size:11px;font-weight:700;letter-spacing:.15em}.plan-card h2{font-size:clamp(36px,4vw,62px);letter-spacing:-.06em;line-height:.92;margin:68px 0 10px}.plan-price{font-size:2.4rem;font-weight:800;line-height:1}.plan-note{min-height:56px;color:#5b5953;margin:18px 0 0}.plan-card ul{list-style:none;padding:0;margin:34px 0 0;flex:1;border-top:1px solid #8f8a81}.plan-card li{padding:14px 0;border-bottom:1px solid #aaa59b}.plan-card a{margin-top:28px;align-self:flex-start;background:#11110f;color:#fff;text-decoration:none;border-radius:999px;padding:14px 22px;font-weight:650}.device-band{display:grid;grid-template-columns:1fr 1fr;gap:50px;background:#11110f;color:#f4f1e9;padding:120px 34px;margin:120px -34px 0}.device-band h2{margin-top:28px}.device-copy{align-self:end;font-size:20px;line-height:1.45;max-width:560px}.device-copy p{color:#c1bdb4}.device-copy a{display:inline-block;margin-top:28px;background:#f4f1e9;color:#11110f;border-radius:999px;padding:14px 22px;text-decoration:none;font-weight:650}.compare-wrap,.faq-wrap{padding:120px 0 0}.compare-card{border:1px solid #aaa59b;border-radius:16px;overflow:hidden;background:#faf8f2}.compare-table{width:100%;border-collapse:collapse}.compare-table th,.compare-table td{padding:16px 20px;border-bottom:1px solid #aaa59b;text-align:left;vertical-align:middle}.compare-table thead th{background:#ece8de;font-size:14px;font-weight:700}.feature-col{width:34%}.feature-name{color:#5b5953}.highlighted{background:rgba(200,209,178,.22)}.check{color:#4caf50;font-size:1.2rem}.dash{color:#9e9e9e;font-size:1.1rem}.value{font-weight:600}.faq-wrap{padding-bottom:40px}.faq-list{display:grid;grid-template-columns:1fr;gap:18px;max-width:780px}.faq-list article{border-top:1px solid #aaa59b;padding-top:18px}.faq-list h3{font-size:1rem;font-weight:650;margin:0 0 10px}.faq-list p{margin:0;color:#5b5953;line-height:1.55}
@media(max-width:900px){.plans-page{padding:20px}.plans-hero,.device-band,.plan-grid{grid-template-columns:1fr}.plans-hero{gap:24px;min-height:auto;padding:32px 0 40px}.billing-strip{gap:12px;flex-direction:column;align-items:flex-start}.plan-card,.plan-card:first-child{border-left:0;border-right:0;border-bottom:1px solid #aaa59b;min-height:auto}.device-band{margin:80px -20px 0;padding:80px 20px}.compare-wrap,.faq-wrap{padding-top:80px}.feature-col{width:auto}.compare-table{display:block;overflow:auto}}
</style>
