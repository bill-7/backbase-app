import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { SubmitButtonComponent } from 'bb-ui/components/submit-button/submit-button.component';
import { collapseTextChangeRangesAcrossMultipleVersions } from 'typescript';

import { TransactionFormComponent } from './transaction-form.component';

describe('TransactionFormComponent', () => {
  let component: TransactionFormComponent;
  let component2: ComponentFixture<SubmitButtonComponent>;

  let fixture: ComponentFixture<TransactionFormComponent>;
  let fixture2: ComponentFixture<SubmitButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TransactionFormComponent, SubmitButtonComponent],
      providers: [FormBuilder]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TransactionFormComponent);
    fixture2 = TestBed.createComponent(SubmitButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the TransactionFormComponent', () => {
    expect(component).toBeTruthy();
  });

  it('should display validation errors if controls are empty on submit', () => {
    component.transactionForm.controls.amount.setValue("")
    component.transactionForm.controls.toAcc.setValue("")
    component.submitClicked = true
    fixture.detectChanges()

    expect(component.transactionForm.valid).toBeFalsy()
    expect(fixture.debugElement.queryAll(By.css('.error')).length).toBe(2)
  });

  it('should not display validation errors if controls are valid', () => {
    component.transactionForm.controls.amount.setValue("123")
    component.transactionForm.controls.toAcc.setValue("test account")
    fixture.detectChanges()

    expect(component.transactionForm.valid).toBeTruthy()
    expect(fixture.debugElement.queryAll(By.css('.error')).length).toBe(0)
  });

  xit('should display validation errors if amount field is too large on submit', () => {
    component.userBalance = 5000
    component.transactionForm.controls.toAcc.setValue("test account")
    component.transactionForm.controls.amount.setValue(5501)
    component.transactionForm.updateValueAndValidity()
    component.submitClicked = true

    fixture.detectChanges()

    expect(component.transactionForm.invalid).toBeTruthy()
    expect(fixture.debugElement.queryAll(By.css('.error')).length).toBe(1)
  });

  it('should display validation errors if amount field is negative on submit', () => {
    component.transactionForm.controls.toAcc.setValue("test account")
    component.transactionForm.controls.amount.setValue("-1")
    component.submitClicked = true
    fixture.detectChanges()

    expect(component.transactionForm.valid).toBeFalsy()
    expect(fixture.debugElement.queryAll(By.css('.error')).length).toBe(1)
  });
});
