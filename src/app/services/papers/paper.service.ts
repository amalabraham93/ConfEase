import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaperService {
  private api = environment.apiUrl
  constructor(private _http:HttpClient) { }
  

  getPaperById(paperId:string): Observable<any>{
    return this._http.get<any>(`${this.api}/organizers/conference/getpaperbyid/${paperId}`,{withCredentials:true})

  }

  acceptPaper(paperId:string,approved:boolean): Observable<any>{
    return this._http.post<any>(`${this.api}/organizers/conference/updategetpaperbyid/${paperId}`,{approved},{withCredentials:true})

  }

}
