import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ConferenceService } from '../../../services/organizer/conference.service';
import { UsersService } from '../../../services/user/users.service';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-conf-attentte-buy-tickets',
  templateUrl: './conf-attentte-buy-tickets.component.html',
  styleUrls: ['./conf-attentte-buy-tickets.component.css']
})
export class ConfAttentteBuyTicketsComponent {
  conferenceName!: string;
  amount!: number;
  email!: string;
  phone!: string;
  success: boolean = false;
  failure: boolean = false;
  paymentHandler: any = null;
  stripeAPIKey: any = environment.stripe.publishableKey;
  conferenceId:any
  constructor(
    private route: ActivatedRoute,
    private _conferenceService: ConferenceService,
    private _paymentService: UsersService
  ) {}

  ngOnInit() {
    this.invokeStripe();

    this.route.params.subscribe(params => {
      // Get the conference ID from the route params
      this.conferenceId = params['id'];
      this.amount = 50.00;

      // Retrieve the conference name based on the conference ID
      this._conferenceService.getConfById(this.conferenceId).subscribe(res => {
        this.conferenceName = res.conferences.name;
      });
    });
  }

  buyTicket() {
    console.log('Ticket Details:', this.email, this.phone);
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
      description: 'Conference Ticket',
      amount: this.amount * 100,
    });
  }

  paymentstripe(stripeToken: any) {
    const paymentData = {
      conferenceId: this.conferenceId, 
      amount: this.amount,
      phone: this.phone
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
            alert('Payment has been successful!');
          },
        });
      };

      window.document.body.appendChild(script);
    }
  }
}
