import { CreditAllListComponent } from './components/credit/credit-all-list/credit-all-list.component';
import { CustomerUpdateComponent } from './components/customer/customer-update/customer-update.component';
import { CustomerAllListComponent } from './components/customer/customer-all-list/customer-all-list.component';
import { CustomerAddComponent } from './components/customer/customer-add/customer-add.component';
import { CreditUpdateComponent } from './components/credit/credit-update/credit-update.component';
import { CreditAddComponent } from './components/credit/credit-add/credit-add.component';
import { HomeComponent } from './components/home/home.component';
import { CreditInquiryComponent } from './components/credit/credit-inquiry/credit-inquiry.component';
import { FooterComponent } from './components/footer/footer.component';
import { NavComponent } from './components/nav/nav.component';
import { CreditApplyComponent } from './components/credit/credit-apply/credit-apply.component';
import { CreditListComponent } from './components/credit/credit-list/credit-list.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CommonModule } from '@angular/common';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
@NgModule({
  declarations: [
    AppComponent,
    CreditListComponent,
    CreditApplyComponent,
    NavComponent,
    FooterComponent,
    CreditInquiryComponent,
    HomeComponent,
    CreditAddComponent,
    CreditUpdateComponent,
    CreditAllListComponent,
    CustomerAddComponent,
    CustomerAllListComponent,
    CustomerUpdateComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    Ng2SearchPipeModule,
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-right',
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
