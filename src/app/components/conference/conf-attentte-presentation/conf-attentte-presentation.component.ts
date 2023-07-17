import { Component, OnInit } from '@angular/core';
import AgoraRTC, {
  IAgoraRTCClient,
  IAgoraRTCRemoteUser,
  VideoPlayerConfig,
} from 'agora-rtc-sdk-ng';

@Component({
  selector: 'app-conf-attentte-presentation',
  templateUrl: './conf-attentte-presentation.component.html',
  styleUrls: ['./conf-attentte-presentation.component.css'],
})
export class ConfAttenttePresentationComponent implements OnInit {
  agoraClient: IAgoraRTCClient | undefined;
  agoraRemoteUsers: IAgoraRTCRemoteUser[] = [];
  agoraChannelName: string = 'confEase'; // Replace with your channel name
  agoraAppId: string = 'b2562f4b6d9446bd981f1c70d9c06595'; // Replace with your App ID
  agoraToken: string =
    '007eJxTYLDuETT0M11ilyglX7Jt85Y9XD0XxPVeB2ebTrMULl7/QEGBIcnI1MwozSTJLMXSxMQsKcXSwjDNMNncIMUy2cDM1NLUKWxjSkMgI0PLry/MjAwQCOJzMCTn56W5JhanMjAAANe8Hok=';
  constructor() {}

  ngOnInit(): void {
    this.agoraClient = AgoraRTC.createClient({ mode: 'live', codec: 'vp8' });
    this.joinAgoraChannel();
    const remotePlayerContainer = document.createElement("div");
  }

  joinAgoraChannel() {
    this.agoraClient!.join(
      this.agoraAppId,
      this.agoraChannelName,
      this.agoraToken
    );
  }

  handleRemoteUserJoined(user: any) {
    this.agoraRemoteUsers.push(user);
  }

  handleRemoteUserLeft(user: any) {
    const index = this.agoraRemoteUsers.findIndex((u) => u.uid === user.uid);
    if (index !== -1) {
      this.agoraRemoteUsers.splice(index, 1);
    }
  }
}
