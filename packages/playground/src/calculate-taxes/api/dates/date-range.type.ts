import { type DateRaw } from './date-raw.type.js'

export interface DateRangeRaw {
  readonly toDate: DateRaw
  readonly fromDate?: DateRaw
}

export interface DateRange {
  readonly toDate: number
  readonly fromDate: number
  readonly dateDiff: number
}
