import { SCENE_COLORS as C } from '@/lib/scene-config'
import { Box, Cyl } from './parts'

/**
 * Living area / kitchen — counter along the right wall, couch facing inward,
 * coffee table with a book left on it, floor lamp. Whitespace preserved.
 */
export function LivingArea() {
  return (
    <group>
      {/* Kitchen counter along the right wall */}
      <group position={[4.55, 0, -2.2]}>
        <Box p={[0, 0.44, 0]} s={[0.62, 0.88, 2.6]} c={C.wallCap} />
        <Box p={[0, 0.9, 0]} s={[0.66, 0.04, 2.66]} c={C.desk} />
        {/* sink */}
        <Box p={[-0.02, 0.925, -0.6]} s={[0.4, 0.02, 0.5]} c={C.metal} />
        <Cyl p={[-0.02, 1.02, -0.82]} dims={[0.015, 0.015, 0.2]} c={C.metal} />
        {/* kettle + cutting board */}
        <Cyl p={[0, 0.99, 0.5]} dims={[0.07, 0.09, 0.16]} c={C.metal} />
        <Box p={[0, 0.935, 1.0]} s={[0.3, 0.015, 0.42]} c={C.deskDark} r={[0, 0.12, 0]} />
        {/* two stools tucked under */}
        {[0.4, 1.15].map((z) => (
          <group key={z} position={[-0.62, 0, z]}>
            <Cyl p={[0, 0.3, 0]} dims={[0.16, 0.16, 0.03]} c={C.desk} />
            <Cyl p={[0, 0.15, 0]} dims={[0.02, 0.02, 0.3]} c={C.metal} />
          </group>
        ))}
      </group>

      {/* Couch — facing the room center, one cushion shifted */}
      <group position={[2.2, 0, 1.9]} rotation={[0, Math.PI, 0]}>
        <Box p={[0, 0.22, 0]} s={[1.9, 0.26, 0.8]} c={C.fabric} />
        <Box p={[0, 0.52, -0.32]} s={[1.9, 0.5, 0.18]} c={C.fabric} />
        <Box p={[-0.95, 0.42, 0]} s={[0.16, 0.44, 0.8]} c={C.fabric} />
        <Box p={[0.95, 0.42, 0]} s={[0.16, 0.44, 0.8]} c={C.fabric} />
        <Box p={[-0.48, 0.4, 0.06]} s={[0.86, 0.12, 0.62]} c={C.fabricDark} />
        <Box p={[0.48, 0.4, 0.06]} s={[0.86, 0.12, 0.62]} c={C.fabricDark} r={[0, 0.05, 0]} />
        {/* item left on the couch */}
        <Box p={[0.55, 0.5, 0.1]} s={[0.26, 0.05, 0.2]} c={C.book} r={[0, -0.35, 0]} />
      </group>

      {/* Coffee table */}
      <group position={[2.2, 0, 0.6]}>
        <Box p={[0, 0.3, 0]} s={[0.95, 0.04, 0.55]} c={C.desk} />
        {[[-0.4, -0.2], [0.4, -0.2], [-0.4, 0.2], [0.4, 0.2]].map(([x, z], i) => (
          <Cyl key={i} p={[x, 0.15, z]} dims={[0.02, 0.02, 0.3]} c={C.metal} />
        ))}
        {/* open magazine */}
        <group position={[-0.15, 0.325, 0]} rotation={[0, 0.5, 0]}>
          <Box p={[-0.08, 0.003, 0]} s={[0.16, 0.006, 0.22]} c={C.paper} r={[0, 0, 0.04]} />
          <Box p={[0.08, 0.003, 0]} s={[0.16, 0.006, 0.22]} c={C.paper} r={[0, 0, -0.04]} />
        </group>
      </group>

      {/* Floor lamp in the corner */}
      <group position={[4.35, 0, 2.9]}>
        <Cyl p={[0, 0.02, 0]} dims={[0.14, 0.16, 0.03]} c={C.metal} />
        <Cyl p={[0, 0.75, 0]} dims={[0.015, 0.015, 1.45]} c={C.metal} />
        <Cyl p={[0, 1.52, 0]} dims={[0.14, 0.19, 0.26]} c={C.paper} />
      </group>

      {/* Small rug under the coffee table */}
      <mesh position={[2.2, 0.015, 1.2]} rotation={[-Math.PI / 2, 0, 0.08]} receiveShadow>
        <planeGeometry args={[2.4, 1.7]} />
        <meshStandardMaterial color="#cfc7b4" roughness={1} />
      </mesh>
    </group>
  )
}
