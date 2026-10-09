import { useRef, type MutableRefObject } from 'react'
import { useFrame } from '@react-three/fiber'
import { RoundedBox } from '@react-three/drei'
import { DoubleSide, type Group, type Mesh, type MeshBasicMaterial } from 'three'
import { Box, Cyl } from '../../scene/parts'
import type { V3 } from '../../scene/types'

/* All models are authored in centimetres; the viewer scales the scene. */

const PCB_GREEN = '#1f6b3a'
const PCB_HAT = '#1d2f4f'
const PCB_ESP = '#20232a'
const SILVER = '#b8bcc2'
const BLACK = '#18181a'
const USB3_BLUE = '#2f5fb3'
const GOLD = '#c9a24a'
const SHELL = '#e9e3d6'
const SHELL_DARK = '#d4ccb9'
const ACCENT = '#a3502e'

/** Row of header pins. */
function PinHeader({ p, cols, rows = 2, pitch = 0.254, female = false }: {
  p: V3; cols: number; rows?: number; pitch?: number; female?: boolean
}) {
  const w = cols * pitch
  const d = rows * pitch
  return (
    <group position={p}>
      <Box p={[0, 0.125, 0]} s={[w, 0.25, d]} c={BLACK} />
      {!female && Array.from({ length: cols * rows }, (_, i) => {
        const cx = (i % cols) * pitch - w / 2 + pitch / 2
        const cz = Math.floor(i / cols) * pitch - d / 2 + pitch / 2
        return <Box key={i} p={[cx, 0.42, cz]} s={[0.064, 0.34, 0.064]} c={GOLD} metal={0.8} rough={0.3} />
      })}
    </group>
  )
}

/* ------------------------------------------------------------------ */
/* Raspberry Pi 5 (85 × 56 mm)                                         */
/* ------------------------------------------------------------------ */
function RaspberryPi5() {
  const t = 0.16
  return (
    <group>
      <Box p={[0, t / 2, 0]} s={[8.5, t, 5.6]} c={PCB_GREEN} />
      {/* BCM2712 + heat spreader */}
      <Box p={[-0.9, t + 0.12, -0.3]} s={[1.5, 0.24, 1.5]} c={SILVER} metal={0.7} rough={0.35} />
      {/* RP1 southbridge */}
      <Box p={[2.0, t + 0.06, -0.6]} s={[0.8, 0.12, 0.8]} c={BLACK} />
      {/* LPDDR4X */}
      <Box p={[-0.9, t + 0.06, 1.2]} s={[1.4, 0.1, 0.9]} c={BLACK} />
      {/* PMIC */}
      <Box p={[-3.0, t + 0.05, 0.4]} s={[0.6, 0.1, 0.6]} c={BLACK} />
      {/* Gigabit Ethernet RJ45 */}
      <Box p={[3.55, t + 0.68, 1.85]} s={[2.1, 1.36, 1.6]} c={SILVER} metal={0.6} rough={0.4} />
      {/* USB 2.0 stack */}
      <Box p={[3.65, t + 0.8, 0.05]} s={[1.75, 1.6, 1.3]} c={SILVER} metal={0.6} rough={0.4} />
      <Box p={[4.53, t + 0.45, 0.05]} s={[0.02, 0.4, 1.1]} c={BLACK} />
      <Box p={[4.53, t + 1.15, 0.05]} s={[0.02, 0.4, 1.1]} c={BLACK} />
      {/* USB 3.0 stack (blue tongues) */}
      <Box p={[3.65, t + 0.8, -1.75]} s={[1.75, 1.6, 1.3]} c={SILVER} metal={0.6} rough={0.4} />
      <Box p={[4.53, t + 0.45, -1.75]} s={[0.02, 0.4, 1.1]} c={USB3_BLUE} />
      <Box p={[4.53, t + 1.15, -1.75]} s={[0.02, 0.4, 1.1]} c={USB3_BLUE} />
      {/* USB-C power + 2× micro-HDMI on the long edge */}
      <Box p={[-3.1, t + 0.16, -2.55]} s={[0.9, 0.32, 0.75]} c={SILVER} metal={0.6} />
      <Box p={[-1.5, t + 0.17, -2.5]} s={[0.75, 0.34, 0.75]} c={SILVER} metal={0.6} />
      <Box p={[-0.2, t + 0.17, -2.5]} s={[0.75, 0.34, 0.75]} c={SILVER} metal={0.6} />
      {/* PCIe FFC + 2× MIPI CSI/DSI */}
      <Box p={[-4.0, t + 0.1, 0]} s={[0.35, 0.2, 1.6]} c="#d9d3c4" />
      <Box p={[0.9, t + 0.12, -1.9]} s={[0.4, 0.24, 1.3]} c="#d9d3c4" />
      <Box p={[1.5, t + 0.12, -1.9]} s={[0.4, 0.24, 1.3]} c="#d9d3c4" />
      {/* power button + fan header */}
      <Cyl p={[-3.9, t + 0.1, -2.3]} dims={[0.14, 0.14, 0.2]} c={BLACK} />
      <Box p={[2.6, t + 0.12, 1.4]} s={[0.5, 0.24, 0.25]} c="#f2efe7" />
      {/* 40-pin GPIO */}
      <PinHeader p={[-0.9, t, 2.42]} cols={20} />
    </group>
  )
}

/* ------------------------------------------------------------------ */
/* MMW-HAT — BGT60TR13C 60 GHz FMCW radar (65 × 56.5 mm HAT)           */
/* ------------------------------------------------------------------ */
function MmwHat() {
  const t = 0.16
  return (
    <group>
      <PinHeader p={[0, -0.85, 2.42 - 0]} cols={20} female />
      {/* stacking header body between Pi and HAT */}
      <Box p={[0, -0.42, 2.42]} s={[5.08, 0.84, 0.508]} c={BLACK} />
      <Box p={[0, t / 2, 0]} s={[6.5, t, 5.65]} c={PCB_HAT} />
      {/* radar shield + antennas */}
      <Box p={[0.6, t + 0.04, -0.4]} s={[2.4, 0.08, 2.0]} c="#2b3d5f" />
      <Box p={[0.6, t + 0.13, -0.4]} s={[0.65, 0.1, 0.5]} c={BLACK} />
      {/* 1 TX + 3 RX (L-shaped RX array for azimuth + elevation) */}
      <Box p={[-0.15, t + 0.09, -1.05]} s={[0.25, 0.02, 0.25]} c={GOLD} metal={0.9} rough={0.25} />
      {([[1.15, -1.05], [1.15, -0.55], [1.65, -1.05]] as [number, number][]).map(([x, z], i) => (
        <Box key={i} p={[x, t + 0.09, z]} s={[0.25, 0.02, 0.25]} c={GOLD} metal={0.9} rough={0.25} />
      ))}
      {/* MCU/LDO + status LED */}
      <Box p={[-2.0, t + 0.06, 0.6]} s={[0.7, 0.12, 0.7]} c={BLACK} />
      <Box p={[-2.6, t + 0.04, -1.8]} s={[0.25, 0.08, 0.15]} c={ACCENT} />
    </group>
  )
}

/* ------------------------------------------------------------------ */
/* Thoth One — enclosure with hinged lid                               */
/* ------------------------------------------------------------------ */
const W = 10.4   // x
const D = 7.6    // z
const H_BASE = 3.6
const H_LID = 1.1
const WALL = 0.3

export function ThothOneModel({ open }: { open: boolean }) {
  const lid = useRef<Group>(null)
  const stack = useRef<Group>(null)
  const prog = useRef(0)
  const fov = useRef(0)

  useFrame((_, dt) => {
    const target = open ? 1 : 0
    prog.current += (target - prog.current) * Math.min(1, dt * 3.2)
    const p = prog.current
    if (lid.current) lid.current.rotation.x = -p * (Math.PI * 0.62)
    if (stack.current) stack.current.position.y = 0.55 + p * 0.6
    fov.current = p
  })

  return (
    <group position={[0, -2.4, 0]}>
      {/* base tray */}
      <RoundedBox args={[W, WALL, D]} radius={0.12} position={[0, WALL / 2, 0]}>
        <meshStandardMaterial color={SHELL} roughness={0.85} />
      </RoundedBox>
      <Box p={[0, H_BASE / 2, -D / 2 + WALL / 2]} s={[W, H_BASE, WALL]} c={SHELL} rough={0.85} />
      <Box p={[0, H_BASE / 2, D / 2 - WALL / 2]} s={[W, H_BASE, WALL]} c={SHELL} rough={0.85} />
      <Box p={[-W / 2 + WALL / 2, H_BASE / 2, 0]} s={[WALL, H_BASE, D]} c={SHELL} rough={0.85} />
      <Box p={[W / 2 - WALL / 2, H_BASE / 2, 0]} s={[WALL, H_BASE, D]} c={SHELL} rough={0.85} />
      {/* port cut-outs: RJ45 + USB stacks (+x), USB-C + micro-HDMI (-z) */}
      <Box p={[W / 2 + 0.005, 1.55, 1.85]} s={[0.02, 1.5, 1.7]} c="#2a2824" />
      <Box p={[W / 2 + 0.005, 1.65, 0.05]} s={[0.02, 1.7, 1.4]} c="#2a2824" />
      <Box p={[W / 2 + 0.005, 1.65, -1.75]} s={[0.02, 1.7, 1.4]} c="#2a2824" />
      <Box p={[-3.1, 1.1, -D / 2 - 0.005]} s={[1.0, 0.45, 0.02]} c="#2a2824" />
      <Box p={[-1.5, 1.1, -D / 2 - 0.005]} s={[0.85, 0.45, 0.02]} c="#2a2824" />
      <Box p={[-0.2, 1.1, -D / 2 - 0.005]} s={[0.85, 0.45, 0.02]} c="#2a2824" />
      {/* vent slots */}
      {Array.from({ length: 6 }, (_, i) => (
        <Box key={i} p={[-W / 2 - 0.005, 1.4 + i * 0.28, 0]} s={[0.02, 0.1, 4.2]} c="#2a2824" />
      ))}
      {/* standoffs */}
      {([[-3.75, -2.45], [2.05, -2.45], [-3.75, 2.45], [2.05, 2.45]] as [number, number][]).map(([x, z], i) => (
        <Cyl key={i} p={[x - 0.5, 0.45, z]} dims={[0.22, 0.22, 0.6]} c={SHELL_DARK} />
      ))}

      {/* electronics stack: Pi 5 + MMW-HAT */}
      <group ref={stack} position={[-0.5, 0.55, 0]}>
        <RaspberryPi5 />
        <group position={[-0.9, 1.25, 0]}>
          <MmwHat />
        </group>
      </group>

      {/* lid — hinged on the back (-z) top edge */}
      <group ref={lid} position={[0, H_BASE, -D / 2]}>
        <group position={[0, H_LID / 2, D / 2]}>
          <RoundedBox args={[W, H_LID, D]} radius={0.25} smoothness={4}>
            <meshStandardMaterial color={SHELL} roughness={0.8} />
          </RoundedBox>
          {/* radome window over the radar antennas */}
          <Box p={[-0.8, H_LID / 2 + 0.005, -0.4]} s={[3.0, 0.02, 2.6]} c="#3b3a35" rough={0.4} />
          {/* status light pipe + logo bar */}
          <Cyl p={[3.8, H_LID / 2 + 0.01, 2.8]} dims={[0.12, 0.12, 0.04]} c={ACCENT} />
          <Box p={[2.6, H_LID / 2 + 0.005, -2.6]} s={[3.2, 0.02, 0.35]} c={SHELL_DARK} />
        </group>
        {/* hinge knuckles */}
        {[-3.8, 0, 3.8].map((x) => (
          <Cyl key={x} p={[x, 0, 0]} r={[0, 0, Math.PI / 2]} dims={[0.22, 0.22, 1.4]} c={SHELL_DARK} />
        ))}
      </group>

      <group position={[-1.7, H_BASE, -0.4]}>
        <RadarFov v={fov} />
      </group>
    </group>
  )
}

/** Radar field-of-view cone (±60°, up through the radome); fades in
 * once the lid is mostly open. */
function RadarFov({ v }: { v: MutableRefObject<number> }) {
  const mat = useRef<MeshBasicMaterial>(null)
  useFrame(({ clock }) => {
    if (mat.current) {
      const s = Math.max(0, v.current - 0.6) / 0.4
      mat.current.opacity = s * (0.1 + 0.05 * Math.sin(clock.elapsedTime * 3))
    }
  })
  return (
    <mesh position={[0, 4, 0]} rotation={[Math.PI, 0, 0]}>
      <coneGeometry args={[6.9, 8, 40, 1, true]} />
      <meshBasicMaterial ref={mat} color={ACCENT} transparent opacity={0} side={DoubleSide} depthWrite={false} />
    </mesh>
  )
}

/* ------------------------------------------------------------------ */
/* ESP32-C6-DevKitC-1 (51.8 × 25.4 mm)                                 */
/* ------------------------------------------------------------------ */
export function Esp32Model() {
  const t = 0.16
  const led = useRef<Mesh>(null)
  useFrame(({ clock }) => {
    const m = led.current?.material as { emissiveIntensity?: number } | undefined
    if (m) m.emissiveIntensity = 1 + Math.sin(clock.elapsedTime * 4) * 0.8
  })
  return (
    <group rotation={[0, 0, 0]} position={[0, -0.4, 0]}>
      <Box p={[0, t / 2, 0]} s={[5.18, t, 2.54]} c={PCB_ESP} />
      {/* ESP32-C6-WROOM-1 module: shield can + PCB antenna */}
      <Box p={[1.0, t + 0.16, 0]} s={[1.8, 0.32, 1.6]} c={SILVER} metal={0.7} rough={0.35} />
      <Box p={[2.2, t + 0.03, 0]} s={[0.7, 0.06, 1.8]} c="#2c2f36" />
      {Array.from({ length: 4 }, (_, i) => (
        <Box key={i} p={[2.2, t + 0.07, -0.6 + i * 0.4]} s={[0.5, 0.01, 0.08]} c={GOLD} metal={0.8} />
      ))}
      {/* 2× USB-C (UART + USB-Serial/JTAG) */}
      <Box p={[-2.4, t + 0.16, 0.55]} s={[0.75, 0.32, 0.9]} c={SILVER} metal={0.6} />
      <Box p={[-2.4, t + 0.16, -0.55]} s={[0.75, 0.32, 0.9]} c={SILVER} metal={0.6} />
      {/* BOOT / RESET */}
      <Box p={[-1.2, t + 0.08, 0.75]} s={[0.4, 0.16, 0.3]} c={BLACK} />
      <Box p={[-1.2, t + 0.08, -0.75]} s={[0.4, 0.16, 0.3]} c={BLACK} />
      {/* USB-UART bridge + LDO */}
      <Box p={[-1.6, t + 0.05, 0]} s={[0.5, 0.1, 0.5]} c={BLACK} />
      <Box p={[-0.5, t + 0.05, 0]} s={[0.3, 0.1, 0.4]} c={BLACK} />
      {/* WS2812 RGB LED on GPIO8 */}
      <mesh ref={led} position={[-0.5, t + 0.08, 0.7]}>
        <boxGeometry args={[0.25, 0.12, 0.25]} />
        <meshStandardMaterial color="#6fb3ff" emissive="#3d8cff" emissiveIntensity={1.5} />
      </mesh>
      {/* 2× 16-pin headers (pointing down) */}
      <group rotation={[Math.PI, 0, 0]}>
        <PinHeader p={[0, 0, 1.14]} cols={16} rows={1} />
        <PinHeader p={[0, 0, -1.14]} cols={16} rows={1} />
      </group>
    </group>
  )
}

/* ------------------------------------------------------------------ */
/* PineTime (37.5 × 40 × 9.6 mm) on a 20 mm strap                      */
/* ------------------------------------------------------------------ */
export function PinetimeModel() {
  const face = useRef<Group>(null)
  useFrame(({ clock }) => {
    if (face.current) face.current.rotation.y = -clock.elapsedTime * 0.35
  })
  return (
    <group rotation={[-Math.PI / 2.4, 0, 0]}>
      {/* case */}
      <RoundedBox args={[3.75, 4.0, 0.96]} radius={0.45} smoothness={6}>
        <meshStandardMaterial color="#2a2a2c" roughness={0.45} metalness={0.3} />
      </RoundedBox>
      {/* 1.3" 240×240 IPS (≈2.3 cm active) behind glass */}
      <Box p={[0, 0, 0.485]} s={[3.2, 3.45, 0.02]} c="#0b0b0c" rough={0.15} />
      <group position={[0, 0, 0.5]}>
        <mesh>
          <planeGeometry args={[2.3, 2.3]} />
          <meshBasicMaterial color="#101820" />
        </mesh>
        {/* clock hands + HR/steps ticks */}
        <group ref={face}>
          <Box p={[0, 0.45, 0.01]} s={[0.06, 0.9, 0.005]} c="#f2efe7" />
        </group>
        <Box p={[0.3, 0, 0.012]} s={[0.6, 0.08, 0.005]} c={ACCENT} />
        {Array.from({ length: 12 }, (_, i) => {
          const a = (i / 12) * Math.PI * 2
          return <Box key={i} p={[Math.sin(a) * 1.0, Math.cos(a) * 1.0, 0.01]} s={[0.05, 0.14, 0.005]} r={[0, 0, -a]} c="#9aa7b3" />
        })}
      </group>
      {/* side button */}
      <Cyl p={[1.95, 0.3, 0]} r={[0, 0, Math.PI / 2]} dims={[0.18, 0.18, 0.25]} c={SILVER} />
      {/* HRS3300 window on the back */}
      <Cyl p={[0, 0, -0.49]} r={[Math.PI / 2, 0, 0]} dims={[0.5, 0.5, 0.03]} c="#3a1a1a" />
      {/* 20 mm silicone strap */}
      <Box p={[0, 3.6, -0.1]} s={[2.0, 3.4, 0.3]} c="#3d3b38" rough={0.95} />
      <Box p={[0, -3.6, -0.1]} s={[2.0, 3.4, 0.3]} c="#3d3b38" rough={0.95} />
    </group>
  )
}
