import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConferenceService } from '../../../services/organizer/conference.service';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-conf-schedule',
  templateUrl: './conf-schedule.component.html',
  styleUrls: ['./conf-schedule.component.css']
})
export class ConfScheduleComponent implements OnInit {
  conferenceId: string = '';

  constructor(
    private _router: Router,
    private _route: ActivatedRoute,
    private _http: HttpClient,
    private _paperService: ConferenceService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this._route.params.subscribe((params) => {
      this.conferenceId = params['id'];
    });

    this._paperService.getPaperByConfId(this.conferenceId).subscribe((data) => {
      console.log(data);
    });
  }

  conferenceSessions: any[] = []; // Array to store the conference sessions
  newSession: any = {}; // Object to store the new session data

  openAddSessionModal() {
    this.modalService.open('addSessionModal');
  }

  public open(modal: any): void {
    this.modalService.open(modal);
  }

  closeAddSessionModal(modal: NgbModalRef) {
    modal.close();
  }

  addSession(modal: NgbModalRef) {
    // Validate the new session data
    if (
      this.newSession.date &&
      this.newSession.time &&
      this.newSession.authorName &&
      this.newSession.paperName
    ) {
      // Add the new session to the conferenceSessions array
      this.conferenceSessions.push({
        date: this.newSession.date,
        time: this.newSession.time,
        authorName: this.newSession.authorName,
        paperName: this.newSession.paperName
      });

      modal.close();
    }
  }
}