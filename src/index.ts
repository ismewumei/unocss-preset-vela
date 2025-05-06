import type { Postprocessor, Preset, PresetOptions } from '@unocss/core'
import { preflights } from './preflights'
import { rules } from './rules'
import type { Theme, ThemeAnimation } from './theme'
import { theme } from './theme'
import { variants } from './variants'

export { preflights } from './preflights'
export { theme, colors } from './theme'
export { parseColor } from './utils'
export type { ThemeAnimation, Theme }

export interface DarkModeSelectors {
  /**
   * Selector for light variant.
   *
   * @default '.light'
   */
  light?: string

  /**
   * Selector for dark variant.
   *
   * @default '.dark'
   */
  dark?: string
}
const remRE = /(-?[\.\d]+)rem/g

export interface RemToPxOptions {
  /**
   * 1rem = n px
   * @default 16
   */
  baseFontSize?: number
}
export interface PresetMiniOptions extends PresetOptions {
  /**
   * Dark mode options
   *
   * @default 'class'
   */
  dark?: 'class' | 'media' | DarkModeSelectors
  /**
   * Generate pesudo selector as `[group=""]` instead of `.group`
   *
   * @default false
   */
  attributifyPseudo?: Boolean
  /**
   * Prefix for CSS variables.
   *
   * @default 'un-'
   */
  variablePrefix?: string
  /**
   * Utils prefix
   *
   * @default undefined
   */
  prefix?: string
  /**
   * Generate preflight
   *
   * @default true
   */
  preflight?: boolean
}

export const presetVela = (options: PresetMiniOptions = {}): Preset<Theme> => {
  options.dark = options.dark ?? 'class'
  options.attributifyPseudo = options.attributifyPseudo ?? false
  options.preflight = options.preflight ?? false

  return {
    name: '@unocss/preset-vela',
    theme,
    rules,
    variants: variants(options),
    options,
    postprocess: (util) => {
      util.entries.forEach((i) => {
        const value = i[1]
        if (value && typeof value === 'string' && remRE.test(value))
          i[1] = value.replace(remRE, (_, p1) => `${p1 * 4}px`)//替换rem单位，设置使用px单位，设置1单位对应1px
      })
      if(options.variablePrefix && options.variablePrefix !== 'un-'){
        VarPrefixPostprocessor(options.variablePrefix)
      }
    },
    preflights: options.preflight ? preflights : [],
    prefix: options.prefix,
  }
}

export default presetVela

function VarPrefixPostprocessor(prefix: string): Postprocessor {
  return (obj) => {
    obj.entries.forEach((i) => {
      i[0] = i[0].replace(/^--un-/, `--${prefix}`)
      if (typeof i[1] === 'string')
        i[1] = i[1].replace(/var\(--un-/g, `var(--${prefix}`)
    })
  }
}
