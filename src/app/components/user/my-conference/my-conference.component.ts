import { Component, OnInit, ViewChild } from '@angular/core';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { RegsiterConfService } from 'src/app/services/conference/regsiter-conf.service';
import { SelectionType } from '@swimlane/ngx-datatable';
import { Router } from '@angular/router';
import { ConferenceService } from 'src/app/services/organizer/conference.service';

@Component({
  selector: 'app-my-conference',
  templateUrl: './my-conference.component.html',
  styleUrls: ['./my-conference.component.css']
})
export class MyConferenceComponent implements OnInit {
  myConference: any[] = [];
  filteredConference: any[] = [];
  columns = [
    { prop: 'name' },
    { prop: 'isPaperSubmitted', name: 'Paper Submitted' },
    { prop: 'startDate', name: 'Date' }
  ];
  searchValue = '';
  selectedConference: any;
  SelectionType = SelectionType;
  papers: any[] = [];
  @ViewChild(DatatableComponent, { static: false }) table!: DatatableComponent;

  constructor(
    private _conferenceService: RegsiterConfService,
    private router: Router,
    private _paperService: ConferenceService
  ) {}

  ngOnInit(): void {
    this._conferenceService.getByUserId().subscribe((res) => {
      console.log(res);
      this.myConference = res.conferences.map((conference: any) => ({
        ...conference,
        isPaperSubmitted: false
      }));

      
      this.filteredConference = [...this.myConference];
    });

    this.getMyPaper();
  }

  getMyPaper() {
    this._paperService.getPaperByUserId().subscribe((res) => {
      console.log(res);
      this.papers = Object.values(res);
  
      // Iterate over papers and set isPaperSubmitted to true for corresponding conference
      this.myConference.forEach((conference) => {
        const matchingPaper = this.papers.includes(
          (paper: any) => paper.conference === conference._id
        );
        conference.isPaperSubmitted = matchingPaper;
      });
    });
  }

  filterTable() {
    const searchKeyword = this.searchValue.toLowerCase().trim();

    // Filter conferences based on search keyword
    this.filteredConference = this.myConference.filter((conference) =>
      conference.name.toLowerCase().includes(searchKeyword)
    );

    // Update the table offset and trigger page update
    if (this.table) {
      this.table.offset = 0;
      this.table.bodyComponent.updatePage('up');
    }
  }

  onActivate(event: any) {
    this.selectedConference = event.row;
  }

  navigateToConferenceHome(conferenceId: string) {
    this.router.navigate(['/conference', conferenceId, 'home']);
  }
}
