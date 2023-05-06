import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

 
@Injectable({
  providedIn: 'root'
})
export class ProductService {
  public Data = new BehaviorSubject(null)
  

  constructor(private _HttpClient:HttpClient) { }
  // This to get the products 
  Get():Observable<any>{
   
   return this._HttpClient.get(`${environment.serverUrl}/Product/Get`);
  }
// This to post the products 
 Create(product):Observable<any>{
 
  return this._HttpClient.post(`${environment.serverUrl}/Product/Create`, product  );
 }
// This to Update the products
 Update(product_update):Observable<any>{
 
  return this._HttpClient.post(`${environment.serverUrl}/Product/Update`, product_update  );
 }
 // This to delete the products
Delete(id):Observable<any>{
  
  return this._HttpClient.get(`${environment.serverUrl}/Product/Delete?id=${id}` ); 
}



}
