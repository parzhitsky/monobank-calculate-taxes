import { type Account } from './account.type.js'
import { createDateRange } from './dates/create-date-range.js'
import { type DateRangeRaw } from './dates/date-range.type.js'
import { makeRequest } from './make-request.js'
import { type Statement } from './statement.type.js'

export { type Statement } from './statement.type.js'

/** @private */
interface Params extends DateRangeRaw {
  readonly accountId?: Account['id']
}

/** @private */
const DEFAULT_ACCOUNT_ID = '0'

/**
 * @throws {Error} if date diff is greater than allowed
 */
export async function getStatements({
  accountId = DEFAULT_ACCOUNT_ID,
  ...raw
}: Params): Promise<Statement[]> {
  const { toDate, fromDate } = createDateRange({
    toDate: raw.toDate,
    fromDate: raw.fromDate ?? Date.now(),
  })

  const statements: Statement[] = await makeRequest(`/personal/statement/${accountId}/${fromDate / 1000}/${toDate / 1000}`)

  for (const statement of statements) {
    // @ts-expect-error
    statement.time *= 1000
  }

  return statements
}
