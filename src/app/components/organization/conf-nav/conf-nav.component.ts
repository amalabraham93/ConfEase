import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ConferenceService } from '../../../services/organizer/conference.service';

@Component({
  selector: 'app-conf-nav',
  templateUrl: './conf-nav.component.html',
  styleUrls: ['./conf-nav.component.css']
})
export class ConfNavComponent  implements OnInit {
  conference: any 
  conferenceId: string = '';

  constructor(
    private conferenceService: ConferenceService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.conferenceId = params['id'];
      this.getConference();
    });
  }

  getConference(): void {
    this.conferenceService.getConfById(this.conferenceId).subscribe(
      (response: any) => {
       
        this.conference = response.conferences; 
    
        
      },
      (error: any) => {
        console.error('Error retrieving conferences:', error);
      }
    );
  }
}