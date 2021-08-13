import { Component, EventEmitter, Output } from '@angular/core';
import { Transaction } from './model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  @Output() sendTransfer: EventEmitter<any> = new EventEmitter();
  constructor() { }

  transaction!: Transaction

  recieveTransfer(event: any) {
    console.log("app", event)
    this.transaction = {
      id: "",
      categoryCode: "#f00",
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
    this.sendTransfer.emit(this.transaction)
  }


}
