import { useEffect, useRef } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { PerspectiveCamera } from '@react-three/drei'
import { Vector3 } from 'three'
import type { PerspectiveCamera as PCam } from 'three'
import type { Mode } from '@/data/demo-context'
import { ANCHORS, CAMERA_PRESETS, FLOOR, MOBILE_CAMERA, ROOMS, SCENE_COLORS as C, WALL, type RoomId } from '@/lib/scene-config'
import { CAMERA_LERP } from '@/lib/motion-config'
import { Office } from './Office'
import { LivingArea } from './LivingArea'
import { Bedroom } from './Bedroom'
import { Person, WalkingPerson } from './Person'
import { ThothNode } from './ThothNode'
import { RoomFloor } from './Room'
import { ObservationOverlay } from './ObservationOverlay'
import { SemanticOverlay } from './SemanticOverlay'

interface CameraRigProps {
  mode: Mode
  isMobile: boolean
  reducedMotion: boolean
}

/** Eases the camera toward the per-mode preset — 2–6° adjustments only. */
function CameraRig({ mode, isMobile, reducedMotion }: CameraRigProps) {
  const camera = useThree((s) => s.camera) as PCam
  const target = useRef(new Vector3(0, 0, 0))
  const goalPos = useRef(new Vector3())
  const goalTgt = useRef(new Vector3())

  useEffect(() => {
    const preset = isMobile ? MOBILE_CAMERA : CAMERA_PRESETS[mode]
    goalPos.current.set(preset.position[0], preset.position[1], preset.position[2])
    goalTgt.current.set(preset.target[0], preset.target[1], preset.target[2])
    if (reducedMotion) {
      camera.position.copy(goalPos.current)
      target.current.copy(goalTgt.current)
      camera.lookAt(target.current)
    }
  }, [mode, isMobile, reducedMotion, camera])

  useFrame(() => {
    if (reducedMotion) return
    camera.position.lerp(goalPos.current, CAMERA_LERP)
    target.current.lerp(goalTgt.current, CAMERA_LERP)
    camera.lookAt(target.current)
  })

  return null
}

/** Low perimeter + divider walls — open-roof architectural model. */
function Walls() {
  const { width: W, depth: D } = FLOOR
  const h = WALL.height
  const t = WALL.thickness
  const hw = W / 2
  const hd = D / 2
  return (
    <group>
      {/* perimeter */}
      <WallSeg p={[0, h / 2, -hd]} s={[W + t, h, t]} />
      <WallSeg p={[0, h / 2, hd]} s={[W + t, h, t]} />
      <WallSeg p={[-hw, h / 2, 0]} s={[t, h, D]} />
      <WallSeg p={[hw, h / 2, 0]} s={[t, h, D]} />
      {/* divider between left column and living area — doorway gap at z≈0.4 */}
      <WallSeg p={[0.05, h / 2, -1.95]} s={[t, h, 3.1]} />
      <WallSeg p={[0.05, h / 2, 2.45]} s={[t, h, 2.1]} />
      {/* divider between office and bedroom — doorway gap at z≈1.15 */}
      <WallSeg p={[-3.6, h / 2, 0.6]} s={[2.8, h, t]} />
      <WallSeg p={[-0.75, h / 2, 0.6]} s={[1.5, h, t]} />
    </group>
  )
}

function WallSeg({ p, s }: { p: [number, number, number]; s: [number, number, number] }) {
  return (
    <mesh position={p} castShadow receiveShadow>
      <boxGeometry args={s} />
      <meshStandardMaterial color={C.wall} roughness={0.95} />
    </mesh>
  )
}

/** Subtle daylight drift — imperceptible unless you watch for a minute. */
function Daylight({ reducedMotion }: { reducedMotion: boolean }) {
  const light = useRef<import('three').DirectionalLight>(null)
  const t = useRef(0)
  useFrame((_, dt) => {
    if (reducedMotion || !light.current) return
    t.current += dt
    light.current.intensity = 2.1 + Math.sin(t.current * 0.02) * 0.18
  })
  return (
    <directionalLight
      ref={light}
      position={[6, 10, 4]}
      intensity={2.1}
      color="#fff4e0"
      castShadow
      shadow-mapSize={[1024, 1024]}
      shadow-camera-left={-8}
      shadow-camera-right={8}
      shadow-camera-top={8}
      shadow-camera-bottom={-8}
      shadow-bias={-0.0004}
    />
  )
}

export interface LivingSpaceProps {
  mode: Mode
  isMobile: boolean
  reducedMotion: boolean
  selectedRoom: RoomId | null
  onSelectRoom: (room: RoomId) => void
}

export default function LivingSpace({ mode, isMobile, reducedMotion, selectedRoom, onSelectRoom }: LivingSpaceProps) {
  const showObs = mode === 'observations'
  const showSem = mode === 'understanding'

  return (
    <Canvas
      dpr={[1, 1.5]}
      shadows
      gl={{ antialias: true, powerPreference: 'high-performance' }}
      style={{ position: 'absolute', inset: 0 }}
      aria-hidden="true"
    >
      <PerspectiveCamera makeDefault position={CAMERA_PRESETS.physical.position} fov={34} />
      <CameraRig mode={mode} isMobile={isMobile} reducedMotion={reducedMotion} />

      <color attach="background" args={[C.floorPlate]} />
      <fog attach="fog" args={[C.floorPlate, 22, 40]} />
      <hemisphereLight args={['#fff8ec', '#8a8272', 0.85]} />
      <Daylight reducedMotion={reducedMotion} />

      {/* floor plate + ground */}
      <mesh position={[0, -FLOOR.plate / 2, 0]} receiveShadow>
        <boxGeometry args={[FLOOR.width + 0.6, FLOOR.plate, FLOOR.depth + 0.6]} />
        <meshStandardMaterial color={C.floorPlate} roughness={1} />
      </mesh>
      <mesh position={[0, 0.001, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[FLOOR.width, FLOOR.depth]} />
        <meshStandardMaterial color={C.floor} roughness={0.95} />
      </mesh>
      {/* larger ground plane catches the plate shadow */}
      <mesh position={[0, -FLOOR.plate - 0.001, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[60, 60]} />
        <meshStandardMaterial color="#e7e1d2" roughness={1} />
      </mesh>

      <Walls />
      <Office reducedMotion={reducedMotion} />
      <LivingArea />
      <Bedroom />

      {/* inhabitants */}
      <Person position={[-2.5, 0.42, -2.0]} seated rotationY={Math.PI} />
      <WalkingPerson reducedMotion={reducedMotion} />

      {/* sensing nodes */}
      <ThothNode position={[ANCHORS.nodeOffice[0], ANCHORS.nodeOffice[1], ANCHORS.nodeOffice[2]]} rotationY={Math.PI / 2} />
      <ThothNode position={[ANCHORS.nodeLiving[0], ANCHORS.nodeLiving[1], ANCHORS.nodeLiving[2]]} rotationY={-Math.PI / 2} />

      {/* interactive room floors */}
      {(Object.keys(ROOMS) as RoomId[]).map((r) => (
        <RoomFloor key={r} room={r} selected={selectedRoom === r} onSelect={onSelectRoom} />
      ))}

      {showObs && <ObservationOverlay />}
      {showSem && <SemanticOverlay />}
    </Canvas>
  )
}
