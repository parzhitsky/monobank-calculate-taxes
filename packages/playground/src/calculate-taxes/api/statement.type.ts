export interface Statement {
  readonly id: string
  readonly time: number // int64
  readonly description: string
  readonly mcc: number // int32
  readonly originalMcc: number // int32
  readonly hold: boolean
  readonly amount: number // int64
  readonly operationAmount: number // int64
  readonly currencyCode: number // int32
  readonly commissionRate: number // int64
  readonly cashbackAmount: number // int64
  readonly balance: number // int64
  readonly comment: string
  readonly receiptId: string
  readonly invoiceId: string
  readonly counterEdrpou: string
  readonly counterIban: string
  readonly counterName: string
}
