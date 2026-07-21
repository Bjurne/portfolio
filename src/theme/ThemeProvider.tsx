import { useEffect, useState, type ReactNode } from 'react'
import { ThemeContext, type Mode } from './theme-context'
import { themePresets, type PresetId } from './presets'

const STORAGE_KEY = 'portfolio-theme'
const DEFAULT_PRESET: PresetId = 'default'

interface ThemeState {
  preset: PresetId
  mode: Mode
}

function isMode(value: unknown): value is Mode {
  return value === 'light' || value === 'dark'
}

function isKnownPreset(value: unknown): value is PresetId {
  return typeof value === 'string' && themePresets.some((preset) => preset.id === value)
}

function prefersDarkMode(): boolean {
  return window.matchMedia('(prefers-color-scheme: dark)').matches
}

function getInitialThemeState(): ThemeState {
  if (typeof window === 'undefined') return { preset: DEFAULT_PRESET, mode: 'light' }

  const stored = window.localStorage.getItem(STORAGE_KEY)

  // Legacy pre-preset value: a bare 'light' | 'dark' string.
  if (isMode(stored)) return { preset: DEFAULT_PRESET, mode: stored }

  if (stored) {
    try {
      const parsed: unknown = JSON.parse(stored)
      if (
        parsed &&
        typeof parsed === 'object' &&
        isKnownPreset((parsed as { preset?: unknown }).preset) &&
        isMode((parsed as { mode?: unknown }).mode)
      ) {
        return parsed as ThemeState
      }
    } catch {
      // fall through to default
    }
  }

  return { preset: DEFAULT_PRESET, mode: prefersDarkMode() ? 'dark' : 'light' }
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [{ preset, mode }, setState] = useState<ThemeState>(getInitialThemeState)

  useEffect(() => {
    document.documentElement.dataset.preset = preset
    document.documentElement.dataset.mode = mode
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ preset, mode }))
  }, [preset, mode])

  function toggleMode() {
    setState((current) => ({ ...current, mode: current.mode === 'light' ? 'dark' : 'light' }))
  }

  function setPreset(newPreset: PresetId) {
    setState((current) => ({ ...current, preset: newPreset }))
  }

  return <ThemeContext value={{ preset, mode, toggleMode, setPreset }}>{children}</ThemeContext>
}
