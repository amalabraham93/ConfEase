import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router'
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})


export class UserLoginComponent implements OnInit {
  loginForm!: FormGroup;
  submitted = false;
  public errorms: string = ''
  constructor(private _formBuilder: FormBuilder, private _auth: AuthService, private _router: Router,private _cookie:CookieService) { }

  ngOnInit() {
    this.loginForm = this._formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
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
  

    this._auth.login(email, password)
      .subscribe(
        response => {
          // handle successful login
          localStorage.setItem('jwt-user',response.token)
          this._router.navigate(['/user/home'])

        },
        error => {
          // handle login error
          this.errorms = error.error.error
          console.log(error.error);

        }
      );
  }
}