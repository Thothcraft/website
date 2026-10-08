import { useEffect, useMemo, useState } from 'react'
import { motion } from 'motion/react'
import { CellLogo, CellLoader } from '../components/brand/CellLogo'
import './download.css'

const REPO = 'Thothcraft/thothNode'
const RELEASES = `https://github.com/${REPO}/releases`
const API = `https://api.github.com/repos/${REPO}/releases/latest`

type PlatformId = 'windows' | 'macos' | 'linux' | 'pi' | 'android' | 'ios' | 'esp32' | 'watch'

interface Platform {
  id: PlatformId
  name: string
  family: 'Desktop' | 'Edge' | 'Mobile' | 'Firmware'
  blurb: string
  asset: RegExp
  /** Fallback link shown when the latest release has no matching asset —
   *  repo, install script, or store page. Every card must resolve a link. */
  url?: string
  install: string
  then: string[]
  icon: string
}

const PLATFORMS: Platform[] = [
  {
    id: 'windows', name: 'Windows', family: 'Desktop', icon: '⊞',
    blurb: 'Installer + `thoth` CLI. Runs as a background service with tray icon.',
    asset: /Thoth-Setup.*\.exe$/i,
    install: 'irm https://thothcraft.com/install.ps1 | iex',
    then: ['Collects built-in sensors, Wi-Fi and BLE scans every 60 s', 'Dashboard at http://thoth.local', 'Pair with `thoth pair`'],
  },
  {
    id: 'macos', name: 'macOS', family: 'Desktop', icon: '',
    blurb: 'Universal .pkg + `thoth` CLI as a LaunchAgent.',
    asset: /Thoth.*\.pkg$/i,
    url: 'https://thothcraft.com/install',
    install: 'curl -fsSL https://thothcraft.com/install.sh | bash',
    then: ['Camera, mic, Wi-Fi and BLE with macOS permission prompts', 'Dashboard at http://thoth.local', 'Pair with `thoth pair`'],
  },
  {
    id: 'linux', name: 'Linux (apt)', family: 'Desktop', icon: '◆',
    blurb: 'Debian/Ubuntu package from the Thoth apt repository (amd64, arm64).',
    asset: /thoth_.*_amd64\.deb$/i,
    url: 'https://thothcraft.com/install',
    install: 'curl -fsSL https://thothcraft.com/install.sh | sudo bash',
    then: ['systemd service `thoth`', 'Dashboard at http://thoth-<name>.local', '`apt upgrade` keeps it current'],
  },
  {
    id: 'pi', name: 'Raspberry Pi', family: 'Edge', icon: '◎',
    blurb: 'SD image or arm64 .deb for Pi 3/4/5 — radar HATs, Sense HAT, ESP32 over USB.',
    asset: /Thoth-?RPi.*\.img\.gz$|thoth_.*_arm64\.deb$/i,
    url: 'https://thothcraft.com/install',
    install: 'curl -fsSL https://thothcraft.com/install.sh | sudo bash',
    then: ['Detects SPI radar, Sense HAT, USB cameras/mics', 'Recognizes an attached thothesp32 automatically', 'Dashboard at http://thoth-<name>.local'],
  },
  {
    id: 'android', name: 'Android', family: 'Mobile', icon: '▲',
    blurb: 'The phone is a node: sensors, BLE beacon, watch bridge, notifications.',
    asset: /thoth.*\.apk$/i,
    url: 'https://github.com/Thothcraft/thoth-app',
    install: 'Google Play — or sideload the APK below',
    then: ['Connects your Thoth watch automatically', 'Stays connected with the screen off', 'Push notifications from automations'],
  },
  {
    id: 'ios', name: 'iOS', family: 'Mobile', icon: '●',
    blurb: 'Same app on iPhone — sensors, watch bridge, notifications.',
    asset: /thoth.*\.ipa$/i,
    url: 'https://hub.thothcraft.com/auth',
    install: 'TestFlight invite from the hub',
    then: ['Background BLE within iOS limits', 'Notifications from automations', 'Shares the same account as every node'],
  },
  {
    id: 'esp32', name: 'thothesp32', family: 'Firmware', icon: '⬡',
    blurb: 'One ESP32-C6 image, runtime role: CSI transmitter or serial receiver — flip over the console, no reflash.',
    asset: /thoth_csi.*\.bin$|thothesp32.*\.bin$/i,
    url: 'https://github.com/Thothcraft/thothESP',
    install: 'git clone https://github.com/Thothcraft/thothESP && python thothESP/flash.py --port COM10',
    then: ['Boots as CSI receiver by default', '`role=send` over serial switches to transmitter', 'Feeds whispy-sensor-csi on any node over USB'],
  },
  {
    id: 'watch', name: 'Thoth watch', family: 'Firmware', icon: '◷',
    blurb: 'Signed PineTime firmware (thothIoT): motion, heart rate, neighbour scan.',
    asset: /thothiot.*\.zip$/i,
    url: 'https://github.com/Thothcraft/thothWatch',
    install: 'Update from the Thoth app — Devices → Watch',
    then: ['Recognized and paired by the app instantly', 'Streams motion + HR through any nearby node', 'Cell boot screen and progress UI'],
  },
]

const FAMILIES: Platform['family'][] = ['Desktop', 'Edge', 'Mobile', 'Firmware']

interface Asset { name: string; browser_download_url: string; size: number }
interface Release { tag_name: string; name: string; published_at: string; html_url: string; assets: Asset[] }

function detect(): PlatformId {
  const ua = navigator.userAgent.toLowerCase()
  if (/android/.test(ua)) return 'android'
  if (/iphone|ipad|ipod/.test(ua)) return 'ios'
  if (/mac os x/.test(ua)) return 'macos'
  if (/linux/.test(ua)) return /aarch64|armv/.test(ua) ? 'pi' : 'linux'
  return 'windows'
}

function fmtSize(b: number) {
  return b > 1e6 ? `${(b / 1e6).toFixed(1)} MB` : `${Math.max(1, Math.round(b / 1e3))} KB`
}

function Typed({ text }: { text: string }) {
  const [n, setN] = useState(0)
  useEffect(() => {
    setN(0)
    const id = window.setInterval(() => {
      setN((v) => {
        if (v >= text.length) { window.clearInterval(id); return v }
        return v + 1
      })
    }, 22)
    return () => window.clearInterval(id)
  }, [text])
  return (
    <>
      {text.slice(0, n)}
      <span className={`caret ${n >= text.length ? 'is-done' : ''}`} aria-hidden="true" />
    </>
  )
}

function Terminal({ platform }: { platform: Platform }) {
  const [copied, setCopied] = useState(false)
  const command = platform.install
  const runnable = !/^(Google|TestFlight|Update)/.test(command)
  const copy = async () => {
    try { await navigator.clipboard.writeText(command); setCopied(true); setTimeout(() => setCopied(false), 1400) } catch { /* clipboard denied */ }
  }
  return (
    <div className="terminal" aria-label={`Install command for ${platform.name}`}>
      <div className="terminal-chrome">
        <span /><span /><span />
        <em>{platform.id === 'windows' ? 'PowerShell' : runnable ? 'Terminal' : platform.name}</em>
        {runnable && (
          <button type="button" onClick={copy} className="terminal-copy">
            {copied ? 'Copied' : 'Copy'}
          </button>
        )}
      </div>
      <pre>
        <code>
          <span className="prompt">{platform.id === 'windows' ? 'PS>' : '$'}</span> <Typed text={command} />
        </code>
      </pre>
      <ol className="terminal-after">
        {platform.then.map((t, i) => (
          <motion.li key={`${platform.id}-${i}`} initial={{ opacity: 0, x: -6 }}
            animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 + i * 0.18 }}>
            <span>✓</span>{t}
          </motion.li>
        ))}
      </ol>
    </div>
  )
}

export default function Download() {
  const [selected, setSelected] = useState<PlatformId>('windows')
  const [release, setRelease] = useState<Release | null>(null)
  const [state, setState] = useState<'loading' | 'ok' | 'none'>('loading')

  useEffect(() => { setSelected(detect()) }, [])
  useEffect(() => {
    let alive = true
    fetch(API, { headers: { Accept: 'application/vnd.github+json' } })
      .then((r) => (r.ok ? r.json() : Promise.reject(r.status)))
      .then((r: Release) => { if (alive) { setRelease(r); setState('ok') } })
      .catch(() => { if (alive) setState('none') })
    return () => { alive = false }
  }, [])

  const platform = PLATFORMS.find((p) => p.id === selected) ?? PLATFORMS[0]
  const assetFor = useMemo(() => (p: Platform) =>
    release?.assets.find((a) => p.asset.test(a.name)), [release])
  const sums = release?.assets.find((a) => /SHA256SUMS/i.test(a.name))
  const primary = assetFor(platform)

  return (
    <main className="download-page dl2">
      <section className="dl-hero">
        <motion.div className="dl-hero-mark" initial={{ opacity: 0, scale: 0.85, rotate: -6 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }} transition={{ duration: 0.8, ease: [0.22, 0.75, 0.25, 1] }}>
          <CellLogo size={148} animated />
          <span className="dl-orbit" aria-hidden="true" />
        </motion.div>
        <div className="dl-hero-copy">
          <p className="eyebrow">Releases {release ? `· ${release.tag_name}` : ''}</p>
          <h1>Every device<br />becomes a node.</h1>
          <p className="lede">
            One Thoth for laptops, Raspberry Pis, phones, ESP32 boards and watches. Install it and it starts
            sensing right away: built-in sensors, Wi-Fi and BLE scans, on a schedule you control. Nearby
            nodes find each other on <code>thoth.local</code>.
          </p>
          <div className="dl-cta">
            {primary ? (
              <a className="download-button" href={primary.browser_download_url}>
                Download for {platform.name} <small>{fmtSize(primary.size)}</small>
              </a>
            ) : (
              <a className="download-button" href={RELEASES}>All releases ↗</a>
            )}
            <span className="dl-detected">Detected: {platform.name} · <a href={RELEASES}>other versions</a></span>
          </div>
        </div>
      </section>

      <section className="dl-installer">
        <div className="platform-tabs" role="tablist" aria-label="Platform">
          {PLATFORMS.map((p) => (
            <button key={p.id} type="button" role="tab" aria-selected={selected === p.id}
              className={`tab-btn ${selected === p.id ? 'active' : ''}`} onClick={() => setSelected(p.id)}>
              <span className="tab-icon" aria-hidden="true">{p.icon}</span>{p.name}
            </button>
          ))}
        </div>
        <Terminal platform={platform} />
      </section>

      <section className="dl-grid-section">
        <div className="dl-section-head">
          <h2>Downloads</h2>
          {state === 'loading' && <CellLoader label="Fetching release" />}
          {state === 'ok' && release && (
            <span className="dl-release-meta">
              {release.name || release.tag_name} · {new Date(release.published_at).toLocaleDateString()} ·{' '}
              <a href={release.html_url}>notes ↗</a>
            </span>
          )}
          {state === 'none' && <span className="dl-release-meta">Release feed unavailable — <a href={RELEASES}>browse on GitHub ↗</a></span>}
        </div>
        {FAMILIES.map((fam) => (
          <div key={fam} className="dl-family">
            <h3>{fam}</h3>
            <div className="dl-cards">
              {PLATFORMS.filter((p) => p.family === fam).map((p, i) => {
                const a = assetFor(p)
                return (
                  <motion.article key={p.id}
                    className={`dl-card ${selected === p.id ? 'is-selected' : ''}`}
                    initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-40px' }} transition={{ delay: i * 0.06 }}
                    onMouseEnter={() => setSelected(p.id)}>
                    <div className="dl-card-head">
                      <span className="dl-card-icon" aria-hidden="true">{p.icon}</span>
                      <h4>{p.name}</h4>
                    </div>
                    <p>{p.blurb.replace(/`/g, '')}</p>
                    {a ? (
                      <a className="dl-asset" href={a.browser_download_url}>
                        <span>{a.name}</span><small>{fmtSize(a.size)}</small>
                      </a>
                    ) : p.url ? (
                      <a className="dl-asset" href={p.url} target="_blank" rel="noopener">
                        <span>{p.url.replace(/^https?:\/\//, '')}</span><small>↗</small>
                      </a>
                    ) : (
                      <a className="dl-asset" href={RELEASES} target="_blank" rel="noopener">
                        <span>{state === 'loading' ? 'Checking…' : 'Releases ↗'}</span><small>↗</small>
                      </a>
                    )}
                  </motion.article>
                )
              })}
            </div>
          </div>
        ))}
      </section>

      <section className="dl-steps">
        {[
          ['01', 'Install', 'Run the installer or one-liner. Rerun anytime to update; your data and settings stay.'],
          ['02', 'It senses', 'Collection starts immediately at the default interval. Change it with `thoth collect --interval 30s --sensors wifi,ble`.'],
          ['03', 'Pair', '`thoth pair` links the node to your hub account so the context map, models and automations follow it.'],
        ].map(([n, t, d], i) => (
          <motion.div key={n} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
            <span>{n}</span>
            <h2>{t}</h2>
            <p>{d.split('`').map((s, j) => (j % 2 ? <code key={j}>{s}</code> : s))}</p>
          </motion.div>
        ))}
      </section>

      <section className="dashboard-guide">
        <div className="guide-card dl-verify">
          <h3>Verify what you downloaded</h3>
          <p>Every release ships a <code>SHA256SUMS</code> file signed with the Thoth release key.</p>
          <div className="guide-grid">
            <pre className="cli-box"><code>{'# Windows (PowerShell)\nGet-FileHash .\\Thoth-Setup.exe -Algorithm SHA256'}</code></pre>
            <pre className="cli-box"><code>{'# macOS / Linux\nsha256sum -c SHA256SUMS --ignore-missing'}</code></pre>
          </div>
          {sums && <a className="dl-asset" href={sums.browser_download_url}><span>{sums.name}</span><small>{fmtSize(sums.size)}</small></a>}
        </div>
      </section>

      <p className="note">
        Desktop and Pi builds need nothing preinstalled. Firmware is signed: nodes and the app refuse unsigned
        ESP32 or watch images. Questions? <a href="mailto:hello@thothcraft.com">hello@thothcraft.com</a>
      </p>
    </main>
  )
}
