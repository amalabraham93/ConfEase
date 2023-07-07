import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UsersService } from 'src/app/services/user/users.service';

@Component({
  selector: 'app-conf-nav',
  templateUrl: './conf-nav.component.html',
  styleUrls: ['./conf-nav.component.css']
})
export class ConfNavComponent implements OnInit{

 conferenceId : string = ''
user:any;
 constructor ( private _route: ActivatedRoute , private _userService:UsersService){}

  ngOnInit(): void {
    this._route.params.subscribe(params => {
      this.conferenceId = params['id']
    })
    this._userService.getUser().subscribe(res =>{
      console.log(res);
      this.user = res.user;
    })
  
  }

}
