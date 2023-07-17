import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RegsiterConfService {
   private api = environment.apiUrl
  constructor(private _http:HttpClient) { }

  registerConference(id:string,fullName:string,email:string): Observable<any>{
    
    return this._http.post<any>(`${this.api}/organizers/conference/register/${id}`,{fullName,email},{withCredentials:true})
  }

  submitPaper(confId:string,name:string,submissionTitle:string, abstract:string, author:string, affiliation:string, userId:string ,date:Date): Observable<any>{
    return this._http.post<any>(`${this.api}/organizers/conference/${confId}/paper-submit`,{name,submissionTitle,abstract,author,affiliation,userId,date},{withCredentials:true})
  }
  addReviewer(email:string,confId:string): Observable<any>{
  
    
   return this._http.post<any>(`${this.api}/organizers/conference/add-reviewer`,{email,confId},{withCredentials:true})
  }
  getByUserId(): Observable<any>{
    return this._http.get<any>(`${this.api}/organizers/conference/users-conf`,{withCredentials:true})
    
  }
  updateConference(id:string,name:string,startDate:Date,endDate:Date): Observable<any>{
    return this._http.put<any>(`${this.api}/organizers/conference/update-conf/${id}`,{name,startDate,endDate},{withCredentials:true})
    
  }
  startPresentation(stream_key:string,confId:string): Observable<any>{
    return this._http.post<any>(`${this.api}/organizers/presentation/start`,{stream_key,confId},{withCredentials:true})
    
  }
  
  getConfById(confId:string): Observable<any>{
    return this._http.get<any>(`${this.api}/organizers/conferences/${confId}`,{withCredentials:true})

  }

  

}
