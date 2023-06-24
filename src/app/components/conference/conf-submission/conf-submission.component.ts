import { Component, OnInit } from '@angular/core';
import  ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { ChangeEvent } from '@ckeditor/ckeditor5-angular/ckeditor.component';


@Component({
  selector: 'app-conf-submission',
  templateUrl: './conf-submission.component.html',
  styleUrls: ['./conf-submission.component.css']
})
export class ConfSubmissionComponent implements OnInit {
  title = 'angular';
   public Editor = ClassicEditor;
  
  constructor() { }

  ngOnInit() {
    
   }

   public onChange({ editor }: ChangeEvent){
    const data = editor.editing ;

        console.log( data );
   }
  
  
  
}
