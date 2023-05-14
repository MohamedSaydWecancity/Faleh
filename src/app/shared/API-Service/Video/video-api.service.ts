import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { GenericResponse } from '../../Models/GenericResponse/GenericResponse';
import{CreateOrUpdateVideo,GetVideo,GetVideoById,GetVideoList} from '../../Models/Video/Video'
import { environment } from 'src/environments/environment';
import { PagintationModel } from '../../Models/PaginationModel/PagintationModel';


@Injectable({
  providedIn: 'root'
})
export class VideoApiService {

  constructor(private http :HttpClient) { }
  createVideo(data:FormData): Observable<GenericResponse<GetVideo>> {
    return this.http.post<GenericResponse<GetVideo>>(`${environment.serverUrl}/Video/Create`,data)
  
  }
  updateVideo(data:FormData): Observable<GenericResponse<GetVideo>> {
    return this.http.post<GenericResponse<GetVideo>>(`${environment.serverUrl}/Video/Update`,data)
  
  }
  getVideoById(acticleId:number): Observable<GenericResponse<GetVideoById>> {
    return this.http.get<GenericResponse<GetVideoById>>(`${environment.serverUrl}/Video/GetById?id=${acticleId}`)
  }
  getVideoList(modle:PagintationModel ): Observable<GenericResponse<GetVideoList>> {
    return this.http.post<GenericResponse<GetVideoList>>(`${environment.serverUrl}/Video/GetVideoList`,modle)
  }
 
  deleteVideo(VideoId:number) : Observable<GenericResponse<{}>> {
    return this.http.get<GenericResponse<{}>>(`${environment.serverUrl}/Video/Delete?id=${VideoId}`)
  }
 
}
