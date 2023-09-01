import { useState } from 'react'

interface DarkColorPaletteHook {
  colors: string[]
}

const hexToRgb = (hex: string) => {
  const bigint = parseInt(hex.slice(1), 16)
  const r = (bigint >> 16) & 255
  const g = (bigint >> 8) & 255
  const b = bigint & 255
  return { r, g, b }
}

const generateDarkColors = (baseColor: string, numColors: number) => {
  const colors: string[] = []
  const baseRgb = hexToRgb(baseColor)

  for (let i = 0; i < numColors; i++) {
    const factor = i * 20
    const darkColor = {
      r: Math.max(baseRgb.r - factor, 0),
      g: Math.max(baseRgb.g - factor, 0),
      b: Math.max(baseRgb.b - factor, 0),
    }
    colors.push(`rgb(${darkColor.r}, ${darkColor.g}, ${darkColor.b})`)
  }

  return colors
}

const useDarkColorPalette = (
  baseColor: string,
  numColors: number,
): DarkColorPaletteHook => {
  const [colors] = useState<string[]>(() =>
    generateDarkColors(baseColor, numColors),
  )
  return { colors }
}

export default useDarkColorPalette
