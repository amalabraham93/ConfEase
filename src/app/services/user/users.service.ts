import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private api = environment.apiUrl
  constructor(private _http: HttpClient) { }


  getUser(): Observable<any>{
    
    return this._http.get<any>(`${this.api}/users/get-user-by-id`,{withCredentials:true})
  }

  verifyUser(token:string): Observable<any>{
    
    return this._http.post<any>(`${this.api}/users/verify/${token}`,{withCredentials:true})
  }



}
