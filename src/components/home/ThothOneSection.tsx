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
 * Section F — Thoth One. One hardware implementation of the platform,
 * introduced only after the platform story is told.
 */
export function ThothOneSection() {
  return (
    <section className="section thoth-one" aria-labelledby="thoth-one-h">
      <div className="thoth-one-grid">
        <div>
          <p className="kicker">THOTH ONE</p>
          <h2 id="thoth-one-h">Presence, not surveillance.</h2>
          <p className="lede">
            A Raspberry Pi–based sensing node — one implementation of the Thoth
            platform. It observes a room locally and feeds the context layer;
            the camera remains an explicit choice.
          </p>
          <div className="thoth-one-ctas">
            <Link className="btn btn-primary" to="/product">Meet Thoth One</Link>
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
