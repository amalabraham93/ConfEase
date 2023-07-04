import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ConferenceService } from 'src/app/services/organizer/conference.service';
import { Store, select } from '@ngrx/store';
import { loadConferences } from 'src/app/store/conference/confernce.action';
import { selectConferences, selectConferenceLoading, selectConferenceError } from '../../../store/conference/conference.selectors';
@Component({
  selector: 'app-user-conference',
  templateUrl: './user-conference.component.html',
  styleUrls: ['./user-conference.component.css']
})
export class UserConferenceComponent implements OnInit {
  conferences: any;
  loading!: boolean;
  error: any;
  role: any;

  constructor(
    private _conferenceservices: ConferenceService,
    private route: ActivatedRoute,
    private _auth: AuthService,
    private _router: Router,
    private store: Store
  ) { }

  ngOnInit(): void {
    this.getConference();
    // this._auth.isLoggedInn();
    // this._auth.active().subscribe((response: any) => {
    //   console.log(response);
    //   this.role = response;
    // });
    
    // Subscribe to the conference state selectors
    this.store.pipe(select(selectConferences)).subscribe((conferences) => {      
      this.conferences = conferences;
      
    });

    this.store.pipe(select(selectConferenceLoading)).subscribe((loading) => {
      this.loading = loading;
    });

    this.store.pipe(select(selectConferenceError)).subscribe((error) => {
      this.error = error;
    });
  }

  getConference() {
    this.store.dispatch(loadConferences());
  }

  
}