import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { GenericResponse } from '../../Models/GenericResponse/GenericResponse';
import{ CreateOrUpdateCategory, GetCategory, GetCategoryById, GetCategoryList } from '../../Models/Category/category'
import { environment } from 'src/environments/environment';
import { PagintationModel } from '../../Models/PaginationModel/PagintationModel';

@Injectable({
  providedIn: 'root'
})
export class CateogryApiService {

  constructor(private http :HttpClient) { }
  createCategory(data :CreateOrUpdateCategory): Observable<GenericResponse<GetCategory>> {
    return this.http.post<GenericResponse<GetCategory>>(`${environment.serverUrl}/Category/Create`,data)
  
  }
  updateCategory(data:CreateOrUpdateCategory): Observable<GenericResponse<GetCategory>> {
    return this.http.post<GenericResponse<GetCategory>>(`${environment.serverUrl}/Category/Update`,data)
  
  }
  getCategoryById(cateogryId:number): Observable<GenericResponse<GetCategoryById>> {
    return this.http.get<GenericResponse<GetCategoryById>>(`${environment.serverUrl}/Category/GetById?id=${cateogryId}`)
  }
  getCategoryList(modle:PagintationModel ): Observable<GenericResponse<GetCategoryList>> {
    return this.http.post<GenericResponse<GetCategoryList>>(`${environment.serverUrl}/Category/GetCategoryList`,modle)
  }
 
  deleteCategory(acticleId:number) : Observable<GenericResponse<{}>> {
    return this.http.get<GenericResponse<{}>>(`${environment.serverUrl}/Category/Delete?id=${acticleId}`)
  }
}
