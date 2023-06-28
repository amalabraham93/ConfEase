import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ConferenceService } from 'src/app/services/organizer/conference.service';

@Component({
  selector: 'app-conf-participants',
  templateUrl: './conf-participants.component.html',
  styleUrls: ['./conf-participants.component.css']
})
export class ConfParticipantsComponent implements OnInit {
  conference: any 
  conferenceId: string = '';
  papers:any
  submitted:boolean = false
  constructor(
    private conferenceService: ConferenceService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.conferenceId = params['id'];
      this.getConference();
      this.getPaperByConfId();

    });
  }

  getConference(): void {
    this.conferenceService.getConfById(this.conferenceId).subscribe(
      (response: any) => {
        console.log(response);
        this.conference = response.conferences; 
        console.log(this.conference);
        
      },
      (error: any) => {
        console.error('Error retrieving conferences:', error);
      }
    );
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

  getSubmittedStatus(user: any): string {
    if (this.papers && this.papers.length > 0) {
      const paperAuthors = this.papers[0].author; // Assuming there is only one paper in the array
  
      const isUserAuthor = paperAuthors.includes(user.email);
  
      return isUserAuthor ? 'Submitted' : 'Not Submitted';
    }
  
    return 'Not Submitted';
  }








  // checkAuthorAndSetSubmitted(): void {
  //   if (this.papers && this.conference) {
  //     const UserEmail = this.conference.users.email; // Replace with actual logged-in user email
  //     const paperAuthors = this.papers[0].author; // Assuming there is only one paper in the array
  
  //     const isUserAuthor = paperAuthors.includes(UserEmail);
  //     if(isUserAuthor){
  //       this.submitted = true
  //     }
  //     this.submitted = isUserAuthor;
  //   }
  // }
}