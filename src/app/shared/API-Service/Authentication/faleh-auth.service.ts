import { Injectable } from '@angular/core';
import { ChangePassword, LoginDto, LoginResponse } from '../../Models/login/login-class';
import { GenericResponse } from '../../Models/GenericResponse/GenericResponse';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { GetUser } from '../../Models/User/User';

@Injectable({
  providedIn: 'root'
})
export class FalehAuthService {

  isAuthenticated = false;

  private  token = localStorage.getItem('Authorization');
  
    constructor(private http: HttpClient, private router: Router) {
      this.isAuthenticated = this.token != null ? true : false
    }
  
    // login(data: any): Observable<any> {
    //   return this.http.post(`${Server_URL}/User/login`, data, {
    //     headers: new HttpHeaders({ Authorization: `Bearer ${this.token}` }),
    //   });
  
  
    // }
  
    logout() {
      this.isAuthenticated = false;
      localStorage.removeItem("token");
      this.router.navigate(['']);
  
  
    }
   
  public  getToken() {
      return localStorage.getItem('Authorization');
    }
  

  public  ChangePassword(obj: ChangePassword): Observable<GenericResponse<GetUser>> {
      return this.http.post<GenericResponse<GetUser>>(`${environment.serverUrl}/User/ChangePassword`, obj);
    }
}
