import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';
import { ChangePassword ,CreateUser, GetMyProfile, GetUser, GetUserList, UpdateUser,GetRoles} from '../../Models/User/User';
import { CreateOrUpdateCategory } from '../../Models/Category/category';
import { GenericResponse } from '../../Models/GenericResponse/GenericResponse';
import { PagintationModel } from '../../Models/PaginationModel/PagintationModel';

@Injectable({
  providedIn: 'root'
})
export class UserApiService {

  constructor(private http:HttpClient) { }
   // This to get the users 
 user:any;
   Getusers(modle:PagintationModel ): Observable<GenericResponse<GetUserList>> {
    return this.http.post<GenericResponse<GetUserList>>(`${environment.serverUrl}/User/GetAll`,modle)
  }
    // This to post the events 
    Createuser(person: CreateUser): Observable<GenericResponse<GetUser>> {
      // const categoriesIds = person.roleId === 2 ? person.categoriesIds : null;
      // const modifiedPerson = { ...person, categoriesIds };
      return this.http.post<GenericResponse<GetUser>>(`${environment.serverUrl}/User/Create`, person);
    }
   // This to Update the events
   Updateuser(person :UpdateUser):Observable<GenericResponse<GetUser>>{
   
    return this.http.post<GenericResponse<GetUser>>(`${environment.serverUrl}/User/Update`, person);
   }
   ChangePassword(chpass_person :ChangePassword):Observable<GenericResponse<GetUser>>{
      
     return this.http.post<GenericResponse<GetUser>>(`${environment.serverUrl}/User/ChangePassword`, chpass_person );
    }
  getUserById(userId:number): Observable<GenericResponse<GetMyProfile>> {
      return this.http.get<GenericResponse<GetMyProfile>>(`${environment.serverUrl}/User/GetById?id=${userId}`)
    }
    getMyProfile(): Observable<GenericResponse<GetMyProfile>> {
      return this.http.get<GenericResponse<GetMyProfile>>(`${environment.serverUrl}/User/GetMyProfile`)
    }
    getRoles() : Observable<GenericResponse<GetRoles[]>>
    {
      return this.http.get<GenericResponse<GetRoles[]>>(`${environment.serverUrl}/Lookups/GetAllRoles`)

    }
}
