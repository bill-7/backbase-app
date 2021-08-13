import { Component, Input, OnChanges, OnInit, ɵɵNgOnChangesFeature } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Transaction } from '../model';
import { Observable, of, Subject } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import mockTransactions from '../../../bb-ui/mock-data/transactions.json';

@Component({
  selector: 'app-transaction-list',
  templateUrl: './transaction-list.component.html',
  styleUrls: ['./transaction-list.component.scss']
})
export class TransactionListComponent implements OnInit, OnChanges {
  @Input() newTransaction!: Transaction

  constructor(private http: HttpClient) { }

  transactions: Transaction[] = []
  displayedTransactions: Transaction[] = []

  ngOnChanges() {
    console.log("changes")
    if (!!this.newTransaction) {
      console.log(this.newTransaction)
      this.transactions.unshift(this.newTransaction)
      this.filter("")
      // this.displayedTransactions.push(this.newTransaction)
    }
  }

  ngOnInit() {
    this.getData().subscribe(ts => {
      this.transactions = ts.sort(this.byDate)
      this.displayedTransactions = this.transactions
    })
  }

  private byDate(a: Transaction, b: Transaction): number {
    const time = (t: Transaction) => new Date(t.dates.valueDate).getTime()
    return time(b) - time(a)
  }

  private getData(): Observable<Transaction[]> {
    const corsProxy = 'https://cors-anywhere.herokuapp.com/' //TODO
    const url = 'https://r9vdzv10vd.execute-api.eu-central-1.amazonaws.com/dev/transactions'
    return this.http.get<Array<Transaction>>(corsProxy + url).pipe(
      map((data: Transaction[]) => data),
      catchError(() => of([...mockTransactions.data as Transaction[]]))
    )
  }

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
}
