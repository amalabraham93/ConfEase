import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ConferenceService } from '../../../services/organizer/conference.service';
import { UsersService } from '../../../services/user/users.service';
import { RegsiterConfService } from 'src/app/services/conference/regsiter-conf.service';
declare var JitsiMeetExternalAPI: any;

@Component({
  selector: 'app-conf-presentations',
  templateUrl: './conf-presentations.component.html',
  styleUrls: ['./conf-presentations.component.css']
})
export class ConfPresentationsComponent implements OnInit {
  conferenceId: string = '';
  user: any;
  paper: any;
  showErrorMessage: boolean = false;
  roomId: string = '';

  constructor(
    private _route: ActivatedRoute,
    private _userService: UsersService,
    private _paperService: ConferenceService,
    private _presentaionService: RegsiterConfService
  ) {}

  ngOnInit(): void {
    this._route.params.subscribe((params) => {
      this.conferenceId = params['id'];
    });

    this._userService.getUser().subscribe((data) => {
      this.user = data.user;

      this._paperService.getPaperByConfId(this.conferenceId).subscribe((response) => {
        this.paper = response.paper;

        this.checkUserAuthorization();
      });
    });

    this._presentaionService.getPresentation(this.conferenceId).subscribe((response) => {
      console.log(response);
      this.roomId = response[0].stream_key;
      this.checkJoinAvailability();
    });
  }

  checkUserAuthorization() {
    if (this.paper && Array.isArray(this.paper)) {
      const userPaper = this.paper.find((p: any) => p.author.includes(this.user.email));
      if (!userPaper) {
        this.showErrorMessage = true;
      }
    }
  }

  checkJoinAvailability() {
    if (!this.roomId) {
      this.showErrorMessage = true;
    }
  }

  joinConference() {
    if (this.showErrorMessage) {
      alert('You have not submitted a paper to this conference.');
      return;
    }

    const domain = 'meet.jit.si';
    const room = this.roomId;
    const options = {
      roomName: room,
      // width: '100%',
      height: 900,
      parentNode: document.querySelector('#jitsi-container'),
      userInfo: {
        displayName: `${this.user.name}`
      }
    };

    const api = new JitsiMeetExternalAPI(domain, options);
  }
}
