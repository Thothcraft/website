import { useState } from 'react'

type LayerCmd = { kind: 'pypi' | 'apt' | 'shell'; label: string; cmd: string }
type LayerLink = { href: string; label: string }

const STACK: Array<{
  name: string
  desc: string
  cmds: LayerCmd[]
  links: LayerLink[]
}> = [
  {
    name: 'WHISPY',
    desc: 'Physical data acquisition and synchronization.',
    cmds: [
      { kind: 'pypi', label: 'PyPI', cmd: 'pip install whispy' },
      { kind: 'apt', label: 'Pi OS deps', cmd: 'sudo apt-get install -y python3-picamera2 python3-sense-hat python3-rpi.gpio' },
    ],
    links: [
      { href: 'https://pypi.org/project/whispy/', label: 'PyPI' },
      { href: 'https://github.com/gadm21/whispy', label: 'Docs' },
    ],
  },
  {
    name: 'THOTH',
    desc: 'Continuous edge execution, inference and fusion.',
    cmds: [
      { kind: 'pypi', label: 'PyPI', cmd: 'pip install thoth-node' },
      { kind: 'shell', label: 'Windows', cmd: 'irm https://get.thothcraft.com/install.ps1 | iex' },
      { kind: 'shell', label: 'Linux / Pi', cmd: 'curl -fsSL https://get.thothcraft.com/install.sh | sudo bash' },
    ],
    links: [
      { href: 'https://thothcraft.com/download', label: 'Installer' },
      { href: 'https://github.com/Thothcraft/thoth', label: 'Docs' },
    ],
  },
  {
    name: 'BRAIN',
    desc: 'Spaces, entities, history, fleet and physical context.',
    cmds: [{ kind: 'shell', label: 'Pair a node', cmd: 'thoth pair' }],
    links: [
      { href: 'https://hub.thothcraft.com', label: 'thothHUB' },
      { href: 'https://github.com/Thothcraft/Brain', label: 'Docs' },
    ],
  },
  {
    name: 'CONTEXT INTERFACE',
    desc: 'SDKs, APIs, events, conditions and agent protocols.',
    cmds: [
      { kind: 'pypi', label: 'PyPI', cmd: 'pip install whispy' },
      { kind: 'shell', label: 'Node API', cmd: 'thoth sensors' },
    ],
    links: [{ href: 'https://github.com/Thothcraft/thoth', label: 'API reference' }],
  },
  {
    name: 'INTELLIGENT SOFTWARE',
    desc: 'Applications and agents that act on the world.',
    cmds: [],
    links: [{ href: 'https://thothcraft.com/#developers', label: 'Build on it' }],
  },
]

/** Section E — The stack. */
export function StackSection() {
  const [copied, setCopied] = useState('')

  const copyCmd = (cmd: string) => {
    navigator.clipboard?.writeText(cmd).catch(() => {})
    setCopied(cmd)
    window.setTimeout(() => setCopied((c) => (c === cmd ? '' : c)), 1500)
  }

  return (
    <section className="section stack" id="stack" aria-labelledby="stack-h">
      <div className="section-head">
        <p className="kicker">THE STACK</p>
        <h2 id="stack-h">Four layers, one context.</h2>
      </div>
      <ol className="stack-list">
        {STACK.map((s, i) => (
          <li key={s.name} className={i === STACK.length - 1 ? 'stack-top' : ''}>
            <div className="stack-row">
              <span className="stack-name">{s.name}</span>
              <div className="stack-body">
                <span className="stack-desc">{s.desc}</span>
                {s.cmds.length > 0 && (
                  <div className="stack-cmds">
                    {s.cmds.map((c) => (
                      <button
                        key={c.cmd}
                        type="button"
                        className="stack-cmd"
                        title={`copy: ${c.cmd}`}
                        onClick={() => copyCmd(c.cmd)}
                      >
                        <span className="stack-cmd-kind">{c.label}</span>
                        <code>{c.cmd}</code>
                        <span className="stack-cmd-copy">{copied === c.cmd ? 'copied' : 'copy'}</span>
                      </button>
                    ))}
                  </div>
                )}
                {s.links.length > 0 && (
                  <div className="stack-links">
                    {s.links.map((l) => (
                      <a key={l.href + l.label} className="stack-link" href={l.href} target="_blank" rel="noopener">
                        {l.label} →
                      </a>
                    ))}
                  </div>
                )}
              </div>
            </div>
            {i < STACK.length - 1 && <span className="stack-arrow" aria-hidden="true">↓</span>}
          </li>
        ))}
      </ol>
    </section>
  )
}
