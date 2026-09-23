import type { Mode } from '@/data/demo-context'

/**
 * Central scene configuration for the Living Space.
 * Units are meters. Origin is the center of the floor plate.
 */

export const FLOOR = {
  width: 10, // x
  depth: 7, // z
  plate: 0.18,
} as const

export const WALL = {
  height: 1.05,
  thickness: 0.12,
} as const

/** Room rectangles in floor space (x/z center + size). */
export const ROOMS = {
  office: { cx: -2.55, cz: -1.85, w: 4.9, d: 3.3, label: 'Office' },
  bedroom: { cx: -2.55, cz: 2.1, w: 4.9, d: 2.8, label: 'Bedroom' },
  living: { cx: 2.55, cz: 0, w: 4.9, d: 7, label: 'Living area' },
} as const

export type RoomId = keyof typeof ROOMS

/** Anchor points used by overlays and labels. */
export const ANCHORS = {
  nodeOffice: [-4.55, 1.05, -3.15] as const,
  nodeLiving: [4.55, 1.05, -0.6] as const,
  monitor: [-3.1, 0.95, -2.9] as const,
  personDesk: [-2.55, 0.75, -2.15] as const,
  envSensor: [0.2, 1.15, -3.2] as const,
  roomCenter: {
    office: [ROOMS.office.cx, 0.02, ROOMS.office.cz] as const,
    bedroom: [ROOMS.bedroom.cx, 0.02, ROOMS.bedroom.cz] as const,
    living: [ROOMS.living.cx, 0.02, ROOMS.living.cz] as const,
  },
}

/** Per-mode camera presets — deliberately restrained (2–6° deltas). */
export const CAMERA_PRESETS: Record<Mode, { position: [number, number, number]; target: [number, number, number] }> = {
  physical: { position: [7.6, 7.4, 8.6], target: [0, 0, 0] },
  observations: { position: [7.2, 7.9, 8.2], target: [0, 0, 0] },
  understanding: { position: [6.9, 7.5, 7.9], target: [-0.3, 0, -0.2] },
  context: { position: [8.1, 8.3, 9.1], target: [0.4, 0, 0.2] },
  software: { position: [8.1, 8.3, 9.1], target: [0.4, 0, 0.2] },
}

export const MOBILE_CAMERA = { position: [6.4, 10.4, 7.2], target: [0, 0, 0] } as const

/** Scene palette — warm architectural maquette. */
export const SCENE_COLORS = {
  floor: '#d9cfbc',
  floorPlate: '#c9bda6',
  wall: '#efe9dc',
  wallCap: '#e2dac8',
  desk: '#b99a72',
  deskDark: '#8a6f52',
  fabric: '#b6b0a1',
  fabricDark: '#9a937f',
  bed: '#ddd6c6',
  blanket: '#a8b09a',
  metal: '#4a463e',
  screen: '#23241f',
  screenLit: '#cfd8cd',
  plant: '#6f7d5a',
  pot: '#a3502e',
  book: '#8a4f3a',
  paper: '#f2ecdd',
  person: '#5c564a',
  personAccent: '#8a8578',
  node: '#2b2a26',
  nodeLed: '#c96f3f',
  overlay: '#7a6f5c',
  overlayStrong: '#a3502e',
} as const
