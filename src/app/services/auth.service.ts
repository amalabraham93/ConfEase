import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';



@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isLoggedIn = false;
   private readonly  apiUrl = environment.apiUrl;

  constructor(private _http: HttpClient ,private _router:Router, private _cookie : CookieService) {}

  login(email: string, password: string): Observable<any> {
     
     return this._http.post(`${this.apiUrl}/users/login`, { email, password }).pipe(tap(()=>{
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
    return this._http.post(`${this.apiUrl}/users/logout`, {}).pipe(tap(()=>{
      this.isLoggedIn = false;
      localStorage.removeItem('jwt-user')
      // this._cookie.delete('jwt-user')
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

  isStoredAuthenticationValid(): boolean {
    // Implement logic to check if stored authentication is valid
    // Return true if valid, false otherwise
    
    // const allCookies: {} = this._cookie.getAll();
    const jwt = localStorage.getItem("jwt-user")
     
     
     if (jwt) {
        
      this._router.navigate(['/user/home']);

        return true;
      }
    return false;
  }

  setLoggedInState(value: boolean): void {
    // Implement logic to update the session authentication state
    this.isLoggedIn = value;
  }


  getUserRole():Observable<any>  {
    // Implement logic to get the user's role
    return this._http.get(`${this.apiUrl}/users/active`, {withCredentials:true})
  }


  active():Observable<any>{
  
    
    return this._http.get(`${this.apiUrl}/users/active`, {withCredentials:true})
  }
}
