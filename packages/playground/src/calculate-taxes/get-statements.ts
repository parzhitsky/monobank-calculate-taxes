import { splitDateRange } from './api/dates/split-date-range.js'
import { getStatementsPage, type GetStatementsPageParams, MAX_DATE_DIFF, type Statement, type StatementsPage } from './get-statements-page.js'

export { type Statement } from './api/statement.type.js'

/** Optionally splits large date ranges into smaller ones */
export async function * getStatements({
  account,
  toDate,
  fromDate,
}: GetStatementsPageParams): AsyncIterableIterator<Statement> {
  console.log('::', getStatements.name, ':: getting a page of statements')

  const ranges = splitDateRange({ toDate, fromDate }, { maxDateDiff: MAX_DATE_DIFF })

  for (const range of ranges) {
    let nextCallToDate = range.toDate
    let nextCallFromDate = range.fromDate
    let page: StatementsPage
  
    while (true) {
      page = await getStatementsPage({
        account,
        toDate: nextCallToDate,
        fromDate: nextCallFromDate,
      })
  
      yield * page.statements
  
      if (page.prevPage == null) {
        break
      }
  
      nextCallToDate = page.prevPage.toDate
      nextCallFromDate = page.fromDate
    }
  }
}
