import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ConferenceService } from 'src/app/services/organizer/conference.service';

@Component({
  selector: 'app-conf-submissions',
  templateUrl: './conf-submissions.component.html',
  styleUrls: ['./conf-submissions.component.css']
})
export class ConfSubmissionsComponent implements OnInit {
  conferenceId: string = '';
  papers:any
  constructor(private conferenceService: ConferenceService, private route: ActivatedRoute){}
   

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.conferenceId = params['id'];
      this.getPaperByConfId();

    });
  }


  getPaperByConfId(): void {
    this.conferenceService.getPaperByConfId(this.conferenceId).subscribe(
      (response: any) => {
        console.log(response);
        this.papers = response.paper
        
      },
      (error: any) => {
        console.error('Error retrieving paper:', error);
      }
    );
  }
  

}
