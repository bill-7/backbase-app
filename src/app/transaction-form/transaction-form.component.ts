import { Component, EventEmitter, Output, TemplateRef } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-transaction-form',
  templateUrl: './transaction-form.component.html',
  styleUrls: ['./transaction-form.component.scss']
})
export class TransactionFormComponent {

  constructor(private formBuilder: FormBuilder, private modalService: NgbModal) { }

  @Output() newTransfer: EventEmitter<any> = new EventEmitter();

  userBalance: number = 5824.76
  submitClicked: boolean = false
  transactionForm: FormGroup = this.emptyTransactionForm()
  cs = this.transactionForm.controls //TODO remove shorthand

  private emptyTransactionForm() {
    return this.formBuilder.group({
      fromAcc: `My Personal Account: € ${this.userBalance.toFixed(2)}`,
      toAcc: new FormControl('', Validators.required),
      amount: new FormControl(null, [Validators.required, Validators.max(this.userBalance + 500), Validators.min(0)]),
    })
  }

  private resetForm() {
    this.transactionForm = this.emptyTransactionForm()
    this.submitClicked = false
    this.cs = this.transactionForm.controls
  }

  dismissModal() {
    this.modalService.dismissAll()
  }

  onSubmit(modalRef: TemplateRef<any>) {
    this.submitClicked = true
    if (this.transactionForm.valid)
      this.modalService.open(modalRef)
  }

  onConfirm() {
    this.userBalance -= this.cs.amount.value
    this.newTransfer.emit({ 'amount': this.cs.amount.value, 'account': this.cs.toAcc.value })
    this.resetForm()
    this.dismissModal()
  }

  isControlInvalid(control: AbstractControl): boolean {
    return control.invalid && (control.dirty || this.submitClicked)
  }

  decimalString(control: AbstractControl): string {
    return control.value ? Number(control.value).toFixed(2) : ''
  }
}
