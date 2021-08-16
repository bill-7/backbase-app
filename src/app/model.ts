export class Transaction {
  id!: string;
  categoryCode: string;
  dates: {
    valueDate: string | number
  };
  transaction: {
    amountCurrency: {
      amount: number,
      currencyCode: string
    },
    type: string,
    creditDebitIndicator: string
  };
  merchant: {
    name: string,
    accountNumber: string
  }

  constructor(tAmount?: number, tType?: string, merchantName?: string, date?: number) {
    this.categoryCode = "#d9bcf5"
    this.dates = { valueDate: date || Date.now() }
    this.transaction = {
      amountCurrency: { amount: tAmount || 0, currencyCode: "EUR" },
      type: tType || "New Transfer",
      creditDebitIndicator: "DBIT"
    }
    this.merchant = { name: merchantName || "Merchant", accountNumber: "" }
  }
}

export interface Transfer {
  amount: number,
  account: string
}
