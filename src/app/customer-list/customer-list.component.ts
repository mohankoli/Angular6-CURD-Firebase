import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../shared/customer.service';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css']
})
export class CustomerListComponent implements OnInit {

  constructor(private customerService: CustomerService) { }
  CustomerArray = [];
  showSuccessMessange:boolean;
  ngOnInit() {
  
    this.customerService.getCustomers().subscribe(
    list =>{
      this.CustomerArray = list.map(item =>{
           return{
             $key:item.key,
             ...item.payload.val()
           };
      });
    });
  }
  
  updateCustomerData(customer){
      this.customerService.populateForm(customer);
   }
   
   
   onDelete($key) {
    if (confirm('Are you sure to delete this record ?')) {
      this.customerService.deleteCustomer($key);
      this.showDeletedMessage = true;
      setTimeout(() => this.showDeletedMessage = false, 3000);
    }
  }

}
