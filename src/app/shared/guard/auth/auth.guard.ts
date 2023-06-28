import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router , private cookie : CookieService) {}

 async canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot):  Promise<boolean | UrlTree>  {

    // // Check if the user is authenticated in session
    // if (this.authService.isLoggedInn()) {
    //   return true;
    // }

    // // Check if the user is authenticated in browser storage
    // if (this.authService.isStoredAuthenticationValid()) {
    //   // Update the session authentication state
    //   const jwt = this.cookie.get("jwt-user")
    //  console.log(jwt);
     
    //   if (jwt) {
        
    //     this.authService.setLoggedInState(true);
    //     return true;
    //   }
    // }
    // try {
      this.authService.active().subscribe((response:any)=>{

        if (response.authenticated) {
          console.log(response);
          this.router.navigate(['/user/home']); 
          return true;
        } else {
          this.router.navigate(['/user/login']); 
          return false;
        }
      })
      return true
    // } catch (error) {
    //   console.error('An error occurred during authentication:', error);
    //    this.router.navigate(['/user/login']);

    //   return false;
    // }

    // User is not authenticated, redirect to login page
    // this.router.navigate(['/user/login']);
    // return false;
  }
}
