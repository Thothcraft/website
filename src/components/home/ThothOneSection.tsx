import { Link } from 'react-router-dom'

const TRAITS = [
  '60 GHz radar',
  'Synchronized data collection',
  'Presence and localization',
  'Optional camera / reference sensing',
  'Local-first operation',
  'Developer and research access',
]

/**
 * Section F — Room1. The room node of the person1 kit: a Raspberry Pi–based
 * sensing node (radar + 2× ESP32-C6 CSI), introduced only after the platform
 * story is told.
 */
export function ThothOneSection() {
  return (
    <section className="section thoth-one" aria-labelledby="thoth-one-h">
      <div className="thoth-one-grid">
        <div>
          <p className="kicker">ROOM1 · PERSON1 KIT</p>
          <h2 id="thoth-one-h">Presence, not surveillance.</h2>
          <p className="lede">
            Room1 is a Raspberry Pi–based sensing node — radar plus two ESP32-C6
            CSI boards — and the room half of the person1 kit. It observes a
            room locally and feeds the context layer; the camera remains an
            explicit choice.
          </p>
          <div className="thoth-one-ctas">
            <Link className="btn btn-primary" to="/product">Meet Room1</Link>
            <Link className="btn btn-ghost" to="/download">Install on your own hardware</Link>
          </div>
        </div>
        <ul className="thoth-one-traits">
          {TRAITS.map((t) => (
            <li key={t}>{t}</li>
          ))}
        </ul>
      </div>
    </section>
  )
}
