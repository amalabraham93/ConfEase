import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserComponent } from './user.component';
import { UserLoginComponent } from './user-login/user-login.component';
import { UserSignupComponent } from './user-signup/user-signup.component';
import { UserHomeComponent } from './user-home/user-home.component';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms'; 
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthGuard } from 'src/app/shared/guard/auth/auth.guard';
import { AuthService } from 'src/app/services/auth.service';
import { NgbModule,NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { UserConferenceComponent } from './user-conference/user-conference.component';
import { UserEmailverifyComponent } from './user-emailverify/user-emailverify.component'; 
import { AuthUserInterceptor } from 'src/app/interceptors/users/auth-user.interceptor';


const userRoutes : Routes = [
  {path: '', component:UserComponent,
   children: [
     
     { path: 'home', component: UserHomeComponent , canActivate: [AuthGuard]},
     { path: 'login', component: UserLoginComponent ,canActivate: [AuthGuard]},
     { path: 'signup', component: UserSignupComponent },  
     { path: 'conferenece', component: UserConferenceComponent },  
     { path: 'verify-email', component: UserEmailverifyComponent },  
     
     // Add more routes for other views or pages in the admin side
   ]
 }]

@NgModule({
  declarations: [
    UserComponent,
    UserLoginComponent,
    UserSignupComponent,
    UserHomeComponent,
    UserConferenceComponent,
    UserEmailverifyComponent
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
    AuthUserInterceptor,
    { provide: HTTP_INTERCEPTORS, useClass: AuthUserInterceptor, multi: true } ,
    
  ]
})
export class UserModule { }
