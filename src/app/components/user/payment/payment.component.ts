import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PaperService } from 'src/app/services/papers/paper.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent {
  conferenceName!: string;
  paperName!: string;
  amount!: number;
  email!: string;
  phone!: string;
  paperId!: string;

  paymentHandler: any = null;
  stripeAPIKey: any = environment.stripe.publishableKey
  constructor(private route: ActivatedRoute,private _paperService:PaperService, ) {}

  ngOnInit() {

    this.invokeStripe();
    // Get the paper ID from the route params


    this.route.params.subscribe(params => {
      this.paperId = params['paperId'];
    
       
      
      this.amount = 50.00;
    });

    this._paperService.getPaperById(this.paperId).subscribe((res)=>{
      this.conferenceName = res.paper.conference.name;
      this.paperName = res.paper.submissionTitle;
      })
  }

  makePayment() {
    // Add your payment submission logic here
    console.log('Payment Details:', this.email, this.phone);
    const paymentHandler = (<any>window).StripeCheckout.configure({
      key: this.stripeAPIKey,
      locale: 'auto',
      token: function (stripeToken: any) {
        console.log(stripeToken);
        alert('Stripe token generated!');
      },
    });
    paymentHandler.open({
      name: 'ConfEase',
      description: 'Paper Submission',
      amount: this.amount * 100,
    });
  }


  invokeStripe() {
    if (!window.document.getElementById('stripe-script')) {
      const script = window.document.createElement('script');
  
      script.id = 'stripe-script';
      script.type = 'text/javascript';
      script.src = 'https://checkout.stripe.com/checkout.js';
      script.onload = () => {
        this.paymentHandler = (<any>window).StripeCheckout.configure({
          key: this.stripeAPIKey,
          locale: 'auto',
          token: function (stripeToken: any) {
            console.log(stripeToken);
            alert('Payment has been successfull!');
          },
        });
      };
  
      window.document.body.appendChild(script);
    }
  }

}