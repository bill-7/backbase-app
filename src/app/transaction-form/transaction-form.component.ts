import { Component, ElementRef, OnInit, TemplateRef } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-transaction-form',
  templateUrl: './transaction-form.component.html',
  styleUrls: ['./transaction-form.component.scss']
})
export class TransactionFormComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, private modalService: NgbModal) { }

  ngOnInit(): void {
  }

  userBalance = 5824.76
  submitClicked: boolean = false
  transactionForm: FormGroup = this.emptyTransactionForm()
  cs = this.transactionForm.controls

  private emptyTransactionForm() {
    return this.formBuilder.group({
      fromAcc: `My Personal Account: € ${this.userBalance}`,
      toAcc: new FormControl('', Validators.required),
      amount: new FormControl('', [Validators.required, Validators.max(this.userBalance + 500)]),
    })
  }

  private resetForm() {
    this.transactionForm = this.emptyTransactionForm()
    this.submitClicked = false
    this.cs = this.transactionForm.controls
  }

  private newTransfer(amount: number, account: string) {
    this.userBalance -= amount
    //emit
  }

  isControlInvalid(control: AbstractControl): boolean {
    return control.invalid && (control.dirty || this.submitClicked)
  }

  dismissModal() {
    this.modalService.dismissAll()
  }

  confirmClicked() {
    this.newTransfer(this.cs.amount.value, this.cs.toAcc.value)
    this.resetForm()
    this.dismissModal()
  }

  onSubmit(modalRef: TemplateRef<any>) {
    this.submitClicked = true
    if (this.transactionForm.valid)
      this.modalService.open(modalRef)
  }
}
