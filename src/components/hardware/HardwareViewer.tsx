import { Suspense, useEffect, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { ContactShadows, OrbitControls } from '@react-three/drei'
import { Esp32Model, PinetimeModel, ThothOneModel } from './models'
import { HARDWARE, type HardwareId } from './specs'
import './hardware.css'

const CAMERA: Record<HardwareId, [number, number, number]> = {
  'thoth-one': [1.25, 1.0, 1.35],
  esp32: [0.55, 0.45, 0.6],
  pinetime: [0.55, 0.4, 0.75],
}

function Model({ id, open }: { id: HardwareId; open: boolean }) {
  if (id === 'esp32') return <Esp32Model />
  if (id === 'pinetime') return <PinetimeModel />
  return <ThothOneModel open={open} />
}

/**
 * Interactive 3D viewer for the official fleet hardware. `device` pins a
 * single model (product page / docs embed); otherwise tabs switch models.
 * Thoth One plays an open/close loop until the user toggles it.
 */
export function HardwareViewer({ device, showSpecs = true, compact = false }: {
  device?: HardwareId
  showSpecs?: boolean
  compact?: boolean
}) {
  const [id, setId] = useState<HardwareId>(device ?? 'thoth-one')
  const [open, setOpen] = useState(false)
  const [auto, setAuto] = useState(true)
  const spec = HARDWARE[id]

  useEffect(() => {
    if (!auto || id !== 'thoth-one') return
    const t = setInterval(() => setOpen((o) => !o), 3200)
    return () => clearInterval(t)
  }, [auto, id])

  return (
    <div className={`hw-viewer${compact ? ' compact' : ''}`}>
      <div className="hw-stage">
        {!device && (
          <div className="hw-tabs" role="tablist">
            {(Object.keys(HARDWARE) as HardwareId[]).map((k) => (
              <button key={k} role="tab" aria-selected={k === id}
                      className={k === id ? 'on' : ''} onClick={() => setId(k)}>
                {HARDWARE[k].name}
              </button>
            ))}
          </div>
        )}
        <Canvas key={id} shadows dpr={[1, 2]}
                camera={{ position: CAMERA[id], fov: 35, near: 0.01, far: 50 }}>
          <color attach="background" args={['#f4f1ea']} />
          <ambientLight intensity={0.65} />
          <directionalLight position={[2, 4, 3]} intensity={1.4} castShadow
                            shadow-mapSize={[1024, 1024]} />
          <directionalLight position={[-3, 2, -2]} intensity={0.35} />
          <Suspense fallback={null}>
            <group scale={0.1}>
              <Model id={id} open={open} />
            </group>
          </Suspense>
          <ContactShadows position={[0, -0.25, 0]} opacity={0.35} scale={3} blur={2.4} far={1} />
          <OrbitControls makeDefault enablePan={false} autoRotate
                         autoRotateSpeed={0.6} minDistance={0.3} maxDistance={4} />
        </Canvas>
        {id === 'thoth-one' && (
          <button className="hw-toggle" onClick={() => { setAuto(false); setOpen((o) => !o) }}>
            {open ? 'Close enclosure' : 'Open enclosure'}
          </button>
        )}
      </div>
      {showSpecs && (
        <aside className="hw-specs">
          <p className="eyebrow">{spec.name.toUpperCase()}</p>
          <h3>{spec.tagline}</h3>
          <dl>
            {spec.specs.map(([k, v]) => (
              <div key={k}><dt>{k}</dt><dd>{v}</dd></div>
            ))}
          </dl>
          <ul>
            {spec.features.map((f) => <li key={f}>{f}</li>)}
          </ul>
          <a href={spec.docs} target="_blank" rel="noopener">Documentation ↗</a>
        </aside>
      )}
    </div>
  )
}
