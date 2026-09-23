/**
 * Section C — One context layer, different users.
 * Agents get answers, developers get stable interfaces, researchers can
 * descend beneath the abstraction.
 */
export function UserLayers() {
  return (
    <section className="section users" id="developers" aria-labelledby="users-h">
      <div className="section-head">
        <p className="kicker">WHO IT SERVES</p>
        <h2 id="users-h">One context layer, different users.</h2>
      </div>

      <div className="users-grid">
        <article className="user-block">
          <h3>AI agents</h3>
          <p>High-level physical context, on demand.</p>
          <ul className="agent-examples">
            <li>“Is anyone still in the office?”</li>
            <li>“What changed in the last ten minutes?”</li>
            <li>“Tell me when the lab has been empty for twenty minutes.”</li>
          </ul>
        </article>

        <article className="user-block">
          <h3>Developers</h3>
          <p>Stable application interfaces over live context.</p>
          <pre className="code-block"><code>{`const office = thoth.space("office")

await office.state()        // → { occupied: true, … }

office.on("occupancy", fn)  // events as they happen

thoth.when("office.empty")
     .for("20m")
     .then(pauseBuildJobs)`}</code></pre>
        </article>

        <article className="user-block" id="research">
          <h3>Researchers</h3>
          <p>Descend beneath the abstraction when the work requires it.</p>
          <ul className="research-list">
            <li>Synchronized multimodal data</li>
            <li>Model outputs and annotations</li>
            <li>Raw sensor streams</li>
            <li>Reproducible experiments</li>
          </ul>
        </article>
      </div>
    </section>
  )
}
