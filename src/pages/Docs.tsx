import { Link } from 'react-router-dom'
import { motion } from 'motion/react'
import { CellLogo } from '../components/brand/CellLogo'
import './docs.css'

const GH = 'https://github.com/Thothcraft'

interface DocCard {
  comp: string
  repo: string
  tone: string
  blurb: string
  pages: { label: string; href: string }[]
}

const CARDS: DocCard[] = [
  {
    comp: 'Whispy SDK',
    repo: `${GH}/whispy`,
    tone: 'sense',
    blurb:
      'The sensor/actuator/model plugin SDK every node speaks. Adapters for camera, mic, CSI, radar, BLE, Zigbee, Sense HAT; processors for face, occupancy, speech.',
    pages: [
      { label: 'SDK overview', href: `${GH}/whispy#readme` },
      { label: 'Sensor adapters', href: `${GH}/whispy/tree/main/packages` },
      { label: 'Observation contracts', href: `${GH}/whispy/tree/main/contracts` },
    ],
  },
  {
    comp: 'Thoth node',
    repo: `${GH}/thoth`,
    tone: 'node',
    blurb:
      'The daemon on each device: discovers sensors, streams samples, runs models, serves the local dashboard + API, and bridges actions.',
    pages: [
      { label: 'CLI', href: `${GH}/thoth/blob/main/docs/cli.md` },
      { label: 'Daemon', href: `${GH}/thoth/blob/main/docs/daemon.md` },
      { label: 'Local API', href: `${GH}/thoth#readme` },
    ],
  },
  {
    comp: 'ESP32 firmware',
    repo: `${GH}/esp32`,
    tone: 'edge',
    blurb:
      'One unified ESP32-C6 image — roles over the serial console: CSI send/receive plus a raw 802.15.4 (Zigbee) scanner/broadcaster.',
    pages: [
      { label: 'Firmware README', href: `${GH}/esp32#readme` },
      { label: 'Roles + console', href: `${GH}/esp32#firmware` },
      { label: 'Flash tooling', href: `${GH}/esp32/blob/main/flash.py` },
    ],
  },
  {
    comp: 'Brain',
    repo: `${GH}/Brain`,
    tone: 'cloud',
    blurb:
      'The cloud context service: devices, models, captures, context map, predictions, event stream — the stable API behind hub and the phone app.',
    pages: [
      { label: 'v1 API', href: `${GH}/Brain#readme` },
      { label: 'Events / SSE', href: `${GH}/Brain` },
      { label: 'Context map', href: `${GH}/Brain` },
    ],
  },
  {
    comp: 'thothHUB',
    repo: `${GH}/ResearchPortal`,
    tone: 'hub',
    blurb:
      'The web portal at hub.thothcraft.com — pair nodes, browse captures, manage models and automations, watch predictions live.',
    pages: [
      { label: 'Portal', href: 'https://hub.thothcraft.com' },
      { label: 'Auth', href: `${GH}/ResearchPortal` },
      { label: 'Room scene', href: `${GH}/ResearchPortal` },
    ],
  },
  {
    comp: 'thoth-app',
    repo: `${GH}/thoth-app`,
    tone: 'phone',
    blurb:
      'The Flutter companion app — your pocket dashboard: nodes, live context, capture labeling, BLE map, watch relay, automations.',
    pages: [
      { label: 'Install', href: '/download' },
      { label: 'Agent skill', href: '/skill' },
      { label: 'Repo', href: `${GH}/thoth-app` },
    ],
  },
]

const PATHS = [
  {
    n: '01',
    title: 'Bring a node online',
    body: 'Install the node package, attach sensors (ESP32-C6 optional), expose on LAN, claim it in the portal.',
    code: 'pip install thoth\nthoth daemon\nthoth expose --lan',
  },
  {
    n: '02',
    title: 'Flash an ESP32',
    body: 'One unified image — flip roles over serial. recv feeds whispy-sensor-csi; zb scans 802.15.4.',
    code: 'python flash.py --port COM10\nrole=zb        # scanner\nzb tx cafe00   # broadcast',
  },
  {
    n: '03',
    title: 'Drive context',
    body: 'Whispy client talks to any node or Brain — same calls for sensors, captures, predictions, rules.',
    code: 'import whispy\nc = whispy.Client()\nc.context_map()',
  },
]

export default function Docs() {
  return (
    <main className="docs-page">
      <section className="docs-hero">
        <motion.div
          className="docs-hero-mark"
          initial={{ opacity: 0, scale: 0.85, rotate: -6 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 0.75, 0.25, 1] }}
        >
          <CellLogo size={132} animated />
          <span className="dl-orbit" aria-hidden="true" />
        </motion.div>
        <div className="docs-hero-copy">
          <p className="eyebrow">Documentation</p>
          <h1>
            Every component.
            <br />
            One map.
          </h1>
          <p className="lede">
            Thothcraft is a handful of parts that share one contract: nodes sense,
            Whispy describes, Brain relates, the portal and the app act. Pick a
            component below — each card links its repo and the pages that matter.
          </p>
        </div>
      </section>

      <section className="docs-grid" aria-label="Components">
        {CARDS.map((c, i) => (
          <motion.article
            key={c.comp}
            className={`doc-card tone-${c.tone}`}
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.06 }}
          >
            <header className="doc-card-head">
              <h2>{c.comp}</h2>
              <a href={c.repo} target="_blank" rel="noopener" className="doc-repo">
                repo ↗
              </a>
            </header>
            <p className="doc-blurb">{c.blurb}</p>
            <ul className="doc-links">
              {c.pages.map((p) => (
                <li key={p.label}>
                  {p.href.startsWith('/') ? (
                    <Link to={p.href}>{p.label}</Link>
                  ) : (
                    <a href={p.href} target="_blank" rel="noopener">
                      {p.label} ↗
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </motion.article>
        ))}
      </section>

      <section className="docs-paths" aria-label="Paths">
        <p className="eyebrow">Three ways in</p>
        <h2 className="docs-paths-title">Pick a path</h2>
        <div className="docs-paths-grid">
          {PATHS.map((p) => (
            <div key={p.n} className="path-card">
              <span className="path-n">{p.n}</span>
              <h3>{p.title}</h3>
              <p>{p.body}</p>
              <pre className="cli-box"><code>{p.code}</code></pre>
            </div>
          ))}
        </div>
      </section>

      <section className="docs-foot">
        <p>
          Something missing? The deep doc set lives beside the code — every repo
          keeps its markdown in <code>docs/</code> and PRs are the feedback loop.
        </p>
        <div className="docs-foot-cta">
          <Link className="tab-btn" to="/skill">Agent skill</Link>
          <a className="tab-btn" href="https://hub.thothcraft.com" target="_blank" rel="noopener">
            Open the portal ↗
          </a>
        </div>
      </section>
    </main>
  )
}
