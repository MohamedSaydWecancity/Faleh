import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GenericResponse } from '../../Models/GenericResponse/GenericResponse';
import { Observable } from 'rxjs/internal/Observable';
import {CreateOrUpdateKeyword, GetKeyword, GetKeywordAllForList, GetKeywordById, GetKeywordList}from '../../Models/Keyword/Keyword'
import { PagintationModel } from '../../Models/PaginationModel/PagintationModel';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class KeywordApiService {

  pageNumber: number = 1;
  keyword: any;
  constructor(private http :HttpClient) { }
  createKeyWord(data :CreateOrUpdateKeyword): Observable<GenericResponse<GetKeyword>> {
    return this.http.post<GenericResponse<GetKeyword>>(`${environment.serverUrl}/KeyWord/Create`,data)
  
  }
  updateKeyWord(data:CreateOrUpdateKeyword): Observable<GenericResponse<GetKeyword>> {
    return this.http.post<GenericResponse<GetKeyword>>(`${environment.serverUrl}/KeyWord/Update`,data)
  
  }
  getKeyWordById(KeyWordId:number): Observable<GenericResponse<GetKeywordById>> {
    return this.http.get<GenericResponse<GetKeywordById>>(`${environment.serverUrl}/KeyWord/GetById?id=${KeyWordId}`)
  }
  getKeyWordList(modle:PagintationModel ): Observable<GenericResponse<GetKeywordList>> {
    return this.http.post<GenericResponse<GetKeywordList>>(`${environment.serverUrl}/KeyWord/GetKeyWordList`,modle)
  }
  getKeyWordAllForList(): Observable<GenericResponse<GetKeywordAllForList[]>> {
    return this.http.get<GenericResponse<GetKeywordAllForList[]>>(`${environment.serverUrl}/KeyWord/GetAllForList`);
  }
 
  deleteKeyword(KeywordId:number) : Observable<GenericResponse<{}>> {
    return this.http.get<GenericResponse<{}>>(`${environment.serverUrl}/Keyword/Delete?id=${KeywordId}`)
  }
}
