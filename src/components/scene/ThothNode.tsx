import { SCENE_COLORS as C } from '@/lib/scene-config'
import { Box } from './parts'

type V3 = [number, number, number]

interface ThothNodeProps {
  position: V3
  rotationY?: number
}

/**
 * Thoth sensing node — small wall-mounted enclosure with a radar aperture
 * face and a status LED. Built from simple geometry, no sci-fi styling.
 */
export function ThothNode({ position, rotationY = 0 }: ThothNodeProps) {
  return (
    <group position={position} rotation={[0, rotationY, 0]}>
      {/* mounting plate */}
      <Box p={[0, 0, -0.015]} s={[0.16, 0.2, 0.02]} c={C.metal} />
      {/* enclosure */}
      <Box p={[0, 0, 0.03]} s={[0.13, 0.17, 0.05]} c={C.node} />
      {/* radar aperture face */}
      <Box p={[0, 0.02, 0.058]} s={[0.09, 0.09, 0.008]} c="#3d3b34" />
      {/* status LED */}
      <mesh position={[0, -0.06, 0.058]}>
        <sphereGeometry args={[0.008, 10, 8]} />
        <meshStandardMaterial color={C.nodeLed} emissive={C.nodeLed} emissiveIntensity={1.6} />
      </mesh>
    </group>
  )
}
