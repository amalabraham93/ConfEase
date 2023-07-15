import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RegsiterConfService } from '../../../services/conference/regsiter-conf.service';

@Component({
  selector: 'app-conf-register',
  templateUrl: './conf-register.component.html',
  styleUrls: ['./conf-register.component.css']
})
export class ConfRegisterComponent implements OnInit {
  contactForm!: FormGroup;
  isEmailMismatch: boolean = false;
  isPasswordMismatch: boolean = false;
  conferenceId: string = ''; 
  showSuccess: boolean = false;
  showError: boolean = false;
  isLoading:boolean = false;
  constructor(private _formBuilder: FormBuilder ,private _confService:RegsiterConfService ,  private _route: ActivatedRoute) { }
    
  ngOnInit():void {
    this._route.params.subscribe(params => {
      this.conferenceId = params['id'];
      
    });




    this.contactForm = this._formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      confirmEmail: ['', [Validators.required, Validators.email]],
    });

    this.contactForm.get('confirmEmail')!.valueChanges.subscribe(() => {
      this.isEmailMismatch = this.isConfirmEmailMismatch();
    });

    this.contactForm.get('confirmPassword')!.valueChanges.subscribe(() => {
      this.isPasswordMismatch = this.isConfirmPasswordMismatch();
    });
  }

  onSubmit() {
    if (this.contactForm.valid && !this.isEmailMismatch ) {
      this.isLoading = true;


     const { firstName,lastName, email } = this.contactForm.value
     const fullName = `${firstName} ${lastName}`;
     

     this._confService.registerConference(this.conferenceId,fullName,email).subscribe((responce)=>{
      
      this.isLoading = false;
      this.showSuccess = true

      },(error)=>{
       
        this.isLoading = false;
        this.showError =true
      }
      )
     
     
    } else {
      this.validateAllFormFields(this.contactForm);
    }
  }

  isFieldInvalid(field: string) {
    const control = this.contactForm.get(field);
    return control!.touched && control!.invalid;
  }

  isConfirmEmailMismatch() {
    const email = this.contactForm.get('email')!.value;
    const confirmEmail = this.contactForm.get('confirmEmail')!.value;
    return email !== confirmEmail;
  }

  isConfirmPasswordMismatch() {
    const password = this.contactForm.get('password')!.value;
    const confirmPassword = this.contactForm.get('confirmPassword')!.value;
    return password !== confirmPassword;
  }

  validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof FormGroup) {
        this.validateAllFormFields(control);
      }
    });
  }
}