import { demoContext } from '@/data/demo-context'
import { EventTimeline } from './EventTimeline'

/**
 * Context mode panel — the time-aware representation of the space:
 * hierarchy, current state, and the event stream. Rendered as DOM so it
 * stays readable and accessible.
 */
export function ContextPanel() {
  const office = demoContext.spaces.office
  return (
    <div className="context-panel">
      <div className="context-tree" aria-label="Space hierarchy">
        {demoContext.hierarchy.map((level) => (
          <div key={level.label} className="context-level">
            <span className="context-node root">{level.label}</span>
            <div className="context-children">
              {level.children.map((c) => (
                <span key={c} className="context-node">{c}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="context-state">
        <p className="inspector-kicker">OFFICE STATE</p>
        <dl>
          <div><dt>Occupied</dt><dd>{office.occupied ? 'Yes' : 'No'}</dd></div>
          <div><dt>People</dt><dd>{office.peopleEstimate}</dd></div>
          <div><dt>Activity</dt><dd>{office.activity}</dd></div>
          <div><dt>Computer</dt><dd>{office.computerActive ? 'active' : 'idle'}</dd></div>
          <div><dt>Since</dt><dd>{office.occupiedSince}</dd></div>
          <div><dt>Confidence</dt><dd>{Math.round(office.confidence * 100)}%</dd></div>
        </dl>
      </div>
      <div className="context-events">
        <p className="inspector-kicker">EVENTS</p>
        <EventTimeline compact />
      </div>
    </div>
  )
}
