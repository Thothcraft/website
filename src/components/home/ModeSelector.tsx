import { useCallback, useRef } from 'react'
import { MODES, MODE_LABELS, type Mode } from '@/data/demo-context'

interface ModeSelectorProps {
  mode: Mode
  onChange: (mode: Mode) => void
}

/**
 * Segmented five-state control. Uses tab semantics: one tabbable active tab,
 * arrow keys move selection. Scroll position and this control drive the same
 * state.
 */
export function ModeSelector({ mode, onChange }: ModeSelectorProps) {
  const refs = useRef<(HTMLButtonElement | null)[]>([])

  const onKeyDown = useCallback(
    (e: React.KeyboardEvent, index: number) => {
      let next = -1
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') next = (index + 1) % MODES.length
      if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') next = (index - 1 + MODES.length) % MODES.length
      if (e.key === 'Home') next = 0
      if (e.key === 'End') next = MODES.length - 1
      if (next >= 0) {
        e.preventDefault()
        onChange(MODES[next])
        refs.current[next]?.focus()
      }
    },
    [onChange],
  )

  return (
    <div className="mode-selector" role="tablist" aria-label="Representation mode">
      {MODES.map((m, i) => (
        <button
          key={m}
          ref={(el) => {
            refs.current[i] = el
          }}
          role="tab"
          aria-selected={mode === m}
          tabIndex={mode === m ? 0 : -1}
          className={`mode-tab ${mode === m ? 'is-active' : ''}`}
          onClick={() => onChange(m)}
          onKeyDown={(e) => onKeyDown(e, i)}
        >
          {MODE_LABELS[m]}
        </button>
      ))}
    </div>
  )
}
