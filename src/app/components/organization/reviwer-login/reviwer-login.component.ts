import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ConferenceService } from 'src/app/services/organizer/conference.service';

@Component({
  selector: 'app-reviwer-login',
  templateUrl: './reviwer-login.component.html',
  styleUrls: ['./reviwer-login.component.css']
})
export class ReviwerLoginComponent implements OnInit {
  loginForm!: FormGroup;
  conferenceId: string = ''; 
  constructor(private formBuilder: FormBuilder, private _conferenceService: ConferenceService,private _route: ActivatedRoute, private _router:Router) { }

  ngOnInit() {
    this.buildLoginForm();
    this._route.params.subscribe(params => {
      this.conferenceId = params['id'];
      
    });
  }

  buildLoginForm() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  submitLoginForm() {
    if (this.loginForm.valid) {
      const email = this.loginForm.value.email;
      const password = this.loginForm.value.password;
      console.log(this.loginForm.value);
     const confId = this.conferenceId 
      // Call the login API or service method to send the data to the backend
      this._conferenceService.reviewerLogin(email,confId, password).subscribe(
       ( response) => {
         this._router.navigate([`/organization/review-home/${this.conferenceId}`])
          console.log('Login successful');
        },
        error => {
          // Handle the error response from the backend
          console.log('Login failed', error);
        }
      );
    } else {
      // Form is invalid, handle the error or display validation messages
      console.log('Invalid form');
    }
  }
}