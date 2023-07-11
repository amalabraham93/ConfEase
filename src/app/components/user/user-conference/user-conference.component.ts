import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ConferenceService } from 'src/app/services/organizer/conference.service';
import { Store, select } from '@ngrx/store';
import { loadConferences } from 'src/app/store/conference/confernce.action';
import { selectConferences, selectConferenceLoading, selectConferenceError } from '../../../store/conference/conference.selectors';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user-conference',
  templateUrl: './user-conference.component.html',
  styleUrls: ['./user-conference.component.css']
})
export class UserConferenceComponent implements OnInit, OnDestroy {
  conferences: any;
  loading!: boolean;
  error: any;
  role: any;
  conferencesSubscription: Subscription | undefined;
  loadingSubscription: Subscription | undefined;
  errorSubscription: Subscription | undefined;

  constructor(
    private _conferenceservices: ConferenceService,
    private route: ActivatedRoute,
    private _auth: AuthService,
    private _router: Router,
    private store: Store
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