import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { io } from 'socket.io-client';
import { environment } from '../../../../environments/environment';
import { ActivatedRoute, Router } from '@angular/router';
import { RegsiterConfService } from '../../../services/conference/regsiter-conf.service';
import AgoraRTC, { IAgoraRTCClient, IAgoraRTCRemoteUser } from 'agora-rtc-sdk-ng';

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
  conferenceId: string = '';
  showConferencePage: boolean = false; // Flag to control the visibility of the conference page

  agoraClient: IAgoraRTCClient | undefined;
  agoraLocalAudioTrack: any = null;
  agoraLocalVideoTrack: any = null;
  agoraRemoteUsers: IAgoraRTCRemoteUser[] = [];
  agoraChannelName: string = 'confEase'; // Replace with your channel name
  agoraToken: string = '007eJxTYLDuETT0M11ilyglX7Jt85Y9XD0XxPVeB2ebTrMULl7/QEGBIcnI1MwozSTJLMXSxMQsKcXSwjDNMNncIMUy2cDM1NLUKWxjSkMgI0PLry/MjAwQCOJzMCTn56W5JhanMjAAANe8Hok='; // Replace with your token
  agoraAppId: string = 'b2562f4b6d9446bd981f1c70d9c06595'; // Replace with your App ID
  agoraUid: undefined; // Replace with your user ID
  agoraLivestreamUrl: string = ''; // Replace with your livestream URL

  constructor(private _router: Router, private _route: ActivatedRoute, private http: HttpClient, private _presentaionService: RegsiterConfService) {}

  ngOnInit(): void {
    this._route.params.subscribe((params) => {
      this.conferenceId = params['id'];
    });

    this.agoraClient = AgoraRTC.createClient({ mode: 'live', codec: 'vp8' });
  }

  startConference() {
    this.room = `vpaas-magic-cookie-126f74bcc1c941a883de6197e188a8bd/${this.conferenceId}`;
    this.user = {
      name: 'ConfEase'
    };
    this.param = '1234564';
    
    // this.api = new JitsiMeetExternalAPI(this.domain, this.options);

    // Set the role of the organizer
    // const role = {
    //   "name": "moderator",
    //   "permissions": [
    //     "start",
    //     "stop",
    //     "mute",
    //     "unmute",
    //     "kick"
    //   ]
    // };
    // this.api.setRole('organizer', role);


    if (this.param) {
      this.videoStart();
      this.showConferencePage = true; // Show the conference page

      // Emit socket event to notify all users
      const socket = io(environment.apiUrl);
      socket.emit('conferenceStarted', { conferenceId: this.conferenceId });
    }
  }

  ngOnDestroy() {
    this.disposeVideoCall();
    this.leaveAgoraChannel();
  }

  videoStart() {
    // Send API request when conference is started
    this._presentaionService.startPresentation(this.room, this.conferenceId).subscribe({
      next: (response: any) => {
        console.log('API request successful:', response);
      },
      error: (error) => {
        console.log('API request error:', error);
      }
    });

    this.options = {
      roomName: this.room,
      // width: 900,
      height: 900,
      configOverwrite: { proJoinPageEnabe: false },
      interfaceConfigOverwrite: {
        TILE_VIEW_MAX_COLUMNS: 12
      },
      parentNode: document.querySelector('#jaas-container'),
      userInfo: {
        displayName: this.user.name
      }
    };

    this.api = new JitsiMeetExternalAPI(this.domain, this.options);
   // Set the role of the organizer
    

    // Event Handling
    this.api.addEventListeners({
      readyToClose: this.handleClose,
      participantLeft: this.handleParticipantLeft,
      participantJoined: this.handleParticipantJoined,
      videoConferenceJoined: this.handleVideoConferenceJoined,
      videoConferenceLeft: this.handleVideoConferenceLeft,
      audioMuteStatusChanged: this.handleAudioMuteStatusChanged,
      videoMuteStatusChanged: this.handleVideoMuteStatusChanged
    });

    // Emit the video stream to the server using Socket.IO
    const socket = io(environment.apiUrl);
    this.api.on('videoConferenceJoined', () => {
      const videoStream = this.api.getLivestreamURL();
      socket.emit('videoStream', videoStream);
    });

    // Join the Agora channel and publish the Jitsi streams to Agora
    this.joinAgoraChannel();
    this.publishJitsiStreams();
  }

  handleClose = () => {
    console.log('Closing meet');
  };

  handleParticipantLeft = async (participant: any) => {
    const data = await this.getParticipants();
  };

  handleParticipantJoined = async (participant: any) => {
    const data = await this.getParticipants();
    console.log(data);
    
  };

  handleVideoConferenceJoined = async (participant: any) => {
    const data = await this.getParticipants();
  };

  handleVideoConferenceLeft = () => {
    // this._router.navigate(['/']);
  };

  handleAudioMuteStatusChanged = (audio: any) => {
    console.log('handleAudioMuteStatusChanged', audio);
  };

  handleVideoMuteStatusChanged = (video: any) => {
    console.log('handleAudioMuteStatusChanged', video);
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

  joinAgoraChannel() {
    this.agoraClient?.join(this.agoraAppId, this.agoraChannelName, this.agoraToken, this.agoraUid);
  }

  leaveAgoraChannel() {
    this.agoraClient?.leave();
  }

  publishJitsiStreams() {
    const jitsiVideoStream = this.getJitsiVideoStream();
    const jitsiAudioStream = this.getJitsiAudioStream();

    Promise.all([jitsiVideoStream, jitsiAudioStream])
      .then(([videoStream, audioStream]) => {
        this.agoraLocalVideoTrack = AgoraRTC.createCustomVideoTrack({
          mediaStreamTrack: videoStream.getVideoTracks()[0],
        });
        this.agoraLocalAudioTrack = AgoraRTC.createCustomAudioTrack({
          mediaStreamTrack: audioStream.getAudioTracks()[0],
        });

        this.agoraClient?.publish([this.agoraLocalVideoTrack, this.agoraLocalAudioTrack]);
      })
      .catch((error) => {
        console.log('Error publishing Jitsi streams to Agora:', error);
      });
  }

  getJitsiVideoStream(): Promise<MediaStream> {
    // Your code to obtain the Jitsi video stream
    // Replace the following with your implementation
    return new Promise<MediaStream>((resolve, reject) => {
      const jitsiVideoTracks = this.api.getJitsiTracks('video');
      if (jitsiVideoTracks.length > 0) {
        const jitsiVideoTrack = jitsiVideoTracks[0];
        const jitsiVideoStream = jitsiVideoTrack.getOriginalStream();
        resolve(jitsiVideoStream);
      } else {
        reject('No Jitsi video stream available');
      }
    });
  }

  getJitsiAudioStream(): Promise<MediaStream> {
    // Your code to obtain the Jitsi audio stream
    // Replace the following with your implementation
    return new Promise<MediaStream>((resolve, reject) => {
      const jitsiAudioTracks = this.api.getJitsiTracks('audio');
      if (jitsiAudioTracks.length > 0) {
        const jitsiAudioTrack = jitsiAudioTracks[0];
        const jitsiAudioStream = jitsiAudioTrack.getOriginalStream();
        resolve(jitsiAudioStream);
      } else {
        reject('No Jitsi audio stream available');
      }
    });
  }
}
