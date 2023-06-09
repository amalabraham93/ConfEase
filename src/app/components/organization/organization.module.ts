import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrganizationComponent } from './organization.component';
import { OrgLoginComponent } from './org-login/org-login.component';
import { OrgSignupComponent } from './org-signup/org-signup.component';
import { OrgHomeComponent } from './org-home/org-home.component';



@NgModule({
  declarations: [
    OrganizationComponent,
    OrgLoginComponent,
    OrgSignupComponent,
    OrgHomeComponent
  ],
  imports: [
    CommonModule
  ]
})
export class OrganizationModule { }
