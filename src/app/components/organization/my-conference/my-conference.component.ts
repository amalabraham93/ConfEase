import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConferenceService } from 'src/app/services/organizer/conference.service';
import { Observer } from 'rxjs';


@Component({
  selector: 'app-my-conference',
  templateUrl: './my-conference.component.html',
  styleUrls: ['./my-conference.component.css'],
})
export class MyConferenceComponent {
  closeResult = '';
  eventForm: FormGroup;

  constructor(private _modalService: NgbModal, private _formBuilder: FormBuilder , private _conferenceService: ConferenceService) {
    this.eventForm = this._formBuilder.group({
      eventName: ['', Validators.required],
      eventDate: [null, Validators.required],
    });
  }

  get eventName() {
    return this.eventForm.controls['eventName'];
  }

  get eventDate() {
    return this.eventForm.controls['eventDate'];
  }

  open(content: any) {
    this._modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then(
      (result) => {
        if (result === 'Create click') {
          if (this.eventForm.valid) {
            this.saveEvent();
          } else {
            console.log('Invalid form');
          }
        }
        this.closeResult = `Closed with: ${result}`;
      },
      (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      }
    );
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  saveEvent() {
    const eventName = this.eventForm.get('eventName')?.value;
    const eventDate = this.eventForm.get('eventDate')?.value;
    const formattedEventDate = new Date(eventDate.year, eventDate.month - 1, eventDate.day);

    const eventData = {
      name: eventName,
      date: formattedEventDate.toISOString(),
    };

    console.log(eventData);
    this._conferenceService.saveEvent(eventData)
    .subscribe({
      next: () => {
        console.log('Event saved successfully');
        // Handle any success actions
      },
      error: (error) => {
        console.error('Error saving event:', error);
        // Handle any error actions
      },
      complete: () => {
        // Handle any complete actions
      },
    });
  }
}
