import { Html } from '@react-three/drei'
import { ANCHORS, ROOMS } from '@/lib/scene-config'
import { semanticOutputs } from '@/data/demo-context'

type V3 = [number, number, number]

const LABEL_POSITIONS: Record<string, V3> = {
  'office-occ': [ROOMS.office.cx, 1.5, ROOMS.office.cz],
  'person-state': [ANCHORS.personDesk[0], ANCHORS.personDesk[1] + 0.55, ANCHORS.personDesk[2]],
  'person-loc': [ANCHORS.personDesk[0] + 0.7, 0.5, ANCHORS.personDesk[2] + 0.5],
  'computer-state': [ANCHORS.monitor[0], ANCHORS.monitor[1] + 0.45, ANCHORS.monitor[2]],
  env: [ANCHORS.envSensor[0], ANCHORS.envSensor[1] + 0.3, ANCHORS.envSensor[2]],
}

/**
 * Understanding mode — raw sensing replaced by semantic model outputs
 * attached to the objects and rooms they describe.
 */
export function SemanticOverlay() {
  return (
    <group>
      {semanticOutputs.map((o) => (
        <Html key={o.id} position={LABEL_POSITIONS[o.id]} center zIndexRange={[30, 0]} wrapperClass="obs-label-wrap">
          <span className="scene-label semantic">
            <strong>{o.subject}</strong>
            {o.value}
          </span>
        </Html>
      ))}
    </group>
  )
}
