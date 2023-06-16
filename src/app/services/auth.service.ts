import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { environment } from '../../environments/environment';



@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isLoggedIn = false;
   private readonly  apiUrl = environment.apiUrl;

  constructor(private _http: HttpClient ) {}

  login(email: string, password: string): Observable<any> {
    // return this._http.post('http://localhost:5000/users/login', { email, password }, {withCredentials:true});
     

     return this._http.post(`${this.apiUrl}/users/login`, { email, password }, {withCredentials:true}).pipe(tap(()=>{
      this.isLoggedIn = true;
     }));

  }
  
  org_login(email: string, password: string): Observable<any> {
    // return this._http.post('http://localhost:5000/users/login', { email, password }, {withCredentials:true});
     return this._http.post(`${this.apiUrl}/organizers/login`, { email, password }, {withCredentials:true});
  }


  signup(name: string, email: string, password: string, role: string): Observable<any> {
    return this._http.post(`${this.apiUrl}/users/signup`, { name, email, password,role });
  }
  
  org_signup(organizername: string, email: string, password: string): Observable<any> {
    return this._http.post(`${this.apiUrl}/organizers/signup`, { organizername, email, password });
  }
  
  logout(): void {
    // Implement logout functionality here
   

  }

  isLoggedInn(): boolean {
    return this.isLoggedIn;
  }

  getUserRole(): string {
    // Implement logic to get the user's role
    return 'user';
  }
}
