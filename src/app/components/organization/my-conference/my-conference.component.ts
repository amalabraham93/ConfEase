import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConferenceService } from '../../../services/organizer/conference.service';
import { Observer } from 'rxjs';
import { Router } from '@angular/router';


@Component({
  selector: 'app-my-conference',
  templateUrl: './my-conference.component.html',
  styleUrls: ['./my-conference.component.css'],
})
export class MyConferenceComponent implements OnInit {
  closeResult = '';
  eventForm: FormGroup;
  conferences:any

  constructor(private _modalService: NgbModal, private _formBuilder: FormBuilder , private _conferenceService: ConferenceService, private _router: Router) {
    this.eventForm = this._formBuilder.group({
      eventName: ['', Validators.required],
      startDate: [null, Validators.required],
    });
  }
  ngOnInit(): void {
    this.getConference();
  }

  get eventName() {
    return this.eventForm.controls['eventName'];
  }

  get startDate() {
    return this.eventForm.controls['startDate'];
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
    const startDate = this.eventForm.get('startDate')?.value;
    const formattedEventDate = new Date(startDate.year, startDate.month - 1, startDate.day);

    const eventData = {
      name: eventName,
      startDate: formattedEventDate.toISOString(),
    };

   
    this._conferenceService.saveEvent(eventData)
    .subscribe({
      next: (conference) => {
       
        const confId = conference._id
        this._router.navigate(['/organization/conf-dashboard',confId])
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


  getConference(){
    this._conferenceService.getConfByOrgId().subscribe(
      (response: any) => {
   
        this.conferences = response.conferences
       
      },
      (error: any) => {
        console.error('Error retrieving conferences:', error);
      }
    );
  }

  gotoconf(id:string){
    this._router.navigate(['/organization/conf-dashboard',id])
  }
}
