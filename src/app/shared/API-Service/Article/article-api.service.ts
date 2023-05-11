import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';
import { GenericResponse } from '../../Models/GenericResponse/GenericResponse';
import{PagintationModel} from '../../Models/PaginationModel/PagintationModel'
import {ArticleImages, CreateOrUpdateArticle, GetArticle, GetArticleById, GetArticleList  } from '../../Models/Article/Article';
import { BehaviorSubject } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class ArticleApiService {
  public Data=new BehaviorSubject(null);
  pageNumber: number = 1;
  constructor(private http :HttpClient) { }
  createArticle(data:FormData): Observable<GenericResponse<GetArticle>> {
    return this.http.post<GenericResponse<GetArticle>>(`${environment.serverUrl}/Article/Create`,data)
  
  }
  updateArticle(data:FormData): Observable<GenericResponse<GetArticle>> {
    return this.http.post<GenericResponse<GetArticle>>(`${environment.serverUrl}/Article/Update`,data)
  
  }
  createArticleImage(data:FormData): Observable<GenericResponse<ArticleImages>> {
    return this.http.post<GenericResponse<ArticleImages>>(`${environment.serverUrl}/ArticleImage/Create`,data)
  
  }
  getArticleById(acticleId:number): Observable<GenericResponse<GetArticleById>> {
    return this.http.get<GenericResponse<GetArticleById>>(`${environment.serverUrl}/Article/GetById?id=${acticleId}`)
  }
  getImagesByArticleId(acticleId:number): Observable<GenericResponse<ArticleImages[]>> {
    return this.http.get<GenericResponse<ArticleImages[]>>(`${environment.serverUrl}/ArticleImage/Get?ArticleId=${acticleId}`)
  }
  getArticleList(modle:PagintationModel ): Observable<GenericResponse<GetArticleList>> {
    return this.http.post<GenericResponse<GetArticleList>>(`${environment.serverUrl}/Article/GetArticleList`,modle)
    
  }
 
  deleteArticle(acticleId:number) : Observable<GenericResponse<{}>> {
    return this.http.get<GenericResponse<{}>>(`${environment.serverUrl}/Article/Delete?id=${acticleId}`)
  }
 
}
