import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-org-login',
  templateUrl: './org-login.component.html',
  styleUrls: ['./org-login.component.css']
})
export class OrgLoginComponent implements OnInit {
  loginForm!: FormGroup;
  submitted = false;
  public errorms:string = ''

  constructor(private _formBuilder: FormBuilder, private _auth: AuthService, private _router:Router) {}

  ngOnInit() {
    this.loginForm = this._formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  get focus() {
    return this.loginForm.controls;
  }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }

    const email = this.focus['email'].value;
    const password = this.focus['password'].value;
    // const role = this.focus['role'].value;

    this._auth.org_login(email, password)
      .subscribe(
        response => {
          // handle successful login
          localStorage.setItem('jwt-organizer',response.token)
         this._router.navigate(['/organization/home'])
          console.log(response);
          
        },
        error => {
           this.errorms = error.error.error
          console.log(error);
          
        }
      );
  }
}