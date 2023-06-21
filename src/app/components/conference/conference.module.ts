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
import { ReactiveFormsModule } from '@angular/forms';


const conferenceRoutes : Routes = [
  {path: '', component: ConferenceComponent,
   children: [
   
     { path: 'home', component: ConfHomeComponent },
     { path: 'register', component: ConfRegisterComponent},
     {path: 'submission',component:ConfSubmissionComponent},
     {path:'schedule',component:ConfScheduleComponent}
     
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
    ConfParticipantsComponent

  ],
  imports: [
    CommonModule,
    RouterModule.forChild(conferenceRoutes),
    HttpClientModule,
    ReactiveFormsModule
  ]
})
export class ConferenceModule { }
