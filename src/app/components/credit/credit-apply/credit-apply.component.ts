import { SingleResponseModel } from '../../../models/singleResponseModel';
import { CreditService } from '../../../services/credit.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { CreditApplyResponseModel } from 'src/app/models/creditApplyResponseModel';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-credit-apply',
  templateUrl: './credit-apply.component.html',
  styleUrls: ['./credit-apply.component.css']
})
export class CreditApplyComponent implements OnInit {
  loading=false;
  result:CreditApplyResponseModel;
  constructor(private router:Router,
              private creditService:CreditService,
              private toastrService:ToastrService
    ) { }

  ngOnInit() {
  }
  creditApplyForm = new FormGroup({
    nationalityNo: new FormControl("",[Validators.required,Validators.minLength(11),Validators.maxLength(11),Validators.pattern('\\b\\d+\\b')]),
    firstName: new FormControl("",[Validators.required,Validators.minLength(2),Validators.maxLength(100)]),
    lastName: new FormControl("",[Validators.required,Validators.minLength(2),Validators.maxLength(100)]),
    monthlySalary: new FormControl("",[Validators.required,Validators.min(0)]),
    phoneNumber: new FormControl("",[Validators.required,Validators.minLength(10),Validators.maxLength(10),Validators.pattern('\\b[5][0-9]{9}\\b')]),

  });
  clearCreditApplyForm() {
    this.creditApplyForm.patchValue({
      nationalityNo: '',
      firstName: '',
      lastName: '',
      monthlySalary: '',
      phoneNumber: '',
    });
  }
  add():void{
    this.loading = true;
    let model = Object.assign({}, this.creditApplyForm.value);
    this.creditService.add(model).subscribe(
      (response: SingleResponseModel<CreditApplyResponseModel>) => {
        if (response.success) {
          this.loading = false;
          this.clearCreditApplyForm();
          this.creditApplyForm.markAsUntouched();
        //  console.log(response.data)
          this.result = response.data;
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
