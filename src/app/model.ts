export interface Transaction {
  id: string | null,
  categoryCode: string,
  dates: {
    valueDate: string | number
  },
  transaction: {
    amountCurrency: {
      amount: string,
      currencyCode: string
    },
    type: string,
    creditDebitIndicator: string
  },
  merchant: {
    name: string,
    accountNumber: string
  }
}