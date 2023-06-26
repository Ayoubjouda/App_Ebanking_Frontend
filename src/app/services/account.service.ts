import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {AccountsComponent} from "../accounts/accounts.component";
import {Observable} from "rxjs";
import {Accounts} from "../model/customer.model";
import {AccountDetails} from "../model/accounts.model";

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  constructor(private http : HttpClient) { }

  public getAccounts():Observable<Array<AccountsComponent>>{
    return this.http.get<Array<AccountsComponent>>(environment.hostUrlBak+"/accounts");
  }
  public getCustomerAccounts(accountId : string, page : number, size : number):Observable<Accounts>{
    return this.http.get<Accounts>(environment.hostUrlBak+"/customer-accounts/"+accountId+"?page="+page);
  }

  public getAccountById(accountId : string, page : number, size : number):Observable<AccountDetails>{
   return this.http.get<AccountDetails>(environment.hostUrlBak+"/accounts-operation/"+accountId+"/pageOperations?page="+page);
  }
  public debit(accountId : string, amount : number, description:string){
    let data={accountId : accountId, amount : amount, description : description}
    return this.http.post(environment.hostUrlBak+"/accounts-operation/debit",data);
  }
  public credit(accountId : string, amount : number, description:string){
    let data={accountId : accountId, amount : amount, description : description}
    return this.http.post(environment.hostUrlBak+"/accounts-operation/credit",data);
  }
  public transfer(accountSource: string,accountDestination: string, amount : number, description:string){
    let data={accountSource, accountDestination, amount, description }
    return this.http.post(environment.hostUrlBak+"/accounts-operation/transfer",data);
  }
}
