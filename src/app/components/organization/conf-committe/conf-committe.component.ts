import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RegsiterConfService } from 'src/app/services/conference/regsiter-conf.service';

@Component({
  selector: 'app-conf-committe',
  templateUrl: './conf-committe.component.html',
  styleUrls: ['./conf-committe.component.css']
})
export class ConfCommitteComponent implements OnInit {
  reviewerForm!: FormGroup;
  conferenceId: string = '';
  constructor(private formBuilder: FormBuilder,private route: ActivatedRoute ,private _addReviewerService: RegsiterConfService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.conferenceId = params['id'];
   
    });


    this.reviewerForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  submitForm(): void {
    if (this.reviewerForm.invalid) {
      return;
    }

    const reviewerData = this.reviewerForm.value;
    console.log(reviewerData,this.conferenceId);
    
   this._addReviewerService.addReviewer(reviewerData.email,this.conferenceId).subscribe((response)=>{
    console.log(response);
    
   })
    
   
   
    this.reviewerForm.reset();
  }
}