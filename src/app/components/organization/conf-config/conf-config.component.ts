import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-conf-config',
  templateUrl: './conf-config.component.html',
  styleUrls: ['./conf-config.component.css']
})
export class ConfConfigComponent  implements OnInit {
  conferenceForm!: FormGroup 
  formSubmitted: boolean = false;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.conferenceForm = this.formBuilder.group({
      eventName: ['', Validators.required],
      acronym: [''],
      contactEmail: ['', Validators.email],
      websiteLanguage: ['english'],
      eventTimezone: ['timezone1'],
      startDate: [''],
      startTime: [''],
      endDate: [''],
      endTime: [''],
      eventType: ['physical'],
      venueName: [''],
      venueAddress: [''],
      streetNumber: [''],
      streetName: [''],
      city: [''],
      state: [''],
      country: ['']
    });
  }

  submitForm() {
    this.formSubmitted = true;

    if (this.conferenceForm.invalid) {
      // Form is invalid, do not proceed with submission
      return;
    }

    // Form is valid, proceed with submission
    // Here you can implement the logic to save the form data or perform any other actions

    console.log(this.conferenceForm.value);
  }
}