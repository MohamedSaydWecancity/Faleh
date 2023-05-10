import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GenericResponse } from '../../Models/GenericResponse/GenericResponse';
import { PagintationModel } from '../../Models/PaginationModel/PagintationModel';
import { Observable } from 'rxjs/internal/Observable';
import {GetQuestion,GetQuestionList} from '../../Models/Question/Question'
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class QuestionApiService {

  constructor(private http :HttpClient) { }
  AcceptQuestionReply(questionId:number): Observable<GenericResponse<GetQuestion>> {
    return this.http.get<GenericResponse<GetQuestion>>(`${environment.serverUrl}/Question/AcceptQuestionReply?questionId=${questionId}`)
  }
  RejectQuestionReply(questionId:number): Observable<GenericResponse<GetQuestion>> {
    return this.http.get<GenericResponse<GetQuestion>>(`${environment.serverUrl}/Question/RejectQuestionReply?questionId=${questionId}`)
  }
  getAllPaged(modle:PagintationModel ): Observable<GenericResponse<GetQuestionList>> {
    return this.http.post<GenericResponse<GetQuestionList>>(`${environment.serverUrl}/Question/GetAllPaged`,modle)
  }
 
}
