import { type Account } from './api/account.type.js'
import { type DateRangeRaw, createDateRange, DateRange } from './api/dates/create-date-range.js'
import { type Statement, getStatements } from './api/get-statements.js'

export { type Statement } from './api/get-statements.js'

export const MAX_DATE_DIFF = 2682000000

/** @private */
const MAX_STATEMENTS_PER_PAGE = 500

/** @private */
const createDateRangeParams = { defaultDateDiff: MAX_DATE_DIFF } as const

/** @private */
const defaultAccount = Symbol('default account')

/** @private */
type DefaultAccount = typeof defaultAccount

/** @private */
interface GetStatementsPageParamsBase {
  readonly account?: Account
}

export interface GetStatementsPageParams extends GetStatementsPageParamsBase, DateRangeRaw {}

/** @private */
interface StatementsPrevPage {
  readonly toDate: number
  readonly fromDateEquidistant: number
}

export interface StatementsPage extends GetStatementsPageParamsBase, DateRange {
  readonly statements: Statement[]
  readonly prevPage?: StatementsPrevPage
}

/**
 * @throws {Error} if date diff is greater than {@link MAX_DATE_DIFF}
 */
export async function getStatementsPage({
  account,
  ...dateRangeRaw
}: GetStatementsPageParams): Promise<StatementsPage> {
  const accountId = account?.id ?? undefined

  const { toDate, fromDate, dateDiff } = createDateRange(dateRangeRaw, createDateRangeParams)

  const statements = await getStatements({
    accountId,
    toDate,
    fromDate,
  })

  let prevPage: StatementsPrevPage | undefined

  if (statements.length >= MAX_STATEMENTS_PER_PAGE) {
    const lastStatementDate = statements[0].time

    prevPage = {
      toDate: lastStatementDate,
      fromDateEquidistant: lastStatementDate - dateDiff,
    }
  }

  return {
    account,
    toDate,
    fromDate,
    dateDiff,
    statements,
    prevPage,
  }
}
