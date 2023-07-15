import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-user-signup',
  templateUrl: './user-signup.component.html',
  styleUrls: ['./user-signup.component.css'],
})
export class UserSignupComponent implements OnInit {
  signupForm!: FormGroup;
  public loader:boolean = true
  errorMessage: string = '';
  constructor(private formBuilder: FormBuilder, private _auth: AuthService,private _router:Router) {}
  
  ngOnInit() {
    // setTimeout(() => {
    //   this.loader = false
    // }, 2000);


    this.signupForm = this.formBuilder.group(
      {
        name: ['', [Validators.required]],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required]],
        role: ['author', [Validators.required]],
        confirmPassword: ['', [Validators.required]],
      },
      { validator: this.passwordMatchValidator }
    );
  }

  get name() {
    return this.signupForm.get('name');
  }
  get email() {
    return this.signupForm.get('email');
  }
  get password() {
    return this.signupForm.get('password');
  }
  get role() {
    return this.signupForm.get('role');
  }
  get confirmPassword() {
    return this.signupForm.get('confirmPassword');
  }

  onSubmit() {
    if (this.signupForm.valid) {
      const { name, email, password, role } = this.signupForm.value;
      console.log(name, email, password, role);
      this._auth.signup(name, email, password, role).subscribe(
        (response) => {
         
          this._router.navigate(['/user/verify-email'])
        },
        (error) => {

          this.errorMessage = error.error.error; 
        }
      );
    } else {
      this.signupForm.markAllAsTouched();
    }
  }

  passwordMatchValidator(formGroup: FormGroup) {
    const passwordControl = formGroup.get('password');
    const confirmPasswordControl = formGroup.get('confirmPassword');

    if (
      passwordControl &&
      confirmPasswordControl &&
      passwordControl.value !== confirmPasswordControl.value
    ) {
      confirmPasswordControl.setErrors({ passwordMismatch: true });
    } else {
      confirmPasswordControl?.setErrors(null);
    }
  }
}
