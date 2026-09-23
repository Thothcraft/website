const STACK = [
  { name: 'WHISPY', desc: 'Physical data acquisition and synchronization.' },
  { name: 'THOTH', desc: 'Continuous edge execution, inference and fusion.' },
  { name: 'BRAIN', desc: 'Spaces, entities, history, fleet and physical context.' },
  { name: 'CONTEXT INTERFACE', desc: 'SDKs, APIs, events, conditions and agent protocols.' },
  { name: 'INTELLIGENT SOFTWARE', desc: 'Applications and agents that act on the world.' },
]

/** Section E — The stack. */
export function StackSection() {
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
              <span className="stack-desc">{s.desc}</span>
            </div>
            {i < STACK.length - 1 && <span className="stack-arrow" aria-hidden="true">↓</span>}
          </li>
        ))}
      </ol>
    </section>
  )
}
