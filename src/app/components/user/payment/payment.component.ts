import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PaperService } from '../../../services/papers/paper.service';
import { UsersService } from '../../../services/user/users.service';
import { environment } from '../../../../environments/environment';

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
  success: boolean = false;
  failure: boolean = false;
  paymentHandler: any = null;
  stripeAPIKey: any = environment.stripe.publishableKey;

  constructor(
    private route: ActivatedRoute,
    private _paperService: PaperService,
    private _paymentService: UsersService
  ) {}

  ngOnInit() {
    this.invokeStripe();

    this.route.params.subscribe(params => {
      this.paperId = params['paperId'];
      this.amount = 50.00;
    });

    this._paperService.getPaperById(this.paperId).subscribe(res => {
      this.conferenceName = res.paper.conference.name;
      this.paperName = res.paper.submissionTitle;
    });
  }

  makePayment() {
    console.log('Payment Details:', this.email, this.phone);
    const paymentHandler = (<any>window).StripeCheckout.configure({
      key: this.stripeAPIKey,
      locale: 'auto',
      token: (stripeToken: any) => {
        console.log(stripeToken);
        alert('Stripe token generated!');
        this.paymentstripe(stripeToken);
      },
    });

    paymentHandler.open({
      name: 'ConfEase',
      description: 'Paper Submission',
      amount: this.amount * 100,
    });
  }

  paymentstripe(stripeToken: any) {
    const paymentData = {
      paperId: this.paperId,
      amount: this.amount,
    };

    this._paymentService.makePayment(stripeToken, paymentData).subscribe(
      (data: any) => {
        console.log(data);
        if (data.success) {
          this.success = true;
        } else {
          this.failure = true;
        }
      },
      (error: any) => {
        console.log(error);
        this.failure = true;
      }
    );
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
            // alert('Payment has been successful!');
          },
        });
      };

      window.document.body.appendChild(script);
    }
  }
}