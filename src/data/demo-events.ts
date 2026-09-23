export interface ContextEvent {
  id: string
  time: string
  space: string
  description: string
}

export const demoEvents: ContextEvent[] = [
  { id: 'ev-1', time: '09:41', space: 'office', description: 'person entered office' },
  { id: 'ev-2', time: '09:43', space: 'office', description: 'computer became active' },
  { id: 'ev-3', time: '10:02', space: 'office', description: 'activity decreased' },
  { id: 'ev-4', time: '10:04', space: 'living', description: 'person entered living area' },
]
