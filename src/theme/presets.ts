export interface ThemePreset {
  id: string
  label: string
  description: string
  swatch: {
    light: { bg: string; accent: string }
    dark: { bg: string; accent: string }
  }
}

export const themePresets: ThemePreset[] = [
  {
    id: 'default',
    label: 'Default',
    description: 'Clean, modern portfolio look.',
    swatch: {
      light: { bg: '#ffffff', accent: '#aa3bff' },
      dark: { bg: '#16171d', accent: '#c084fc' },
    },
  },
]

export type PresetId = (typeof themePresets)[number]['id']
