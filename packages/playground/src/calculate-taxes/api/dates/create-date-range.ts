import { convertDateRawToTimestamp } from './convert-date-raw-to-timestamp.js'
import { type DateRangeRaw, type DateRange } from './date-range.type.js'

export { type DateRangeRaw, type DateRange } from './date-range.type.js'

/** @private */
interface Params {
  readonly defaultDateDiff?: number
}

export function createDateRange(raw: DateRangeRaw, {
  defaultDateDiff = NaN,
}: Params = {}): DateRange {
  const toDate = convertDateRawToTimestamp(raw.toDate)
  const fromDate = convertDateRawToTimestamp(raw.fromDate) ?? toDate - defaultDateDiff
  const dateDiff = toDate - fromDate

  if (Number.isNaN(fromDate)) {
    throw new Error(`Could not calculate 'fromDate': invalid input: either the 'fromDate' input, or the 'defaultDateDiff' param, or both must be numeric`)
  }

  if (dateDiff < 0) {
    throw new Error(`Invalid range boundaries: the 'fromDate' input must be less than (earlier than) or equal to the 'toDate' input`)
  }

  return {
    toDate,
    fromDate,
    dateDiff,
  }
}
