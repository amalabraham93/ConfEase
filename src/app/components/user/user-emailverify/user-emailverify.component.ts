import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/services/user/users.service';

@Component({
  selector: 'app-user-emailverify',
  templateUrl: './user-emailverify.component.html',
  styleUrls: ['./user-emailverify.component.css']
})
export class UserEmailverifyComponent implements OnInit {
  verificationForm!: FormGroup;
  verify:boolean =false; 
  constructor(private formBuilder: FormBuilder,private _userService:UsersService,private _router: Router) { }

  ngOnInit() {
    this.buildForm();
  }

  buildForm() {
    this.verificationForm = this.formBuilder.group({
      verifyCode: ['', Validators.required]
    });
  }

  submitVerificationForm() {
    if (this.verificationForm.valid) {
      const verifyCode = this.verificationForm.value.verifyCode;

      this._userService.verifyUser(verifyCode).subscribe((response)=>{
      
        this.verify = response.verified
        if (this.verify) {
          // this.toastr.success('Verification successful!', 'Success');
          this._router.navigate(['/user/home']);
        } else {
          // this.toastr.error('Verification failed!', 'Error');
          // You can display the response message on the page here
        }

      })
      // Send the verifyCode to the backend
      // You can make an API call here using Angular's HttpClient
      
    } else {
      // Form is invalid, handle the error or display validation messages
      console.log('Invalid form');
    }
  }
}     