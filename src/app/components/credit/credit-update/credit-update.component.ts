import { ResponseModel } from './../../../models/responseModel';
import { UpdateCreditModel } from './../../../models/updateCreditModel';
import { HttpErrorResponse } from '@angular/common/http';
import { SingleResponseModel } from './../../../models/singleResponseModel';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CreditService } from './../../../services/credit.service';
import { CreditListModel } from './../../../models/creditListModel';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-credit-update',
  templateUrl: './credit-update.component.html',
  styleUrls: ['./credit-update.component.css']
})
export class CreditUpdateComponent implements OnInit {
//variables
loading:boolean = false;
editCredit:CreditListModel;
//constructor
constructor(private CreditService : CreditService,
            private toastrService : ToastrService,
            private router : ActivatedRoute
  ) { }
  //starter
ngOnInit() {
  this.findById(parseInt(this.router.snapshot.paramMap.get('id'))) ;  
}
  //update form
creditUpdateForm = new FormGroup({
  customerId: new FormControl("",[Validators.required,Validators.min(0)]),
  creditAmount: new FormControl("",[Validators.required,Validators.min(0)])
})
clearCreditUpdateForm() {
  this.creditUpdateForm.patchValue({
    customerId: '',  
    creditAmount: '',  
  });
}
  //finds city by id and patches the value to the form
findById(id:number){
  this.CreditService.findById(id).subscribe(
    (response: SingleResponseModel<CreditListModel>) => {
      if (response.success) {   
        this.editCredit=response.data;
        this.creditUpdateForm.patchValue({
          creditAmount:response.data.creditAmount,   
          customerId:response.data.customerId,  
        });
        this.toastrService.success(response.message,"Success");
      } else {     
        this.toastrService.warning(response.message,"Fail");
      }
    },
    (errorResponse: HttpErrorResponse) => {       
      this.toastrService.error(errorResponse.message,"Fail");

    }
  )
}
  //sends update request
update(){
  this.loading = true;
  let creditModel:UpdateCreditModel = Object.assign({},this.creditUpdateForm.value);
  creditModel.id=this.editCredit.id;
  this.CreditService.update(creditModel).subscribe(
    (response: ResponseModel) => {
      if (response.success) {              
        this.loading = false;
        this.clearCreditUpdateForm();
        this.creditUpdateForm.markAsUntouched();
        this.toastrService.success(response.message,"Success");
      } else {     
        this.toastrService.warning(response.message,"Fail");
        this.loading = false;
      }
    },
    (errorResponse: HttpErrorResponse) => {       
      this.toastrService.error(errorResponse.message,"Fail");
      this.loading = false;
    }
  )
}




}