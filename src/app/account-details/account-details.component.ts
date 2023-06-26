import {Component, OnInit} from '@angular/core';
import {AccountDetails} from "../model/accounts.model";
import {catchError, Observable, throwError} from "rxjs";
import {FormBuilder, FormGroup} from "@angular/forms";
import {AccountService} from "../services/account.service";
import {ActivatedRoute} from "@angular/router";

@Component({

  selector: 'app-account-details',
  templateUrl: './account-details.component.html',
  styleUrls: ['./account-details.component.css']
})
export class AccountDetailsComponent implements OnInit{
  currentPage: number = 0;
  pageSize: number = 5;
  accountObservable!: Observable<AccountDetails>;
  operationFromGroup!: FormGroup;
  errorMessage!: string;
  accountId: string = this.route.snapshot.params['id'];

  constructor(
    private fb: FormBuilder,
    private accountsService: AccountService, private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getAccounts();
    this.operationFromGroup = this.fb.group({
      operationType: this.fb.control(null),
      amount: this.fb.control(0),
      description: this.fb.control(null),
      accountDestination: this.fb.control(null),
    });
  }

  getAccounts() {
    this.accountObservable = this.accountsService
      .getAccountById(this.accountId, this.currentPage, this.pageSize)
      .pipe(
        catchError((err) => {
          this.errorMessage = err.message;
          return throwError(err);
        })
      );
  }

  gotoPage(page: number) {
    this.currentPage = page;
    this.getAccounts();
  }

  handleAccountOperation() {
    let operationType = this.operationFromGroup.value.operationType;
    let amount: number = this.operationFromGroup.value.amount;
    let description: string = this.operationFromGroup.value.description;
    let accountDestination: string =
      this.operationFromGroup.value.accountDestination;
    if (operationType == 'DEBIT') {
      this.accountsService.debit(this.accountId, amount, description).subscribe({
        next: () => {
          alert('Success Debit  ');
          this.operationFromGroup.reset();
          this.getAccounts();
        },
        error: (err) => {
          console.log(err);
        },
      });
    } else if (operationType == 'CREDIT') {
      this.accountsService.credit(this.accountId, amount, description).subscribe({
        next: () => {
          alert('Success Credit');
          this.operationFromGroup.reset();
          this.getAccounts();
        },
        error: (err) => {
          console.log(err);
        },
      });
    } else if (operationType == 'TRANSFER') {
      this.accountsService
        .transfer(this.accountId, accountDestination, amount, description)
        .subscribe({
          next: () => {
            alert('Success Transfer');
            this.operationFromGroup.reset();
            this.getAccounts();
          },
          error: (err) => {
            console.log(err);
          },
        });
    }
  }
}
