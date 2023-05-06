import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { BehaviorSubject, Observable, of } from 'rxjs';
import{LoginDto} from '../../Models/login/login-class'
import { catchError, map, tap } from 'rxjs/operators';
import{GenericResponse} from '../../Models/GenericResponse/GenericResponse'
@Injectable({
  providedIn: 'root'
})
export class LoginApiService {

  constructor(private _HttpClient:HttpClient) { }
  public Data = new BehaviorSubject(null)

   
  user_login(person : LoginDto):Observable<any>{
    
    // console.log(person);
    return this._HttpClient.post(`${environment.serverUrl}/User/Login`, person) 
}

// test_server()//:Observable<any>
// {
  
//   //return this._HttpClient.get(`${environment.serverUrl}/Article/Mahmoud`) 

// }
getTests(): Observable<GenericResponse<any>> {
  const apiUrl = 'https://falehapi.wecancity.com/api/a/Article/Mahmoud';
  return this._HttpClient.get<GenericResponse<any>>(apiUrl);
}

}
