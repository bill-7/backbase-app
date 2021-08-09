import { Component } from '@angular/core';
import { AbstractControl, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(private formBuilder: FormBuilder) { }
  title = 'backbase-app';

  transactionForm = this.formBuilder.group({
    name: "",
    amount: 0,
    jobTitle: "",
  })

  isControlValid(control: AbstractControl): boolean {
    return control.invalid && (control.dirty)//|| this.submitClicked)
  }

  onSubmit() { }
}
