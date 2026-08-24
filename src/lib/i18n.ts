import { type TranslationKey, translations } from '~/lib/translations'

type Placeholders = Record<string, string | number>

/** Singular keys are suffixed `_one`, and used when `count` is exactly 1. */
const resolveKey = (key: TranslationKey, placeholders?: Placeholders): TranslationKey => {
  if (placeholders?.count !== 1) return key
  const singularKey = `${key}_one`
  return singularKey in translations ? (singularKey as TranslationKey) : key
}

/**
 * Resolves a user-facing string. Interpolates `{name}` placeholders.
 * Callers pass keys, never literals — see docs/conventions/code-style.md.
 */
const translate = (key: TranslationKey, placeholders?: Placeholders) => {
  const template: string = translations[resolveKey(key, placeholders)]
  if (!placeholders) return template
  return template.replace(/\{(\w+)\}/g, (match, name: string) =>
    name in placeholders ? String(placeholders[name]) : match,
  )
}

export { translate }
export type { TranslationKey }
