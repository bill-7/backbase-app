import { Component, EventEmitter, Output } from '@angular/core';
import { Transaction } from './model';

interface Transfer {
  amount: number,
  account: string
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor() { }

  transaction!: Transaction



  recieveTransfer(event: Transfer) {
    this.transaction = {
      id: "",
      categoryCode: "#d9bcf5",
      dates: {
        valueDate: Date.now()
      },
      transaction: {
        amountCurrency: {
          amount: event.amount,
          currencyCode: "EUR"
        },
        type: "New Transfer",
        creditDebitIndicator: "DBIT"
      },
      merchant: {
        name: event.account,
        accountNumber: ""
      }
    }
  }


}
