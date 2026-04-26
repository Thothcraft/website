<template>
  <v-container fluid class="home-page pa-0">
    <!-- Hero Section -->
    <div class="hero-section d-flex align-center justify-center text-center">
      <div class="hero-content">
        <div class="hero-badge mb-6">
          <v-chip color="primary" variant="tonal" size="small">
            <v-icon start size="small">mdi-home-automation</v-icon>
            Works with Home Assistant
          </v-chip>
        </div>
        <h1 class="hero-title mb-5">Turn any device into a<br>smart home sensor.</h1>
        <p class="hero-subtitle mb-8">
          Your laptop. Your phone. Your Raspberry Pi.<br>
          Collect sensor data, train ML models, and automate your home — all privacy-first.
        </p>
        <div class="hero-buttons">
          <v-btn class="apple-btn-primary mr-4 mb-2" size="large" to="/download">
            <v-icon start>mdi-download</v-icon>
            Download Free
          </v-btn>
          <v-btn class="apple-btn-secondary mb-2" size="large" to="/features">
            Learn More
            <v-icon end>mdi-arrow-right</v-icon>
          </v-btn>
        </div>
        <p class="hero-platforms mt-6">
          <v-icon size="small" class="mr-1">mdi-apple</v-icon> macOS
          <span class="mx-2">·</span>
          <v-icon size="small" class="mr-1">mdi-microsoft-windows</v-icon> Windows
          <span class="mx-2">·</span>
          <v-icon size="small" class="mr-1">mdi-raspberry-pi</v-icon> Raspberry Pi
        </p>
      </div>
    </div>

    <!-- How It Works -->
    <v-container class="py-16">
      <v-row justify="center">
        <v-col cols="12" class="text-center mb-12">
          <h2 class="section-title">How It Works</h2>
          <p class="section-text mt-3">Three steps to a smarter home</p>
        </v-col>
      </v-row>
      <v-row justify="center">
        <v-col cols="12" md="4" class="text-center mb-8">
          <div class="step-icon mb-4">
            <v-icon size="48" color="primary">mdi-download-circle-outline</v-icon>
          </div>
          <h3 class="feature-title mb-3">1. Install</h3>
          <p class="feature-text">
            Download the app for your Mac, Windows PC, or Raspberry Pi. One-click install — runs in the background.
          </p>
        </v-col>
        <v-col cols="12" md="4" class="text-center mb-8">
          <div class="step-icon mb-4">
            <v-icon size="48" color="primary">mdi-brain</v-icon>
          </div>
          <h3 class="feature-title mb-3">2. Collect & Train</h3>
          <p class="feature-text">
            Record sensor data — camera, audio, WiFi CSI, motion. Train ML models in the cloud or on-device with federated learning.
          </p>
        </v-col>
        <v-col cols="12" md="4" class="text-center mb-8">
          <div class="step-icon mb-4">
            <v-icon size="48" color="primary">mdi-home-automation</v-icon>
          </div>
          <h3 class="feature-title mb-3">3. Automate</h3>
          <p class="feature-text">
            Deploy models to your devices. Predictions flow into Home Assistant to control lights, HVAC, locks, and more.
          </p>
        </v-col>
      </v-row>
    </v-container>

    <!-- Core Capabilities -->
    <div class="section-light py-16">
      <v-container>
        <v-row justify="center">
          <v-col cols="12" class="text-center mb-12">
            <h2 class="section-title">Core Capabilities</h2>
          </v-col>
          <v-col cols="12" md="3" class="text-center mb-8">
            <div class="animated-icon-wrapper mb-4">
              <img src="@/assets/artificial-intelligence.gif" alt="AI Processing" class="animated-icon">
            </div>
            <h3 class="feature-title mb-3">Edge AI</h3>
            <p class="feature-text">
              Run ML models locally on any device — presence detection, activity recognition, fall detection.
            </p>
          </v-col>
          <v-col cols="12" md="3" class="text-center mb-8">
            <div class="animated-icon-wrapper mb-4">
              <img src="@/assets/iot.gif" alt="IoT Connectivity" class="animated-icon">
            </div>
            <h3 class="feature-title mb-3">WiFi Sensing</h3>
            <p class="feature-text">
              ESP32 CSI for through-wall motion detection — no cameras needed.
            </p>
          </v-col>
          <v-col cols="12" md="3" class="text-center mb-8">
            <div class="animated-icon-wrapper mb-4">
              <img src="@/assets/data-collection.gif" alt="Data Collection" class="animated-icon">
            </div>
            <h3 class="feature-title mb-3">Multi-Sensor</h3>
            <p class="feature-text">
              Camera, microphone, radar, IMU — collect from built-in sensors or attached hardware.
            </p>
          </v-col>
          <v-col cols="12" md="3" class="text-center mb-8">
            <div class="animated-icon-wrapper mb-4">
              <img src="@/assets/privacy.gif" alt="Privacy First" class="animated-icon">
            </div>
            <h3 class="feature-title mb-3">Privacy First</h3>
            <p class="feature-text">
              Federated learning keeps your data local. No cameras required for most scenarios.
            </p>
          </v-col>
        </v-row>
      </v-container>
    </div>

    <!-- Home Assistant Integration -->
    <v-container class="py-16">
      <v-row justify="center" align="center">
        <v-col cols="12" md="6" class="text-center text-md-left">
          <v-chip color="blue-lighten-4" text-color="blue-darken-2" size="small" class="mb-4">
            <v-icon start size="small">mdi-home-assistant</v-icon>
            Native Integration
          </v-chip>
          <h2 class="section-title mb-6">Works with Home Assistant</h2>
          <p class="section-text mb-4">
            Thoth predictions appear as native Home Assistant entities — binary sensors for occupancy, motion, and sleep; numeric sensors for activity and confidence.
          </p>
          <p class="section-text mb-8">
            Create automations like: <em>"When sleeping is detected after 10pm, activate night mode."</em>
          </p>
          <v-btn class="apple-btn-primary" size="large" to="/features">
            See All Scenarios
            <v-icon end>mdi-arrow-right</v-icon>
          </v-btn>
        </v-col>
        <v-col cols="12" md="5" offset-md="1">
          <v-card class="ha-card pa-6" elevation="0">
            <div class="ha-entity mb-3">
              <v-icon color="green" class="mr-3">mdi-motion-sensor</v-icon>
              <div>
                <div class="ha-entity-name">Occupancy</div>
                <div class="ha-entity-state green--text">Detected</div>
              </div>
            </div>
            <div class="ha-entity mb-3">
              <v-icon color="blue" class="mr-3">mdi-walk</v-icon>
              <div>
                <div class="ha-entity-name">Activity</div>
                <div class="ha-entity-state">Walking (94%)</div>
              </div>
            </div>
            <div class="ha-entity mb-3">
              <v-icon color="purple" class="mr-3">mdi-sleep</v-icon>
              <div>
                <div class="ha-entity-name">Sleep State</div>
                <div class="ha-entity-state">Not sleeping</div>
              </div>
            </div>
            <div class="ha-entity">
              <v-icon color="orange" class="mr-3">mdi-dog</v-icon>
              <div>
                <div class="ha-entity-name">Pet Present</div>
                <div class="ha-entity-state orange--text">Dog detected</div>
              </div>
            </div>
          </v-card>
        </v-col>
      </v-row>
    </v-container>

    <!-- CTA Section -->
    <div class="cta-section py-16">
      <v-container>
        <v-row justify="center" class="text-center">
          <v-col cols="12" md="8">
            <h2 class="cta-title mb-4">Ready to make your home intelligent?</h2>
            <p class="cta-subtitle mb-8">
              Free to download. Free tier forever. No credit card required.
            </p>
            <v-btn class="cta-btn mr-4 mb-2" size="x-large" to="/download">
              <v-icon start>mdi-download</v-icon>
              Download for Free
            </v-btn>
            <v-btn class="cta-btn-outline mb-2" size="x-large" to="/shop">
              Buy Thoth Device
              <v-icon end>mdi-arrow-right</v-icon>
            </v-btn>
          </v-col>
        </v-row>
      </v-container>
    </div>

    <!-- Footer -->
    <div class="footer-section py-8">
      <v-container>
        <v-row justify="center" class="text-center">
          <v-col cols="12">
            <p class="footer-text">© 2026 Thothcraft. MIT License.</p>
            <p class="footer-links">
              <a href="https://github.com/Thothcraft/thoth" target="_blank" class="footer-link">
                <v-icon size="small" class="mr-1">mdi-github</v-icon> GitHub
              </a>
              <span class="mx-3">·</span>
              <router-link to="/plans" class="footer-link">Plans</router-link>
              <span class="mx-3">·</span>
              <a href="https://portal-three-rho.vercel.app" target="_blank" class="footer-link">Research Portal</a>
            </p>
          </v-col>
        </v-row>
      </v-container>
    </div>
  </v-container>
</template>

<script setup>
</script>

<style scoped>
/* Hero */
.hero-section {
  background: linear-gradient(180deg, var(--bg-primary) 0%, var(--bg-secondary) 100%);
  padding: 160px 20px 120px;
  min-height: 80vh;
}
.hero-title { font-size: 4.5rem; font-weight: 700; letter-spacing: -0.04em; line-height: 1.05; color: var(--text-primary); }
.hero-subtitle { font-size: 1.4rem; font-weight: 400; line-height: 1.5; color: var(--text-muted); max-width: 620px; margin: 0 auto; }
.hero-platforms { color: var(--text-muted); font-size: 0.95rem; font-weight: 500; }
.hero-buttons { display: flex; flex-wrap: wrap; justify-content: center; gap: 12px; }

/* Buttons */
.apple-btn-primary { background: var(--accent) !important; color: white !important; border-radius: 12px !important; padding: 12px 28px !important; font-weight: 500 !important; text-transform: none !important; transition: all 0.2s ease !important; }
.apple-btn-primary:hover { background: var(--accent-hover) !important; transform: scale(1.02); }
.apple-btn-secondary { background: transparent !important; color: var(--accent) !important; border: 1px solid var(--accent) !important; border-radius: 12px !important; padding: 12px 28px !important; font-weight: 500 !important; text-transform: none !important; }
.apple-btn-secondary:hover { background: color-mix(in srgb, var(--accent) 6%, transparent) !important; transform: scale(1.02); }

/* Sections */
.section-light { background: var(--bg-secondary); }
.section-title { color: var(--text-primary) !important; font-weight: 600 !important; font-size: 2.5rem !important; letter-spacing: -0.02em !important; }
.section-text { color: var(--text-secondary) !important; font-size: 1.125rem !important; line-height: 1.6 !important; max-width: 800px; margin: 0 auto; }
.feature-title { color: var(--text-primary) !important; font-weight: 600 !important; font-size: 1.25rem !important; }
.feature-text { color: var(--text-muted) !important; font-size: 1rem !important; line-height: 1.5 !important; }

/* Step icons */
.step-icon { display: inline-flex; align-items: center; justify-content: center; width: 88px; height: 88px; border-radius: 22px; background: var(--bg-card); box-shadow: 0 4px 16px rgba(0,0,0,0.06); }

/* Animated Icons */
.animated-icon-wrapper { display: inline-flex; align-items: center; justify-content: center; width: 100px; height: 100px; border-radius: 20px; background: var(--bg-card); box-shadow: 0 4px 16px rgba(0,0,0,0.06); transition: all 0.3s ease; }
.animated-icon-wrapper:hover { transform: translateY(-4px); box-shadow: 0 8px 24px rgba(0,0,0,0.1); }
.animated-icon { width: 80px; height: 80px; object-fit: contain; }

/* Home Assistant card */
.ha-card { background: var(--text-primary) !important; border-radius: 18px !important; color: white; }
.ha-entity { display: flex; align-items: center; padding: 12px 0; border-bottom: 1px solid rgba(255,255,255,0.08); }
.ha-entity:last-child { border-bottom: none; }
.ha-entity-name { font-weight: 500; font-size: 0.95rem; color: rgba(255,255,255,0.9); }
.ha-entity-state { font-size: 0.85rem; color: rgba(255,255,255,0.5); margin-top: 2px; }

/* CTA */
.cta-section { background: linear-gradient(135deg, var(--accent) 0%, var(--bg-accent) 100%); }
.cta-title { color: var(--bg-primary) !important; font-size: 2.5rem !important; font-weight: 600 !important; letter-spacing: -0.02em; }
.cta-subtitle { color: rgba(255,255,255,0.8) !important; font-size: 1.2rem !important; }
.cta-btn { background: var(--bg-card) !important; color: var(--accent) !important; border-radius: 14px !important; font-weight: 600 !important; text-transform: none !important; }
.cta-btn:hover { transform: scale(1.03); }
.cta-btn-outline { background: transparent !important; color: white !important; border: 2px solid rgba(255,255,255,0.5) !important; border-radius: 14px !important; font-weight: 500 !important; text-transform: none !important; }
.cta-btn-outline:hover { border-color: white !important; transform: scale(1.03); }

/* Footer */
.footer-section { background: var(--bg-secondary); }
.footer-text { color: var(--text-muted); font-size: 0.9rem; }
.footer-links { margin-top: 8px; }
.footer-link { color: var(--accent); text-decoration: none; font-size: 0.9rem; }
.footer-link:hover { text-decoration: underline; }

/* Responsive */
@media (max-width: 768px) {
  .hero-title { font-size: 2.8rem; }
  .hero-subtitle { font-size: 1.15rem; }
  .section-title { font-size: 2rem !important; }
  .hero-buttons { flex-direction: column; align-items: center; }
  .hero-buttons .v-btn { width: 100%; max-width: 300px; }
}
</style>