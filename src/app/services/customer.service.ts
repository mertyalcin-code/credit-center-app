import { ResponseModel } from './../models/responseModel';
import { UpdateCustomerModel } from './../models/updateCustomerModel';
import { CreateCustomerModel } from './../models/createCustomerModel';
import { SingleResponseModel } from './../models/singleResponseModel';
import { Observable } from 'rxjs';
import { CustomerListModel } from './../models/customerListModel';
import { ListResponseModel } from './../models/listResponseModel';
import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  private baseUrl: string = environment.baseUrl;
  private apiUrl: string = this.baseUrl + 'customers/';
  constructor(private httpClient: HttpClient) {}

  findAll(): Observable<ListResponseModel<CustomerListModel>> {
    return this.httpClient.get<ListResponseModel<CustomerListModel>>(
      this.apiUrl + 'find-all'
    );
  }
  findById(id: number): Observable<SingleResponseModel<CustomerListModel>> {
    return this.httpClient.get<SingleResponseModel<CustomerListModel>>(
      this.apiUrl + 'find-by-id/' + id
    );
  }
  add(model: CreateCustomerModel): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(this.apiUrl + 'create', model);
  }
  update(model: UpdateCustomerModel): Observable<ResponseModel> {
    return this.httpClient.put<ResponseModel>(this.apiUrl + 'update', model);
  }
  delete(id: number): Observable<ResponseModel> {
    return this.httpClient.delete<ResponseModel>(this.apiUrl + 'delete/' + id);
  }
}