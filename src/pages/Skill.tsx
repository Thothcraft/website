import { useEffect, useState } from 'react'
import './download.css'

const SKILL_URL = 'https://thothcraft.com/skill.md'

const STEPS = [
  {
    n: '01',
    title: 'Discover nodes',
    code: 'client = whispy.Client()\n[d.info.name for d in client.devices()]',
  },
  {
    n: '02',
    title: 'Build the map',
    code: 'client.context_rebuild(window_s=900)\n# LLM reads physical descriptors only',
  },
  {
    n: '03',
    title: 'Read stable context',
    code: 'm = client.context_map()\nm["persons"], m["places"], m["relationships"]',
  },
]

export default function Skill() {
  const [text, setText] = useState<string>('')
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    fetch('/skill.md')
      .then((r) => (r.ok ? r.text() : ''))
      .then(setText)
      .catch(() => setText(''))
  }, [])

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(SKILL_URL)
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    } catch {
      setCopied(false)
    }
  }

  return (
    <main className="download-page">
      <section className="hero">
        <p className="eyebrow">Agent skill</p>
        <h1>Give your agent<br />a sense of place.</h1>
        <p className="lede">
          One <code>skill.md</code> teaches any LLM agent to discover attached Thoth nodes,
          read heterogeneous physical descriptors (radar, Wi-Fi CSI, BLE/Wi-Fi scans, IMU,
          audio) and get a stable semantic map of persons, places, devices and activities
          built by Brain&apos;s context builder. Raw sensor data never leaves the node.
        </p>
        <div className="installer-action">
          <a className="download-button" href="/skill.md" download="skill.md">
            Download skill.md
          </a>
          <button type="button" className="tab-btn" onClick={copy}>
            {copied ? 'Copied' : 'Copy skill URL'}
          </button>
          <pre className="one-liner"><code>{SKILL_URL}</code></pre>
        </div>
      </section>

      <section className="instructions">
        {STEPS.map((s) => (
          <div key={s.n}>
            <span>{s.n}</span>
            <h2>{s.title}</h2>
            <pre><code>{s.code}</code></pre>
          </div>
        ))}
      </section>

      <section className="dashboard-guide">
        <div className="guide-card">
          <h3>Stability guarantees</h3>
          <ul>
            <li><strong>Registry devices</strong> are anchors — the LLM relates them but never creates or retires them.</li>
            <li><strong>Stable ids</strong> — renamed or re-detected things resolve through aliases.</li>
            <li><strong>Hysteresis</strong> — place, activity and state changes need two agreeing builds or high confidence.</li>
            <li><strong>Decay</strong> — unconfirmed relationships end after 30 minutes; stale entities retire.</li>
          </ul>
        </div>
      </section>

      {text && (
        <section className="dashboard-guide">
          <div className="guide-card">
            <h3>skill.md</h3>
            <pre className="cli-box skill-source"><code>{text}</code></pre>
          </div>
        </section>
      )}
    </main>
  )
}
