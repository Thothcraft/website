<template>
  <v-container fluid class="download-page pa-0">
    <!-- Hero -->
    <div class="dl-hero d-flex align-center justify-center text-center">
      <div class="hero-content">
        <h1 class="hero-title mb-4">Download Thoth</h1>
        <p class="hero-subtitle mb-6">
          Free. Open source. One-click installer for Windows — no setup required.
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
              Download .tar.gz
            </v-btn>
            <p class="platform-req">Requires Python 3.9+ and macOS 12+</p>
          </v-card>
        </v-col>

        <!-- Windows -->
        <v-col cols="12" md="4" class="mb-6">
          <v-card class="platform-card featured-card h-100 pa-6 text-center" elevation="0">
            <v-chip color="primary" variant="tonal" size="x-small" class="mb-3">Recommended</v-chip>
            <v-icon size="56" color="#0078d4" class="mb-4">mdi-microsoft-windows</v-icon>
            <h3 class="platform-name mb-2">Windows</h3>
            <p class="platform-desc mb-4">GUI installer wizard. System tray app — no Python or terminal needed.</p>
            <v-btn
              block
              color="primary"
              size="large"
              :href="downloads.win"
              target="_blank"
              class="mb-3"
            >
              <v-icon start>mdi-download</v-icon>
              Download .exe Installer
            </v-btn>
            <p class="platform-req">Windows 10 or later &nbsp;&middot;&nbsp; 64-bit</p>
            <p class="platform-req mt-1">
              <a :href="downloads.winFallback" target="_blank" class="releases-link">
                Browse all releases
              </a>
            </p>
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
            <p class="platform-req">Requires Python 3.9+ and RPi 4+ (64-bit OS)</p>
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
              <strong>macOS — Install from Source Archive</strong>
            </v-expansion-panel-title>
            <v-expansion-panel-text>
              <ol class="install-steps">
                <li>Extract the downloaded <code>.tar.gz</code> file</li>
                <li>Open Terminal and navigate to the extracted directory: <code>cd thoth_mac</code></li>
                <li>Run the installer: <code>./install.sh</code></li>
                <li>Thoth appears as an icon in your menu bar (𓁟)</li>
                <li>Click the icon → <strong>Open Dashboard</strong> to access the web UI at <code>http://localhost:8000</code></li>
                <li>Thoth will start automatically on every login</li>
              </ol>
              <p class="mt-4 text-caption">Requires Python 3.9+. The installer creates a virtual environment and installs all dependencies.</p>
            </v-expansion-panel-text>
          </v-expansion-panel>

          <v-expansion-panel>
            <v-expansion-panel-title>
              <v-icon class="mr-3">mdi-microsoft-windows</v-icon>
              <strong>Windows — GUI Installer (Recommended)</strong>
            </v-expansion-panel-title>
            <v-expansion-panel-text>
              <v-alert type="success" variant="tonal" class="mb-4" density="compact">
                No Python, no terminal. Just download and double-click.
              </v-alert>
              <ol class="install-steps">
                <li>Download <strong>Thoth-Setup-*.exe</strong> above</li>
                <li>Double-click the installer and follow the wizard (takes ~30 seconds)</li>
                <li>Thoth launches automatically and appears in your system tray near the clock</li>
              </ol>
              <v-divider class="my-4"/>
              <p class="text-subtitle-2 mb-2">After installation:</p>
              <ul class="install-steps">
                <li>Right-click the tray icon → <strong>Open Dashboard</strong> to open <code>http://localhost:8000</code></li>
                <li>Thoth starts automatically every time you log in</li>
                <li>To uninstall: right-click tray icon → <strong>Uninstall Thoth</strong>, or go to <strong>Settings → Apps → Thoth</strong></li>
              </ul>
            </v-expansion-panel-text>
          </v-expansion-panel>

          <v-expansion-panel>
            <v-expansion-panel-title>
              <v-icon class="mr-3">mdi-raspberry-pi</v-icon>
              <strong>Raspberry Pi — Install from Source Archive</strong>
            </v-expansion-panel-title>
            <v-expansion-panel-text>
              <ol class="install-steps">
                <li>Extract the downloaded <code>.tar.gz</code> file</li>
                <li>Navigate to the extracted directory: <code>cd thoth_rpi/setup</code></li>
                <li>Run the installer: <code>sudo ./install.sh</code></li>
                <li>Thoth starts as a systemd service automatically</li>
                <li>Access the dashboard at <code>http://&lt;pi-ip&gt;:8000</code></li>
              </ol>
              <p class="mt-4 text-caption">Requires Python 3.9+ and RPi 4+ (64-bit OS). The installer creates a virtual environment and installs all dependencies.</p>
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
const GITHUB_RELEASES_BASE  = 'https://github.com/Thothcraft/thoth/releases/latest/download'
const GITHUB_RELEASES_PAGE  = 'https://github.com/Thothcraft/thoth/releases/latest'

const downloads = {
  mac: `${GITHUB_RELEASES_BASE}/Thoth-macOS.tar.gz`,
  // Direct link works once the new build workflow has run at least once.
  // Until then, the releases page always shows the available assets.
  win: `${GITHUB_RELEASES_BASE}/Thoth-Setup.exe`,
  winFallback: GITHUB_RELEASES_PAGE,
  rpi: `${GITHUB_RELEASES_BASE}/Thoth-RPi.tar.gz`,
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
.featured-card { border: 2px solid var(--accent, #6c7fd8) !important; box-shadow: 0 0 0 4px color-mix(in srgb, var(--accent, #6c7fd8) 10%, transparent) !important; }
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
.releases-link { color: var(--accent, #6c7fd8); text-decoration: none; font-size: 0.8rem; }
.releases-link:hover { text-decoration: underline; }
</style>
