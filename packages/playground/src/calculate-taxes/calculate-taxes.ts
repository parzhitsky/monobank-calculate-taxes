import { type DateRange } from './api/dates/date-range.type.js'
import { convertYearAndQuarterIntoDateRange, type Quarter, type Year } from './convert-year-and-quarter-into-date-range.js'
import { getPeAccounts } from './get-pe-accounts.js'
import { getStatements, type Statement } from './get-statements.js'

/** @private */
interface CalculateTaxesParams {
  readonly year: Year
  readonly quarter: Quarter
}

/** @private */
interface Taxes extends CalculateTaxesParams, DateRange {
  // TODO: define
}

/** @private */
const statementPropertiesToLog = [
  'time',
  'amount',
  'operationAmount',
  'mcc',
  'counterName',
  'description',
] satisfies Array<keyof Statement>

export async function calculateTaxes({ year, quarter }: CalculateTaxesParams): Promise<Taxes> {
  const accounts = await getPeAccounts()

  console.log('For accounts:')

  for (const account of accounts) {
    console.log(`\t- ${account.iban} (id: ${account.id})`)
  }

  const { toDate, fromDate, dateDiff} = convertYearAndQuarterIntoDateRange(year, quarter)

  console.log('… getting statements between dates:')
  console.log(`\t- ${new Date(fromDate)}`)
  console.log(`\t- ${new Date(toDate)}`)

  for (const account of accounts) {
    // FIXME: 429 too many requests
    for await (const statement of getStatements({ account, toDate, fromDate })) {
      if (statement.amount > 0) {
        // TODO: calculate taxes from data, don't just log it
        console.table([statement], statementPropertiesToLog)
      }
    }
  }

  const taxes: Taxes = {
    year,
    quarter,
    fromDate,
    toDate,
    dateDiff,
  }

  return taxes
}
