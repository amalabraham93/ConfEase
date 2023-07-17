import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { RegsiterConfService } from 'src/app/services/conference/regsiter-conf.service';

@Component({
  selector: 'app-conf-config',
  templateUrl: './conf-config.component.html',
  styleUrls: ['./conf-config.component.css']
})
export class ConfConfigComponent implements OnInit {
  conferenceForm!: FormGroup;
  formSubmitted: boolean = false;
  conference: any;

  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private _conferenceService: RegsiterConfService,
    private _datePipe: DatePipe,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.getConference(params['id']);
    });

    this.conferenceForm = this.formBuilder.group({
      eventName: ['', Validators.required],
      startDate: [''],
      startTime: [''],
      endDate: [''],
      endTime: [''],
    });
  }

  getConference(conferenceId: string) {
    this._conferenceService.getConfById(conferenceId).subscribe((response) => {
      this.conference = response.conferences;
      console.log(this.conference);
      
      this.populateForm();
    });
  }

  populateForm() {
    if (this.conference) {
      this.conferenceForm.patchValue({
        eventName: this.conference.name,
        startDate: this.formatDate(this.conference.startDate),
        startTime: this.formatTime(this.conference.startDate),
        endDate: this.formatDate(this.conference.endDate),
        endTime: this.formatTime(this.conference.endDate),
      });
    }
  }

  submitForm() {
    this.formSubmitted = true;

    if (this.conferenceForm.invalid) {
      return;
    }

    // Retrieve form values
    const eventName = this.conferenceForm.get('eventName')!.value;
    const startDate = this.conferenceForm.get('startDate')!.value;
    const startTime = this.conferenceForm.get('startTime')!.value;
    const endDate = this.conferenceForm.get('endDate')!.value;
    const endTime = this.conferenceForm.get('endTime')!.value;

    // Combine date and time values into Date objects
    const startDateTime = new Date(startDate + ' ' + startTime);
    const endDateTime = new Date(endDate + ' ' + endTime);

    // Prepare data to be sent to the backend
    const conferenceData = {
      name: eventName,
      startDateTime: startDateTime,
      endDateTime: endDateTime,
      // Include other data fields as needed
    };

    // Call the updateConference method
    this._conferenceService.updateConference(this.conference._id, conferenceData.name,conferenceData.startDateTime,conferenceData.endDateTime).subscribe(
      (response) => {
        this.toastr.success('Conference updated successfully', 'Success');
        this.conferenceForm.reset();
        this.formSubmitted = false;
        this.conference = response.conferences;
        this.populateForm();
    
        console.log('Conference updated successfully:', response);
      },
      (error) => {
        this.toastr.error('Error updating conference', 'Error');
      
        console.error('Error updating conference:', error);
      }
    );
  }

  formatDate(date: string): string | null{
    if (date) {
      return this._datePipe.transform(date, 'yyyy-MM-dd');
    }
    return '';
  }

  formatTime(date: string): string | null {
    if (date) {
      return this._datePipe.transform(date, 'HH:mm');
    }
    return '';
  }
}
