import { useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import type { ThreeEvent } from '@react-three/fiber'
import { Mesh, MeshStandardMaterial } from 'three'
import { ROOMS, SCENE_COLORS, type RoomId } from '@/lib/scene-config'

interface RoomFloorProps {
  room: RoomId
  selected: boolean
  onSelect: (room: RoomId) => void
}

/**
 * Interactive floor plate for one room. Hover subtly tints the floor;
 * click selects the room and opens the context inspector.
 */
export function RoomFloor({ room, selected, onSelect }: RoomFloorProps) {
  const spec = ROOMS[room]
  const [hovered, setHovered] = useState(false)
  const matRef = useRef<MeshStandardMaterial>(null)
  const hitRef = useRef<Mesh>(null)
  const target = useRef(0)

  useFrame((_, dt) => {
    target.current = selected ? 0.16 : hovered ? 0.1 : 0
    if (matRef.current) {
      matRef.current.opacity += (target.current - matRef.current.opacity) * Math.min(1, dt * 8)
    }
  })

  const handleClick = (e: ThreeEvent<MouseEvent>) => {
    e.stopPropagation()
    onSelect(room)
  }

  return (
    <group>
      {/* highlight overlay */}
      <mesh position={[spec.cx, 0.012, spec.cz]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[spec.w - 0.1, spec.d - 0.1]} />
        <meshStandardMaterial
          ref={matRef}
          color={SCENE_COLORS.overlayStrong}
          transparent
          opacity={0}
          depthWrite={false}
        />
      </mesh>
      {/* invisible hit target */}
      <mesh
        ref={hitRef}
        position={[spec.cx, 0.05, spec.cz]}
        rotation={[-Math.PI / 2, 0, 0]}
        onClick={handleClick}
        onPointerOver={(e) => {
          e.stopPropagation()
          setHovered(true)
          document.body.style.cursor = 'pointer'
        }}
        onPointerOut={() => {
          setHovered(false)
          document.body.style.cursor = ''
        }}
      >
        <planeGeometry args={[spec.w, spec.d]} />
        <meshBasicMaterial visible={false} />
      </mesh>
    </group>
  )
}
