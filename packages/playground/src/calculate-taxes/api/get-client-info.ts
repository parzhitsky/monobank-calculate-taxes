import { makeRequest } from './make-request.js'
import { type Account } from './account.type.js'

/** @private */
interface ClientInfo {
  readonly clientId: string
  readonly name: string
  readonly accounts: Account[]
}

export async function getClientInfo(): Promise<ClientInfo> {
  return await makeRequest('/personal/client-info')
}
