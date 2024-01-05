import { type AccountType } from './account-type.type.js'
import { type CashbackType } from './cashback-type.type.js'

export interface Account {
  readonly id: string
  readonly sendId: string
  readonly balance: number // int64
  readonly creditLimit: number // int64
  readonly type: AccountType
  readonly currencyCode: number // int32
  readonly cashbackType: CashbackType
  readonly maskedPan: string[]
  readonly iban: string
}
