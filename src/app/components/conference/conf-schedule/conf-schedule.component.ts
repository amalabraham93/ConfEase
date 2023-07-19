import { Component,OnInit } from '@angular/core';
import { ActivatedRoute, Route } from '@angular/router';
import { RegsiterConfService } from 'src/app/services/conference/regsiter-conf.service';

@Component({
  selector: 'app-conf-schedule',
  templateUrl: './conf-schedule.component.html',
  styleUrls: ['./conf-schedule.component.css']
})
export class ConfScheduleComponent implements OnInit{
  conferenceId:any;
  conferences:any;
  constructor(private _conference:RegsiterConfService ,private _route: ActivatedRoute) { }


   
  


  ngOnInit(): void {
    this.conferenceId=this._route.snapshot.params['id'];
    console.log(this.conferenceId);
 
    this._conference.getConfById(this.conferenceId).subscribe((data)=>{
      this.conferences=data.conferences;
      console.log( this.conferences);
    
    })
  }


  }

