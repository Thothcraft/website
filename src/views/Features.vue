<template>
  <v-container fluid class="features-page pa-0">
    <!-- Hero -->
    <div class="feat-hero d-flex align-center justify-center text-center">
      <div class="hero-content">
        <h1 class="hero-title mb-4">Smart Sensing for Smart Homes</h1>
        <p class="hero-subtitle">
          Private 3D presence, motion localization, and native Home Assistant integration.
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
            <div class="sensor-icon-wrapper" :class="sensor.wrapperClass" @mouseenter="sensor.hover = true" @mouseleave="sensor.hover = false">
              <svg class="sensor-svg" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g v-if="sensor.name === 'WiFi CSI'">
                  <circle cx="32" cy="32" r="28" :fill="sensor.bgColor" :opacity="sensor.hover ? 0.3 : 0.1"/>
                  <path d="M32 48C25.3726 48 20 42.6274 20 36C20 29.3726 25.3726 24 32 24C38.6274 24 44 29.3726 44 36C44 42.6274 38.6274 48 32 48Z" :fill="sensor.color" :opacity="sensor.hover ? 1 : 0.7"/>
                  <path d="M32 20C23.1634 20 16 27.1634 16 36C16 44.8366 23.1634 52 32 52C40.8366 52 48 44.8366 48 36C48 27.1634 40.8366 20 32 20Z" :fill="sensor.color" :opacity="sensor.hover ? 0.5 : 0.3"/>
                  <path d="M32 16C21.5059 16 13 24.5059 13 35C13 45.4941 21.5059 54 32 54C42.4941 54 51 45.4941 51 35C51 24.5059 42.4941 16 32 16Z" :fill="sensor.color" :opacity="sensor.hover ? 0.3 : 0.15"/>
                  <circle cx="32" cy="36" r="4" fill="white"/>
                </g>
                <g v-else-if="sensor.name === 'mmWave Radar'">
                  <circle cx="32" cy="32" r="28" :fill="sensor.bgColor" :opacity="sensor.hover ? 0.3 : 0.1"/>
                  <circle cx="32" cy="32" r="16" :fill="sensor.color" :opacity="sensor.hover ? 1 : 0.7"/>
                  <circle cx="32" cy="32" r="12" :fill="sensor.bgColor" :opacity="sensor.hover ? 0.5 : 0.3"/>
                  <circle cx="32" cy="32" r="8" :fill="sensor.color" :opacity="sensor.hover ? 0.8 : 0.5"/>
                  <circle cx="32" cy="32" r="4" fill="white"/>
                  <line x1="32" y1="4" x2="32" y2="12" :stroke="sensor.color" :stroke-width="2" :opacity="sensor.hover ? 1 : 0.5"/>
                  <line x1="32" y1="52" x2="32" y2="60" :stroke="sensor.color" :stroke-width="2" :opacity="sensor.hover ? 1 : 0.5"/>
                  <line x1="4" y1="32" x2="12" y2="32" :stroke="sensor.color" :stroke-width="2" :opacity="sensor.hover ? 1 : 0.5"/>
                  <line x1="52" y1="32" x2="60" y2="32" :stroke="sensor.color" :stroke-width="2" :opacity="sensor.hover ? 1 : 0.5"/>
                </g>
                <g v-else-if="sensor.name === 'Camera'">
                  <circle cx="32" cy="32" r="28" :fill="sensor.bgColor" :opacity="sensor.hover ? 0.3 : 0.1"/>
                  <rect x="14" y="20" width="36" height="24" rx="4" :fill="sensor.color" :opacity="sensor.hover ? 1 : 0.7"/>
                  <circle cx="32" cy="32" r="8" :fill="sensor.bgColor" :opacity="sensor.hover ? 0.8 : 0.5"/>
                  <circle cx="32" cy="32" r="5" :fill="sensor.color" :opacity="sensor.hover ? 1 : 0.7"/>
                  <circle cx="32" cy="32" r="2" fill="white"/>
                  <rect x="28" y="46" width="8" height="6" rx="2" :fill="sensor.color" :opacity="sensor.hover ? 0.8 : 0.5"/>
                  <circle cx="40" cy="24" r="3" :fill="sensor.bgColor" :opacity="sensor.hover ? 0.6 : 0.3"/>
                </g>
                <g v-else-if="sensor.name === 'Microphone'">
                  <circle cx="32" cy="32" r="28" :fill="sensor.bgColor" :opacity="sensor.hover ? 0.3 : 0.1"/>
                  <rect x="26" y="14" width="12" height="20" rx="6" :fill="sensor.color" :opacity="sensor.hover ? 1 : 0.7"/>
                  <rect x="22" y="34" width="20" height="4" rx="2" :fill="sensor.color" :opacity="sensor.hover ? 0.8 : 0.5"/>
                  <line x1="32" y1="38" x2="32" y2="46" :stroke="sensor.color" :stroke-width="2" :opacity="sensor.hover ? 1 : 0.5"/>
                  <line x1="24" y1="46" x2="40" y2="46" :stroke="sensor.color" :stroke-width="2" :opacity="sensor.hover ? 1 : 0.5"/>
                  <path d="M18 32C18 25.3726 23.3726 20 30 20" :stroke="sensor.color" :stroke-width="2" :opacity="sensor.hover ? 0.5 : 0.3" fill="none"/>
                  <path d="M46 32C46 25.3726 40.6274 20 34 20" :stroke="sensor.color" :stroke-width="2" :opacity="sensor.hover ? 0.5 : 0.3" fill="none"/>
                </g>
              </svg>
            </div>
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

    <!-- Live spatial sensing -->
    <v-container class="py-12" style="max-width: 1100px;">
      <v-row justify="center">
        <v-col cols="12" class="text-center mb-10">
          <v-chip color="cyan" variant="tonal" size="small" class="mb-4">
            <v-icon start size="small">mdi-radar</v-icon>
            Live spatial sensing
          </v-chip>
          <h2 class="section-title mb-3">Presence You Can Place in the Room</h2>
          <p class="section-text">
            A live 3D view combines motion energy with persistent stationary presence. It shows target position,
            estimated dimensions, and the sensor field of view without cameras or cloud processing.
          </p>
        </v-col>
      </v-row>
      <v-row justify="center">
        <v-col v-for="point in spatialPoints" :key="point.title" cols="12" sm="6" md="3" class="mb-6">
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
  { 
    name: 'WiFi CSI', 
    desc: 'ESP32 through-wall sensing',
    color: '#3b82f6',
    bgColor: '#3b82f6',
    wrapperClass: 'wifi-wrapper',
    hover: false
  },
  { 
    name: 'mmWave Radar', 
    desc: 'DreamHAT / IWR6843',
    color: '#a855f7',
    bgColor: '#a855f7',
    wrapperClass: 'radar-wrapper',
    hover: false
  },
  { 
    name: 'Camera', 
    desc: 'Built-in or USB cameras',
    color: '#22c55e',
    bgColor: '#22c55e',
    wrapperClass: 'camera-wrapper',
    hover: false
  },
  { 
    name: 'Microphone', 
    desc: 'Audio event detection',
    color: '#f97316',
    bgColor: '#f97316',
    wrapperClass: 'mic-wrapper',
    hover: false
  },
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

const spatialPoints = [
  {
    icon: 'mdi-database-lock',
    color: 'blue',
    title: 'Stationary presence',
    text: 'Confirmed targets persist when standing, sitting, or sleeping still.',
  },
  {
    icon: 'mdi-account-group',
    color: 'purple',
    title: '3D localization',
    text: 'Target boxes are placed in an editable room using range, azimuth, and elevation.',
  },
  {
    icon: 'mdi-toggle-switch',
    color: 'green',
    title: 'Calibrated geometry',
    text: 'Room dimensions and sensor placement are draggable and saved on the device.',
  },
  {
    icon: 'mdi-source-branch',
    color: 'orange',
    title: 'Private by design',
    text: 'Presence is processed locally from radio reflections without a camera.',
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

/* Sensor Icon Wrapper */
.sensor-icon-wrapper {
  width: 80px;
  height: 80px;
  margin: 0 auto 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 20px;
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
}

.sensor-icon-wrapper:hover {
  transform: translateY(-8px) scale(1.05);
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.1);
}

.sensor-svg {
  width: 64px;
  height: 64px;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.sensor-icon-wrapper:hover .sensor-svg {
  transform: scale(1.1);
}

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
