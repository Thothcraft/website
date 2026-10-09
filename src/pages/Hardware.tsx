import { useParams, useSearchParams } from 'react-router-dom'
import { HardwareViewer } from '../components/hardware/HardwareViewer'
import { HARDWARE, type HardwareId } from '../components/hardware/specs'

/**
 * /hardware            — all official devices (tabs)
 * /hardware/:id        — one device (thoth-one | esp32 | pinetime)
 * ?embed=1             — chrome-less full-viewport view for docs iframes
 */
export default function Hardware() {
  const { id } = useParams()
  const [qs] = useSearchParams()
  const device = id && id in HARDWARE ? (id as HardwareId) : undefined
  if (qs.get('embed') === '1') {
    return (
      <div className="hw-embed">
        <HardwareViewer device={device} showSpecs={false} compact />
      </div>
    )
  }
  return (
    <div className="product-page">
      <section className="included">
        <p className="eyebrow">HARDWARE</p>
        <h2>Official Thoth devices.</h2>
        <p className="local-intro">
          Drag to orbit. Every node serves its local dashboard at
          {' '}<code>http://thoth-&lt;name&gt;.local:5000</code>.
        </p>
        <HardwareViewer device={device} />
      </section>
    </div>
  )
}
