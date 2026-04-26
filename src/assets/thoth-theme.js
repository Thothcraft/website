/**
 * Thoth Cat-Color Spectrum Theme Engine
 * 
 * Shared between the marketing website (Vue) and Research Portal (Next.js).
 * Copy this file or import it to apply the same theme to both apps.
 * 
 * Usage (vanilla JS / any framework):
 *   import { applyThothTheme, getStoredThemePos } from './thoth-theme.js'
 *   applyThothTheme(getStoredThemePos())  // apply on load
 *   slider.oninput = (e) => applyThothTheme(parseInt(e.target.value))
 * 
 * CSS variables set:
 *   --bg-primary, --bg-secondary, --bg-card, --bg-accent
 *   --text-primary, --text-secondary, --text-muted
 *   --accent, --accent-hover
 *   --border-color, --shadow-light, --shadow-medium
 */

function lerp(a, b, t) { return Math.round(a + (b - a) * t) }
function hexFromRGB(r, g, b) {
  return '#' + [r, g, b].map(v => v.toString(16).padStart(2, '0')).join('')
}

export function applyThothTheme(pos) {
  const t = pos / 100 // 0=lightest, 1=darkest

  const vars = {
    '--bg-primary':     hexFromRGB(lerp(242,30,t), lerp(240,30,t), lerp(237,30,t)),
    '--bg-secondary':   hexFromRGB(lerp(232,24,t), lerp(230,24,t), lerp(227,24,t)),
    '--bg-card':        hexFromRGB(lerp(255,38,t), lerp(255,38,t), lerp(255,36,t)),
    '--bg-accent':      hexFromRGB(lerp(184,61,t), lerp(196,74,t), lerp(160,42,t)),
    '--bg-accent-dim':  hexFromRGB(lerp(212,50,t), lerp(220,65,t), lerp(196,50,t)),
    '--text-primary':   hexFromRGB(lerp(30,240,t), lerp(30,240,t), lerp(30,237,t)),
    '--text-secondary': hexFromRGB(lerp(90,180,t), lerp(90,180,t), lerp(86,170,t)),
    '--text-muted':     hexFromRGB(lerp(138,140,t), lerp(138,140,t), lerp(132,130,t)),
    '--accent':         hexFromRGB(lerp(107,130,t), lerp(127,160,t), lerp(74,75,t)),
    '--accent-hover':   hexFromRGB(lerp(125,145,t), lerp(148,175,t), lerp(86,88,t)),
    '--border-color':   `rgba(${t > 0.5 ? '255,255,255' : '0,0,0'},${lerp(6,15,t)/100})`,
    '--shadow-light':   `rgba(0,0,0,${lerp(4,20,t)/200})`,
    '--shadow-medium':  `rgba(0,0,0,${lerp(4,20,t)/100})`,
    '--theme-pos':      String(pos),
  }

  const root = document.documentElement.style
  for (const [k, v] of Object.entries(vars)) root.setProperty(k, v)

  localStorage.setItem('thoth-theme-pos', String(pos))
}

export function getStoredThemePos() {
  return parseInt(localStorage.getItem('thoth-theme-pos') || '15')
}
