import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';


 interface Session {
  time: string;
  authorName: string;
  paperName: string;
}

 interface ScheduleDate {
  date: Date;
  sessions: Session[];
}


@Injectable({
  providedIn: 'root'
})
export class RegsiterConfService {
   private api = environment.apiUrl
  constructor(private _http:HttpClient) { }

  registerConference(id:string,fullName:string,email:string): Observable<any>{
    
    return this._http.post<any>(`${this.api}/organizers/conference/register/${id}`,{fullName,email})
  }

  submitPaper(confId:string,name:string,submissionTitle:string, abstract:string, author:string, affiliation:string, userId:string ,date:Date): Observable<any>{
    return this._http.post<any>(`${this.api}/organizers/conference/${confId}/paper-submit`,{name,submissionTitle,abstract,author,affiliation,userId,date})
  }
  addReviewer(email:string,confId:string): Observable<any>{
  
    
   return this._http.post<any>(`${this.api}/organizers/conference/add-reviewer`,{email,confId})
  }
  getByUserId(): Observable<any>{
    return this._http.get<any>(`${this.api}/organizers/conference/users-conf`)
    
  }
  updateConference(id:string,name:string,startDate:Date,endDate:Date): Observable<any>{
    return this._http.put<any>(`${this.api}/organizers/conference/update-conf/${id}`,{name,startDate,endDate})
    
  }
  startPresentation(stream_key:string,confId:string): Observable<any>{
    return this._http.post<any>(`${this.api}/organizers/presentation/start`,{stream_key,confId})
    
  }
  
  getConfById(confId:string): Observable<any>{
    return this._http.get<any>(`${this.api}/organizers/conferences/${confId}`)

  }
  addSession(confId:string,sessionDate:Date,session:Session): Observable<any>{
    return this._http.post<any>(`${this.api}/organizers/conference/add-session`,{confId,sessionDate,session})

  }


  

}
