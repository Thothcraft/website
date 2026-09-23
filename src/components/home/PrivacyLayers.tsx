const LAYERS = [
  { name: 'RAW OBSERVATIONS', example: 'Radar / CSI / frames' },
  { name: 'MODEL OUTPUT', example: 'probabilities / tracks' },
  { name: 'SEMANTIC STATE', example: 'occupied / walking / location' },
  { name: 'CONTEXT', example: '“Office occupied since 09:14”' },
]

/**
 * Section D — Private by architecture. Each consumer receives only the
 * level of representation it is authorized to access.
 */
export function PrivacyLayers() {
  return (
    <section className="section privacy" aria-labelledby="privacy-h">
      <div className="section-head">
        <p className="kicker">ACCESS BY LEVEL</p>
        <div>
          <h2 id="privacy-h">Private by architecture.</h2>
          <p className="lede">
            Applications and agents receive only the level they are authorized to
            access — most never need to touch a raw signal.
          </p>
        </div>
      </div>

      <ol className="privacy-ladder">
        {LAYERS.map((l, i) => (
          <li key={l.name} style={{ ['--i' as string]: i }}>
            <div className="ladder-row">
              <span className="ladder-name">{l.name}</span>
              <span className="ladder-example">{l.example}</span>
            </div>
            {i < LAYERS.length - 1 && <span className="ladder-arrow" aria-hidden="true">↓</span>}
          </li>
        ))}
      </ol>
      <p className="privacy-note">
        Access is granted per level, per consumer — not assumed from the sensor.
      </p>
    </section>
  )
}
