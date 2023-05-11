import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { GenericResponse } from '../../Models/GenericResponse/GenericResponse';
import{ CreateOrUpdateCategory, GetCategory, GetCategoryAllForList, GetCategoryById, GetCategoryList } from '../../Models/Category/category'
import { environment } from 'src/environments/environment';
import { PagintationModel } from '../../Models/PaginationModel/PagintationModel';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

@Injectable({
  providedIn: 'root'
})
export class CateogryApiService {

  constructor(private http :HttpClient) { }
  public Data=new BehaviorSubject(null);
  pageNumber: number = 1;
  category:any;
  createCategory(data :any): Observable<GenericResponse<GetCategory>> {
    return this.http.post<GenericResponse<GetCategory>>(`${environment.serverUrl}/Category/Create`,data)
  
  }
  updateCategory(data:any): Observable<GenericResponse<GetCategory>> {
    return this.http.post<GenericResponse<GetCategory>>(`${environment.serverUrl}/Category/Update`,data)
  
  }
  getCategoryById(cateogryId:number): Observable<GenericResponse<GetCategoryById>> {
    return this.http.get<GenericResponse<GetCategoryById>>(`${environment.serverUrl}/Category/GetById?id=${cateogryId}`)
  }
  getCategoryList(modle:PagintationModel ): Observable<GenericResponse<GetCategoryList>> {
    return this.http.post<GenericResponse<GetCategoryList>>(`${environment.serverUrl}/Category/GetCategoryList`,modle)
  }
  getMainForList(): Observable<GenericResponse<GetCategoryAllForList[]>> {
    return this.http.get<GenericResponse<GetCategoryAllForList[]>>(`${environment.serverUrl}/Category/GetMainForList`);
  }
  deleteCategory(acticleId:number) : Observable<GenericResponse<{}>> {
    return this.http.get<GenericResponse<{}>>(`${environment.serverUrl}/Category/Delete?id=${acticleId}`)
  }
}
