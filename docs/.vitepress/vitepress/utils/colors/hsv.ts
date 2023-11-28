import { TinyColor } from '@ctrl/tinycolor'
import { COLOR_DARK_LEVEL, COLOR_LIGHT_LEVEL } from '../theme'
import type { HSV, Numberify } from '@ctrl/tinycolor'

export const hsvOptions = {
  saturation: {
    max: 1,
    min: 0.06,
  },
  value: {
    max: 1,
    min: 0.5,
  },
  hStep: 1,
}

/**
 * round for property pf hsv
 * @param hsv
 * @returns
 */
function roundHsv(hsv: Numberify<HSV>) {
  return {
    h: Math.round(hsv.h),
    s: Math.round(hsv.s * 100) / 100,
    v: Math.round(hsv.v * 100) / 100,
  }
}

export function generateHsvColors(
  hex: string,
  options: {
    lightLevel: number
    darkLevel: number
    saturation: {
      max: number
      min: number
    }
    value: {
      max: number
      min: number
    }
    hStep: number
  } = {
    lightLevel: 5,
    darkLevel: 4,
    saturation: {
      max: 1,
      min: 0.06,
    },
    value: {
      max: 1,
      min: 0.5,
    },
    hStep: 1,
  }
) {
  const { lightLevel, darkLevel, hStep } = options

  const maxS = options.saturation.max
  const minS = options.saturation.min

  const maxV = options.value.max
  const minV = options.value.min

  const color = roundHsv(new TinyColor(hex).toHsv())
  const hsvColors: { h: number; s: number; v: number }[] = []

  // generate dark
  const sDStep = (maxS - color.s) / darkLevel
  const vDStep = (color.v - minV) / darkLevel
  for (let i = darkLevel; i >= 1; i--) {
    hsvColors.push({
      h: color.h + i * hStep,
      s: color.s + i * sDStep,
      v: color.v - i * vDStep,
    })
  }

  hsvColors.push({
    h: color.h,
    s: color.s,
    v: color.v,
  })

  // generate light
  const sLStep = (color.s - minS) / lightLevel
  const vLStep = (maxV - color.v) / lightLevel

  for (let i = 1; i <= lightLevel; i++) {
    hsvColors.push({
      h: color.h - i * hStep,
      s: color.s - i * sLStep,
      v: color.v + i * vLStep,
    })
  }

  // round
  return hsvColors.map((c) => new TinyColor(c).toHexString())
}

/**
 * generate colors from base
 * light 3 5 7 8 9 and dark 2
 * @param hex
 * @returns
 */
export function generateColorsFromBase(hex: string) {
  const colors = {
    base: hex,
  }

  const baseColor = new TinyColor(colors.base)
  COLOR_LIGHT_LEVEL.forEach((level) => {
    colors[`light-${level}`] = baseColor.mix('#fff', level * 10).toHexString()
  })
  COLOR_DARK_LEVEL.forEach((level) => {
    colors[`dark-${level}`] = baseColor.mix('#000', level * 10).toHexString()
  })

  return colors
}
