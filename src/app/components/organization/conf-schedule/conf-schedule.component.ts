import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConferenceService } from '../../../services/organizer/conference.service';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegsiterConfService } from 'src/app/services/conference/regsiter-conf.service';

@Component({
  selector: 'app-conf-schedule',
  templateUrl: './conf-schedule.component.html',
  styleUrls: ['./conf-schedule.component.css']
})
export class ConfScheduleComponent implements OnInit {
  conferenceId: string = '';
  conference: any;
  conferenceSessions: any[] = []; // Array to store the conference sessions
  newSessionForm: FormGroup;
  formSubmitted: boolean = false;
  availableDates: string[] = []; // Array to store available dates within the conference start and end dates
  availableTimes: string[] = []; // Array to store available times for scheduling sessions
  selectedDate: string = ''; // Variable to store the selected date for session scheduling
  selectedTime: string = ''; // Variable to store the selected time for session scheduling
  paper: any;

  constructor(
    private _router: Router,
    private _route: ActivatedRoute,
    private _http: HttpClient,
    private _paperService: ConferenceService,
    private modalService: NgbModal,
    private formBuilder: FormBuilder,
    private _conferenceService: RegsiterConfService
  ) {
    this.newSessionForm = this.formBuilder.group({
      date: ['', Validators.required],
      time: ['', Validators.required],
      authorName: ['', Validators.required],
      paperName: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this._route.params.subscribe((params) => {
      this.conferenceId = params['id'];
    });

    this._paperService.getPaperByConfId(this.conferenceId).subscribe((data) => {
      this.paper = data.paper;
      this.conference = this.paper[0].conference;
      console.log(this.paper[0].author);

      this.generateAvailableDates();
      this.generateAvailableTimes();
    });
  }

  generateAvailableDates() {
    const startDate = new Date(this.conference.startDate);
    const endDate = new Date(this.conference.endDate);

    const currentDate = new Date(startDate);

    while (currentDate <= endDate) {
      this.availableDates.push(currentDate.toISOString().split('T')[0]);
      currentDate.setDate(currentDate.getDate() + 1);
    }
  }

  generateAvailableTimes() {
    const startTime = new Date(this.conference.startDate).getHours();
    const endTime = new Date(this.conference.endDate).getHours();

    for (let i = startTime; i <= endTime; i++) {
      const timeString = i.toString().padStart(2, '0') + ':00';
      this.availableTimes.push(timeString);
    }
  }

  getUniqueAuthors(): string[] {
    const authors = this.paper.flatMap((p: any) => p.name);
    return Array.from(new Set(authors));
  }

  getPaperTitleByAuthor(name: string): string {
    const paper = this.paper.find((p: any) => p.name === name);
    return paper ? paper.submissionTitle : '';
  }

  openAddSessionModal() {
    this.modalService.open('addSessionModal');
  }

  public open(modal: any): void {
    this.modalService.open(modal);
  }

  closeAddSessionModal(modal: NgbModalRef) {
    modal.close();
    this.resetNewSessionForm();
  }

  addSession(modal: NgbModalRef) {
    this.formSubmitted = true;

    if (this.newSessionForm.invalid) {
      return;
    }

  // Retrieve form values
  const date = this.newSessionForm.get('date')!.value;
  const time = this.newSessionForm.get('time')!.value;
  const authorName = this.newSessionForm.get('authorName')!.value;
  const paperName = this.newSessionForm.get('paperName')!.value;
    // Add the new session to the conferenceSessions array
    this.conferenceSessions.push({
      date,
      time,
      authorName,
      paperName
    });

    // Prepare the session data to be sent to the server
    const sessionData = {
      time,
      authorName,
      paperName
    };

    console.log(sessionData);

    // Send the session data to the server through the ConferenceService
    this._conferenceService.addSession(this.conferenceId, date, sessionData).subscribe((response) => {
      console.log('Session added successfully:', response);
    }, (error) => {
      console.log('Error adding session:', error);
    });

    modal.close();
    this.resetNewSessionForm();
  }

  resetNewSessionForm() {
    this.newSessionForm.reset();
    this.formSubmitted = false;
    this.selectedDate = '';
    this.selectedTime = '';
  }

  isWithinTimeLimit(): boolean {
    const sessionDateTime = new Date(this.selectedDate + ' ' + this.selectedTime);
    const conferenceStartDate = new Date(this.conference.startDate);
    const conferenceEndDate = new Date(this.conference.endDate);

    return sessionDateTime >= conferenceStartDate && sessionDateTime <= conferenceEndDate;
  }
}
