import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RegsiterConfService } from '../../../services/conference/regsiter-conf.service';
import { ConferenceService } from '../../../services/organizer/conference.service';
import { UsersService } from '../../../services/user/users.service';

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
  currentUser: any;

  constructor(
    private _conferenceService: RegsiterConfService,
    private router: Router,
    private _paperService: ConferenceService,
    private _userService: UsersService
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

    this._userService.getUser().subscribe((user) => {
      this.currentUser = user.user;

      this.checkPaperPayment(); // Call checkPaperPayment() here
    });
  }

  checkPaperPayment() {
    if (this.currentUser) {
      this.myConference.forEach((conference) => {
        conference.papers.forEach((paper: any) => {
          paper.paid = this.currentUser.transactions.some((transaction: any) => transaction.paperId === paper._id);
        });
      });
    }
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
      } else {
        console.error('Invalid response format for getPaperByUserId(). Expected an array in the "paper" property.');
      }
    });
  }

  payForConference(paperId: any) {
    const paper = this.myConference
      .flatMap((conference) => conference.papers)
      .find((paper: any) => paper._id === paperId);

    if (paper && paper.paid) {
      // User has already paid for the paper
      console.log('User has paid for the conference');
    } else {
      this.router.navigate(['/user', 'payment', paperId]);
    }
  }
}
