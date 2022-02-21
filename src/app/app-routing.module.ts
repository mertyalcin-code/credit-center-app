import { PanelComponent } from './components/panel/panel.component';
import { CustomerUpdateComponent } from './components/customer/customer-update/customer-update.component';
import { CustomerAddComponent } from './components/customer/customer-add/customer-add.component';
import { CustomerAllListComponent } from './components/customer/customer-all-list/customer-all-list.component';
import { CreditUpdateComponent } from './components/credit/credit-update/credit-update.component';
import { CreditAddComponent } from './components/credit/credit-add/credit-add.component';
import { CreditAllListComponent } from './components/credit/credit-all-list/credit-all-list.component';

import { CreditListComponent } from './components/credit/credit-list/credit-list.component';
import { CreditInquiryComponent } from './components/credit/credit-inquiry/credit-inquiry.component';
import { HomeComponent } from './components/home/home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreditApplyComponent } from './components/credit/credit-apply/credit-apply.component';
const routes: Routes = [
{ path: 'home', component: HomeComponent },
{ path: 'credit/apply', component: CreditApplyComponent },
{ path: 'credit/list/:nationalityNo', component: CreditListComponent },
{ path: 'credit/inquery', component: CreditInquiryComponent },

{ path: 'panel', component: PanelComponent },

{ path: 'panel/credit/list', component: CreditAllListComponent },
{ path: 'panel/credit/add', component: CreditAddComponent },
{ path: 'panel/credit/update/:id', component: CreditUpdateComponent },

{ path: 'panel/customer/list', component: CustomerAllListComponent },
{ path: 'panel/customer/add', component: CustomerAddComponent },
{ path: 'panel/customer/update/:id', component: CustomerUpdateComponent },

{ path: '', component: HomeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
