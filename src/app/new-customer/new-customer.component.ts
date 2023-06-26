import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Customer} from "../model/customer.model";
import {CustomerService} from "../services/customer.service";
import {data} from "autoprefixer";
import {Router} from "@angular/router";

@Component({
  selector: 'app-new-customer',
  templateUrl: './new-customer.component.html',
  styleUrls: ['./new-customer.component.css']
})
export class NewCustomerComponent  implements OnInit{
newCustomerFormGroup!:FormGroup;
constructor(private fb:FormBuilder,private customerService:CustomerService, private router:Router) {
}
ngOnInit() {
  this.newCustomerFormGroup=this.fb.group({
    name:this.fb.control(null,[Validators.required,Validators.minLength(4)]),
    email:this.fb.control(null,[Validators.email,Validators.required]),
  })
}

  handleSaveCustomer() {
    let customer: Customer = this.newCustomerFormGroup.value;
    this.customerService.saveCustomers(customer).subscribe({
      next: data => {
        // Afficher l'alerte de succès
        const successAlert = document.createElement('div');
        successAlert.className = 'p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-300';
        successAlert.role = 'alert';
        successAlert.innerHTML = '<span class="font-medium">Success alert!</span> Customer has successfully saved!';

        const parentElement = document.getElementById('votre-element-parent');
        if (parentElement) {
          parentElement.appendChild(successAlert);
        }

        // Ajouter la classe de durée de 2 secondes
        successAlert.classList.add('duration-2000');

        // Supprimer l'alerte après 2 secondes
        setTimeout(() => {
          successAlert.remove();
        }, 2000);
        this.newCustomerFormGroup.reset();
       // this.router.navigateByUrl("/customers");
      },
      error: err => {
        console.log(err);
      }
    });
  }


}
