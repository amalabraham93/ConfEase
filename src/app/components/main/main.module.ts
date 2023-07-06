import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './main.component';
import { MainHomeComponent } from './main-home/main-home.component';
import { MainLoginComponent } from './main-login/main-login.component';
import { MainSignupComponent } from './main-signup/main-signup.component';
import { MainNavComponent } from './main-nav/main-nav.component';
import { RouterModule, Routes } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AboutUsComponent } from './about-us/about-us.component'; 


const mainRoutes : Routes = [
  {path: '', component:MainComponent,
   children: [
      {path: '', redirectTo: 'home', pathMatch: 'full'},
     { path: 'home', component: MainHomeComponent },
     { path: 'login', component: MainLoginComponent },
     { path: 'signup', component: MainSignupComponent },
     { path: 'about-us', component: AboutUsComponent },
     
     // Add more routes for other views or pages in the admin side
   ]
 }]

@NgModule({
  declarations: [
    MainComponent,
    MainHomeComponent,
    MainLoginComponent,
    MainSignupComponent,
    MainNavComponent,
    AboutUsComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(mainRoutes),
    NgbModule,

  ],
  exports: [
    RouterModule
  ]
})
export class MainModule { }
