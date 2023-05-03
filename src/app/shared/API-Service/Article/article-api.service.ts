import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';
import { GenericResponse } from '../../Models/GenericResponse/GenericResponse';
import{PagintationModel} from '../../Models/PaginationModel/PagintationModel'
import {CreateOrUpdateArticle, GetArticle, GetArticleById, GetArticleList  } from '../../Models/Article/Article';



@Injectable({
  providedIn: 'root'
})
export class ArticleApiService {

  constructor(private http :HttpClient) { }
  createArticle(data:FormData): Observable<GenericResponse<GetArticle>> {
    return this.http.post<GenericResponse<GetArticle>>(`${environment.serverUrl}/Article/Create`,data)
  
  }
  updateArticle(data:FormData): Observable<GenericResponse<GetArticle>> {
    return this.http.post<GenericResponse<GetArticle>>(`${environment.serverUrl}/Article/Create`,data)
  
  }
  getArticleById(acticleId:number): Observable<GenericResponse<GetArticleById>> {
    return this.http.get<GenericResponse<GetArticleById>>(`${environment.serverUrl}/Article/GetById?id=${acticleId}`)
  }
  getArticleList(modle:PagintationModel ): Observable<GenericResponse<GetArticleList>> {
    return this.http.post<GenericResponse<GetArticleList>>(`${environment.serverUrl}/Article/GetArticleList`,modle)
  }
 
  deleteArticle(acticleId:number) : Observable<GenericResponse<{}>> {
    return this.http.get<GenericResponse<{}>>(`${environment.serverUrl}/Article/Delete?id=${acticleId}`)
  }
 
}