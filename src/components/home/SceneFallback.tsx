import { ROOMS } from '@/lib/scene-config'

/**
 * Static 2D floor-plan fallback — shown while WebGL loads and permanently
 * on devices without WebGL. Same spatial layout as the 3D scene.
 */
export function SceneFallback() {
  const W = 10
  const D = 7
  const sx = 100 / W
  const sy = 100 / D
  const rect = (cx: number, cz: number, w: number, d: number) => ({
    x: (cx - w / 2 + W / 2) * sx,
    y: (cz - d / 2 + D / 2) * sy,
    width: w * sx,
    height: d * sy,
  })
  const office = rect(ROOMS.office.cx, ROOMS.office.cz, ROOMS.office.w, ROOMS.office.d)
  const bedroom = rect(ROOMS.bedroom.cx, ROOMS.bedroom.cz, ROOMS.bedroom.w, ROOMS.bedroom.d)
  const living = rect(ROOMS.living.cx, ROOMS.living.cz, ROOMS.living.w, ROOMS.living.d)

  return (
    <div className="scene-fallback" role="img" aria-label="Floor plan of the demonstration space: an office, a living area, and a bedroom, each with sensing nodes.">
      <svg viewBox="0 0 100 70" preserveAspectRatio="xMidYMid meet">
        <rect x="0.5" y="0.5" width="99" height="69" fill="#e7e1d2" stroke="#b3ac9b" strokeWidth="0.5" />
        <rect {...office} fill="#ded5c2" stroke="#a89f8c" strokeWidth="0.4" />
        <rect {...bedroom} fill="#ddd4c1" stroke="#a89f8c" strokeWidth="0.4" />
        <rect {...living} fill="#e0d8c6" stroke="#a89f8c" strokeWidth="0.4" />
        {/* furniture hints */}
        <rect x="14" y="8" width="16" height="6" fill="#b99a72" rx="0.5" />
        <rect x="6" y="42" width="12" height="18" fill="#ddd6c6" rx="0.5" />
        <rect x="66" y="6" width="6" height="22" fill="#c9bda6" rx="0.5" />
        <rect x="58" y="44" width="16" height="7" fill="#b6b0a1" rx="1" />
        {/* nodes */}
        <circle cx="5" cy="6" r="1.4" fill="#a3502e" />
        <circle cx="95" cy="34" r="1.4" fill="#a3502e" />
        {/* people */}
        <circle cx="22" cy="18" r="1.6" fill="#5c564a" />
        <circle cx="66" cy="36" r="1.6" fill="#5c564a" />
        <text x="25" y="22" fontSize="4.4" fill="#55524a" fontFamily="Inter, sans-serif">Office</text>
        <text x="72" y="40" fontSize="4.4" fill="#55524a" fontFamily="Inter, sans-serif">Living</text>
        <text x="14" y="56" fontSize="4.4" fill="#55524a" fontFamily="Inter, sans-serif">Bedroom</text>
      </svg>
    </div>
  )
}
