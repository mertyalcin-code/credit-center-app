import { CreditListModel } from './../../../models/creditListModel';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { ListResponseModel } from '../../../models/listResponseModel';
import { CreditService } from '../../../services/credit.service';
import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-credit-list',
  templateUrl: './credit-list.component.html',
  styleUrls: ['./credit-list.component.css']
})
export class CreditListComponent implements OnInit {
  loading = false;
  nationalityNo: number;
  credits:CreditListModel[]=[];
  constructor(private toastrService: ToastrService,
            private creditService: CreditService,
            private router: ActivatedRoute
    ) { }

  ngOnInit() {
   this.nationalityNo= parseInt(this.router.snapshot.paramMap.get('nationalityNo'));
    if(this.nationalityNo!=null){
      this.findAllByNationalityNo();
    }
  
  }
  findAllByNationalityNo() {
    this.loading = true;
    this.creditService.findAllByNationalityNo(this.nationalityNo).subscribe(
      (response: ListResponseModel<CreditListModel>) => {
        if (response.success) {
          this.loading = false;
          console.log(response)
          this.credits = response.data;
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
