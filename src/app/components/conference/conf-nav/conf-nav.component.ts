import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-conf-nav',
  templateUrl: './conf-nav.component.html',
  styleUrls: ['./conf-nav.component.css']
})
export class ConfNavComponent implements OnInit{

 conferenceId : string = ''

 constructor ( private _route: ActivatedRoute){}

  ngOnInit(): void {
    this._route.params.subscribe(params => {
      this.conferenceId = params['id']
    })
  }

}
