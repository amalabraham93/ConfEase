import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainModule } from './components/main/main.module';
import { UserModule } from './components/user/user.module';
import { OrganizationModule } from './components/organization/organization.module';
import { AdminModule } from './components/admin/admin.module';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbModal, NgbModule } from '@ng-bootstrap/ng-bootstrap'; 
import { AuthService } from './services/auth.service';
import { AuthGuard } from './shared/guard/auth/auth.guard';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ConferenceModule } from './components/conference/conference.module';
import { JwtModule } from '@auth0/angular-jwt';
import { CKEditorModule,CKEditorComponent } from '@ckeditor/ckeditor5-angular';
import { MatDialogModule } from '@angular/material/dialog';
import { AuthUserInterceptor } from './interceptors/users/auth-user.interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import {CookieService} from 'ngx-cookie-service';
import { SpinnerComponent } from './shared/spinner/spinner/spinner.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { ConferenceEffects } from './store/conference/conference.effects';
import { conferenceReducer } from './store/conference/conference.reducer';
import { StripeModule } from "stripe-angular"
import { environment } from 'src/environments/environment';
import { ToastrModule } from 'ngx-toastr';
import { NotfoundComponent } from './components/notfound/notfound/notfound.component';



@NgModule({
  declarations: [
    AppComponent,
    SpinnerComponent,
    NotfoundComponent,
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MainModule,
    UserModule,
    ConferenceModule,
    OrganizationModule,
    AdminModule,
    ReactiveFormsModule,
    NgbModule,
    BrowserAnimationsModule,
    CKEditorModule,
    MatDialogModule,
    StoreModule.forRoot({ conference: conferenceReducer }),
    EffectsModule.forRoot([ConferenceEffects]),
     StripeModule,
     ToastrModule.forRoot(),
  ],
  providers: [
    AuthService,
    AuthGuard,
    CookieService
   
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
