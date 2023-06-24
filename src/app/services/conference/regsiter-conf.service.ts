import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RegsiterConfService {
   private api = environment.apiUrl
  constructor(private _http:HttpClient) { }

  registerConference(id:string,fullName:string,email:string): Observable<any>{
    
    return this._http.post<any>(`${this.api}/organizers/conferece/register/${id}`,{fullName,email},{withCredentials:true})
  }
}
