import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {CustomersComponent} from "./customers/customers.component";
import {AccountsComponent} from "./accounts/accounts.component";
import {NewCustomerComponent} from "./new-customer/new-customer.component";
import {AccountDetailsComponent} from "./account-details/account-details.component";

const routes: Routes = [
  {path:"customers",component:CustomersComponent},
  {path:"accounts/:id", component:AccountsComponent},
  {path:"new-customer", component:NewCustomerComponent},
  {path: "accounts-operation/:id", component: AccountDetailsComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
