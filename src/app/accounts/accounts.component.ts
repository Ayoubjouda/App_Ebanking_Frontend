import {Component, OnInit} from '@angular/core';
import {Customer,Accounts} from "../model/customer.model";
import {CustomersComponent} from "../customers/customers.component";
import {catchError, Observable, throwError} from "rxjs";
import {ActivatedRoute} from "@angular/router";
import {AccountService} from "../services/account.service";

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.css']
})
export class AccountsComponent implements OnInit{


  customerId: string = this.route.snapshot.params['id'];
  customer!: Customer;
  customerAccounts!: Observable<Accounts>;
  currentPage: number = 0;
  pageSize: number = 5;
  errorMessage!: string;

  constructor(
    private accountsService: AccountService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getAccounts();
  }

  getAccounts() {
    this.customerAccounts = this.accountsService.getCustomerAccounts(this.customerId, this.currentPage, this.pageSize).pipe(
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
}
