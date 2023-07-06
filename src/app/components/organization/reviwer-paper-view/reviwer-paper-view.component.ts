import { Component ,OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PaperService } from 'src/app/services/papers/paper.service';
import { ToastrService } from 'ngx-toastr';



@Component({
  selector: 'app-reviwer-paper-view',
  templateUrl: './reviwer-paper-view.component.html',
  styleUrls: ['./reviwer-paper-view.component.css']
})
export class ReviwerPaperViewComponent implements OnInit {
  selectedPaper: any;
  paperId!: string; 
  acceptDisabled: boolean = false;
  rejectDisabled: boolean = false;
  constructor(private route: ActivatedRoute, private _paperService: PaperService, private toastr: ToastrService) { }

  ngOnInit(): void {
    // Get the paper ID from the URL params
    this.route.params.subscribe(params => {
      this.paperId = params['paperId'];
      // Call a function to fetch the paper details using the paperId
      this.fetchPaperDetails(this.paperId);
    });
  }

  // Function to fetch paper details based on the paperId
  fetchPaperDetails(paperId: string) {
 
    this._paperService.getPaperById(paperId).subscribe((response) => {
      console.log(response)  
      if (response.paper.approved === true) {
        this.acceptDisabled = true;
        this.rejectDisabled = false;
      }else{
        this.rejectDisabled = true;
        this.acceptDisabled = false;
      }
      this.selectedPaper = response.paper;
    });
  }

  acceptPaper() {
    this._paperService.acceptPaper(this.paperId, true).subscribe(
      (response) => {
        this.toastr.success('Paper accepted successfully', 'Success');
        if (response.paper.approved === true) {
          this.acceptDisabled = true;
          this.rejectDisabled = false;
        }
      },
      (error) => {
        this.toastr.error('Error accepting paper', 'Error');
      }
    );
  }

  rejectPaper() {
    this._paperService.acceptPaper(this.paperId, false).subscribe(
      (response) => {
        this.toastr.success('Paper rejected successfully', 'Success');
        if (response.paper.approved === false) {
          this.rejectDisabled = true;
          this.acceptDisabled = false;
        }
      },
      (error) => {
        this.toastr.error('Error rejecting paper', 'Error');
      }
    );
  }
}