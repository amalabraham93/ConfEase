import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatLabel } from '@angular/material/form-field';

@Component({
  selector: 'app-add-session-dialog',
  templateUrl: './add-session-dialog.component.html',
  styleUrls: ['./add-session-dialog.component.css']
})
export class AddSessionDialogComponent implements OnInit {

  authorName: string = '';
  paperName: string = '';
  sessionTime: string = '';

  constructor(
    private dialogRef: MatDialogRef<AddSessionDialogComponent>
  ) {}

  ngOnInit() {
  }

  submitForm(): void {
    // Create the session data
    const sessionData = {
      authorName: this.authorName,
      paperName: this.paperName,
      sessionTime: this.sessionTime
    };

    // Close the dialog and pass the session data back
    this.dialogRef.close(sessionData);
  }
}