import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-transaction-form',
  templateUrl: './transaction-form.component.html',
  styleUrls: ['./transaction-form.component.scss']
})
export class TransactionFormComponent implements OnInit {

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
  }

  submitClicked = false
  userBalance = 5824.76

  transactionForm = this.formBuilder.group({
    fromAcc: `My Personal Account: € ${this.userBalance}`,
    toAcc: new FormControl('', Validators.required),
    amount: new FormControl('', [Validators.required, Validators.max(this.userBalance + 500)]),
  })

  t = this.transactionForm.controls

  isControlInvalid(control: AbstractControl): boolean {
    return control.invalid && (control.dirty || this.submitClicked)
  }

  onSubmit() {
    this.submitClicked = true
    if (this.transactionForm.valid)
      //invoke modal
      console.log('submit works')
  }


}
