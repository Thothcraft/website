<template>
  <v-container fluid class="features-page pa-0">
    <!-- Hero -->
    <div class="feat-hero d-flex align-center justify-center text-center">
      <div class="hero-content">
        <h1 class="hero-title mb-4">Smart Sensing for Smart Homes</h1>
        <p class="hero-subtitle">
          Non-invasive activity recognition. Privacy-first ML. Native Home Assistant integration.
        </p>
      </div>
    </div>

    <!-- Scenario Detection -->
    <v-container class="py-12" style="max-width: 1100px;">
      <h2 class="section-title text-center mb-10">What Thoth Detects</h2>
      <v-row>
        <v-col v-for="s in scenarios" :key="s.label" cols="12" sm="6" md="4" class="mb-6">
          <v-card class="scenario-card h-100 pa-5" elevation="0">
            <v-icon :color="s.color" size="36" class="mb-3">{{ s.icon }}</v-icon>
            <h4 class="scenario-label mb-1">{{ s.label }}</h4>
            <p class="scenario-desc">{{ s.desc }}</p>
          </v-card>
        </v-col>
      </v-row>
    </v-container>

    <!-- Sensors -->
    <div class="section-light py-12">
      <v-container style="max-width: 1100px;">
        <h2 class="section-title text-center mb-10">Multi-Modal Sensors</h2>
        <v-row>
          <v-col v-for="sensor in sensors" :key="sensor.name" cols="12" sm="6" md="3" class="text-center mb-6">
            <v-icon :color="sensor.color" size="44" class="mb-3">{{ sensor.icon }}</v-icon>
            <h4 class="sensor-name mb-1">{{ sensor.name }}</h4>
            <p class="sensor-desc">{{ sensor.desc }}</p>
          </v-col>
        </v-row>
      </v-container>
    </div>

    <!-- Home Assistant -->
    <v-container class="py-12" style="max-width: 1000px;">
      <v-row align="center">
        <v-col cols="12" md="6">
          <v-chip color="blue-lighten-4" text-color="blue-darken-2" size="small" class="mb-4">
            <v-icon start size="small">mdi-home-assistant</v-icon>
            Native Integration
          </v-chip>
          <h2 class="section-title mb-4">Home Assistant Entities</h2>
          <p class="section-text mb-6">
            Thoth exposes predictions as real HA entities. Build automations without writing code.
          </p>
          <v-table density="compact" class="ha-table">
            <thead><tr><th>Entity</th><th>Type</th></tr></thead>
            <tbody>
              <tr v-for="e in haEntities" :key="e.id">
                <td><code>{{ e.id }}</code></td>
                <td>{{ e.type }}</td>
              </tr>
            </tbody>
          </v-table>
        </v-col>
        <v-col cols="12" md="6">
          <v-card class="yaml-card pa-5" elevation="0">
            <p class="yaml-label mb-2">Example Automation</p>
            <pre class="yaml-code">{{ yamlExample }}</pre>
          </v-card>
        </v-col>
      </v-row>
    </v-container>

    <!-- Federated Learning deep-dive -->
    <v-container class="py-12" style="max-width: 1100px;">
      <v-row justify="center">
        <v-col cols="12" class="text-center mb-10">
          <v-chip color="green" variant="tonal" size="small" class="mb-4">
            <v-icon start size="small">mdi-shield-lock</v-icon>
            Privacy-Preserving AI
          </v-chip>
          <h2 class="section-title mb-3">Federated Learning — Private by Design</h2>
          <p class="section-text">
            Multiple devices collaborate to build better models <strong>without sharing any raw data</strong>.
            Every training round happens locally; only anonymised model gradients travel over the network.
          </p>
        </v-col>
      </v-row>

      <!-- How FL works diagram-style row -->
      <v-row align="center" justify="center" class="mb-10">
        <v-col cols="12" md="5">
          <v-card class="fl-explainer-card pa-6" elevation="0">
            <h3 class="fl-explainer-title mb-4">
              <v-icon color="blue" class="mr-2">mdi-devices</v-icon>
              On your device
            </h3>
            <v-list density="compact" class="fl-list">
              <v-list-item prepend-icon="mdi-database-lock" class="fl-list-item">
                Raw sensor data (video, audio, CSI) stays on device storage — never uploaded
              </v-list-item>
              <v-list-item prepend-icon="mdi-brain" class="fl-list-item">
                Local model trains on your personal data using your CPU/GPU
              </v-list-item>
              <v-list-item prepend-icon="mdi-upload-lock" class="fl-list-item">
                Only encrypted gradient updates (weight deltas) are sent — not data
              </v-list-item>
            </v-list>
          </v-card>
        </v-col>

        <v-col cols="12" md="2" class="text-center">
          <v-icon size="48" color="primary" class="fl-arrow-icon">mdi-arrow-left-right</v-icon>
          <p class="fl-arrow-label">Model updates only</p>
        </v-col>

        <v-col cols="12" md="5">
          <v-card class="fl-explainer-card pa-6" elevation="0">
            <h3 class="fl-explainer-title mb-4">
              <v-icon color="purple" class="mr-2">mdi-cloud-outline</v-icon>
              Research Portal (server)
            </h3>
            <v-list density="compact" class="fl-list">
              <v-list-item prepend-icon="mdi-merge" class="fl-list-item">
                Aggregates gradient updates from all opted-in devices using FedAvg
              </v-list-item>
              <v-list-item prepend-icon="mdi-arrow-down-circle" class="fl-list-item">
                Distributes improved global model back to all devices
              </v-list-item>
              <v-list-item prepend-icon="mdi-eye-off" class="fl-list-item">
                Never sees raw sensor data from any device
              </v-list-item>
            </v-list>
          </v-card>
        </v-col>
      </v-row>

      <!-- Privacy vs accuracy tradeoff cards -->
      <v-row justify="center">
        <v-col v-for="point in flPoints" :key="point.title" cols="12" sm="6" md="3" class="mb-6">
          <v-card class="fl-point-card pa-5 h-100 text-center" elevation="0">
            <v-icon :color="point.color" size="40" class="mb-3">{{ point.icon }}</v-icon>
            <h4 class="fl-point-title mb-2">{{ point.title }}</h4>
            <p class="fl-point-text">{{ point.text }}</p>
          </v-card>
        </v-col>
      </v-row>
    </v-container>

    <!-- Platform support -->
    <div class="section-light py-12">
      <v-container style="max-width: 900px;">
        <h2 class="section-title text-center mb-10">Runs Everywhere</h2>
        <v-row justify="center">
          <v-col cols="12" md="4" class="text-center mb-6" v-for="p in platforms" :key="p.name">
            <v-icon :color="p.color" size="48" class="mb-3">{{ p.icon }}</v-icon>
            <h4 class="platform-name">{{ p.name }}</h4>
            <p class="platform-desc">{{ p.desc }}</p>
          </v-col>
        </v-row>
        <div class="text-center mt-4">
          <v-btn color="primary" size="large" to="/download">Download Now</v-btn>
        </div>
      </v-container>
    </div>
  </v-container>
</template>

<script setup>
const scenarios = [
  { icon: 'mdi-account-check', color: 'green', label: 'Presence', desc: 'Know when rooms are occupied — humans vs pets.' },
  { icon: 'mdi-walk', color: 'blue', label: 'Activity', desc: 'Walking, sitting, standing, exercising.' },
  { icon: 'mdi-sleep', color: 'purple', label: 'Sleep', desc: 'Contactless sleep detection and quality tracking.' },
  { icon: 'mdi-alert-circle', color: 'red', label: 'Fall Detection', desc: 'Immediate alerts for elderly care.' },
  { icon: 'mdi-dog', color: 'orange', label: 'Pet Aware', desc: 'Distinguish pets from humans for smarter automation.' },
  { icon: 'mdi-counter', color: 'teal', label: 'Occupancy Count', desc: 'Count people in a room for HVAC optimization.' },
]

const sensors = [
  { icon: 'mdi-wifi', color: 'blue', name: 'WiFi CSI', desc: 'ESP32 through-wall sensing' },
  { icon: 'mdi-radar', color: 'purple', name: 'mmWave Radar', desc: 'DreamHAT / IWR6843' },
  { icon: 'mdi-camera', color: 'green', name: 'Camera', desc: 'Built-in or USB cameras' },
  { icon: 'mdi-microphone', color: 'orange', name: 'Microphone', desc: 'Audio event detection' },
]

const haEntities = [
  { id: 'binary_sensor.thoth_occupancy', type: 'Binary Sensor' },
  { id: 'binary_sensor.thoth_motion', type: 'Binary Sensor' },
  { id: 'binary_sensor.thoth_sleeping', type: 'Binary Sensor' },
  { id: 'sensor.thoth_activity', type: 'Sensor' },
  { id: 'sensor.thoth_confidence', type: 'Sensor (0-100%)' },
  { id: 'sensor.thoth_occupancy_count', type: 'Sensor' },
]

const platforms = [
  { icon: 'mdi-apple', color: '#1d1d1f', name: 'macOS', desc: 'Menu bar app with LaunchAgent' },
  { icon: 'mdi-microsoft-windows', color: '#0078d4', name: 'Windows', desc: 'One-click GUI installer, system tray app' },
  { icon: 'mdi-raspberry-pi', color: '#c51a4a', name: 'Raspberry Pi', desc: 'Headless edge device' },
]

const flPoints = [
  {
    icon: 'mdi-database-lock',
    color: 'blue',
    title: 'Zero data exposure',
    text: 'Raw sensor recordings never leave the device they were collected on.',
  },
  {
    icon: 'mdi-account-group',
    color: 'purple',
    title: 'Collective intelligence',
    text: 'Every participating device improves the shared model without contributing private data.',
  },
  {
    icon: 'mdi-toggle-switch',
    color: 'green',
    title: 'Fully opt-in',
    text: 'Federated training rounds are optional — you choose when and whether to participate.',
  },
  {
    icon: 'mdi-source-branch',
    color: 'orange',
    title: 'Open source',
    text: 'The aggregation logic is public. Inspect, fork, and audit the entire pipeline yourself.',
  },
]

const yamlExample = `# Night mode when sleeping detected
automation:
  - alias: "Sleep Mode"
    trigger:
      - platform: state
        entity_id: binary_sensor.thoth_sleeping
        to: "on"
    condition:
      - condition: time
        after: "21:00"
    action:
      - service: scene.turn_on
        target:
          entity_id: scene.night_mode`
</script>

<style scoped>
.feat-hero { background: linear-gradient(180deg, var(--bg-primary) 0%, var(--bg-secondary) 100%); padding: 140px 20px 80px; }
.hero-title { font-size: 3.5rem; font-weight: 700; letter-spacing: -0.03em; color: var(--text-primary); }
.hero-subtitle { font-size: 1.25rem; color: var(--text-muted); max-width: 600px; margin: 0 auto; }
.section-light { background: var(--bg-secondary); }
.section-title { color: var(--text-primary); font-weight: 600; font-size: 2rem; letter-spacing: -0.02em; }
.section-text { color: var(--text-secondary); font-size: 1.05rem; line-height: 1.6; }
.scenario-card { background: var(--bg-card) !important; border: 1px solid var(--border-color) !important; border-radius: 16px !important; transition: all 0.3s ease; }
.scenario-card:hover { transform: translateY(-3px); box-shadow: 0 6px 20px rgba(0,0,0,0.07) !important; }
.scenario-label { font-weight: 600; font-size: 1.1rem; color: var(--text-primary); }
.scenario-desc { color: var(--text-muted); font-size: 0.9rem; line-height: 1.4; }
.sensor-name { font-weight: 600; color: var(--text-primary); }
.sensor-desc { color: var(--text-muted); font-size: 0.9rem; }
.platform-name { font-weight: 600; color: var(--text-primary); font-size: 1.1rem; }
.platform-desc { color: var(--text-muted); font-size: 0.9rem; }
.ha-table { border-radius: 12px; overflow: hidden; }
.yaml-card { background: var(--text-primary) !important; border-radius: 14px !important; }
.yaml-label { color: rgba(255,255,255,0.5); font-size: 0.8rem; font-weight: 500; }
.yaml-code { color: #a8d8a8; font-size: 0.82rem; line-height: 1.5; white-space: pre; overflow-x: auto; font-family: 'SF Mono', monospace; }
.fl-explainer-card { background: var(--bg-card) !important; border: 1px solid var(--border-color) !important; border-radius: 16px !important; height: 100%; }
.fl-explainer-title { font-weight: 600; font-size: 1.05rem; color: var(--text-primary); display: flex; align-items: center; }
.fl-list { background: transparent !important; }
.fl-list-item { color: var(--text-muted) !important; font-size: 0.9rem !important; padding-left: 0 !important; align-items: flex-start !important; }
.fl-arrow-icon { display: block; margin: 0 auto 8px; }
.fl-arrow-label { color: var(--text-muted); font-size: 0.8rem; font-weight: 500; }
.fl-point-card { background: var(--bg-card) !important; border: 1px solid var(--border-color) !important; border-radius: 16px !important; transition: all 0.3s ease; }
.fl-point-card:hover { transform: translateY(-3px); box-shadow: 0 6px 20px rgba(0,0,0,0.07) !important; }
.fl-point-title { font-weight: 600; font-size: 1rem; color: var(--text-primary); }
.fl-point-text { color: var(--text-muted); font-size: 0.88rem; line-height: 1.45; }
.section-text { color: var(--text-secondary); font-size: 1.05rem; line-height: 1.6; max-width: 780px; margin: 0 auto; }
@media (max-width: 768px) {
  .hero-title { font-size: 2.5rem; }
  .fl-arrow-icon { transform: rotate(90deg); }
}
</style>
