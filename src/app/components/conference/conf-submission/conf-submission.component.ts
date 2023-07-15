import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { RegsiterConfService } from '../../../services/conference/regsiter-conf.service';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-conf-submission',
  templateUrl: './conf-submission.component.html',
  styleUrls: ['./conf-submission.component.css']
})
export class ConfSubmissionComponent implements OnInit {
  public form!: FormGroup;
  public authorForm!: FormGroup;
  public authors: any[] = [];
  private modalRef: NgbModalRef | undefined;
  public Editor = ClassicEditor;
  conferenceId: string = '';
  currentDate = new Date();
  showSuccess: boolean = false;
  showError: boolean = false;
  isLoading: boolean = false;

  @ViewChild('authorModal', { static: false }) authorModal!: TemplateRef<any>;

  constructor(
    private formBuilder: FormBuilder,
    private modalService: NgbModal,
    private _conferenceService: RegsiterConfService,
    private _route: ActivatedRoute
  ) {
    // Add the ClassicEditor to the Editor variable
    this.Editor = ClassicEditor;
  }

  ngOnInit() {
   
    this._route.params.subscribe(params => {
      this.conferenceId = params['id'];
    });
    this.initForm();
    this.initializeAuthorForm();
  }

  private initForm() {
    this.form = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      affiliation: [''],
      submissionTitle: ['', Validators.required],
      abstract: ['', Validators.required],
      authors: [[]]
    });
  }

  initializeAuthorForm() {
    this.authorForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  openAuthorModal() {
    this.modalRef = this.modalService.open(this.authorModal, { ariaLabelledBy: 'authorModal' });
  }

  onAuthorModalClose() {
    this.authorForm.reset();
  }

  addAuthor() {
    if (this.authorForm.valid) {
      const authorName = this.authorForm.get('name')!.value;
      const authorEmail = this.authorForm.get('email')!.value;

      this.authors.push({ authorName, authorEmail });

      this.authorForm.reset();
      this.modalRef?.close();
    }
  }

  onChange(event: any) {
    // Handle the change event for the CKEditor
    console.log(event);
  }

  onSubmit() {
    if (this.form.valid) {
      const formData = this.form.value;

     
      
      const { firstName, lastName, email, affiliation, submissionTitle, abstract } = formData;

      const name = `${firstName} ${lastName}`;

      this._conferenceService.submitPaper(
        this.conferenceId,
        name,
        submissionTitle,
        abstract,
        this.authors[0].authorEmail,
        affiliation,
        email,
        this.currentDate
      ).subscribe(
        (response) => {
         
          this.isLoading = false;
          this.showSuccess = true;
        },
        (error) => {
        
          this.isLoading = false;
          this.showError = true;
        }
      );

      // Reset the form after submission
      this.form.reset();
      this.authors = []; // Clear the authors array
    } else {
      // Handle form validation errors
      this.markFormFieldsAsTouched();
    }
  }

  private markFormFieldsAsTouched() {
    Object.keys(this.form.controls).forEach(field => {
      const control = this.form.get(field);
      control?.markAsTouched();
    });
  }
}
