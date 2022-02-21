import { ResponseModel } from './../../../models/responseModel';
import { HttpErrorResponse } from '@angular/common/http';
import { ListResponseModel } from './../../../models/listResponseModel';
import { ToastrService } from 'ngx-toastr';
import { CreditService } from './../../../services/credit.service';
import { CreditListModel } from './../../../models/creditListModel';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-credit-all-list',
  templateUrl: './credit-all-list.component.html',
  styleUrls: ['./credit-all-list.component.css']
})
export class CreditAllListComponent implements OnInit {
  searchTerm:string="";
  credits:CreditListModel[]=[];
  deleteLoading:boolean=false;
  creditsLoading:boolean=false;
  constructor(    private creditService: CreditService,
    private toastrService: ToastrService) { }

  ngOnInit() {
    this.findAll();
  }
  findAll(){

    this.creditsLoading = true;
    this.creditService.findAll().subscribe(
      (response: ListResponseModel<CreditListModel>) => {
        if (response.success) {
          this.creditsLoading = false;
          this.credits = response.data;
          this.toastrService.success(response.message, 'Success');
        } else {
          this.toastrService.warning(response.message, 'Fail');
          this.creditsLoading = false;
        }
      },
      (errorResponse: HttpErrorResponse) => {
        this.toastrService.error(errorResponse.message, 'Fail');
        this.creditsLoading = false;
      }
    );
  }
  delete(id:number){
    this.deleteLoading = true;
    this.creditService.delete(id).subscribe(
      (response: ResponseModel) => {
        if (response.success) {
          this.deleteLoading = false;
          this.findAll();
          this.toastrService.success(response.message, 'Success');
        } else {
          this.toastrService.warning(response.message, 'Fail');
          this.deleteLoading = false;
        }
      },
      (errorResponse: HttpErrorResponse) => {
        this.toastrService.error(errorResponse.message, 'Fail');
        this.deleteLoading = false;
      }
    );
  }
}
