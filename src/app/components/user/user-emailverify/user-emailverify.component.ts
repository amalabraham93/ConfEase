import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-emailverify',
  templateUrl: './user-emailverify.component.html',
  styleUrls: ['./user-emailverify.component.css']
})
export class UserEmailverifyComponent implements OnInit {
  verificationForm!: FormGroup;

  constructor(private formBuilder: FormBuilder) { }

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
      // Send the verifyCode to the backend
      // You can make an API call here using Angular's HttpClient
      console.log(verifyCode);
    } else {
      // Form is invalid, handle the error or display validation messages
      console.log('Invalid form');
    }
  }
}     