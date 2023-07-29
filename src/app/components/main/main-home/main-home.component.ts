import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { RegsiterConfService } from 'src/app/services/conference/regsiter-conf.service';
import { ConferenceService } from 'src/app/services/organizer/conference.service';
import { UsersService } from 'src/app/services/user/users.service';
import { selectConferenceError, selectConferenceLoading, selectConferences } from 'src/app/store/conference/conference.selectors';
import { loadConferences } from 'src/app/store/conference/confernce.action';

@Component({
  selector: 'app-main-home',
  templateUrl: './main-home.component.html',
  styleUrls: ['./main-home.component.css']
})

export class MainHomeComponent implements OnInit {
  conferences: any;
  loading!: boolean;
  error: any;
  role: any;
  conferencesSubscription: Subscription | undefined;
  loadingSubscription: Subscription | undefined;
  errorSubscription: Subscription | undefined;
  user: any;
  conferenceDetails : any
  userConf:any
  constructor(
    private _conferenceservices: ConferenceService,
    private route: ActivatedRoute,
    private _auth: AuthService,
    private _router: Router,
    private store: Store,
    private _user: UsersService,
    private toastr: ToastrService,
    private _conference:RegsiterConfService
  ) { }

  ngOnInit(): void {

    this.getConference();

   // Subscribe to the conference state selectors and store the subscriptions
   this.conferencesSubscription = this.store.pipe(select(selectConferences)).subscribe((conferences) => {
    this.conferences = conferences;
  });

  this.loadingSubscription = this.store.pipe(select(selectConferenceLoading)).subscribe((loading) => {
    this.loading = loading;
  });

  this.errorSubscription = this.store.pipe(select(selectConferenceError)).subscribe((error) => {
    this.error = error;
  });


    
  }

  
  ngOnDestroy(): void {
    // Unsubscribe from the subscriptions
    this.conferencesSubscription?.unsubscribe();
    this.loadingSubscription?.unsubscribe();
    this.errorSubscription?.unsubscribe();
  }

  getConference() {
    this.store.dispatch(loadConferences());
  }

}
