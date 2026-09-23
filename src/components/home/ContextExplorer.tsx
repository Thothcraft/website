import { useState } from 'react'
import { demoContext } from '@/data/demo-context'
import { ROOMS, type RoomId } from '@/lib/scene-config'
import { EventTimeline } from './EventTimeline'

const ROOM_IDS = Object.keys(ROOMS) as RoomId[]

/**
 * Section B — A living model of space. DOM-based explorer reusing the same
 * demo context: pick a space or entity, see its state and recent events.
 */
export function ContextExplorer() {
  const [room, setRoom] = useState<RoomId>('office')
  const state = demoContext.spaces[room]
  const entities = demoContext.entities.filter((e) => e.space === room)

  return (
    <section className="section explorer" aria-labelledby="explorer-h">
      <div className="section-head">
        <p className="kicker">THE MODEL</p>
        <div>
          <h2 id="explorer-h">A living model of space.</h2>
          <p className="lede">
            Spaces, entities, states, events, relationships, history, confidence and
            provenance — maintained continuously, queryable at any moment.
          </p>
        </div>
      </div>

      <div className="explorer-grid">
        <div className="explorer-rooms" role="tablist" aria-label="Spaces">
          {ROOM_IDS.map((id) => (
            <button
              key={id}
              role="tab"
              aria-selected={room === id}
              className={`explorer-room ${room === id ? 'is-active' : ''}`}
              onClick={() => setRoom(id)}
            >
              <span className="room-name">{ROOMS[id].label}</span>
              <span className="room-state">
                {demoContext.spaces[id].occupied
                  ? `${demoContext.spaces[id].peopleEstimate} present · ${demoContext.spaces[id].activity}`
                  : 'empty'}
              </span>
            </button>
          ))}
        </div>

        <div className="explorer-detail">
          <dl className="inspector-state">
            <div><dt>Occupied</dt><dd>{state.occupied ? 'Yes' : 'No'}</dd></div>
            <div><dt>People</dt><dd>{state.peopleEstimate}</dd></div>
            <div><dt>Activity</dt><dd>{state.activity}</dd></div>
            {state.occupiedSince && <div><dt>Since</dt><dd>{state.occupiedSince}</dd></div>}
            <div><dt>Confidence</dt><dd>{Math.round(state.confidence * 100)}%</dd></div>
            <div><dt>Environment</dt><dd>{state.temperatureC}° · {state.humidity}%</dd></div>
          </dl>
          {entities.length > 0 && (
            <ul className="explorer-entities">
              {entities.map((e) => (
                <li key={e.id}>
                  <span className="entity-label">{e.label}</span>
                  <span className="entity-state">{e.state}{e.detail ? ` — ${e.detail}` : ''}</span>
                </li>
              ))}
            </ul>
          )}
          <EventTimeline room={room} />
        </div>
      </div>
    </section>
  )
}
