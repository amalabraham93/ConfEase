import { Component, OnInit } from '@angular/core';
import { ConferenceService } from 'src/app/services/organizer/conference.service';

@Component({
  selector: 'app-conference-dashboard',
  templateUrl: './conference-dashboard.component.html',
  styleUrls: ['./conference-dashboard.component.css']
})
export class ConferenceDashboardComponent implements OnInit {
  conferences: any[] = [];

  constructor(private conferenceService: ConferenceService) { }

  ngOnInit(): void {
    this.getConferences();
  }

  getConferences(): void {
    this.conferenceService.getConfByOrgId().subscribe(
      (response: any) => {
        console.log(response);
        
        this.conferences = response.conferences; // Assuming the response is an array of conferences
      },
      (error: any) => {
        console.error('Error retrieving conferences:', error);
      }
    );
  }
}
