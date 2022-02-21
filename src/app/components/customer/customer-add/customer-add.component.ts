import { HttpErrorResponse } from '@angular/common/http';
import { ResponseModel } from './../../../models/responseModel';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CustomerService } from './../../../services/customer.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-customer-add',
  templateUrl: './customer-add.component.html',
  styleUrls: ['./customer-add.component.css']
})
export class CustomerAddComponent implements OnInit {

 //variables
 loading = false;
 //constructor
 constructor(
   private customerService: CustomerService,
   private toastrService: ToastrService
 ) {}
 //starter
 ngOnInit() {}
 //add form
 customerAddForm = new FormGroup({
    nationalityNo: new FormControl("",[Validators.required,Validators.minLength(11),Validators.maxLength(11),Validators.pattern('\\b\\d+\\b')]),
    firstName: new FormControl("",[Validators.required,Validators.minLength(2),Validators.maxLength(100)]),
    lastName: new FormControl("",[Validators.required,Validators.minLength(2),Validators.maxLength(100)]),
    monthlySalary: new FormControl("",[Validators.required,Validators.min(0)]),
   phoneNumber : new FormControl("",[Validators.required,Validators.minLength(10),Validators.maxLength(10),Validators.pattern('\\b[5][0-9]{9}\\b')]),
 });
 //clear city
 clearCityAddForm() {
  this.customerAddForm.patchValue({
    nationalityNo: '',
    firstName: '',
    lastName: '',
    monthlySalary: '',
    phoneNumber: '',
  });
 }
 //adds a city
 add() {
   this.loading = true;
   let cityModel = Object.assign({}, this.customerAddForm.value);
   this.customerService.add(cityModel).subscribe(
     (response: ResponseModel) => {
       if (response.success) {
         this.loading = false;
         this.clearCityAddForm();
         this.customerAddForm.markAsUntouched();
         this.toastrService.success(response.message, 'Success');
       } else {
         this.toastrService.warning(response.message, 'Fail');
         this.loading = false;
       }
     },
     (errorResponse: HttpErrorResponse) => {
       this.toastrService.error(errorResponse.message, 'Fail');
       this.loading = false;
     }
   );
 }
}