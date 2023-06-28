import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ConferenceService } from 'src/app/services/organizer/conference.service';
import { UsersService } from 'src/app/services/user/users.service';

@Component({
  selector: 'app-conf-home',
  templateUrl: './conf-home.component.html',
  styleUrls: ['./conf-home.component.css']
})
export class ConfHomeComponent implements OnInit {
  conference :any
  conferenceId: string = '';
   user:any;
constructor(private _confernceService:ConferenceService,
   private _userservice:UsersService, 
   private _route: ActivatedRoute){}

  

  ngOnInit(): void {
    this._route.params.subscribe(params => {
      this.conferenceId = params['id'];
      this.getConference();
    });

    this._userservice.getUser().subscribe((response)=>{
      console.log(response);
      this.user = response.user
     
    })
  }
  getConference(): void {
    this._confernceService.getConfById(this.conferenceId).subscribe(
      (response: any) => {
        console.log(response);
        this.conference = response.conferences; 
        console.log(this.conference);
        
      },
      (error: any) => {
        console.error('Error retrieving conferences:', error);
      }
    );
  }
}
