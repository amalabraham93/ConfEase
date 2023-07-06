import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RegsiterConfService } from 'src/app/services/conference/regsiter-conf.service';
import { ConferenceService } from 'src/app/services/organizer/conference.service';

@Component({
  selector: 'app-my-conference',
  templateUrl: './my-conference.component.html',
  styleUrls: ['./my-conference.component.css']
})
export class MyConferenceComponent implements OnInit {
  myConference: any[] = [];
  filteredConference: any[] = [];
  searchValue = '';
  selectedConference: any = null;
  showPaperList = false;

  constructor(
    private _conferenceService: RegsiterConfService,
    private router: Router,
    private _paperService: ConferenceService
  ) {}

  ngOnInit(): void {
    this._conferenceService.getByUserId().subscribe((res) => {
      this.myConference = res.conferences.map((conference: any) => ({
        ...conference,
        isPaperSubmitted: false,
        papers: []
      }));

      this.getMyPaper();
      this.filteredConference = [...this.myConference];
    });
  }

  getMyPaper() {
    this._paperService.getPaperByUserId().subscribe((res) => {
      if (Array.isArray(res.paper)) {
        const submittedConferenceIds = res.paper.map((paper: any) => paper.conference);

        this.myConference.forEach((conference) => {
          conference.isPaperSubmitted = submittedConferenceIds.includes(conference._id);
        });
      } else {
        console.error('Invalid response format for getPaperByUserId(). Expected an array in the "paper" property.');
      }
    });
  }

  filterTable() {
    const searchKeyword = this.searchValue.toLowerCase().trim();

    // Filter conferences based on search keyword
    this.filteredConference = this.myConference.filter((conference) =>
      conference.name.toLowerCase().includes(searchKeyword)
    );
  }

  navigateToConferenceHome(conferenceId: string) {
    this.router.navigate(['/conference', conferenceId, 'home']);
  }

  togglePaperList(conference: any) {
    if (this.selectedConference === conference) {
      this.selectedConference = null;
      this.showPaperList = false;
    } else {
      this.selectedConference = conference;
      this.showPaperList = true;
      this.fetchConferencePapers(conference._id);
    }
  }

  fetchConferencePapers(conferenceId: string) {
    this._paperService.getPaperByUserId().subscribe((res) => {
      if (Array.isArray(res.paper)) {
        const papers = res.paper.filter((paper: any) => paper.conference === conferenceId);
        this.selectedConference.papers = papers;
        console.log(this.selectedConference.papers);
      } else {
        console.error('Invalid response format for getPaperByUserId(). Expected an array in the "paper" property.');
      }
    });
  }

  payForConference(paperId: any) {
    this.router.navigate(['/user', 'payment', paperId]);
  }
}
