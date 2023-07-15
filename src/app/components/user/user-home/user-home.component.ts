import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { ConferenceService } from '../../../services/organizer/conference.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user-home',
  templateUrl: './user-home.component.html',
  styleUrls: ['./user-home.component.css']
})
export class UserHomeComponent implements OnInit, OnDestroy {
  conferences: any;
  role: any;
  conferenceSubscription: Subscription | undefined;
  activeSubscription: Subscription | undefined;

  constructor(
    private _conferenceservices: ConferenceService,
    private route: ActivatedRoute,
    private _auth: AuthService,
    private _router: Router
  ) {}

  ngOnInit(): void {
    this.getConference();
    this._auth.isLoggedInn();
    this.activeSubscription = this._auth.active().subscribe((response: any) => {
      this.role = response;
    });

    this._auth.isStoredAuthenticationValid();
  }

  ngOnDestroy(): void {
    // Unsubscribe from the subscriptions
    this.conferenceSubscription?.unsubscribe();
    this.activeSubscription?.unsubscribe();
  }

  getConference() {
    this.conferenceSubscription = this._conferenceservices.getAllconferences().subscribe(
      (response: any) => {
        this.conferences = response.conferences;
      },
      (error: any) => {
        console.error('Error retrieving conferences:', error);
      }
    );
  }


}
