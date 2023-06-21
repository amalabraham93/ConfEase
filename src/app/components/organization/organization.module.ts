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
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import { ConfNavComponent } from './conf-nav/conf-nav.component';
import { ConfConfigComponent } from './conf-config/conf-config.component';



const organizationRoutes : Routes = [
  {path: '', component:OrganizationComponent,
   children: [
   
     { path: 'home', component: OrgHomeComponent},
     { path: 'login', component: OrgLoginComponent },
     { path: 'signup', component: OrgSignupComponent },
     { path: 'my-events', component: MyConferenceComponent },
     { path: 'conf-dashboard/:id', component: ConferenceDashboardComponent },
     { path: 'conf-config', component: ConfConfigComponent },
     
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
    ConferenceDashboardComponent,
    ConfNavComponent,
    ConfConfigComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(organizationRoutes),
    ReactiveFormsModule,
    NgbModule,
    NgbDropdownModule,
    MatMenuModule,
    MatButtonModule
  ]
})
export class OrganizationModule { }
