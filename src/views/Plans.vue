<template>
  <v-container
    fluid
    class="plans-page pa-0"
  >
    <!-- Hero -->
    <div class="glass-hero-global d-flex align-center justify-center text-center">
      <div class="hero-content">
        <h1 class="hero-title mb-4">
          Simple, Transparent Pricing
        </h1>
        <p class="hero-subtitle mb-6">
          Start free. Upgrade when you need longer retention, more devices, or team workspaces.
        </p>
      </div>
    </div>

    <!-- Plan Cards -->
    <v-container
      class="py-14"
      style="max-width: 1100px;"
    >
      <v-row
        justify="center"
        align="stretch"
      >
        <v-col
          v-for="plan in plans"
          :key="plan.id"
          cols="12"
          sm="6"
          lg="3"
          class="mb-6"
        >
          <v-card
            :class="['plan-card h-100 pa-8', { 'plan-featured': plan.featured }]"
            elevation="0"
          >
            <div class="plan-badge mb-2">
              <v-chip v-if="plan.featured" color="white" size="small" variant="elevated" style="color:#3f51b5;font-weight:700;">Most Popular</v-chip>
            </div>
            <h3 class="plan-name mb-1">
              {{ plan.name }}
            </h3>
            <div class="plan-price mb-1">
              {{ plan.price }} <span v-if="plan.price !== '$0'" class="plan-currency">USD</span>
            </div>
            <p class="plan-cadence mb-6">
              {{ plan.cadence }}
            </p>
            <v-divider class="mb-6" :style="plan.featured ? 'border-color:rgba(255,255,255,0.2)' : ''" />
            <v-list
              density="compact"
              :class="['plan-features mb-8', { 'plan-features-light': plan.featured }]"
            >
              <v-list-item
                v-for="f in plan.features"
                :key="f"
                prepend-icon="mdi-check"
                :class="plan.featured ? 'feature-on-light' : 'feature-on'"
              >
                {{ f }}
              </v-list-item>
            </v-list>
            <v-btn
              block
              :variant="plan.featured ? 'flat' : 'outlined'"
              :color="plan.featured ? 'white' : 'primary'"
              :style="plan.featured ? 'color:#3f51b5;font-weight:700;' : ''"
              size="large"
              :href="plan.id === 'free' ? 'https://portal-three-rho.vercel.app/auth' : 'https://portal-three-rho.vercel.app/pricing'"
              target="_blank"
            >
              {{ plan.id === 'free' ? 'Get started' : 'Choose plan' }}
            </v-btn>
          </v-card>
        </v-col>
      </v-row>

      <!-- Comparison table -->
      <v-row
        justify="center"
        class="mt-10"
      >
        <v-col cols="12">
          <h2 class="section-title text-center mb-8">
            Compare Plans
          </h2>
          <v-card
            class="compare-card"
            elevation="0"
          >
            <v-table class="compare-table">
              <thead>
                <tr>
                  <th class="feature-col">
                    Feature
                  </th>
                  <th v-for="plan in plans" :key="plan.id" :class="['text-center', { 'highlighted-col': plan.featured }]">
                    {{ plan.name }}
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="row in compareRows"
                  :key="row.feature"
                >
                  <td class="feature-name">
                    {{ row.feature }}
                  </td>
                  <td v-for="plan in plans" :key="plan.id" :class="['text-center', { 'highlighted-col': plan.featured }]">
                    <span v-html="renderCell(row[plan.id])" />
                  </td>
                </tr>
              </tbody>
            </v-table>
          </v-card>
        </v-col>
      </v-row>
    </v-container>

    <!-- FAQ -->
    <div class="section-light py-14">
      <v-container style="max-width: 780px;">
        <h2 class="section-title text-center mb-8">
          Frequently Asked Questions
        </h2>
        <v-expansion-panels variant="accordion">
          <v-expansion-panel
            v-for="faq in faqs"
            :key="faq.q"
          >
            <v-expansion-panel-title class="faq-q">
              {{ faq.q }}
            </v-expansion-panel-title>
            <v-expansion-panel-text class="faq-a">
              {{ faq.a }}
            </v-expansion-panel-text>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-container>
    </div>
  </v-container>
</template>

<script setup>
const plans = [
  { id: 'free', name: 'Free', price: '$0', cadence: 'forever', features: ['1 device in 1 room', 'Occupancy detection', 'XY location', 'Home Assistant', 'Data download and annotation'] },
  { id: 'home', name: 'Home', price: '$5', cadence: 'per month', featured: true, features: ['Everything in Free', 'Up to 5 devices', 'Multiple smart rooms', 'Portal device management'] },
  { id: 'pro', name: 'Pro', price: '$10', cadence: 'per month', features: ['Everything in Home', 'Up to 10 devices', 'Private AI detection models', 'Federated learning'] },
  { id: 'research', name: 'Research', price: '$20', cadence: 'per month', features: ['Everything in Pro', 'Detailed annotation and export', 'Research workspaces', 'Academy and assistant'] },
]

const compareRows = [
  { feature: 'Devices online', free: '1', home: '5', pro: '10', research: '10' },
  { feature: 'Occupancy and XY location', free: true, home: true, pro: true, research: true },
  { feature: 'Home Assistant', free: true, home: true, pro: true, research: true },
  { feature: 'Multi-room Portal', free: false, home: true, pro: true, research: true },
  { feature: 'Private AI models', free: false, home: false, pro: true, research: true },
  { feature: 'Research workspaces', free: false, home: false, pro: false, research: true },
  { feature: 'Price (USD / month)', free: 'Free', home: '$5', pro: '$10', research: '$20' },
]

function renderCell(val) {
  if (val === true)  return '<span style="color:#4caf50;font-size:1.2rem;">✓</span>'
  if (val === false) return '<span style="color:#9e9e9e;font-size:1.1rem;">—</span>'
  return `<span style="font-weight:600;">${val}</span>`
}

const faqs = [
  { q: 'Can I switch plans anytime?',
    a: 'Yes. Upgrades take effect immediately; downgrades apply at the start of the next billing cycle.' },
  { q: 'What happens to my data if I downgrade?',
    a: 'Your data stays safe. Features above your new tier become read-only. You have 30 days to export anything before restrictions apply.' },
  { q: 'Is pricing in US dollars?',
    a: 'Yes. Stripe calculates applicable taxes during checkout.' },
  { q: 'Does live presence require a camera?',
    a: 'No. The live view is generated locally from radio reflections and reports presence and location without images.' },
  { q: 'Do I need to install anything for the free plan?',
    a: 'Yes — download the client for your platform (Windows, macOS, or Raspberry Pi) from the Download page and run it.' },
]
</script>

<style scoped>
.plans-page { background: var(--bg-primary); }

.plan-card {
  background: var(--bg-card) !important;
  border: 1px solid var(--border-color) !important;
  border-radius: 20px !important;
  transition: transform 0.25s ease, box-shadow 0.25s ease;
}
.plan-card:hover { transform: translateY(-4px); box-shadow: 0 12px 32px rgba(0,0,0,0.08) !important; }
.plan-featured {
  background: linear-gradient(135deg, #3f51b5 0%, #7c4dff 100%) !important;
  border: none !important;
}
.plan-badge { min-height: 28px; display: flex; align-items: center; }
.plan-name { font-size: 1.4rem; font-weight: 700; color: var(--text-primary); }
.plan-featured .plan-name { color: #fff; }
.plan-price { font-size: 2.6rem; font-weight: 800; color: var(--text-primary); line-height: 1; }
.plan-featured .plan-price { color: #fff; }
.plan-currency { font-size: 1.1rem; font-weight: 500; }
.plan-cadence { color: var(--text-muted); font-size: 0.9rem; }
.plan-featured .plan-cadence { color: rgba(255,255,255,0.7); }
.plan-features { background: transparent !important; }
.feature-on { color: var(--text-secondary) !important; font-size: 0.93rem !important; }
.feature-on .v-list-item__prepend .v-icon { color: #4caf50 !important; }
.feature-off { color: var(--text-muted) !important; font-size: 0.93rem !important; opacity: 0.6; }
.feature-off .v-list-item__prepend .v-icon { color: var(--text-muted) !important; }
.plan-features-light { background: transparent !important; }
.feature-on-light { color: rgba(255,255,255,0.9) !important; font-size: 0.93rem !important; }
.feature-on-light .v-list-item__prepend .v-icon { color: #a5d6a7 !important; }
.section-light { background: var(--bg-secondary); }
.section-title { font-size: 2rem; font-weight: 700; letter-spacing: -0.02em; color: var(--text-primary); }
.compare-card { background: var(--bg-card) !important; border: 1px solid var(--border-color) !important; border-radius: 16px !important; overflow: hidden; }
.compare-table { width: 100%; }
.compare-table th, .compare-table td { padding: 14px 20px; border-bottom: 1px solid var(--border-color); }
.compare-table thead th { font-weight: 700; font-size: 0.95rem; color: var(--text-primary); background: var(--bg-secondary); }
.feature-col { width: 34%; font-weight: 600; }
.feature-name { color: var(--text-secondary); font-size: 0.92rem; }
.highlighted-col { background: rgba(63, 81, 181, 0.06); }
.faq-q { font-weight: 600; font-size: 1rem; color: var(--text-primary); }
.faq-a { color: var(--text-muted); font-size: 0.93rem; line-height: 1.55; }
</style>
