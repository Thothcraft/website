import { demoContext } from '@/data/demo-context'
import { ROOMS, type RoomId } from '@/lib/scene-config'
import { EventTimeline } from './EventTimeline'

interface ContextInspectorProps {
  room: RoomId
  onClose: () => void
}

/**
 * Context inspector — appears when a room is selected. Shows the space's
 * current semantic state, its entities, and recent events.
 */
export function ContextInspector({ room, onClose }: ContextInspectorProps) {
  const state = demoContext.spaces[room]
  const entities = demoContext.entities.filter((e) => e.space === room)

  return (
    <aside className="context-inspector" aria-label={`${ROOMS[room].label} context`}>
      <header>
        <div>
          <p className="inspector-kicker">SPACE</p>
          <h3>{ROOMS[room].label}</h3>
        </div>
        <button className="inspector-close" onClick={onClose} aria-label="Close inspector">×</button>
      </header>

      <dl className="inspector-state">
        <div><dt>Occupied</dt><dd>{state.occupied ? 'Yes' : 'No'}</dd></div>
        <div><dt>People</dt><dd>{state.peopleEstimate}</dd></div>
        <div><dt>Activity</dt><dd>{state.activity}</dd></div>
        {state.occupiedSince && <div><dt>Since</dt><dd>{state.occupiedSince}</dd></div>}
        <div><dt>Confidence</dt><dd>{Math.round(state.confidence * 100)}%</dd></div>
        <div><dt>Environment</dt><dd>{state.temperatureC}° · {state.humidity}%</dd></div>
      </dl>

      {entities.length > 0 && (
        <div className="inspector-entities">
          <p className="inspector-kicker">ENTITIES</p>
          <ul>
            {entities.map((e) => (
              <li key={e.id}>
                <span className="entity-label">{e.label}</span>
                <span className="entity-state">{e.state}{e.detail ? ` — ${e.detail}` : ''}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="inspector-events">
        <p className="inspector-kicker">EVENTS</p>
        <EventTimeline room={room} compact />
      </div>
    </aside>
  )
}
