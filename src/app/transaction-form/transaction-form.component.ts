import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Transaction } from '../model';

@Component({
  selector: 'app-transaction-form',
  templateUrl: './transaction-form.component.html',
  styleUrls: ['./transaction-form.component.scss']
})
export class TransactionFormComponent implements OnInit {

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
  }

  userBalance = 5824.76

  transactionForm = this.formBuilder.group({
    fromAcc: `My Personal Account: € ${this.userBalance}`,
    toAcc: "",
    amount: 0,
  })


  // isControlValid(control: AbstractControl): boolean {
  //   return control.invalid && (control.dirty || this.submitClicked)
  // }

  onSubmit() {

  }


}
