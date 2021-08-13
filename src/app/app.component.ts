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
    this.transaction = event
    this.sendTransfer.emit(this.transaction)
  }


}
