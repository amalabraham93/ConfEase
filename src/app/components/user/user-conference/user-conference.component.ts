import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ConferenceService } from 'src/app/services/organizer/conference.service';

@Component({
  selector: 'app-user-conference',
  templateUrl: './user-conference.component.html',
  styleUrls: ['./user-conference.component.css']
})
export class UserConferenceComponent implements OnInit {
  conferences:any
  role:any
   constructor (private _conferenceservices: ConferenceService, private route: ActivatedRoute,  private _auth: AuthService, private _router:Router){}



  ngOnInit(): void {
    this.getConference();
    this._auth.isLoggedInn()
    this._auth.active().subscribe((response:any)=>{
       console.log(response);
     this.role = response
    })

    
    
  }
  getConference(){
    this._conferenceservices.getAllconferences().subscribe (
      (response:any) =>{
        console.log(response);
        this.conferences = response.conferences
        
      },
      (error: any) => {
        console.error('Error retrieving conferences:', error);
      }
    )
  }

  logout(){
    this._auth.logout().subscribe((response:any)=>{
      console.log(response)
    })
  }

}
