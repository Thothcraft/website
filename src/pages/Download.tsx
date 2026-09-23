import { useState } from 'react'
import './download.css'

type PlatformId = 'windows' | 'macos' | 'linux'

interface PlatformConfig {
  name: string
  filename: string
  downloadUrl: string
  oneLiner: string
  step1: string
  step2: string
  supportedTerminals: string
}

const PLATFORMS: Record<PlatformId, PlatformConfig> = {
  windows: {
    name: 'Windows',
    filename: 'install.ps1',
    downloadUrl: '/install.ps1',
    oneLiner: 'irm https://get.thothcraft.com/install.ps1 | iex',
    step1: 'irm https://get.thothcraft.com/install.ps1 | iex',
    step2: '# Starts thoth daemon at logon\n# Enables OpenSSH Server (sshd)\n# Configures PATH for PowerShell & Git Bash',
    supportedTerminals: 'Windows PowerShell 5.1, PowerShell 7+, Windows Terminal, Git Bash (bash.exe), Command Prompt (cmd.exe)',
  },
  macos: {
    name: 'macOS',
    filename: 'install.sh',
    downloadUrl: '/install.sh',
    oneLiner: 'curl -fsSL https://get.thothcraft.com/install.sh | bash',
    step1: 'curl -fsSL https://get.thothcraft.com/install.sh | bash',
    step2: '# Loads LaunchAgent background daemon\n# Requests Remote Login (SSH)',
    supportedTerminals: 'Terminal (zsh, bash), iTerm2',
  },
  linux: {
    name: 'Linux / Raspberry Pi',
    filename: 'install.sh',
    downloadUrl: '/install.sh',
    oneLiner: 'curl -fsSL https://get.thothcraft.com/install.sh | sudo bash',
    step1: 'curl -fsSL https://get.thothcraft.com/install.sh | sudo bash',
    step2: '# Enables thoth systemd service\n# Starts openssh-server',
    supportedTerminals: 'bash, zsh, dash',
  },
}

const PLATFORM_IDS: PlatformId[] = ['windows', 'macos', 'linux']
const PLATFORM_LABELS: Record<PlatformId, string> = {
  windows: 'Windows (10 / 11)',
  macos: 'macOS',
  linux: 'Linux / Raspberry Pi',
}

export default function Download() {
  const [platform, setPlatform] = useState<PlatformId>('windows')
  const cfg = PLATFORMS[platform]

  return (
    <main className="download-page">
      <section className="hero">
        <p className="eyebrow">Multi-Platform Edge &amp; Node Installer</p>
        <h1>Install Thoth<br />with one command.</h1>
        <p className="lede">
          Turns any computer (Windows laptop, macOS workstation, or Linux / Raspberry Pi
          node) into a programmable sensing node. Thoth discovers local sensors through
          the Whispy SDK, hosts a local API and dashboard, runs rule &amp; TorchScript
          processors, and drives actuators—then links to Brain for fleet management.
        </p>

        <div className="platform-tabs" role="tablist" aria-label="Platform">
          {PLATFORM_IDS.map((id) => (
            <button
              key={id}
              type="button"
              role="tab"
              aria-selected={platform === id}
              className={`tab-btn ${platform === id ? 'active' : ''}`}
              onClick={() => setPlatform(id)}
            >
              {PLATFORM_LABELS[id]}
            </button>
          ))}
        </div>

        <div className="installer-action">
          <a className="download-button" href={cfg.downloadUrl} download={cfg.filename}>
            Download {cfg.filename}
          </a>
          <pre className="one-liner"><code>{cfg.oneLiner}</code></pre>
        </div>
      </section>

      <section className="instructions">
        <div>
          <span>01</span>
          <h2>Run Installer</h2>
          <pre><code>{cfg.step1}</code></pre>
        </div>
        <div>
          <span>02</span>
          <h2>Service &amp; SSH</h2>
          <pre><code>{cfg.step2}</code></pre>
        </div>
        <div>
          <span>03</span>
          <h2>Local Dashboard</h2>
          <pre><code>http://thoth-&lt;name&gt;.local:5000</code></pre>
        </div>
      </section>

      <section className="terminals-section">
        <div className="terminal-card">
          <span className="terminal-badge">Supported Terminals ({cfg.name})</span>
          <p>{cfg.supportedTerminals}</p>
          <span className="terminal-sub">
            The installer automatically configures your environment <code>PATH</code>, so{' '}
            <code>thoth</code> is immediately available across all listed shells.
          </span>
        </div>
      </section>

      <section className="dashboard-guide">
        <div className="guide-card">
          <h3>How to Access the Dashboard of this Machine</h3>
          <div className="guide-grid">
            <div className="guide-col">
              <h4>1. Local Machine Dashboard (Offline &amp; Edge)</h4>
              <p>
                Once installed, the background daemon (<code>thoth daemon</code>) serves an
                interactive dashboard following the Thoth design system on your local network:
              </p>
              <div className="url-box">
                <a href="http://localhost:5000" target="_blank" rel="noopener">
                  http://thoth-&lt;name&gt;.local:5000
                </a>
                <span>or <code>http://localhost:5000</code></span>
              </div>
              <ul>
                <li>
                  <strong>Host Naming:</strong> Follows the canonical{' '}
                  <code>thoth-&lt;name&gt;.local</code> format (e.g.{' '}
                  <code>thoth-denver.local</code>, <code>thoth-alex.local</code>, or{' '}
                  <code>thoth.local</code>).
                </li>
                <li>
                  <strong>Connected Sensors:</strong> Live webcam feed, Wi-Fi, Bluetooth,
                  CPU &amp; RAM telemetry in the Sensor Lab stage.
                </li>
                <li>
                  <strong>Model Execution:</strong> Runs edge rules and OpenCV face
                  recognition locally with low latency.
                </li>
                <li>
                  <strong>OpenSSH Access:</strong> Automatically configured on port 22 (
                  <code>ssh &lt;user&gt;@thoth-&lt;name&gt;.local</code>).
                </li>
              </ul>
            </div>
            <div className="guide-col">
              <h4>2. Cloud thothHUB (Central Fleet View)</h4>
              <p>
                To link your computer to thothHUB for dataset storage, model deployments,
                and multi-node synchronization:
              </p>
              <pre className="cli-box"><code>thoth pair</code></pre>
              <p className="subnote">
                View all paired devices, start/stop sensor captures, and deploy processors at:
                <br />
                <strong>thothHUB → Devices:</strong> <code>https://hub.thothcraft.com</code>
              </p>
            </div>
          </div>
        </div>
      </section>

      <p className="note">
        Requires Python 3.10+. The installer can be rerun safely to update existing
        installations. All user data, local configs, and credentials are preserved during updates.
      </p>
    </main>
  )
}
