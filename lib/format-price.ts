export function formatIndianCurrency(value: string): string {
  const trimmed = value.trim()
  const numericValue = trimmed
    .replace(/^(?:₹|\$|€|£|¥|rs\.?|inr|usd|eur|gbp|jpy|cad|aud)\s*/i, '')
    .replace(/\s*(?:inr|usd|eur|gbp|jpy|cad|aud|rs\.?|₹|\$|€|£|¥)$/i, '')
    .replace(/\/-$/, '')
    .replace(/[\s\u00a0\u202f]/g, '')

  if (!/^-?[\d.,]+$/.test(numericValue) || !/\d/.test(numericValue)) {
    return value
  }

  const lastSeparatorIndex = Math.max(numericValue.lastIndexOf(','), numericValue.lastIndexOf('.'))
  const lastSeparator = lastSeparatorIndex >= 0 ? numericValue[lastSeparatorIndex] : null
  const digitsAfterLastSeparator = lastSeparator
    ? numericValue.length - lastSeparatorIndex - 1
    : 0
  const hasBothSeparators = numericValue.includes(',') && numericValue.includes('.')
  const decimalSeparator = lastSeparator && (
    hasBothSeparators || (digitsAfterLastSeparator > 0 && digitsAfterLastSeparator <= 2)
  ) ? lastSeparator[0] : null

  let normalizedValue = numericValue.replace(/[.,]/g, '')
  if (decimalSeparator) {
    normalizedValue = `${numericValue.slice(0, lastSeparatorIndex).replace(/[.,]/g, '')}.${numericValue.slice(lastSeparatorIndex + 1)}`
  }

  const amount = Number(normalizedValue)
  if (!Number.isFinite(amount)) return value

  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(amount)
}
