import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrganizationComponent } from './organization.component';
import { OrgLoginComponent } from './org-login/org-login.component';
import { OrgSignupComponent } from './org-signup/org-signup.component';
import { OrgHomeComponent } from './org-home/org-home.component';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbModule,NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { MyConferenceComponent } from './my-conference/my-conference.component';
import { ConferenceDashboardComponent } from './conference-dashboard/conference-dashboard.component'; 




const organizationRoutes : Routes = [
  {path: '', component:OrganizationComponent,
   children: [
   
     { path: 'home', component: OrgHomeComponent},
     { path: 'login', component: OrgLoginComponent },
     { path: 'signup', component: OrgSignupComponent },
     { path: 'my-events', component: MyConferenceComponent },
     { path: 'conf-dashboard', component: ConferenceDashboardComponent },
     
     // Add more routes for other views or pages in the admin side
   ]
 }]

@NgModule({
  declarations: [
    OrganizationComponent,
    OrgLoginComponent,
    OrgSignupComponent,
    OrgHomeComponent,
    MyConferenceComponent,
    ConferenceDashboardComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(organizationRoutes),
    ReactiveFormsModule,
    NgbModule,
    NgbDropdownModule
  ]
})
export class OrganizationModule { }
