import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Transaction } from './model';
import { Observable, forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';
import mockTransactions from '../../bb-ui/mock-data/transactions.json';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, private http: HttpClient) { }
  title = 'backbase-app';

  userBalance = 5824.76

  transactionForm = this.formBuilder.group({
    fromAcc: `My Personal Account: € ${this.userBalance}`,
    toAcc: "",
    amount: 0,
  })

  transactions: Transaction[] = []

  // isControlValid(control: AbstractControl): boolean {
  //   return control.invalid && (control.dirty || this.submitClicked)
  // }

  onSubmit() {

  }

  ngOnInit() {
    this.getData().subscribe(
      ts => {
        console.log("success")
        this.transactions = ts
      },
      _ => {
        console.log("failed")
        this.transactions = [...mockTransactions.data as Transaction[]]
      }
    )
  }

  getData(): Observable<Transaction[]> {
    const corsProxy = 'https://cors-anywhere.herokuapp.com/' //TODO
    const url = 'https://r9vdzv10vd.execute-api.eu-central-1.amazonaws.com/dev/transactions'
    return this.http.get<Array<Transaction>>(corsProxy + url).pipe(map((data: Transaction[]) => data))
  }
}
