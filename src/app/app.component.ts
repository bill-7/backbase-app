import { Component } from '@angular/core';
import { AbstractControl, FormBuilder } from '@angular/forms';

import data from '../../bb-ui/mock-data/transactions.json';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(private formBuilder: FormBuilder) { }
  title = 'backbase-app';

  transactionForm = this.formBuilder.group({
    fromAcc: "",
    toAcc: "",
    amount: 0,
  })

  transactions = [...data.data]

  // isControlValid(control: AbstractControl): boolean {
  //   return control.invalid && (control.dirty || this.submitClicked)
  // }

  onSubmit() { }
}
