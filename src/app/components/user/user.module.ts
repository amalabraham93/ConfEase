import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserComponent } from './user.component';
import { UserLoginComponent } from './user-login/user-login.component';
import { UserSignupComponent } from './user-signup/user-signup.component';
import { UserHomeComponent } from './user-home/user-home.component';



@NgModule({
  declarations: [
    UserComponent,
    UserLoginComponent,
    UserSignupComponent,
    UserHomeComponent
  ],
  imports: [
    CommonModule
  ]
})
export class UserModule { }
