export interface Transaction {
  id: string | null,
  categoryCode: string,
  dates: {
    valueDate: string | number
  },
  transaction: {
    amountCurrency: {
      amount: number,
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

export interface Transfer {
  amount: number,
  account: string
}
