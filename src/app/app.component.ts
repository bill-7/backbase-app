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
export class AppComponent {

  constructor(private formBuilder: FormBuilder, private http: HttpClient) { }
  title = 'backbase-app';


}
