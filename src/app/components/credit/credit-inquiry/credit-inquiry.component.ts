import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-credit-inquiry',
  templateUrl: './credit-inquiry.component.html',
  styleUrls: ['./credit-inquiry.component.css']
})
export class CreditInquiryComponent implements OnInit {
  loading=false;
  constructor(private router:Router) { }

  ngOnInit() {
  }
  inquiryForm = new FormGroup({
    nationalityNo: new FormControl("",[Validators.required,Validators.minLength(11),Validators.maxLength(11),Validators.pattern('\\b\\d+\\b')])
  });
  clearInquiryForm() {
    this.inquiryForm.patchValue({
      nationalityNo: '',
    });
  }
  navigateToCreditList():void{
    this.router.navigateByUrl("/credit/list/"+this.inquiryForm.get('nationalityNo').value);
  }
}
