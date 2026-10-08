import { useEffect, useState } from 'react'
import { motion } from 'motion/react'
import { CellLogo, CellLoader } from '../components/brand/CellLogo'
import './download.css'

const SKILL_URL = 'https://thothcraft.com/skill.md'

const STEPS = [
  {
    n: '01',
    title: 'Read the map',
    code: 'client = whispy.Client()\nm = client.context_map()\nfor r in m["relationships"]: print(r)',
  },
  {
    n: '02',
    title: 'Read live scenes',
    code: 'for s in client.scenes():\n    print(s["node"], "·", s["scene"])',
  },
  {
    n: '03',
    title: 'Sense locally',
    code: 'snap = whispy.snapshot(seconds=3)\nprint(snap["scene"])',
  },
]

export default function Skill() {
  const [text, setText] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    fetch('/skill.md')
      .then((r) => (r.ok ? r.text() : null))
      .then(setText)
      .catch(() => setText(null))
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
    <main className="download-page dl2">
      <section className="dl-hero">
        <motion.div className="dl-hero-mark" initial={{ opacity: 0, scale: 0.85, rotate: -6 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }} transition={{ duration: 0.8, ease: [0.22, 0.75, 0.25, 1] }}>
          <CellLogo size={148} animated />
          <span className="dl-orbit" aria-hidden="true" />
        </motion.div>
        <div className="dl-hero-copy">
          <p className="eyebrow">Agent skill</p>
          <h1>Give your agent<br />a sense of place.</h1>
          <p className="lede">
            One <code>skill.md</code> teaches any LLM agent to ask <em>who is where, doing
            what</em> across real spaces — through Thoth nodes and Brain&apos;s stable
            context map. Raw sensor data never leaves the node; the agent sees
            descriptors and relationships.
          </p>
          <div className="dl-cta">
            <a className="download-button" href="/skill.md" download="skill.md">
              Download skill.md
            </a>
            <button type="button" className="tab-btn" onClick={copy}>
              {copied ? 'Copied' : 'Copy skill URL'}
            </button>
          </div>
        </div>
      </section>

      <section className="dl-installer">
        <div className="terminal">
          <div className="terminal-chrome">
            <span /><span /><span />
            <em>agent context</em>
          </div>
          <pre><code><span className="prompt">+</span> {SKILL_URL}</code></pre>
        </div>
      </section>

      <section className="dl-steps">
        {STEPS.map((s, i) => (
          <motion.div key={s.n} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
            <span>{s.n}</span>
            <h2>{s.title}</h2>
            <pre className="cli-box"><code>{s.code}</code></pre>
          </motion.div>
        ))}
      </section>

      <section className="dashboard-guide">
        <div className="guide-card">
          <h3>Stability guarantees</h3>
          <ul className="dl-guarantees">
            <li><strong>Registry devices</strong> are anchors — the LLM relates them but never creates or retires them.</li>
            <li><strong>Stable ids</strong> — renamed or re-detected things resolve through aliases.</li>
            <li><strong>Hysteresis</strong> — place, activity and state changes need two agreeing builds or high confidence.</li>
            <li><strong>Decay</strong> — unconfirmed relationships end after 30 minutes; stale entities retire.</li>
          </ul>
        </div>
      </section>

      <section className="dashboard-guide">
        <div className="guide-card">
          <h3>skill.md</h3>
          {text == null ? (
            <CellLoader label="Loading skill" />
          ) : (
            <pre className="cli-box skill-source"><code>{text}</code></pre>
          )}
        </div>
      </section>
    </main>
  )
}
