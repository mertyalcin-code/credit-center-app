import { ListResponseModel } from './../models/listResponseModel';
import { UpdateCreditModel } from './../models/updateCreditModel';
import { CreateCreditModel } from './../models/createCreditModel';
import { CreditApplyResponseModel } from './../models/creditApplyResponseModel';
import { CreditListModel } from './../models/creditListModel';
import { ResponseModel } from './../models/responseModel';
import { SingleResponseModel } from './../models/singleResponseModel';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CreditService {

  private baseUrl: string = environment.baseUrl;
  private apiUrl: string = this.baseUrl + 'credits/';
  constructor(private httpClient: HttpClient) {}

  findAll(): Observable<ListResponseModel<CreditListModel>> {
    return this.httpClient.get<ListResponseModel<CreditListModel>>(
      this.apiUrl + 'find-all'
    );
  }
  
  findAllByNationalityNo(nationalityNo:number): Observable<ListResponseModel<CreditListModel>> {
    return this.httpClient.get<ListResponseModel<CreditListModel>>(
      this.apiUrl + 'find-all-by-nationality-no/'+nationalityNo
    );
  }
  findById(id: number): Observable<SingleResponseModel<CreditListModel>> {
    return this.httpClient.get<SingleResponseModel<CreditListModel>>(
      this.apiUrl + 'find-by-id/' + id
    );
  }
  add(model: CreateCreditModel): Observable<SingleResponseModel<CreditApplyResponseModel>> {
    return this.httpClient.post<SingleResponseModel<CreditApplyResponseModel>>(this.apiUrl + 'create', model);
  }
  update(model: UpdateCreditModel): Observable<ResponseModel> {
    return this.httpClient.put<ResponseModel>(this.apiUrl + 'update', model);
  }
  delete(id: number): Observable<ResponseModel> {
    return this.httpClient.delete<ResponseModel>(this.apiUrl + 'delete/' + id);
  }
}