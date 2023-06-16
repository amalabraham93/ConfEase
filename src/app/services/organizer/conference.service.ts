import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ConferenceService  {
  
  private api = environment.apiUrl
  private backendUrl = `${this.api}/create-conference`; // Replace with your actual backend URL

  constructor(private http: HttpClient) { }

  saveEvent(eventData: any): Observable<any> {
    return this.http.post<any>(this.backendUrl, eventData);
  }
}