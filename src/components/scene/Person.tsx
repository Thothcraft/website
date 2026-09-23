import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Group, MathUtils } from 'three'
import { AMBIENT } from '@/lib/motion-config'
import { SCENE_COLORS as C } from '@/lib/scene-config'
import { Ball, Cyl } from './parts'

type V3 = [number, number, number]

interface PersonProps {
  position: V3
  seated?: boolean
  rotationY?: number
}

/**
 * Abstract human figure — evidence of activity, not a game avatar.
 * Seated variant sits at the desk; standing variant can stroll between
 * waypoints on a very slow cycle.
 */
export function Person({ position, seated = false, rotationY = 0 }: PersonProps) {
  return (
    <group position={position} rotation={[0, rotationY, 0]}>
      {seated ? (
        <>
          {/* torso leaning slightly toward the desk */}
          <Cyl p={[0, 0.62, 0]} dims={[0.09, 0.12, 0.42]} c={C.person} r={[0.14, 0, 0]} />
          <Ball p={[0, 0.92, 0.05]} r0={0.095} c={C.personAccent} />
          {/* legs bent under the desk */}
          <Cyl p={[-0.08, 0.32, 0.1]} dims={[0.045, 0.045, 0.3]} c={C.person} r={[1.35, 0, 0]} />
          <Cyl p={[0.08, 0.32, 0.1]} dims={[0.045, 0.045, 0.3]} c={C.person} r={[1.35, 0, 0]} />
          {/* arm reaching to keyboard */}
          <Cyl p={[0.14, 0.66, 0.18]} dims={[0.032, 0.032, 0.3]} c={C.person} r={[1.2, 0, -0.3]} />
        </>
      ) : (
        <>
          <Cyl p={[0, 0.72, 0]} dims={[0.1, 0.13, 0.55]} c={C.person} />
          <Ball p={[0, 1.12, 0]} r0={0.1} c={C.personAccent} />
          <Cyl p={[-0.07, 0.25, 0]} dims={[0.05, 0.045, 0.5]} c={C.person} />
          <Cyl p={[0.07, 0.25, 0]} dims={[0.05, 0.045, 0.5]} c={C.person} />
        </>
      )}
    </group>
  )
}

const WAYPOINTS: V3[] = [
  [3.4, 0, -1.2], // near kitchen
  [1.6, 0, 0.9], // near coffee table
  [3.6, 0, 2.4], // near couch end
]

interface WalkerProps {
  reducedMotion: boolean
}

/** Person 2 — occasionally walks between kitchen and living area. */
export function WalkingPerson({ reducedMotion }: WalkerProps) {
  const group = useRef<Group>(null)
  const t = useRef(0)

  useFrame((_, dt) => {
    const g = group.current
    if (!g) return
    if (reducedMotion) {
      g.position.set(...WAYPOINTS[0])
      return
    }
    t.current = (t.current + dt * 1000) % (AMBIENT.walkSegmentMs * WAYPOINTS.length)
    const seg = Math.floor(t.current / AMBIENT.walkSegmentMs)
    const segT = (t.current % AMBIENT.walkSegmentMs) / AMBIENT.walkSegmentMs
    const from = WAYPOINTS[seg]
    const to = WAYPOINTS[(seg + 1) % WAYPOINTS.length]
    // Pause at each waypoint: move only during middle 55% of the segment
    const move = MathUtils.smoothstep(segT, 0.22, 0.78)
    g.position.set(
      MathUtils.lerp(from[0], to[0], move),
      0,
      MathUtils.lerp(from[2], to[2], move),
    )
    const dx = to[0] - from[0]
    const dz = to[2] - from[2]
    if (Math.abs(dx) + Math.abs(dz) > 0.001) {
      g.rotation.y = MathUtils.lerp(g.rotation.y, Math.atan2(dx, dz), 0.05)
    }
  })

  return (
    <group ref={group} position={WAYPOINTS[0]}>
      <Person position={[0, 0, 0]} />
    </group>
  )
}
