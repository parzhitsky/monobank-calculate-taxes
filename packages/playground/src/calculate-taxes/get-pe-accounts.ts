import { AccountType } from './api/account-type.type.js'
import { type Account } from './api/account.type.js'
import { getClientInfo } from './api/get-client-info.js'

export { type Account } from './api/account.type.js'

export async function getPeAccounts(): Promise<Account[]> {
  console.log('::', getPeAccounts.name, ':: getting client info')

  const clientInfo = await getClientInfo()
  const accountsPe = clientInfo.accounts.filter((account) => account.type === AccountType.fop)

  console.log('::', getPeAccounts.name, `:: client has ${accountsPe.length} PE accounts`)

  return accountsPe
}
