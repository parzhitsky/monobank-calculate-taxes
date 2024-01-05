import { type DateRaw } from './date-raw.type.js'

export function convertDateRawToTimestamp(dateRaw: DateRaw): number
export function convertDateRawToTimestamp(dateRaw?: DateRaw | null): number | null
export function convertDateRawToTimestamp(dateRaw?: DateRaw | null): number | null {
  if (typeof dateRaw === 'string') {
    return parseInt(dateRaw, 10)
  }

  if (dateRaw != null) {
    return Math.trunc(dateRaw)
  }

  return null
}
