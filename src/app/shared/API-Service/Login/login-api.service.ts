import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { BehaviorSubject, Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class LoginApiService {

  constructor(private _HttpClient:HttpClient) { }

  user_login(person : object):Observable<any>{
    // console.log(person);
    return this._HttpClient.post(`${environment.Server_URL}/User/Login`, person);
   }
}
