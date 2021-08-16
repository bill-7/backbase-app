import { HttpClient, HttpHandler } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Transaction } from '../model';
import { TransactionListComponent } from './transaction-list.component';

describe('TransactionListComponent', () => {
  let component: TransactionListComponent
  let fixture: ComponentFixture<TransactionListComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TransactionListComponent],
      providers: [HttpClient, HttpHandler]
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(TransactionListComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create the TransactionListComponent', () => {
    expect(component).toBeTruthy()
  })

  it('should display a list entry for each transaction', () => {
    component.transactions = [new Transaction(1), new Transaction(2), new Transaction(3)]
    fixture.detectChanges()
    expect(fixture.debugElement.queryAll(By.css('.list-group-item')).length).toBe(3)
  })

  it('should add a transaction to the list if the @Input is updated and ngOnChanges is called', () => {
    component.transactions = [new Transaction(1), new Transaction(2), new Transaction(3)]
    component.newTransaction = new Transaction(4)
    component.ngOnChanges()
    fixture.detectChanges()
    expect(fixture.debugElement.queryAll(By.css('.list-group-item')).length).toBe(4)
  })

  xit('should sort the transactions by date', () => {
    component.transactions = [new Transaction(1, "", "", 0), new Transaction(2, "", "", 86400), new Transaction(3, "", "", 172800)]
    fixture.detectChanges()
    const list = fixture.debugElement.queryAll(By.css('.date'))
    for (let i = 0; i < 3; i++) {
      expect(list[i].nativeNode.innerHTML).toContain("Jan " + (i + 1))
    }
  })
})
