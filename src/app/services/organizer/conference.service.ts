import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ConferenceService  {
  
  private api = environment.apiUrl
  private backendUrl = `${this.api}/organizers/create-conference`; 

  constructor(private http: HttpClient) { }

  saveEvent(eventData: any): Observable<any> {
    return this.http.post<any>(this.backendUrl, eventData,{withCredentials:true});
  }
  
  getConfByOrgId(): Observable<any>{
    return this.http.get<any>(`${this.api}/organizers/conferences`,{withCredentials:true})

  }
  getConfById(id:string): Observable<any>{
    return this.http.get<any>(`${this.api}/organizers/conferences/${id}`,{withCredentials:true})

  }

  getAllconferences(): Observable<any>{
    return this.http.get<any>(`${this.api}/organizers/get-all-conferences`,{withCredentials:true})
  }
 
  reviewerLogin(email:string,confId:string,password:string): Observable<any>{
    return this.http.post<any>(`${this.api}/organizers/conference/reviewer-login`,{email,confId,password},{withCredentials:true})
  }

  getPaperByConfId(confId:string): Observable<any>{
    return this.http.get<any>(`${this.api}/organizers/conference/${confId}/getpaper`,{withCredentials:true})
  }
  getPaperByUserId(): Observable<any>{
    return this.http.get<[]>(`${this.api}/organizers/conference/getpaper-user`,{withCredentials:true})
  }
}