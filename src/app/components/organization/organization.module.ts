import { NgModule } from '@angular/core';
import { CommonModule,DatePipe } from '@angular/common';
import { OrganizationComponent } from './organization.component';
import { OrgLoginComponent } from './org-login/org-login.component';
import { OrgSignupComponent } from './org-signup/org-signup.component';
import { OrgHomeComponent } from './org-home/org-home.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule,NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { MyConferenceComponent } from './my-conference/my-conference.component';
import { ConferenceDashboardComponent } from './conference-dashboard/conference-dashboard.component'; 
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import { ConfNavComponent } from './conf-nav/conf-nav.component';
import { ConfConfigComponent } from './conf-config/conf-config.component';
import { ConfParticipantsComponent } from './conf-participants/conf-participants.component';
import { ConfPresentationsComponent } from '../conference/conf-presentations/conf-presentations.component';
import { ConfSubmissionsComponent } from './conf-submissions/conf-submissions.component';
import { ConfPresentationComponent } from './conf-presentation/conf-presentation.component';
import { ConfSidebarConfigComponent } from './conf-sidebar-config/conf-sidebar-config.component';
import { ConfCommitteComponent } from './conf-committe/conf-committe.component';
import { ReviwerLoginComponent } from './reviwer-login/reviwer-login.component';
import { ReviwerHomeComponent } from './reviwer-home/reviwer-home.component';
import { ReviwerPaperViewComponent } from './reviwer-paper-view/reviwer-paper-view.component';
import { AuthOrganizationInterceptor } from 'src/app/interceptors/organization/auth-organization.interceptor';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ConfScheduleComponent } from './conf-schedule/conf-schedule.component';
import { AddSessionDialogComponent } from './add-session-dialog/add-session-dialog.component';
import { MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import {MatCardModule} from '@angular/material/card';



const organizationRoutes : Routes = [
  {path: '', component:OrganizationComponent,
   children: [
   
     { path: 'home', component: OrgHomeComponent},
     { path: 'login', component: OrgLoginComponent },
     { path: 'signup', component: OrgSignupComponent },
     { path: 'my-events', component: MyConferenceComponent },
     { path: 'conf-dashboard/:id', component: ConferenceDashboardComponent },
     { path: 'conf-config/:id', component: ConfConfigComponent },
     { path: 'conf-participants/:id', component: ConfParticipantsComponent},
     { path: 'conf-submission/:id', component: ConfSubmissionsComponent},
     { path: 'conf-presentation/:id', component: ConfPresentationComponent},
     { path: 'conf-committe/:id', component: ConfCommitteComponent},
     { path: 'conf-schedule/:id', component: ConfScheduleComponent},
     { path: 'review-login/:id', component: ReviwerLoginComponent},
     { path: 'review-home/:id', component: ReviwerHomeComponent},
     { path: 'review-paper/:id/:paperId', component: ReviwerPaperViewComponent},
     
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
    ConfConfigComponent,
    ConfParticipantsComponent,
    ConfSubmissionsComponent,
    ConfPresentationComponent,
    ConfSidebarConfigComponent,
    ConfCommitteComponent,
    ReviwerLoginComponent,
    ReviwerHomeComponent,
    ReviwerPaperViewComponent,
    ConfScheduleComponent,
    AddSessionDialogComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(organizationRoutes),
    ReactiveFormsModule,
    NgbModule,
    NgbDropdownModule,
    MatMenuModule,
    MatButtonModule,
    FormsModule,
    MatFormFieldModule,
    MatDialogModule,
    MatCardModule,
    
    

  ],
  providers: [
    DatePipe,
    
    { provide: HTTP_INTERCEPTORS, useClass: AuthOrganizationInterceptor, multi: true } ,
    
  ]
})
export class OrganizationModule { }
