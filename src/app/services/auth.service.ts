import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';



@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isLoggedIn = false;
   private readonly  apiUrl = environment.apiUrl;

  constructor(private _http: HttpClient ,private _router:Router) {}

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
  
  logout():Observable<any> {
    return this._http.post(`${this.apiUrl}/users/logout`, {}, {withCredentials:true}).pipe(tap(()=>{
      this.isLoggedIn = false;
      this._router.navigate(['/user/login']);
     }));

  }
  org_logout():Observable<any> {
    return this._http.post(`${this.apiUrl}/users/logout`, {}, {withCredentials:true}).pipe(tap(()=>{
      this.isLoggedIn = false;
      this._router.navigate(['/organization/login']);
     }));

  }

  isLoggedInn(): boolean {
    return this.isLoggedIn;
  }

  getUserRole(): string {
    // Implement logic to get the user's role
    return 'user';
  }
}
