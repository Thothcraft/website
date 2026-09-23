/**
 * Demo context object.
 *
 * This is the stand-in for live Brain state. The interface is intentionally
 * shaped like the platform's context model so this file can later be replaced
 * by a Brain WebSocket/API subscription without rebuilding the UI.
 */

export type Mode = 'physical' | 'observations' | 'understanding' | 'context' | 'software'

export const MODES: Mode[] = ['physical', 'observations', 'understanding', 'context', 'software']

export const MODE_LABELS: Record<Mode, string> = {
  physical: 'Physical',
  observations: 'Observations',
  understanding: 'Understanding',
  context: 'Context',
  software: 'Software',
}

export interface SpaceState {
  occupied: boolean
  peopleEstimate: number
  activity: string
  computerActive: boolean
  occupiedSince: string | null
  confidence: number
  temperatureC: number
  humidity: number
}

export interface EntityState {
  id: string
  kind: 'person' | 'device' | 'sensor'
  label: string
  space: string
  state: string
  detail?: string
}

export interface DemoContext {
  spaces: Record<string, SpaceState>
  entities: EntityState[]
  hierarchy: { label: string; children: string[] }[]
}

export const demoContext: DemoContext = {
  spaces: {
    office: {
      occupied: true,
      peopleEstimate: 1,
      activity: 'working',
      computerActive: true,
      occupiedSince: '09:41',
      confidence: 0.94,
      temperatureC: 22.4,
      humidity: 41,
    },
    living: {
      occupied: true,
      peopleEstimate: 1,
      activity: 'moving',
      computerActive: false,
      occupiedSince: '10:02',
      confidence: 0.88,
      temperatureC: 22.7,
      humidity: 40,
    },
    bedroom: {
      occupied: false,
      peopleEstimate: 0,
      activity: 'empty',
      computerActive: false,
      occupiedSince: null,
      confidence: 0.97,
      temperatureC: 21.9,
      humidity: 43,
    },
  },
  entities: [
    { id: 'person-1', kind: 'person', label: 'Person', space: 'office', state: 'stationary', detail: 'seated at desk' },
    { id: 'person-2', kind: 'person', label: 'Person', space: 'living', state: 'walking', detail: 'kitchen → living area' },
    { id: 'computer-1', kind: 'device', label: 'Computer', space: 'office', state: 'active', detail: 'idle 0m' },
    { id: 'node-office', kind: 'sensor', label: 'Thoth node', space: 'office', state: 'sensing', detail: 'radar · env' },
    { id: 'node-living', kind: 'sensor', label: 'Thoth node', space: 'living', state: 'sensing', detail: 'radar · env' },
  ],
  hierarchy: [
    { label: 'HOME', children: ['OFFICE', 'LIVING AREA', 'BEDROOM'] },
    { label: 'OFFICE', children: ['PERSON', 'COMPUTER', 'THOTH NODE'] },
  ],
}

/** Semantic model outputs shown in Understanding mode. */
export const semanticOutputs = [
  { id: 'office-occ', subject: 'Office', value: 'occupancy 0.97' },
  { id: 'person-state', subject: 'Person', value: 'stationary' },
  { id: 'person-loc', subject: 'Location', value: 'x 2.3 · y 1.8' },
  { id: 'computer-state', subject: 'Computer', value: 'active' },
  { id: 'env', subject: 'Environment', value: '22.4°' },
] as const

/** Observation sources shown in Observations mode. */
export const observationSources = [
  { id: 'radar', label: 'Radar' },
  { id: 'csi', label: 'Wi-Fi CSI' },
  { id: 'computer', label: 'Computer state' },
  { id: 'env', label: 'Environment' },
  { id: 'ble', label: 'BLE' },
] as const
