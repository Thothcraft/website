/** Central motion tuning — restrained, 300–700ms transitions. */

export const TRANSITION = {
  mode: { duration: 0.5, ease: [0.22, 0.75, 0.25, 1] as const },
  panel: { duration: 0.45, ease: [0.22, 0.75, 0.25, 1] as const },
  fade: { duration: 0.35, ease: 'easeOut' as const },
}

export const CAMERA_LERP = 0.045 // per-frame easing toward preset

export const AMBIENT = {
  monitorCycleMs: 26000, // monitor slowly falls asleep and wakes
  walkSegmentMs: 14000, // person 2 strolls between waypoints
  daylightPeriodMs: 60000, // imperceptible daylight drift
}
