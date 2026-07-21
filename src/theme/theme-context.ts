import { createContext, use } from 'react'
import type { PresetId } from './presets'

export type Mode = 'light' | 'dark'

export interface ThemeContextValue {
  preset: PresetId
  mode: Mode
  toggleMode: () => void
  setPreset: (preset: PresetId) => void
}

export const ThemeContext = createContext<ThemeContextValue | null>(null)

export function useTheme() {
  const ctx = use(ThemeContext)
  if (!ctx) throw new Error('useTheme must be used within a ThemeProvider')
  return ctx
}
