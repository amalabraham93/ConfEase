import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserComponent } from './user.component';
import { UserLoginComponent } from './user-login/user-login.component';
import { UserSignupComponent } from './user-signup/user-signup.component';
import { UserHomeComponent } from './user-home/user-home.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; 
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthGuard } from 'src/app/shared/guard/auth/auth.guard';
import { AuthService } from 'src/app/services/auth.service';
import { NgbModule,NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { UserConferenceComponent } from './user-conference/user-conference.component';
import { UserEmailverifyComponent } from './user-emailverify/user-emailverify.component'; 
import { AuthUserInterceptor } from 'src/app/interceptors/users/auth-user.interceptor';
import { MyConferenceComponent } from './my-conference/my-conference.component';
import { UserNavComponent } from './user-nav/user-nav.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { ProfileComponent } from './profile/profile.component';
import { PaymentComponent } from './payment/payment.component';
import { PresentationComponent } from './presentation/presentation.component';
// import { StoreModule } from '@ngrx/store';
// import { EffectsModule } from '@ngrx/effects';
// import { ConferenceEffects } from '../../store/conference/conference.effects';

const userRoutes : Routes = [
  {path: '', component:UserComponent,
   children: [
     
     { path: 'home', component: UserHomeComponent ,},
     { path: 'login', component: UserLoginComponent ,canActivate: [AuthGuard]},
     { path: 'signup', component: UserSignupComponent},  
     { path: 'conferenece', component: UserConferenceComponent },  
     { path: 'verify-email', component: UserEmailverifyComponent },  
     { path: 'my-conference', component: MyConferenceComponent},  
     { path: 'profile', component: ProfileComponent,canActivate: [AuthGuard] },  
     { path: 'payment/:paperId', component: PaymentComponent, canActivate: [AuthGuard] },  
     
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
    UserEmailverifyComponent,
    MyConferenceComponent,
    UserNavComponent,
    ProfileComponent,
    PaymentComponent,
    PresentationComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(userRoutes),
    HttpClientModule,
    NgbModule,
    NgbDropdownModule,
    FormsModule,
    NgxDatatableModule,
    // StoreModule.forRoot({}, {}),
    // EffectsModule.forRoot([ConferenceEffects])
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
