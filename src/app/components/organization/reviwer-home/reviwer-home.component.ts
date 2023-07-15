import { Component,OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConferenceService } from '../../../services/organizer/conference.service';

@Component({
  selector: 'app-reviwer-home',
  templateUrl: './reviwer-home.component.html',
  styleUrls: ['./reviwer-home.component.css']
})
export class ReviwerHomeComponent implements OnInit {
  conferenceId!: string;
  papers: any[] = [];

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _conferenceService: ConferenceService
  ) {}

  ngOnInit(): void {
    this._route.params.subscribe((params) => {
      this.conferenceId = params['id'];
      this.getPapers();
    });
  }

  getPapers(): void {
    this._conferenceService.getPaperByConfId(this.conferenceId).subscribe(
      (response) => {
       
        
        this.papers = response.paper;
      },
      (error) => {
        console.log('Error retrieving papers:', error);
      }
    );
  }

  viewPaper(paperId: string): void {
    this._router.navigate(['/organization/review-paper/', this.conferenceId, paperId]);
  }
}
