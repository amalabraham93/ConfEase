import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { ConferenceService } from '../../../services/organizer/conference.service';
import { Store, select } from '@ngrx/store';
import { loadConferences } from '../../../store/conference/confernce.action';
import { selectConferences, selectConferenceLoading, selectConferenceError } from '../../../store/conference/conference.selectors';
import { Subscription } from 'rxjs';
import { UsersService } from 'src/app/services/user/users.service';
import { ToastrService } from 'ngx-toastr';
import { RegsiterConfService } from 'src/app/services/conference/regsiter-conf.service';

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

    this._user.getUser().subscribe((response) => {
      this.user = response.user;
      console.log(this.user);
    })
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

  isSameDate(date1: Date, date2: Date): boolean {
    return (
      date1.getDate() === date2.getDate() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getFullYear() === date2.getFullYear()
    );
  }



  isUserAlreadyRegistered(conferenceid: any): void {
    this._conferenceservices.getConfById(conferenceid).subscribe((response) => {
      this.conferenceDetails = response.conferences;
      console.log(this.conferenceDetails.users);
  
      let conf = this.conferenceDetails.users.filter((cn: any) => {
        return cn.email === this.user.email;
      });
      console.log(conf);
  
      if (conf.length === 1) {
        this._router.navigate(['/conference/' + conferenceid + '/home']);
      } else {
        console.log('sdkhjfhahsdjkajhfkjahdkfjahkfjhkajfhkajfhk');
        this._conference.getByUserId().subscribe((response) => {
          this.userConf = response.conferences;
          console.log(this.userConf, 'userConf');
  
          let conferenceStartDate = new Date(this.conferenceDetails.startDate);
          let userfound = this.userConf.filter((c: any) => {
            let startDate = new Date(c.startDate);
            return this.isSameDate(startDate, conferenceStartDate);
          });
  
          console.log(userfound, 'hasjdhkasdhahsdjahksjdkj');
  
          if (userfound.length >= 1) {
            this.openToster();
          } else {
            this._router.navigate(['/conference/' + conferenceid + '/home']);
          }
        });
      }
    });
  }

  openToster() {
    this.toastr.warning('You have already registered for a conference on this date.', 'Warning');
    return
  }
}
