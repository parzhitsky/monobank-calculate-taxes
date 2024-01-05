import { createDateRange } from './create-date-range.js'
import { type DateRange, type DateRangeRaw } from './date-range.type.js'

/** @private */
interface Params {
  readonly maxDateDiff: number
}

export function splitDateRange(raw: DateRangeRaw, { maxDateDiff }: Params): DateRange[] {
  const { toDate, fromDate } = createDateRange(raw)

  const ranges: DateRange[] = []

  let currentToDate = toDate

  do {
    const nextToDate = Math.max(currentToDate - maxDateDiff, fromDate)
    const range = createDateRange({
      toDate: currentToDate,
      fromDate: nextToDate,
    })

    ranges.push(range)

    currentToDate = nextToDate
  } while (currentToDate > fromDate)

  return ranges
}
