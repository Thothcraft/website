import { SCENE_COLORS as C } from '@/lib/scene-config'
import { Box, Cyl } from './parts'

/** Bedroom / quiet area — bed, side table with lamp, low dresser. */
export function Bedroom() {
  return (
    <group>
      {/* Bed against the left wall */}
      <group position={[-4.0, 0, 2.1]}>
        <Box p={[0, 0.18, 0]} s={[1.5, 0.24, 2.1]} c={C.deskDark} />
        <Box p={[0, 0.36, 0]} s={[1.44, 0.14, 2.04]} c={C.bed} />
        {/* blanket folded slightly askew */}
        <Box p={[0.04, 0.45, 0.35]} s={[1.4, 0.06, 1.3]} c={C.blanket} r={[0, 0.03, 0]} />
        {/* pillow */}
        <Box p={[0, 0.46, -0.78]} s={[0.9, 0.12, 0.4]} c={C.paper} r={[0, -0.04, 0]} />
        {/* headboard */}
        <Box p={[0, 0.62, -1.08]} s={[1.5, 0.6, 0.06]} c={C.deskDark} />
      </group>

      {/* Side table + lamp */}
      <group position={[-2.6, 0, 0.95]}>
        <Box p={[0, 0.26, 0]} s={[0.42, 0.52, 0.42]} c={C.desk} />
        <Cyl p={[0, 0.56, 0]} dims={[0.05, 0.07, 0.06]} c={C.metal} />
        <Cyl p={[0, 0.72, 0]} dims={[0.012, 0.012, 0.28]} c={C.metal} />
        <Cyl p={[0, 0.9, 0]} dims={[0.09, 0.12, 0.14]} c={C.paper} />
      </group>

      {/* Low dresser on the divider wall */}
      <group position={[-1.4, 0, 3.15]}>
        <Box p={[0, 0.3, 0]} s={[1.3, 0.6, 0.45]} c={C.deskDark} />
        <Box p={[0, 0.62, 0]} s={[1.34, 0.03, 0.48]} c={C.desk} />
        {/* folded clothes left on top */}
        <Box p={[-0.3, 0.67, 0]} s={[0.3, 0.08, 0.28]} c={C.fabric} r={[0, 0.2, 0]} />
        <Box p={[-0.28, 0.73, 0.02]} s={[0.26, 0.05, 0.24]} c={C.fabricDark} r={[0, -0.1, 0]} />
      </group>
    </group>
  )
}
