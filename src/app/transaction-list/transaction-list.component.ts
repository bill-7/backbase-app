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
  displayedTransactions: Transaction[] = []

  filter(search: string) {
    this.displayedTransactions = this.transactions.filter(t => {
      return t.merchant.name.toLocaleLowerCase().includes(search.toLocaleLowerCase())
    })
  }

  dateString(d: number | string): string {
    const date = new Date(d).toDateString().split(' ')
    return `${date[1]}. ${date[2]}`
  }

  moneyString(t: Transaction["transaction"]): string {
    const polarity = t.creditDebitIndicator === "DBIT" ? "-" : ""
    const currCode = t.amountCurrency.currencyCode === "EUR" ? "€" : ""
    const amount = Number(t.amountCurrency.amount).toFixed(2)
    return `${currCode} ${polarity}${amount}`
  }

  ngOnInit() {
    this.getData().subscribe(
      ts => {
        console.log("success")
        this.transactions = ts
        this.displayedTransactions = this.transactions

      },
      _ => {
        console.log("failed")
        this.transactions = [...mockTransactions.data as Transaction[]]
        this.displayedTransactions = this.transactions
      }
    )
  }

  getData(): Observable<Transaction[]> {
    const corsProxy = 'https://cors-anywhere.herokuapp.com/' //TODO
    const url = 'https://r9vdzv10vd.execute-api.eu-central-1.amazonaws.com/dev/transactions'
    return this.http.get<Array<Transaction>>(corsProxy + url).pipe(map((data: Transaction[]) => data))
  }



}
