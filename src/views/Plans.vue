<template>
  <v-container fluid class="plans-page pa-0">
    <!-- Hero -->
    <div class="glass-hero-global d-flex align-center justify-center text-center">
      <div class="hero-content">
        <h1 class="hero-title mb-4">Simple, Transparent Pricing</h1>
        <p class="hero-subtitle mb-6">
          Start free. Upgrade when you need federated learning, model deployment, or more devices.
        </p>
      </div>
    </div>

    <!-- Plan Cards -->
    <v-container class="py-14" style="max-width: 1100px;">
      <v-row justify="center" align="stretch">

        <!-- Free -->
        <v-col cols="12" md="4" class="mb-6">
          <v-card class="plan-card h-100 pa-8" elevation="0">
            <div class="plan-badge mb-2" style="opacity:0">_</div>
            <h3 class="plan-name mb-1">Free</h3>
            <div class="plan-price mb-1">$0</div>
            <p class="plan-cadence mb-6">forever</p>
            <v-divider class="mb-6" />
            <v-list density="compact" class="plan-features mb-8">
              <v-list-item v-for="f in free.features" :key="f"
                :prepend-icon="f.startsWith('–') ? 'mdi-minus' : 'mdi-check'"
                :class="f.startsWith('–') ? 'feature-off' : 'feature-on'">
                {{ f.replace('– ','') }}
              </v-list-item>
            </v-list>
            <v-btn block variant="outlined" color="primary" size="large" href="https://thothfrontend.vercel.app/" target="_blank">Get Started</v-btn>
          </v-card>
        </v-col>

        <!-- Researcher -->
        <v-col cols="12" md="4" class="mb-6">
          <v-card class="plan-card plan-featured h-100 pa-8" elevation="0">
            <div class="plan-badge mb-2">
              <v-chip color="white" size="small" variant="elevated" style="color:#3f51b5;font-weight:700;">Most Popular</v-chip>
            </div>
            <h3 class="plan-name mb-1">Researcher</h3>
            <div class="plan-price mb-1">$20 <span class="plan-currency">CAD</span></div>
            <p class="plan-cadence mb-6">per month</p>
            <v-divider class="mb-6" style="border-color:rgba(255,255,255,0.2)" />
            <v-list density="compact" class="plan-features plan-features-light mb-8">
              <v-list-item v-for="f in researcher.features" :key="f" prepend-icon="mdi-check" class="feature-on-light">
                {{ f }}
              </v-list-item>
            </v-list>
            <v-btn block color="white" style="color:#3f51b5;font-weight:700;" size="large" href="https://thothfrontend.vercel.app/" target="_blank">Subscribe</v-btn>
          </v-card>
        </v-col>

        <!-- Organization -->
        <v-col cols="12" md="4" class="mb-6">
          <v-card class="plan-card h-100 pa-8" elevation="0">
            <div class="plan-badge mb-2" style="opacity:0">_</div>
            <h3 class="plan-name mb-1">Organization</h3>
            <div class="plan-price mb-1">$500 <span class="plan-currency">CAD</span></div>
            <p class="plan-cadence mb-6">per month</p>
            <v-divider class="mb-6" />
            <v-list density="compact" class="plan-features mb-8">
              <v-list-item v-for="f in organization.features" :key="f" prepend-icon="mdi-check" class="feature-on">
                {{ f }}
              </v-list-item>
            </v-list>
            <v-btn block variant="outlined" color="primary" size="large" href="https://thothfrontend.vercel.app/" target="_blank">Contact Sales</v-btn>
          </v-card>
        </v-col>

      </v-row>

      <!-- Comparison table -->
      <v-row justify="center" class="mt-10">
        <v-col cols="12">
          <h2 class="section-title text-center mb-8">Compare Plans</h2>
          <v-card class="compare-card" elevation="0">
            <v-table class="compare-table">
              <thead>
                <tr>
                  <th class="feature-col">Feature</th>
                  <th class="text-center">Free</th>
                  <th class="text-center highlighted-col">Researcher</th>
                  <th class="text-center">Organization</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="row in compareRows" :key="row.feature">
                  <td class="feature-name">{{ row.feature }}</td>
                  <td class="text-center"><span v-html="renderCell(row.free)" /></td>
                  <td class="text-center highlighted-col"><span v-html="renderCell(row.researcher)" /></td>
                  <td class="text-center"><span v-html="renderCell(row.org)" /></td>
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
        <h2 class="section-title text-center mb-8">Frequently Asked Questions</h2>
        <v-expansion-panels variant="accordion">
          <v-expansion-panel v-for="faq in faqs" :key="faq.q">
            <v-expansion-panel-title class="faq-q">{{ faq.q }}</v-expansion-panel-title>
            <v-expansion-panel-text class="faq-a">{{ faq.a }}</v-expansion-panel-text>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-container>
    </div>

  </v-container>
</template>

<script setup>
const free = {
  features: [
    '1 device online',
    '5 GB storage',
    'Sensor data collection',
    '– Federated learning',
    '– Model deployment',
    '– Differential privacy',
  ],
}

const researcher = {
  features: [
    'Everything in Free',
    '10 devices online',
    '50 GB storage',
    'Federated learning',
    'Model deployment',
    'Differential privacy',
  ],
}

const organization = {
  features: [
    'Everything in Researcher',
    '100 devices online',
    '500 GB storage',
    'Lab / team workspaces',
    'Priority support',
    'Custom onboarding',
  ],
}

const compareRows = [
  { feature: 'Devices online',        free: '1',     researcher: '10',    org: '100'   },
  { feature: 'Storage',               free: '5 GB',  researcher: '50 GB', org: '500 GB' },
  { feature: 'Federated learning',    free: false,   researcher: true,    org: true    },
  { feature: 'Model deployment',      free: false,   researcher: true,    org: true    },
  { feature: 'Differential privacy',  free: false,   researcher: true,    org: true    },
  { feature: 'Lab workspaces',        free: false,   researcher: false,   org: true    },
  { feature: 'Priority support',      free: false,   researcher: false,   org: true    },
  { feature: 'Price (CAD / month)',   free: 'Free',  researcher: '$20',   org: '$500'  },
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
  { q: 'Is pricing in Canadian dollars?',
    a: 'Yes — all prices are in CAD. Taxes may apply depending on your region.' },
  { q: 'What is federated learning?',
    a: 'Federated learning lets multiple devices train a shared model without any raw data leaving the device. Only encrypted gradient updates are exchanged.' },
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
