/**
 * Software mode panel — an agent question, its answer, and the programmatic
 * equivalent. Shows the three interface concepts: Query, Event, Condition.
 */
export function SoftwarePanel() {
  return (
    <div className="software-panel">
      <div className="qa-block">
        <p className="qa-question">“Is anyone still in the office?”</p>
        <p className="qa-answer">
          Yes. One person is present near the desk. The office has been occupied since 09:41.
        </p>
        <code className="qa-code">thoth.space("office").state()</code>
      </div>
      <div className="iface-grid">
        <div className="iface">
          <p className="iface-kind">Query</p>
          <code>get_occupancy("office")</code>
        </div>
        <div className="iface">
          <p className="iface-kind">Event</p>
          <code>office.occupancy false → true</code>
        </div>
        <div className="iface">
          <p className="iface-kind">Condition</p>
          <code>when office.empty for 20m</code>
        </div>
      </div>
    </div>
  )
}
