import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Html, Line } from '@react-three/drei'
import { Group, Vector3 } from 'three'
import { ANCHORS, SCENE_COLORS as C } from '@/lib/scene-config'

type V3 = [number, number, number]

/** Faint concentric radar arcs on the floor around a node. */
function RadarArcs({ center }: { center: V3 }) {
  const sweep = useRef<Group>(null)
  useFrame((_, dt) => {
    if (sweep.current) sweep.current.rotation.y += dt * 0.35
  })
  const rings = [0.9, 1.7, 2.5]
  return (
    <group position={center}>
      {rings.map((r) => (
        <mesh key={r} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.02, 0]}>
          <ringGeometry args={[r - 0.012, r, 64, 1, 0, Math.PI * 1.5]} />
          <meshBasicMaterial color={C.overlay} transparent opacity={0.28} side={2} depthWrite={false} />
        </mesh>
      ))}
      {/* slow sweep wedge */}
      <group ref={sweep}>
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.021, 0]}>
          <ringGeometry args={[0.2, 2.5, 32, 1, 0, 0.16]} />
          <meshBasicMaterial color={C.overlay} transparent opacity={0.12} side={2} depthWrite={false} />
        </mesh>
      </group>
    </group>
  )
}

/** Restrained dashed path between two points — Wi-Fi CSI indication. */
function CsiPath({ from, to }: { from: V3 | readonly [number, number, number]; to: V3 | readonly [number, number, number] }) {
  const points = useMemo(() => {
    const a = new Vector3(...from)
    const b = new Vector3(...to)
    const mid = a.clone().lerp(b, 0.5).add(new Vector3(0, 0.55, 0))
    const curve = [a, mid, b]
    return curve
  }, [from, to])
  return (
    <Line
      points={points}
      color={C.overlay}
      lineWidth={1}
      dashed
      dashSize={0.09}
      gapSize={0.07}
      transparent
      opacity={0.4}
    />
  )
}

/** Tiny tracking dot near the seated person — radar point output. */
function TrackDot() {
  const ref = useRef<Group>(null)
  useFrame(({ clock }) => {
    if (!ref.current) return
    const t = clock.elapsedTime * 0.4
    ref.current.position.set(
      ANCHORS.personDesk[0] + Math.sin(t) * 0.14,
      0.03,
      ANCHORS.personDesk[2] + Math.cos(t * 0.8) * 0.12,
    )
  })
  return (
    <group ref={ref}>
      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[0.05, 20]} />
        <meshBasicMaterial color={C.overlayStrong} transparent opacity={0.85} depthWrite={false} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.001, 0]}>
        <ringGeometry args={[0.08, 0.095, 24]} />
        <meshBasicMaterial color={C.overlayStrong} transparent opacity={0.4} depthWrite={false} />
      </mesh>
    </group>
  )
}

function ObsLabel({ position, children }: { position: V3; children: React.ReactNode }) {
  return (
    <Html position={position} center zIndexRange={[30, 0]} wrapperClass="obs-label-wrap">
      <span className="scene-label">{children}</span>
    </Html>
  )
}

/**
 * Observations mode — reveals what each device senses. Scientific, spatial,
 * muted. No lasers, no neon.
 */
export function ObservationOverlay() {
  return (
    <group>
      <RadarArcs center={[ANCHORS.nodeOffice[0], 0, ANCHORS.nodeOffice[2]]} />
      <RadarArcs center={[ANCHORS.nodeLiving[0], 0, ANCHORS.nodeLiving[2]]} />
      <CsiPath from={[4.4, 0.9, 2.9]} to={ANCHORS.nodeLiving} />
      <CsiPath from={[4.4, 0.9, 2.9]} to={ANCHORS.nodeOffice} />
      <TrackDot />

      <ObsLabel position={[ANCHORS.nodeOffice[0], ANCHORS.nodeOffice[1] + 0.35, ANCHORS.nodeOffice[2]]}>
        Radar
      </ObsLabel>
      <ObsLabel position={[ANCHORS.nodeLiving[0], ANCHORS.nodeLiving[1] + 0.35, ANCHORS.nodeLiving[2]]}>
        Radar · BLE
      </ObsLabel>
      <ObsLabel position={[2.6, 1.5, 1.2]}>Wi-Fi CSI</ObsLabel>
      <ObsLabel position={[ANCHORS.monitor[0], ANCHORS.monitor[1] + 0.45, ANCHORS.monitor[2]]}>
        Computer state
      </ObsLabel>
      <ObsLabel position={[ANCHORS.envSensor[0], ANCHORS.envSensor[1] + 0.3, ANCHORS.envSensor[2]]}>
        Environment
      </ObsLabel>
    </group>
  )
}
