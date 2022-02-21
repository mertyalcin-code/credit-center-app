import { ResponseModel } from './../../../models/responseModel';
import { ListResponseModel } from './../../../models/listResponseModel';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { CustomerService } from './../../../services/customer.service';
import { CustomerListModel } from './../../../models/customerListModel';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-customer-all-list',
  templateUrl: './customer-all-list.component.html',
  styleUrls: ['./customer-all-list.component.css']
})
export class CustomerAllListComponent implements OnInit {

  searchTerm:string="";
  customers:CustomerListModel[]=[];
  deleteLoading:boolean=false;
  customersLoading:boolean=false;
  constructor(    private customerService: CustomerService,
    private toastrService: ToastrService) { }


  ngOnInit() {
    this.findAll();
  }
  findAll(){

    this.customersLoading = true;
    this.customerService.findAll().subscribe(
      (response: ListResponseModel<CustomerListModel>) => {
        if (response.success) {
          this.customersLoading = false;
          this.customers = response.data;
          this.toastrService.success(response.message, 'Success');
        } else {
          this.toastrService.warning(response.message, 'Fail');
          this.customersLoading = false;
        }
      },
      (errorResponse: HttpErrorResponse) => {
        this.toastrService.error(errorResponse.message, 'Fail');
        this.customersLoading = false;
      }
    );
  }
  delete(id:number){
    this.deleteLoading = true;
    this.customerService.delete(id).subscribe(
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
