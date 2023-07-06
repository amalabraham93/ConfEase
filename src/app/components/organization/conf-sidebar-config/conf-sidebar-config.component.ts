import { Component,OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ConferenceService } from 'src/app/services/organizer/conference.service';

@Component({
  selector: 'app-conf-sidebar-config',
  templateUrl: './conf-sidebar-config.component.html',
  styleUrls: ['./conf-sidebar-config.component.css']
})
export class ConfSidebarConfigComponent  implements OnInit {
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