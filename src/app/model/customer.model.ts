import {Account} from "./accounts.model";

export interface Customer{
id:number;
name:string;
email:string;
}
export interface Accounts {
  id: number
  name: string
  currentPage: number
  totalPages: number
  pageSize: number
  totalAccounts: number
  currentPageAccounts: number
  bankAccounts: Account[]
}
