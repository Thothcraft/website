const COLUMNS = [
  {
    title: 'Observe',
    body: 'Collect synchronized physical observations.',
    tags: 'Radar · CSI · Camera · BLE · IMU · Environment · Computers',
  },
  {
    title: 'Understand',
    body: 'Convert observations into semantic physical state.',
    tags: 'Presence · Activity · Localization · Environment · Device state',
  },
  {
    title: 'Remember',
    body: 'Maintain a time-aware representation.',
    tags: 'Spaces · Entities · States · Events · Relationships',
  },
  {
    title: 'Connect',
    body: 'Expose physical context to software.',
    tags: 'SDK · REST · WebSocket · Events · Conditions · MCP',
  },
]

/** Section A — From signals to context. */
export function SignalToContext() {
  return (
    <section className="section signals" id="platform" aria-labelledby="signals-h">
      <div className="section-head">
        <p className="kicker">THE PIPELINE</p>
        <h2 id="signals-h">From signals to context.</h2>
      </div>
      <div className="signals-grid">
        {COLUMNS.map((c, i) => (
          <article key={c.title} className="signal-col">
            <span className="signal-num" aria-hidden="true">0{i + 1}</span>
            <h3>{c.title}</h3>
            <p>{c.body}</p>
            <p className="signal-tags">{c.tags}</p>
          </article>
        ))}
      </div>
    </section>
  )
}
