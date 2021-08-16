import { Component } from '@angular/core';
import { Transaction, Transfer } from './model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor() { }

  transaction!: Transaction

  recieveTransfer(event: Transfer) {
    this.transaction = new Transaction(event.amount, "New Transfer", event.account)
  }
}
