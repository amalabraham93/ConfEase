import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './main.component';
import { MainHomeComponent } from './main-home/main-home.component';
import { MainLoginComponent } from './main-login/main-login.component';
import { MainSignupComponent } from './main-signup/main-signup.component';
import { MainNavComponent } from './main-nav/main-nav.component';



@NgModule({
  declarations: [
    MainComponent,
    MainHomeComponent,
    MainLoginComponent,
    MainSignupComponent,
    MainNavComponent
  ],
  imports: [
    CommonModule
  ]
})
export class MainModule { }
