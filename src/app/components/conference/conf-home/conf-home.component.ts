import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ConferenceService } from '../../../services/organizer/conference.service';
import { UsersService } from '../../../services/user/users.service';

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
    
      this.user = response.user
     
    })
  }
  getConference(): void {
    this._confernceService.getConfById(this.conferenceId).subscribe(
      (response: any) => {
       
        this.conference = response.conferences; 
       
        
      },
      (error: any) => {
        console.error('Error retrieving conferences:', error);
      }
    );
  }
}
