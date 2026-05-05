<template>
  <v-container fluid class="shop-page pa-0">
    <!-- Hero -->
    <div class="glass-hero-global d-flex align-center justify-center text-center">
      <div class="hero-content">
        <v-chip color="green" variant="tonal" size="small" class="mb-5">
          <v-icon start size="small">mdi-check-circle</v-icon>
          Plug &amp; Play — No Installation Required
        </v-chip>
        <h1 class="hero-title mb-4">Thoth Device Bundles</h1>
        <p class="hero-subtitle mb-6">
          Every device ships pre-flashed and pre-configured. Plug it in, connect to Wi-Fi, and start collecting data.
          No app installation, no terminal, no setup headaches.
        </p>
      </div>
    </div>

    <!-- Product Cards -->
    <v-container class="py-14" style="max-width:1000px;">
      <v-row justify="center" align="stretch">
        
        <!-- Single Device Bundle -->
        <v-col cols="12" md="6" class="mb-6">
          <v-card class="product-card h-100 pa-8" elevation="0">
            <div class="prod-eyebrow mb-2">For individuals &amp; researchers</div>
            <h3 class="prod-name mb-1">1 Thoth Device</h3>
            <div class="prod-price mb-1">$500 <span class="prod-currency">CAD</span></div>
            <p class="prod-sub mb-6">One-time purchase · ships pre-configured</p>

            <v-divider class="mb-6" />

            <p class="prod-section-label mb-3">What's inside</p>
            <v-list density="compact" class="prod-list mb-5">
              <v-list-item v-for="h in single.hardware" :key="h" prepend-icon="mdi-check-circle" class="prod-item">
                {{ h }}
              </v-list-item>
            </v-list>

            <v-divider class="mb-5" />

            <p class="prod-section-label mb-3">Included plan</p>
            <v-chip color="indigo" variant="tonal" class="mb-6">
              <v-icon start size="small">mdi-star</v-icon>
              3 months Researcher ($20 CAD/mo value)
            </v-chip>

            <v-alert type="success" variant="tonal" density="compact" class="mb-6 plug-alert">
              <strong>Plug &amp; Play</strong> — pre-flashed, no app installation needed
            </v-alert>

            <v-btn block color="primary" size="large" href="mailto:hello@thothcraft.com?subject=Order: 1 Thoth Device" class="prod-btn">
              <v-icon start>mdi-cart</v-icon>
              Order Now
            </v-btn>
          </v-card>
        </v-col>

        <!-- 5-Device Bundle -->
        <v-col cols="12" md="6" class="mb-6">
          <v-card class="product-card product-featured h-100 pa-8" elevation="0">
            <div class="prod-eyebrow prod-eyebrow-light mb-2">For labs &amp; organizations</div>
            <div class="d-flex align-center gap-3 mb-1">
              <h3 class="prod-name prod-name-light">5 Thoth Devices</h3>
              <v-chip color="white" size="small" variant="elevated" style="color:#3f51b5;font-weight:700;">Best Value</v-chip>
            </div>
            <div class="prod-price prod-price-light mb-1">$2,500 <span class="prod-currency">CAD</span></div>
            <p class="prod-sub prod-sub-light mb-6">One-time purchase · all devices ship pre-configured</p>

            <v-divider class="mb-6" style="border-color:rgba(255,255,255,0.2)" />

            <p class="prod-section-label prod-section-label-light mb-3">What's inside each device</p>
            <v-list density="compact" class="prod-list mb-5">
              <v-list-item v-for="h in single.hardware" :key="h" prepend-icon="mdi-check-circle" class="prod-item-light">
                {{ h }}
              </v-list-item>
            </v-list>

            <v-divider class="mb-5" style="border-color:rgba(255,255,255,0.2)" />

            <p class="prod-section-label prod-section-label-light mb-3">Included plan</p>
            <v-chip color="white" variant="elevated" style="color:#3f51b5;font-weight:600;" class="mb-6">
              <v-icon start size="small">mdi-domain</v-icon>
              3 months Organization ($500 CAD/mo value)
            </v-chip>

            <v-alert type="success" variant="tonal" density="compact" class="mb-6 plug-alert plug-alert-dark">
              <strong>Plug &amp; Play</strong> — all 5 devices ship pre-flashed, no setup needed
            </v-alert>

            <v-btn block color="white" size="large" style="color:#3f51b5;font-weight:700;" href="mailto:hello@thothcraft.com?subject=Order: 5 Thoth Devices">
              <v-icon start>mdi-cart</v-icon>
              Order Now
            </v-btn>
          </v-card>
        </v-col>

      </v-row>

      <!-- Hardware detail strip -->
      <v-row justify="center" class="mt-10">
        <v-col cols="12">
          <h2 class="section-title text-center mb-8">Inside Every Thoth Device</h2>
          <v-row justify="center">
            <v-col v-for="part in parts" :key="part.name" cols="6" sm="4" md="2" class="text-center mb-6">
              <v-icon :color="part.color" size="44" class="mb-2">{{ part.icon }}</v-icon>
              <p class="part-name">{{ part.name }}</p>
              <p class="part-desc">{{ part.desc }}</p>
            </v-col>
          </v-row>
        </v-col>
      </v-row>

    </v-container>
  </v-container>
</template>

<script setup>
const single = {
  hardware: [
    'Raspberry Pi 4',
    'PiSugar battery module',
    'DreamHat sensor board',
    '2× ESP32 wireless modules',
    'USB camera',
  ],
}

const parts = [
  { icon: 'mdi-raspberry-pi',      color: '#c51a4a', name: 'Raspberry Pi 4',  desc: 'Edge AI compute' },
  { icon: 'mdi-battery-charging',  color: '#f59e0b', name: 'PiSugar',         desc: 'On-board battery' },
  { icon: 'mdi-chip',              color: '#6366f1', name: 'DreamHat',        desc: 'Sensor expansion' },
  { icon: 'mdi-wifi',              color: '#10b981', name: '2× ESP32',        desc: 'Wireless nodes' },
  { icon: 'mdi-camera',            color: '#3b82f6', name: 'USB Camera',      desc: 'Visual sensing' },
]
</script>

<style scoped>
.shop-page { background: var(--bg-primary); }

.product-card {
  background: var(--bg-card) !important;
  border: 1px solid var(--border-color) !important;
  border-radius: 20px !important;
  transition: transform 0.25s ease, box-shadow 0.25s ease;
}
.product-card:hover { transform: translateY(-4px); box-shadow: 0 12px 32px rgba(0,0,0,0.08) !important; }
.product-featured {
  background: linear-gradient(135deg, #3f51b5 0%, #7c4dff 100%) !important;
  border: none !important;
}

.prod-eyebrow { font-size: 0.8rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.07em; color: var(--text-muted); }
.prod-eyebrow-light { color: rgba(255,255,255,0.6); }
.prod-name { font-size: 1.7rem; font-weight: 800; color: var(--text-primary); }
.prod-name-light { color: #fff; }
.prod-price { font-size: 2.4rem; font-weight: 800; color: var(--text-primary); line-height: 1; }
.prod-price-light { color: #fff; }
.prod-currency { font-size: 1rem; font-weight: 500; }
.prod-sub { color: var(--text-muted); font-size: 0.88rem; }
.prod-sub-light { color: rgba(255,255,255,0.65); }
.prod-section-label { font-size: 0.78rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em; color: var(--text-muted); }
.prod-section-label-light { color: rgba(255,255,255,0.55); }
.prod-list { background: transparent !important; }
.prod-item { color: var(--text-secondary) !important; font-size: 0.92rem !important; }
.prod-item .v-list-item__prepend .v-icon { color: #4caf50 !important; }
.prod-item-light { color: rgba(255,255,255,0.9) !important; font-size: 0.92rem !important; }
.prod-item-light .v-list-item__prepend .v-icon { color: #a5d6a7 !important; }
.plug-alert { border-radius: 10px !important; }
.section-title { font-size: 2rem; font-weight: 700; letter-spacing: -0.02em; color: var(--text-primary); }
.part-name { font-weight: 600; font-size: 0.9rem; color: var(--text-primary); }
.part-desc { font-size: 0.78rem; color: var(--text-muted); }
</style>
