<template>
  <main class="download-page">
    <section class="hero">
      <p class="eyebrow">Multi-Platform Edge & Node Installer</p>
      <h1>Install Thoth<br>with one command.</h1>
      <p class="lede">
        Turns any computer (Windows laptop, macOS workstation, or Linux / Raspberry Pi node) into a programmable sensing node. Thoth discovers local sensors through the Whispy SDK, hosts a local API and dashboard, runs rule &amp; TorchScript processors, and drives actuators—then links to Brain for fleet management.
      </p>

      <!-- Platform Selector Tabs -->
      <div class="platform-tabs" role="tablist">
        <button
          type="button"
          :class="['tab-btn', { active: currentPlatform === 'windows' }]"
          @click="currentPlatform = 'windows'"
        >
          Windows (10 / 11)
        </button>
        <button
          type="button"
          :class="['tab-btn', { active: currentPlatform === 'macos' }]"
          @click="currentPlatform = 'macos'"
        >
          macOS
        </button>
        <button
          type="button"
          :class="['tab-btn', { active: currentPlatform === 'linux' }]"
          @click="currentPlatform = 'linux'"
        >
          Linux / Raspberry Pi
        </button>
      </div>

      <div class="installer-action">
        <a class="download-button" :href="activeConfig.downloadUrl" :download="activeConfig.filename">
          Download {{ activeConfig.filename }}
        </a>
        <pre class="one-liner"><code>{{ activeConfig.oneLiner }}</code></pre>
      </div>
    </section>

      <!-- Step by Step Instructions -->
    <section class="instructions">
      <div>
        <span>01</span>
        <h2>Run Installer</h2>
        <pre><code>{{ activeConfig.step1 }}</code></pre>
      </div>
      <div>
        <span>02</span>
        <h2>Service & SSH</h2>
        <pre><code>{{ activeConfig.step2 }}</code></pre>
      </div>
      <div>
        <span>03</span>
        <h2>Local Dashboard</h2>
        <pre><code>http://thoth-&lt;name&gt;.local:5000</code></pre>
      </div>
    </section>

    <!-- Supported Terminals Info -->
    <section class="terminals-section">
      <div class="terminal-card">
        <span class="terminal-badge">Supported Terminals ({{ activeConfig.name }})</span>
        <p>{{ activeConfig.supportedTerminals }}</p>
        <span class="terminal-sub">The installer automatically configures your environment <code>PATH</code>, so <code>thoth</code> is immediately available across all listed shells.</span>
      </div>
    </section>

    <!-- Dashboard Access Guide -->
    <section class="dashboard-guide">
      <div class="guide-card">
        <h3>How to Access the Dashboard of this Machine</h3>
        <div class="guide-grid">
          <div class="guide-col">
            <h4>1. Local Machine Dashboard (Offline & Edge)</h4>
            <p>
              Once installed, the background daemon (<code>thoth daemon</code>) serves an interactive dashboard following the Thoth design system on your local network:
            </p>
            <div class="url-box">
              <a href="http://localhost:5000" target="_blank" rel="noopener">http://thoth-&lt;name&gt;.local:5000</a>
              <span>or <code>http://localhost:5000</code></span>
            </div>
            <ul>
              <li><strong>Host Naming:</strong> Follows the canonical <code>thoth-&lt;name&gt;.local</code> format (e.g. <code>thoth-denver.local</code>, <code>thoth-alex.local</code>, or <code>thoth.local</code>).</li>
              <li><strong>Connected Sensors:</strong> Live webcam feed, Wi-Fi, Bluetooth, CPU & RAM telemetry in the Sensor Lab stage.</li>
              <li><strong>Model Execution:</strong> Runs edge rules and OpenCV face recognition locally with low latency.</li>
              <li><strong>OpenSSH Access:</strong> Automatically configured on port 22 (<code>ssh &lt;user&gt;@thoth-&lt;name&gt;.local</code>).</li>
            </ul>
          </div>
          <div class="guide-col">
            <h4>2. Cloud thothHUB (Central Fleet View)</h4>
            <p>
              To link your computer to thothHUB for dataset storage, model deployments, and multi-node synchronization:
            </p>
            <pre class="cli-box"><code>thoth pair</code></pre>
            <p class="subnote">
              View all paired devices, start/stop sensor captures, and deploy processors at:
              <br>
              <strong>thothHUB &rarr; Devices:</strong> <code>https://hub.thothcraft.com</code>
            </p>
          </div>
        </div>
      </div>
    </section>

    <p class="note">
      Requires Python 3.10+. The installer can be rerun safely to update existing installations. All user data, local configs, and credentials are preserved during updates.
    </p>
  </main>
</template>

<script setup>
import { computed, ref } from 'vue'

const currentPlatform = ref('windows')

const platforms = {
  windows: {
    name: 'Windows',
    filename: 'install.ps1',
    downloadUrl: '/install.ps1',
    oneLiner: 'irm https://get.thothcraft.com/install.ps1 | iex',
    step1: 'irm https://get.thothcraft.com/install.ps1 | iex',
    step2: '# Starts thoth daemon at logon\n# Enables OpenSSH Server (sshd)\n# Configures PATH for PowerShell & Git Bash',
    supportedTerminals: 'Windows PowerShell 5.1, PowerShell 7+, Windows Terminal, Git Bash (bash.exe), Command Prompt (cmd.exe)'
  },
  macos: {
    name: 'macOS',
    filename: 'install.sh',
    downloadUrl: '/install.sh',
    oneLiner: 'curl -fsSL https://get.thothcraft.com/install.sh | bash',
    step1: 'curl -fsSL https://get.thothcraft.com/install.sh | bash',
    step2: '# Loads LaunchAgent background daemon\n# Requests Remote Login (SSH)',
    supportedTerminals: 'Terminal (zsh, bash), iTerm2'
  },
  linux: {
    name: 'Linux / Raspberry Pi',
    filename: 'install.sh',
    downloadUrl: '/install.sh',
    oneLiner: 'curl -fsSL https://get.thothcraft.com/install.sh | sudo bash',
    step1: 'curl -fsSL https://get.thothcraft.com/install.sh | sudo bash',
    step2: '# Enables thoth systemd service\n# Starts openssh-server',
    supportedTerminals: 'bash, zsh, dash'
  }
}

const activeConfig = computed(() => platforms[currentPlatform.value] || platforms.windows)
</script>

<style scoped>
.download-page {
  min-height: 100vh;
  padding: 150px 34px 80px;
  background: #f4f1e9;
  color: #11110f;
}

.hero {
  max-width: 900px;
  margin: 0 auto;
}

.eyebrow {
  font: 700 12px ui-monospace, monospace;
  letter-spacing: .18em;
  text-transform: uppercase;
  color: #6d6961;
}

.hero h1 {
  margin: 20px 0 0;
  font-size: clamp(48px, 8vw, 100px);
  font-weight: 600;
  line-height: .92;
  letter-spacing: -.06em;
}

.lede {
  max-width: 720px;
  margin: 28px 0 0;
  font-size: 18px;
  line-height: 1.6;
  color: #5e5a53;
}

.platform-tabs {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 34px;
}

.tab-btn {
  padding: 10px 20px;
  border-radius: 999px;
  border: 1px solid #c9c4b9;
  background: transparent;
  color: #11110f;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all .15s ease;
}

.tab-btn:hover {
  background: #e8e4db;
}

.tab-btn.active {
  background: #11110f;
  color: #ffffff;
  border-color: #11110f;
}

.installer-action {
  margin-top: 24px;
}

.download-button {
  display: inline-flex;
  padding: 14px 24px;
  border-radius: 999px;
  background: #11110f;
  color: #fff;
  text-decoration: none;
  font-weight: 700;
  font-size: 14px;
  transition: opacity .15s ease;
}

.download-button:hover {
  opacity: .9;
}

.one-liner {
  max-width: 760px;
  margin-top: 18px;
  padding: 16px 20px;
  background: #11110f;
  color: #f4f1e9;
  border-radius: 12px;
  font-size: 13px;
  overflow: auto;
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
}

.instructions {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  max-width: 1100px;
  margin: 70px auto 0;
  border-top: 1px solid #c9c4b9;
}

.instructions > div {
  min-width: 0;
  padding: 26px 24px 30px;
  border-right: 1px solid #c9c4b9;
}

.instructions > div:first-child {
  border-left: 1px solid #c9c4b9;
}

.instructions span {
  font: 700 11px ui-monospace, monospace;
  color: #77736b;
}

.instructions h2 {
  margin: 16px 0;
  font-size: 22px;
}

.instructions pre {
  overflow: auto;
  padding: 14px;
  background: #11110f;
  color: #f4f1e9;
  border-radius: 10px;
  font-size: 12px;
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
}

.terminals-section {
  max-width: 1100px;
  margin: 24px auto 0;
}

.terminal-card {
  background: #faf8f2;
  border: 1px solid #c9c4b9;
  border-radius: 12px;
  padding: 18px 24px;
}

.terminal-badge {
  display: inline-block;
  font: 700 11px ui-monospace, monospace;
  letter-spacing: .14em;
  text-transform: uppercase;
  color: #6d6961;
  margin-bottom: 8px;
}

.terminal-card p {
  margin: 0 0 6px;
  font-weight: 600;
  font-size: 15px;
  color: #11110f;
}

.terminal-sub {
  font-size: 13px;
  color: #6d6961;
}

.dashboard-guide {
  max-width: 1100px;
  margin: 50px auto 0;
}

.guide-card {
  background: #ffffff;
  border: 1px solid #c9c4b9;
  border-radius: 16px;
  padding: 32px 36px;
}

.guide-card h3 {
  margin: 0 0 20px;
  font-size: 24px;
  font-weight: 600;
  letter-spacing: -.03em;
}

.guide-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 30px;
}

.guide-col h4 {
  margin: 0 0 10px;
  font-size: 16px;
  font-weight: 600;
  color: #0f172a;
}

.guide-col p {
  margin: 0 0 12px;
  font-size: 14px;
  line-height: 1.55;
  color: #475569;
}

.url-box {
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  padding: 12px 16px;
  margin-bottom: 14px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 8px;
}

.url-box a {
  font-weight: 700;
  color: #0284c7;
  text-decoration: none;
  font-size: 15px;
}

.url-box a:hover {
  text-decoration: underline;
}

.url-box span {
  font-size: 13px;
  color: #64748b;
}

.guide-col ul {
  margin: 0;
  padding-left: 18px;
  font-size: 13px;
  color: #334155;
  line-height: 1.6;
}

.cli-box {
  background: #0f172a;
  color: #f8fafc;
  padding: 12px 16px;
  border-radius: 8px;
  font-size: 13px;
  margin-bottom: 12px;
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
}

.subnote {
  font-size: 13px;
  color: #64748b;
  line-height: 1.5;
}

.note {
  max-width: 860px;
  margin: 36px auto 0;
  color: #6d6961;
  font-size: 14px;
  line-height: 1.6;
  text-align: center;
}

@media (max-width: 760px) {
  .download-page {
    padding: 112px 20px 60px;
  }
  .instructions {
    grid-template-columns: 1fr;
    margin-top: 48px;
  }
  .instructions > div,
  .instructions > div:first-child {
    border: 0;
    border-bottom: 1px solid #c9c4b9;
    padding-inline: 0;
  }
  .guide-card {
    padding: 20px;
  }
}
</style>

