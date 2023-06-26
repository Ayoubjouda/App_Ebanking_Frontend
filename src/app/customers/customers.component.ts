import {Component, OnInit} from '@angular/core';
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {CustomerService} from "../services/customer.service";
import {catchError, map, Observable, throwError} from "rxjs";
import {Customer} from "../model/customer.model";
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit{
  customers!:Observable<Array<Customer>>;
  errorMessage!:object;
  searchformGroup:FormGroup | undefined;
  showModal: boolean = false;
  isModalOpen:boolean = false;


  constructor(private customerService:CustomerService, private fb:FormBuilder) {
  }
  ngOnInit() {

    this.searchformGroup=this.fb.group({
      keyword : this.fb.control("")
    });
    this.handleSearchCustomers();

  }


  handleSearchCustomers() {

    let kw=this.searchformGroup?.value.keyword;
    this.customers=this.customerService.searchCustomers(kw).pipe(
      catchError(err=>{
        this.errorMessage=err.message;
        return throwError(err);
      })
    );

  }

  handleDeleteCustomer(c:Customer) {
    this.customerService.deleteCustomers(c.id).subscribe({
      next : (resp) => {
        this.customers=this.customers.pipe(
          map(data=>{
            let index=data.indexOf(c);
            data.slice(index,1)
            return data;

          })
        );
       this. closeModal();
      },
      error : err => {
        console.log(err);
      }
    })
  }
  toggleModal() {
    this.showModal = !this.showModal;
    this.isModalOpen = this.showModal;
  }

  closeModal() {
    this.isModalOpen = false;
    this.showModal = false;
  }
}
