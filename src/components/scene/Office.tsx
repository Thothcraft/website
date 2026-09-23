import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import type { MeshStandardMaterial } from 'three'
import { AMBIENT } from '@/lib/motion-config'
import { SCENE_COLORS as C } from '@/lib/scene-config'
import { Box, Cyl, Ball } from './parts'

interface OfficeProps {
  reducedMotion: boolean
}

/**
 * Office / research workspace — desk against the back wall, monitor that
 * slowly falls asleep, laptop, open notebook, coffee cup, misaligned chair,
 * bookshelf and a slightly irregular plant.
 */
export function Office({ reducedMotion }: OfficeProps) {
  const screenMat = useRef<MeshStandardMaterial>(null)
  const t = useRef(0)

  useFrame((_, dt) => {
    if (reducedMotion || !screenMat.current) return
    t.current = (t.current + dt * 1000) % AMBIENT.monitorCycleMs
    // Long awake plateau, slow dip to sleep, slow return
    const phase = t.current / AMBIENT.monitorCycleMs
    const lit = phase < 0.62 ? 1 : phase < 0.78 ? 1 - (phase - 0.62) / 0.16 : phase < 0.9 ? 0 : (phase - 0.9) / 0.1
    screenMat.current.emissiveIntensity = 0.06 + lit * 0.5
  })

  return (
    <group>
      {/* Desk — against back wall of office */}
      <group position={[-2.9, 0, -2.95]}>
        <Box p={[0, 0.72, 0]} s={[2.1, 0.05, 0.78]} c={C.desk} />
        <Box p={[-0.95, 0.36, 0]} s={[0.06, 0.72, 0.7]} c={C.deskDark} />
        <Box p={[0.95, 0.36, 0]} s={[0.06, 0.72, 0.7]} c={C.deskDark} />
        {/* modesty panel */}
        <Box p={[0, 0.45, -0.33]} s={[1.9, 0.5, 0.03]} c={C.deskDark} />

        {/* Monitor — screen emissive cycles to sleep */}
        <group position={[-0.35, 0.745, -0.12]} rotation={[0, 0.1, 0]}>
          <Box p={[0, 0.16, 0]} s={[0.05, 0.28, 0.05]} c={C.metal} />
          <Box p={[0, 0.02, 0]} s={[0.24, 0.02, 0.18]} c={C.metal} />
          <Box p={[0, 0.42, 0]} s={[0.62, 0.38, 0.03]} c={C.metal} />
          <mesh position={[0, 0.42, 0.017]}>
            <planeGeometry args={[0.57, 0.33]} />
            <meshStandardMaterial
              ref={screenMat}
              color={C.screen}
              emissive={C.screenLit}
              emissiveIntensity={0.56}
              roughness={0.6}
            />
          </mesh>
        </group>

        {/* Laptop — open, slightly angled */}
        <group position={[0.42, 0.745, 0.05]} rotation={[0, -0.28, 0]}>
          <Box p={[0, 0.012, 0]} s={[0.34, 0.024, 0.24]} c={C.metal} />
          <group position={[0, 0.02, -0.11]} rotation={[-1.85, 0, 0]}>
            <Box p={[0, 0.11, 0]} s={[0.34, 0.23, 0.012]} c={C.metal} />
            <mesh position={[0, 0.11, 0.008]}>
              <planeGeometry args={[0.3, 0.19]} />
              <meshStandardMaterial color={C.screen} emissive={C.screenLit} emissiveIntensity={0.35} roughness={0.6} />
            </mesh>
          </group>
        </group>

        {/* Open notebook — two angled pages */}
        <group position={[0.05, 0.748, 0.22]} rotation={[0, 0.42, 0]}>
          <Box p={[-0.075, 0.004, 0]} s={[0.15, 0.008, 0.21]} c={C.paper} r={[0, 0, 0.05]} />
          <Box p={[0.075, 0.004, 0]} s={[0.15, 0.008, 0.21]} c={C.paper} r={[0, 0, -0.05]} />
        </group>

        {/* Coffee cup beside the keyboard */}
        <group position={[-0.72, 0.745, 0.16]}>
          <Cyl p={[0, 0.045, 0]} dims={[0.038, 0.033, 0.09]} c={C.pot} />
          <mesh position={[0.05, 0.05, 0]} rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[0.026, 0.007, 8, 16, Math.PI]} />
            <meshStandardMaterial color={C.pot} roughness={0.9} />
          </mesh>
        </group>

        {/* Cable trailing off the desk */}
        <mesh position={[-0.9, 0.72, -0.3]} rotation={[Math.PI / 2, 0, 0.5]}>
          <torusGeometry args={[0.09, 0.008, 6, 20, Math.PI * 1.2]} />
          <meshStandardMaterial color={C.metal} roughness={0.95} />
        </mesh>
      </group>

      {/* Chair — deliberately not parallel to the desk */}
      <group position={[-2.45, 0, -1.85]} rotation={[0, 0.42, 0]}>
        <Box p={[0, 0.44, 0]} s={[0.46, 0.05, 0.44]} c={C.fabricDark} />
        <Box p={[0, 0.72, -0.21]} s={[0.44, 0.52, 0.05]} c={C.fabricDark} r={[0.09, 0, 0]} />
        <Cyl p={[0, 0.22, 0]} dims={[0.03, 0.03, 0.42]} c={C.metal} />
        {[0, 1, 2, 3, 4].map((i) => {
          const a = (i / 5) * Math.PI * 2
          return (
            <Box
              key={i}
              p={[Math.cos(a) * 0.22, 0.03, Math.sin(a) * 0.22]}
              s={[0.2, 0.025, 0.045]}
              c={C.metal}
              r={[0, -a, 0]}
            />
          )
        })}
      </group>

      {/* Bookshelf on the left wall */}
      <group position={[-4.82, 0, -1.4]} rotation={[0, Math.PI / 2, 0]}>
        <Box p={[0, 0.9, 0]} s={[1.5, 1.8, 0.3]} c={C.deskDark} />
        {[0.35, 0.85, 1.35].map((y) => (
          <Box key={y} p={[0, y, 0.02]} s={[1.38, 0.03, 0.26]} c={C.desk} />
        ))}
        {/* sparse books — asymmetric heights */}
        {[
          [-0.5, 0.47, 0.22], [-0.38, 0.47, 0.26], [-0.24, 0.47, 0.2],
          [0.3, 0.97, 0.24], [0.44, 0.97, 0.28], [0.56, 0.97, 0.22],
          [-0.3, 1.47, 0.25], [-0.16, 1.47, 0.21],
        ].map(([x, y, h], i) => (
          <Box key={i} p={[x, y + h / 2 - 0.11, 0.04]} s={[0.09, h, 0.18]} c={i % 3 === 0 ? C.book : i % 3 === 1 ? C.fabricDark : C.metal} r={[0, 0, i === 5 ? 0.14 : 0]} />
        ))}
        {/* one book left flat on top */}
        <Box p={[0.3, 1.83, 0]} s={[0.24, 0.035, 0.17]} c={C.paper} r={[0, 0.3, 0]} />
      </group>

      {/* Plant — slightly irregular orientation */}
      <group position={[-4.4, 0, -3.0]} rotation={[0, 0.35, 0.04]}>
        <Cyl p={[0, 0.14, 0]} dims={[0.13, 0.1, 0.28]} c={C.pot} />
        <Ball p={[0, 0.42, 0]} r0={0.2} c={C.plant} />
        <Ball p={[0.12, 0.52, 0.06]} r0={0.13} c={C.plant} />
        <Ball p={[-0.1, 0.5, -0.05]} r0={0.11} c={C.plant} />
      </group>
    </group>
  )
}
