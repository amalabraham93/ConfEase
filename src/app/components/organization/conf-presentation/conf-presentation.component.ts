import { Component, OnInit } from '@angular/core';


import { HttpClient } from '@angular/common/http';
import { io } from 'socket.io-client';
import { environment } from 'src/environments/environment';

import { ActivatedRoute, Router } from '@angular/router';

declare var JitsiMeetExternalAPI: any;

@Component({
  selector: 'app-conf-presentation',
  templateUrl: './conf-presentation.component.html',
  styleUrls: ['./conf-presentation.component.css']
})
export class ConfPresentationComponent implements OnInit {
  isAudioMuted: boolean = false;
  isVideoMuted: boolean = false;
  domain: string = 'meet.jit.si';
  room: any;
  user: any;
  api: any;
  options: any;
  public messageText = '';
  leader: boolean = false;
  id: any;
  param!: string;
  clubdetails$: any;
  conferenceId : string = ''

  showConferencePage: boolean = false; // Flag to control the visibility of the conference page


  constructor(private _router: Router, private _route: ActivatedRoute) {}

  ngOnInit(): void {
    this._route.params.subscribe(params => {
      this.conferenceId = params['id']
    })
  }


  startConference() {
    this.room = `vpaas-magic-cookie-126f74bcc1c941a883de6197e188a8bd/${this.conferenceId}`;
    this.user = {
      name: 'ConfEase'
    };
    this.param = '1234564';

    if (this.param) {
      this.videoStart();
      this.showConferencePage = true; // Show the conference page
    }
  }

  ngOnDestroy() {
    this.disposeVideoCall();
  }

  videoStart() {
    this.options = {
      roomName: this.room,
      // width: 900,
      height: 900,
      configOverWrite: { proJoinPageEnabe: false },
      interfaceConfigOverWrite: {
        TILE_VIEW_MAX_COLUMNS: 12
      },
      parentNode: document.querySelector('#jaas-container'),
      userInfo: {
        displayName: this.user.name
      }
    };
    this.api = new JitsiMeetExternalAPI(this.domain, this.options);

    // Event Handling
    this.api.addEventListerners({
      redyToClose: this.handleClose,
      participantLeft: this.handleParticipantLeft,
      participantJoined: this.handleParticipantJoined,
      videoConferenceJoined: this.handleVideoConferenceJoined,
      videoConferenceLeft: this.handleVideoConferenceLeft,
      AudioMuteStatusChanged: this.handleAudioMuteStatusChanged,
      VideoMuteStatusChanged: this.handleVideoMuteStatusChanged
    });


    // Emit the video stream to the server using Socket.IO
    const socket = io(environment.apiUrl);
    this.api.on('videoConferenceJoined', () => {
      const videoStream = this.api.getLivestreamURL();
      console.log(videoStream);
      
      socket.emit('videoStream', videoStream);
    });



  }




  handleClose = () => {
    console.log('closing meet');
  };

  handleParticipantLeft = async (participant: any) => {
    const data = await this.getParticipants();
  };

  handleParticipantJoined = async (participant: any) => {
    const data = await this.getParticipants();
  };

  handleVideoConferenceJoined = async (participant: any) => {
    const data = await this.getParticipants();
  };

  handleVideoConferenceLeft = () => {
    this._router.navigate(['/']);
  };

  handleAudioMuteStatusChanged = (audio: any) => {
    console.log("handleAudioMuteStatusChanged", audio);
  };

  handleVideoMuteStatusChanged = (video: any) => {
    console.log("handleAudioMuteStatusChanged", video);
  };

  getParticipants() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(this.api.getParticipantsInfo());
      }, 500);
    });
  }

  executeCommand(command: string) {
    this.api.executeCommand(command);
    if (command === 'hangup') {
      this._router.navigate(['/']);
    }
    if (command === 'toggleAudio') {
      this.isAudioMuted = !this.isAudioMuted;
    }
    if (command === 'toggleVideo') {
      this.isVideoMuted = !this.isVideoMuted;
    }
  }

  disposeVideoCall() {
    if (this.api) {
      this.api.dispose(); // Cleanup Jitsi Meet API instance
      this.api = null; // Reset the API instance
    }
  }
}
