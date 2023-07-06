import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ConferenceService } from 'src/app/services/organizer/conference.service';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-conference-dashboard',
  templateUrl: './conference-dashboard.component.html',
  styleUrls: ['./conference-dashboard.component.css']
})
export class ConferenceDashboardComponent implements OnInit {
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
