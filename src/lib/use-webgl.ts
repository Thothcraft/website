import { useMemo } from 'react'

/** Detect WebGL availability once; used to pick the static fallback. */
export function useWebGLSupport(): boolean {
  return useMemo(() => {
    try {
      const canvas = document.createElement('canvas')
      return !!(canvas.getContext('webgl2') || canvas.getContext('webgl'))
    } catch {
      return false
    }
  }, [])
}
