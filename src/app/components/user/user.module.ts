import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserComponent } from './user.component';
import { UserLoginComponent } from './user-login/user-login.component';
import { UserSignupComponent } from './user-signup/user-signup.component';
import { UserHomeComponent } from './user-home/user-home.component';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms'; 
import { HttpClientModule } from '@angular/common/http';
import { AuthGuard } from 'src/app/shared/guard/auth/auth.guard';
import { AuthService } from 'src/app/services/auth.service';
import { NgbModule,NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap'; 


const userRoutes : Routes = [
  {path: '', component:UserComponent,
   children: [
   
     { path: 'home', component: UserHomeComponent ,
    //  canActivate: [AuthGuard]
    },
     { path: 'login', component: UserLoginComponent },
     { path: 'signup', component: UserSignupComponent },  
     
     // Add more routes for other views or pages in the admin side
   ]
 }]

@NgModule({
  declarations: [
    UserComponent,
    UserLoginComponent,
    UserSignupComponent,
    UserHomeComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(userRoutes),
    HttpClientModule,
    NgbModule,
    NgbDropdownModule
  ],
  exports: [
    RouterModule
  ],
  providers: [
    AuthService,
    AuthGuard,
    // { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorInterceptor, multi: true } 
  ]
})
export class UserModule { }
