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
  
}