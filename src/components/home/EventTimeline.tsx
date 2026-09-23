import { demoEvents } from '@/data/demo-events'
import type { RoomId } from '@/lib/scene-config'

interface EventTimelineProps {
  room?: RoomId | null
  compact?: boolean
}

/** Recent context events — quiet, chronological, monospace timestamps. */
export function EventTimeline({ room, compact = false }: EventTimelineProps) {
  const events = room ? demoEvents.filter((e) => e.space === room) : demoEvents
  const shown = compact ? events.slice(0, 3) : events
  return (
    <ol className="event-timeline" aria-label="Recent events">
      {shown.map((e) => (
        <li key={e.id}>
          <time>{e.time}</time>
          <span>{e.description}</span>
        </li>
      ))}
    </ol>
  )
}
