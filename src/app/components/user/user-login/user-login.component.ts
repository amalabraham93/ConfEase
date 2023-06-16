import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
 import { AuthService} from 'src/app/services/auth.service';
 import { Router} from '@angular/router'

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})


export class UserLoginComponent implements OnInit {
  loginForm!: FormGroup;
  submitted = false;
  public errorms:string = ''
  constructor(private _formBuilder: FormBuilder, private _auth: AuthService, private _router:Router) {}

  ngOnInit() {
    this.loginForm = this._formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      role: ['', [Validators.required]]
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

    this._auth.login(email, password)
      .subscribe(
        response => {
          // handle successful login
         this._router.navigate(['/user/home'])
          console.log(response);
          
        },
        error => {
          // handle login error
          this.errorms = error.error.error
          console.log(error.error);
          
        }
      );
  }
}