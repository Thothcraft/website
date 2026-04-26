<template>
  <v-container fluid class="download-page pa-0">
    <!-- Hero -->
    <div class="dl-hero d-flex align-center justify-center text-center">
      <div class="hero-content">
        <h1 class="hero-title mb-4">Download Thoth</h1>
        <p class="hero-subtitle mb-6">
          Free. Open source. One-click install on any platform.
        </p>
      </div>
    </div>

    <!-- Platform Cards -->
    <v-container class="py-12" style="max-width: 1000px;">
      <v-row justify="center">
        <!-- macOS -->
        <v-col cols="12" md="4" class="mb-6">
          <v-card class="platform-card h-100 pa-6 text-center" elevation="0">
            <v-icon size="56" color="#1d1d1f" class="mb-4">mdi-apple</v-icon>
            <h3 class="platform-name mb-2">macOS</h3>
            <p class="platform-desc mb-4">Menu bar app. Runs on login via LaunchAgent.</p>
            <v-btn
              block
              color="primary"
              size="large"
              :href="downloads.mac"
              target="_blank"
              class="mb-3"
            >
              <v-icon start>mdi-download</v-icon>
              Download .dmg
            </v-btn>
            <p class="platform-req">Requires macOS 12+</p>
          </v-card>
        </v-col>

        <!-- Windows -->
        <v-col cols="12" md="4" class="mb-6">
          <v-card class="platform-card h-100 pa-6 text-center" elevation="0">
            <v-icon size="56" color="#0078d4" class="mb-4">mdi-microsoft-windows</v-icon>
            <h3 class="platform-name mb-2">Windows</h3>
            <p class="platform-desc mb-4">System tray app. Starts on login via Scheduled Task.</p>
            <v-btn
              block
              color="primary"
              size="large"
              :href="downloads.win"
              target="_blank"
              class="mb-3"
            >
              <v-icon start>mdi-download</v-icon>
              Download .zip
            </v-btn>
            <p class="platform-req">Requires Windows 10+</p>
          </v-card>
        </v-col>

        <!-- Raspberry Pi -->
        <v-col cols="12" md="4" class="mb-6">
          <v-card class="platform-card h-100 pa-6 text-center" elevation="0">
            <v-icon size="56" color="#c51a4a" class="mb-4">mdi-raspberry-pi</v-icon>
            <h3 class="platform-name mb-2">Raspberry Pi</h3>
            <p class="platform-desc mb-4">Headless edge device. Flash with Raspberry Pi Imager.</p>
            <v-btn
              block
              color="primary"
              size="large"
              :href="downloads.rpi"
              target="_blank"
              class="mb-3"
            >
              <v-icon start>mdi-download</v-icon>
              Download .tar.gz
            </v-btn>
            <p class="platform-req">Requires RPi 4+ (64-bit OS)</p>
          </v-card>
        </v-col>
      </v-row>

      <!-- GitHub link -->
      <v-row justify="center" class="mt-4">
        <v-col cols="12" class="text-center">
          <v-btn
            variant="text"
            color="primary"
            href="https://github.com/Thothcraft/thoth/releases"
            target="_blank"
          >
            <v-icon start>mdi-github</v-icon>
            View all releases on GitHub
          </v-btn>
        </v-col>
      </v-row>
    </v-container>

    <!-- Install Instructions -->
    <div class="section-light py-12">
      <v-container style="max-width: 900px;">
        <h2 class="section-title text-center mb-8">Installation Guide</h2>

        <v-expansion-panels variant="accordion">
          <v-expansion-panel>
            <v-expansion-panel-title>
              <v-icon class="mr-3">mdi-apple</v-icon>
              <strong>macOS — Install from .dmg</strong>
            </v-expansion-panel-title>
            <v-expansion-panel-text>
              <ol class="install-steps">
                <li>Open the downloaded <code>.dmg</code> file</li>
                <li>Drag <strong>Thoth.app</strong> to your <strong>Applications</strong> folder</li>
                <li>Launch Thoth from Applications — it appears as an icon in your menu bar</li>
                <li>Click the icon → <strong>Open Dashboard</strong> to access the web UI at <code>http://localhost:8000</code></li>
                <li>Thoth will start automatically on every login</li>
              </ol>
              <p class="mt-4 text-caption">Alternative: clone the repo and run <code>./thoth_mac/install.sh</code></p>
            </v-expansion-panel-text>
          </v-expansion-panel>

          <v-expansion-panel>
            <v-expansion-panel-title>
              <v-icon class="mr-3">mdi-microsoft-windows</v-icon>
              <strong>Windows — Install from .zip</strong>
            </v-expansion-panel-title>
            <v-expansion-panel-text>
              <ol class="install-steps">
                <li>Extract the downloaded <code>.zip</code> file</li>
                <li>Run <code>Thoth.exe</code> — it appears as an icon in your system tray</li>
                <li>Right-click the tray icon → <strong>Open Dashboard</strong></li>
                <li>To start on login: right-click → check <em>"Start with Windows"</em></li>
              </ol>
              <p class="mt-4 text-caption">Alternative: clone the repo and run <code>.\thoth_win\install.ps1</code></p>
            </v-expansion-panel-text>
          </v-expansion-panel>

          <v-expansion-panel>
            <v-expansion-panel-title>
              <v-icon class="mr-3">mdi-raspberry-pi</v-icon>
              <strong>Raspberry Pi — Flash &amp; Go</strong>
            </v-expansion-panel-title>
            <v-expansion-panel-text>
              <ol class="install-steps">
                <li>Download the Thoth RPi archive and extract it</li>
                <li>Open <strong>Raspberry Pi Imager</strong> and flash Raspberry Pi OS Lite</li>
                <li>In Imager settings: configure <strong>WiFi</strong> and enable <strong>SSH</strong></li>
                <li>Download <code>thoth_credentials.json</code> from the <a href="https://portal-three-rho.vercel.app" target="_blank">Research Portal</a> (Devices → Add Device)</li>
                <li>Copy it to <code>/boot/firmware/thoth_credentials.json</code> on the SD card</li>
                <li>Insert SD card, power on — Thoth starts automatically and connects to your account</li>
                <li>Access the dashboard at <code>http://&lt;pi-ip&gt;:8000</code></li>
              </ol>
            </v-expansion-panel-text>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-container>
    </div>

    <!-- Home Assistant callout -->
    <v-container class="py-12" style="max-width: 900px;">
      <v-row justify="center">
        <v-col cols="12">
          <v-card class="ha-callout pa-8" elevation="0">
            <v-row align="center">
              <v-col cols="12" md="8">
                <h3 class="ha-callout-title mb-2">
                  <v-icon class="mr-2" color="blue">mdi-home-assistant</v-icon>
                  Works with Home Assistant
                </h3>
                <p class="ha-callout-text">
                  After installing, Thoth's ML predictions appear as native Home Assistant entities.
                  Use them in automations, dashboards, and scripts — no coding required.
                </p>
              </v-col>
              <v-col cols="12" md="4" class="text-center text-md-right">
                <v-btn color="primary" size="large" to="/features">
                  Learn More
                  <v-icon end>mdi-arrow-right</v-icon>
                </v-btn>
              </v-col>
            </v-row>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-container>
</template>

<script setup>
const GITHUB_RELEASES = 'https://github.com/Thothcraft/thoth/releases/latest/download'

const downloads = {
  mac: `${GITHUB_RELEASES}/Thoth-macOS.dmg`,
  win: `${GITHUB_RELEASES}/Thoth-Windows.zip`,
  rpi: `${GITHUB_RELEASES}/Thoth-RPi.tar.gz`,
}
</script>

<style scoped>
.dl-hero {
  background: linear-gradient(180deg, var(--bg-primary) 0%, var(--bg-secondary) 100%);
  padding: 140px 20px 80px;
}
.hero-title { font-size: 3.5rem; font-weight: 700; letter-spacing: -0.03em; color: var(--text-primary); }
.hero-subtitle { font-size: 1.25rem; color: var(--text-muted); max-width: 500px; margin: 0 auto; }
.platform-card { background: var(--bg-card) !important; border: 1px solid var(--border-color) !important; border-radius: 18px !important; transition: all 0.3s ease; }
.platform-card:hover { transform: translateY(-4px); box-shadow: 0 8px 24px rgba(0,0,0,0.08) !important; }
.platform-name { font-size: 1.4rem; font-weight: 600; color: var(--text-primary); }
.platform-desc { color: var(--text-muted); font-size: 0.95rem; line-height: 1.4; }
.platform-req { color: var(--text-muted); font-size: 0.8rem; }
.section-light { background: var(--bg-secondary); }
.section-title { color: var(--text-primary) !important; font-weight: 600 !important; font-size: 2rem !important; letter-spacing: -0.02em; }
.install-steps { padding-left: 20px; }
.install-steps li { margin-bottom: 8px; color: var(--text-secondary); line-height: 1.5; }
.ha-callout { background: linear-gradient(135deg, var(--bg-accent-dim, #d4dcc4) 0%, var(--bg-secondary) 100%) !important; border-radius: 18px !important; }
.ha-callout-title { font-size: 1.3rem; font-weight: 600; color: var(--text-primary); }
.ha-callout-text { color: var(--text-secondary); font-size: 1rem; line-height: 1.5; }
</style>
