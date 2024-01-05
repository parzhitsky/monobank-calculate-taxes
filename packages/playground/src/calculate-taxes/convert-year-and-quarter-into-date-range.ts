import { createDateRange, type DateRange } from './api/dates/create-date-range.js'

export type Year = 2022 | 2023 | 2024

/** @private */
const quarterToQuarterIndexMap = {
  First: 0,
  Second: 1,
  Third: 2,
  Fourth: 3,
} as const

export type Quarter = keyof typeof quarterToQuarterIndexMap

/** @private */
type QuarterIndex = typeof quarterToQuarterIndexMap[Quarter]

/** @private */
const monthCodeToMonthIndex = {
  Jan: 0,
  // Feb: 1,
  Mar: 2,
  Apr: 3,
  // May: 4,
  Jun: 5,
  Jul: 6,
  // Aug: 7,
  Sep: 8,
  Oct: 9,
  // Nov: 10,
  Dec: 11,
} as const

/** @private */
type MonthCode = keyof typeof monthCodeToMonthIndex

/** @private */
type DateRangeMonths = readonly [first: MonthCode, last: MonthCode]

/** @private */
const quarterIndexToDateRangeMonthsMap = [
  ['Jan', 'Mar'],
  ['Apr', 'Jun'],
  ['Jul', 'Sep'],
  ['Oct', 'Dec'],
] satisfies Record<QuarterIndex, DateRangeMonths>

export function convertYearAndQuarterIntoDateRange(year: Year, quarter: Quarter): DateRange {
  console.log('::', convertYearAndQuarterIntoDateRange.name, `:: converting year ${year} quarter ${quarter} into a date range`)

  const quarterIndex = quarterToQuarterIndexMap[quarter]

  const [thisQuarterFirstMonthCode, thisQuarterLastMonthCode] = quarterIndexToDateRangeMonthsMap[quarterIndex]
  const thisQuarterFirstMonthIndex = monthCodeToMonthIndex[thisQuarterFirstMonthCode]
  const thisQuarterLastMonthIndex = monthCodeToMonthIndex[thisQuarterLastMonthCode]
  const nextQuarterFirstMonthIndex = thisQuarterLastMonthIndex + 1

  const thisQuarterStartDate = new Date(year, thisQuarterFirstMonthIndex, 1)
  const nextQuarterStartDate = new Date(year, nextQuarterFirstMonthIndex, 1)

  const range = createDateRange({
    toDate: nextQuarterStartDate.getTime(),
    fromDate: thisQuarterStartDate.getTime(),
  })

  console.log('::', convertYearAndQuarterIntoDateRange.name, `:: date range: ${range.fromDate} to ${range.toDate}`)

  return range
}
