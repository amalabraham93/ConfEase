import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-org-home',
  templateUrl: './org-home.component.html',
  styleUrls: ['./org-home.component.css']
})
export class OrgHomeComponent implements OnInit{


  constructor(private _auth:AuthService, private _router:Router){}
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
  
  logout(){
    this._auth.org_logout().subscribe((response:any)=>{
      console.log(response)
    })
  }
}
