import { UpdateCustomerModel } from './../../../models/updateCustomerModel';
import { ResponseModel } from './../../../models/responseModel';
import { UpdateCreditModel } from './../../../models/updateCreditModel';
import { HttpErrorResponse } from '@angular/common/http';
import { SingleResponseModel } from './../../../models/singleResponseModel';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CustomerListModel } from './../../../models/customerListModel';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CustomerService } from './../../../services/customer.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-customer-update',
  templateUrl: './customer-update.component.html',
  styleUrls: ['./customer-update.component.css']
})
export class CustomerUpdateComponent implements OnInit {
 //variables
 loading:boolean = false;
 editCustomer:CustomerListModel;
 //constructor
 constructor(private customerService : CustomerService,
             private toastrService : ToastrService,
             private router : ActivatedRoute
   ) { }
   //starter
 ngOnInit() {
   this.findById(parseInt(this.router.snapshot.paramMap.get('id'))) ;  
 }
   //update form
 customerUpdateForm = new FormGroup({
  nationalityNo: new FormControl("",[Validators.required,Validators.minLength(11),Validators.maxLength(11),Validators.pattern('\\b\\d+\\b')]),
  firstName: new FormControl("",[Validators.required,Validators.minLength(2),Validators.maxLength(100)]),
  lastName: new FormControl("",[Validators.required,Validators.minLength(2),Validators.maxLength(100)]),
  monthlySalary: new FormControl("",[Validators.required,Validators.min(0)]),
  phoneNumber : new FormControl("",[Validators.required,Validators.minLength(10),Validators.maxLength(10),Validators.pattern('\\b[5][0-9]{9}\\b')]),
 })
 clearCustomerUpdateForm() {
   this.customerUpdateForm.patchValue({
    nationalityNo: '',
    firstName: '',
    lastName: '',
    monthlySalary: '',
    phoneNumber: '',  
   });
 }
   //finds customer by id and patches the value to the form
 findById(id:number){
   this.customerService.findById(id).subscribe(
     (response: SingleResponseModel<CustomerListModel>) => {
       if (response.success) {   
         this.editCustomer=response.data;
         this.customerUpdateForm.patchValue({
          nationalityNo:response.data.nationalityNo,   
          firstName:response.data.firstName,  
          lastName:response.data.lastName,  
          monthlySalary:response.data.monthlySalary,  
          phoneNumber:response.data.phoneNumber,  
         });
         this.toastrService.success(response.message,"Başarılı");
       } else {     
         this.toastrService.warning(response.message,"Başarısız");
       }
     },
     (errorResponse: HttpErrorResponse) => {       
       this.toastrService.error(errorResponse.message,"Başarısız");
     }
   )
 }
   //sends update request
 update(){
   this.loading = true;
   let customerModel:UpdateCustomerModel = Object.assign({},this.customerUpdateForm.value);
   customerModel.id=this.editCustomer.id;
   this.customerService.update(customerModel).subscribe(
     (response: ResponseModel) => {
       if (response.success) {              
         this.loading = false;
         this.clearCustomerUpdateForm();
         this.customerUpdateForm.markAsUntouched();
         this.toastrService.success(response.message,"Başarılı");
       } else {     
         this.toastrService.warning(response.message,"Başarısız");
         this.loading = false;
       }
     },
     (errorResponse: HttpErrorResponse) => {       
       this.toastrService.error(errorResponse.message,"Başarısız");
       this.loading = false;
     }
   )
 }
 
 
 
 
 }
