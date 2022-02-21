import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CreditService } from './../../../services/credit.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-credit-add',
  templateUrl: './credit-add.component.html',
  styleUrls: ['./credit-add.component.css']
})
export class CreditAddComponent implements OnInit {
  loading = false;
  constructor() { }

  ngOnInit() {
  }

}