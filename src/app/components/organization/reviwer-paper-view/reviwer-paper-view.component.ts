import { Component ,OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PaperService } from 'src/app/services/papers/paper.service';

@Component({
  selector: 'app-reviwer-paper-view',
  templateUrl: './reviwer-paper-view.component.html',
  styleUrls: ['./reviwer-paper-view.component.css']
})
export class ReviwerPaperViewComponent implements OnInit {
  selectedPaper: any;
  paperId!: string; 

  constructor(private route: ActivatedRoute , private _paperService:PaperService) {}

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
      
      this.selectedPaper = response.paper;
    });
  }

  // Function to handle accepting the paper
  acceptPaper() {
    this._paperService.acceptPaper(this.paperId,true).subscribe((response) => {
      console.log(response)
     
    })
  }

  // Function to handle rejecting the paper
  rejectPaper() {
    this._paperService.acceptPaper(this.paperId,false).subscribe((response) => {
      console.log(response)
     
    })
  }
}