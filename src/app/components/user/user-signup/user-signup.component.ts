import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-user-signup',
  templateUrl: './user-signup.component.html',
  styleUrls: ['./user-signup.component.css'],
})
export class UserSignupComponent implements OnInit {
  signupForm!: FormGroup;

  constructor(private formBuilder: FormBuilder, private _auth: AuthService) {}

  ngOnInit() {
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
          console.log('Signup successful!', response);
          console.log(response);
        },
        (error) => {
          console.error('Signup failed!', error);
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
