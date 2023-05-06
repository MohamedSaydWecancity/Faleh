import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { GenericResponse } from '../../Models/GenericResponse/GenericResponse';
import{GetNews,GetNewsById,CreateOrUpdateNews, GetNewsList}from '../../Models/News/News'
import { environment } from 'src/environments/environment';
import { PagintationModel } from '../../Models/PaginationModel/PagintationModel';

@Injectable({
  providedIn: 'root'
})
export class NewsApiService {

  constructor(private http :HttpClient) { }
  createNews(data:FormData): Observable<GenericResponse<GetNews>> {
    return this.http.post<GenericResponse<GetNews>>(`${environment.serverUrl}/News/Create`,data)
  
  }
  updateNews(data:FormData): Observable<GenericResponse<GetNews>> {
    return this.http.post<GenericResponse<GetNews>>(`${environment.serverUrl}/News/Create`,data)
  
  }
  getNewsById(acticleId:number): Observable<GenericResponse<GetNewsById>> {
    return this.http.get<GenericResponse<GetNewsById>>(`${environment.serverUrl}/News/GetById?id=${acticleId}`)
  }
  getNewsList(modle:PagintationModel ): Observable<GenericResponse<GetNewsList>> {
    return this.http.post<GenericResponse<GetNewsList>>(`${environment.serverUrl}/News/GetNewsList`,modle)
  }
 
  deleteNews(newsId:number) : Observable<GenericResponse<{}>> {
    return this.http.get<GenericResponse<{}>>(`${environment.serverUrl}/News/Delete?id=${newsId}`)
  }
 
}
