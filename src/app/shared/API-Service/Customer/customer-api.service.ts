import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PagintationModel } from '../../Models/PaginationModel/PagintationModel';
import { Observable } from 'rxjs/internal/Observable';
import { GenericResponse } from '../../Models/GenericResponse/GenericResponse';
import{GetCustomerList} from '../../Models/Customer/Customer'
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class CustomerApiService {

  constructor(private http:HttpClient) { }
  getCustomerList(modle:PagintationModel ): Observable<GenericResponse<GetCustomerList>> {
    return this.http.post<GenericResponse<GetCustomerList>>(`${environment.serverUrl}/Customer/GetList`,modle)
  }
}
