import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Transaction } from '../model';
import { Observable, forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';
import mockTransactions from '../../../bb-ui/mock-data/transactions.json';

@Component({
  selector: 'app-transaction-list',
  templateUrl: './transaction-list.component.html',
  styleUrls: ['./transaction-list.component.scss']
})
export class TransactionListComponent implements OnInit {

  constructor(private http: HttpClient) { }

  transactions: Transaction[] = []

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
