import { Suspense, lazy, useCallback, useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { Link } from 'react-router-dom'
import { MODES, type Mode } from '@/data/demo-context'
import { TRANSITION } from '@/lib/motion-config'
import { useReducedMotion } from '@/lib/use-reduced-motion'
import { useWebGLSupport } from '@/lib/use-webgl'
import type { RoomId } from '@/lib/scene-config'
import { ModeSelector } from './ModeSelector'
import { ContextPanel } from './ContextPanel'
import { ContextInspector } from './ContextInspector'
import { SoftwarePanel } from './SoftwarePanel'
import { SceneFallback } from './SceneFallback'

const LivingSpace = lazy(() => import('@/components/scene/LivingSpace'))

const STEPS = 6 // hero + five modes

interface StepCopy {
  kicker: string
  title: string
  body: string
}

const STEP_COPY: Record<Mode, StepCopy> = {
  physical: {
    kicker: '01 — PHYSICAL',
    title: 'The physical world',
    body: 'People move. Devices operate. Rooms change. Most software cannot see any of it.',
  },
  observations: {
    kicker: '02 — OBSERVATIONS',
    title: 'Observations',
    body: 'Different devices observe different parts of physical reality.',
  },
  understanding: {
    kicker: '03 — UNDERSTANDING',
    title: 'Understanding',
    body: 'Thoth models transform sensor observations into meaningful physical state.',
  },
  context: {
    kicker: '04 — CONTEXT',
    title: 'Context',
    body: 'Thoth maintains a time-aware representation of spaces, entities, states, relationships and events.',
  },
  software: {
    kicker: '05 — SOFTWARE',
    title: 'Intelligent software',
    body: 'Applications and agents use physical context without having to understand the sensors that produced it.',
  },
}

function useIsMobile() {
  const [mobile, setMobile] = useState(() => window.matchMedia('(max-width: 900px)').matches)
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 900px)')
    const onChange = () => setMobile(mq.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])
  return mobile
}

export function LivingSpaceSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const [step, setStep] = useState(0) // 0 = hero, 1..5 = modes
  const [selectedRoom, setSelectedRoom] = useState<RoomId | null>(null)
  const reducedMotion = useReducedMotion()
  const isMobile = useIsMobile()
  const webgl = useWebGLSupport()

  const mode: Mode = MODES[Math.max(0, step - 1)]

  /* Scroll → step. Desktop only; mobile uses the selector directly. */
  useEffect(() => {
    if (isMobile) return
    let raf = 0
    const onScroll = () => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        const el = sectionRef.current
        if (!el) return
        const rect = el.getBoundingClientRect()
        const scrollable = el.offsetHeight - window.innerHeight
        const progress = Math.min(1, Math.max(0, -rect.top / Math.max(1, scrollable)))
        setStep(Math.min(STEPS - 1, Math.floor(progress * STEPS)))
      })
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      cancelAnimationFrame(raf)
    }
  }, [isMobile])

  /* Selector → scroll (desktop) or state (mobile). Same state either way. */
  const handleModeChange = useCallback(
    (m: Mode) => {
      const targetStep = MODES.indexOf(m) + 1
      if (isMobile) {
        setStep(targetStep)
        return
      }
      const el = sectionRef.current
      if (!el) return
      const scrollable = el.offsetHeight - window.innerHeight
      const top = el.getBoundingClientRect().top + window.scrollY
      window.scrollTo({
        top: top + (targetStep / STEPS) * scrollable + 2,
        behavior: reducedMotion ? 'auto' : 'smooth',
      })
    },
    [isMobile, reducedMotion],
  )

  const copy = step === 0 ? null : STEP_COPY[mode]
  const showContext = mode === 'context' || mode === 'software'

  return (
    <section
      ref={sectionRef}
      className="living-section"
      style={{ height: isMobile ? 'auto' : `${STEPS * 100}vh` }}
      aria-label="Interactive demonstration: how Thoth transforms a physical space into context"
    >
      <div className="living-sticky">
        {/* Scene layer */}
        <div className="scene-layer">
          {webgl ? (
            <Suspense fallback={<SceneFallback />}>
              <LivingSpace
                mode={mode}
                isMobile={isMobile}
                reducedMotion={reducedMotion}
                selectedRoom={selectedRoom}
                onSelectRoom={(r) => setSelectedRoom((cur) => (cur === r ? null : r))}
              />
            </Suspense>
          ) : (
            <SceneFallback />
          )}
          {/* scene fade for context/software modes */}
          <div className={`scene-veil ${showContext ? 'is-on' : ''}`} aria-hidden="true" />
          <p className="visually-hidden">
            A small open-plan interior with an office, a living area, and a bedroom.
            Sensing nodes observe the space; the display cycles through physical,
            observation, understanding, context, and software representations.
          </p>
        </div>

        {/* Copy layer */}
        <div className="copy-layer">
          <AnimatePresence mode="wait">
            {step === 0 ? (
              <motion.div
                key="hero"
                className="hero-copy-block"
                initial={reducedMotion ? false : { opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={TRANSITION.panel}
              >
                <h1>The context layer between the physical world and intelligent software.</h1>
                <p className="hero-sub">
                  Thoth turns physical observations into structured, time-aware context that
                  software can understand and act on.
                </p>
                <p className="hero-sequence" aria-label="Physical world, observations, understanding, context, intelligent software">
                  <span>Physical world</span><i aria-hidden="true">→</i>
                  <span>observations</span><i aria-hidden="true">→</i>
                  <span>understanding</span><i aria-hidden="true">→</i>
                  <span>context</span><i aria-hidden="true">→</i>
                  <span>intelligent software</span>
                </p>
                <div className="hero-ctas">
                  <button className="btn btn-primary" onClick={() => handleModeChange('observations')}>
                    Explore how it works
                  </button>
                  <Link className="btn btn-ghost" to="/download">Build with Thoth</Link>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key={mode}
                className="step-copy-block"
                initial={reducedMotion ? false : { opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={TRANSITION.panel}
              >
                <p className="kicker">{copy!.kicker}</p>
                <h2>{copy!.title}</h2>
                <p>{copy!.body}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Context + software overlays */}
        <AnimatePresence>
          {mode === 'context' && (
            <motion.div
              key="context-panel"
              className="overlay-slot"
              initial={reducedMotion ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={TRANSITION.panel}
            >
              <ContextPanel />
            </motion.div>
          )}
          {mode === 'software' && (
            <motion.div
              key="software-panel"
              className="overlay-slot"
              initial={reducedMotion ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={TRANSITION.panel}
            >
              <ContextPanel />
              <SoftwarePanel />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Room inspector */}
        <AnimatePresence>
          {selectedRoom && (
            <motion.div
              key="inspector"
              className="inspector-slot"
              initial={reducedMotion ? false : { opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 12 }}
              transition={TRANSITION.panel}
            >
              <ContextInspector room={selectedRoom} onClose={() => setSelectedRoom(null)} />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Persistent mode control */}
        <div className="mode-slot">
          <ModeSelector mode={mode} onChange={handleModeChange} />
        </div>
      </div>
    </section>
  )
}
