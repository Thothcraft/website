import { CELL_FACES, CELL_LATTICE } from './cell-geometry'
import './brand.css'

/**
 * Thoth Cell — the platform mark. An isometric cube of three sensing
 * faces on a 3×3 lattice, with a nucleus at the shared vertex:
 * many sensors, one context. Geometry: cell-geometry.ts.
 */

type Tone = 'light' | 'dark'

interface CellLogoProps {
  size?: number
  tone?: Tone
  animated?: boolean
  title?: string
  className?: string
}

export function CellLogo({ size = 28, tone = 'light', animated = false,
  title = 'Thoth', className = '' }: CellLogoProps) {
  return (
    <svg
      className={`cell-logo cell-${tone} ${animated ? 'is-animated' : ''} ${className}`}
      width={size}
      height={size}
      viewBox="0 0 64 64"
      role="img"
      aria-label={title}
    >
      <title>{title}</title>
      <polygon className="cell-face cell-face-top" points={CELL_FACES.top} />
      <polygon className="cell-face cell-face-left" points={CELL_FACES.left} />
      <polygon className="cell-face cell-face-right" points={CELL_FACES.right} />
      <g className="cell-lattice">
        {CELL_LATTICE.map(([x1, y1, x2, y2], i) => (
          <line key={i} x1={x1} y1={y1} x2={x2} y2={y2}
            style={{ animationDelay: `${0.25 + i * 0.05}s` }} />
        ))}
      </g>
      <polygon className="cell-edge" points="32,6 54.5,19 54.5,45 32,58 9.5,45 9.5,19" />
      <circle className="cell-ring" cx="32" cy="32" r="7.5" />
      <circle className="cell-nucleus" cx="32" cy="32" r="4" />
    </svg>
  )
}

interface CellLoaderProps {
  label?: string
  progress?: number | null
  tone?: Tone
}

/** Loader: the lattice redraws in sequence and the nucleus pulses; an
 * optional determinate bar tracks real progress (0–1). */
export function CellLoader({ label = 'Loading', progress = null,
  tone = 'light' }: CellLoaderProps) {
  const pct = progress == null ? null : Math.max(0, Math.min(1, progress))
  return (
    <div className={`cell-loader cell-loader-${tone}`} role="status" aria-live="polite">
      <CellLogo size={56} tone={tone} animated className="cell-loader-mark" />
      <div className="cell-loader-bar" aria-hidden="true">
        <span
          className={pct == null ? 'is-indeterminate' : ''}
          style={pct == null ? undefined : { width: `${pct * 100}%` }}
        />
      </div>
      <span className="cell-loader-label">
        {label}{pct == null ? '' : ` · ${Math.round(pct * 100)}%`}
      </span>
    </div>
  )
}

export default CellLogo
