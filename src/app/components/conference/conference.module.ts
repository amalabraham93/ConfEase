import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConferenceComponent } from './conference.component';
import { ConfNavComponent } from './conf-nav/conf-nav.component';
import { ConfHomeComponent } from './conf-home/conf-home.component';
import { ConfRegisterComponent } from './conf-register/conf-register.component';
import { ConfSubmissionComponent } from './conf-submission/conf-submission.component';
import { ConfScheduleComponent } from './conf-schedule/conf-schedule.component';
import { ConfPresentationsComponent } from './conf-presentations/conf-presentations.component';
import { ConfParticipantsComponent } from './conf-participants/conf-participants.component';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CKEditorModule,CKEditorComponent } from '@ckeditor/ckeditor5-angular';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ConfAttenttePresentationComponent } from './conf-attentte-presentation/conf-attentte-presentation.component';
import { ConfAttentteBuyTicketsComponent } from './conf-attentte-buy-tickets/conf-attentte-buy-tickets.component';


const conferenceRoutes : Routes = [
  {path: '', component: ConferenceComponent,
   children: [
   
     { path: ':id/home', component: ConfHomeComponent },
     { path: ':id/register', component: ConfRegisterComponent},
     {path: ':id/submission',component:ConfSubmissionComponent},
     {path:':id/schedule',component:ConfScheduleComponent},
     {path:':id/participants',component:ConfParticipantsComponent},
     {path:':id/presentation',component:ConfPresentationsComponent},
     {path:':id/attentte-presentation',component:ConfAttenttePresentationComponent},
     {path:':id/attentte-buy-tickets',component:ConfAttentteBuyTicketsComponent},
     
     
     // Add more routes for other views or pages in the admin side
   ]
 }]


@NgModule({
  declarations: [
    ConferenceComponent,
    ConfNavComponent,
    ConfHomeComponent,
    ConfRegisterComponent,
    ConfSubmissionComponent,
    ConfScheduleComponent,
    ConfPresentationsComponent,
    ConfParticipantsComponent,
    ConfAttenttePresentationComponent,
    ConfAttentteBuyTicketsComponent

  ],
  imports: [
    CommonModule,
    RouterModule.forChild(conferenceRoutes),
    HttpClientModule,
    ReactiveFormsModule,
    CKEditorModule,
    FormsModule,
    NgbModule,
    
    
   
  ]
})
export class ConferenceModule { }
