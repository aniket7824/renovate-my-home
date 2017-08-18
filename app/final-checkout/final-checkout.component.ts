import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { CartserviceService } from './../cartservice.service';
import { CustomerService } from './../customer.service';
import {MdDialog} from '@angular/material';
import {DialogcomponentComponent} from './../dialogcomponent/dialogcomponent.component';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-final-checkout',
  templateUrl: './final-checkout.component.html',
  styleUrls: ['./final-checkout.component.css']
})
export class FinalCheckoutComponent implements OnInit {
  loading = 1;
  loadError = 0;
  url1;
  constructor(public dialog: MdDialog, public cart: CartserviceService, private http: Http, private customer: CustomerService, private router: Router, private route: ActivatedRoute) {
  }
  ngOnInit() {

    if (this.customer.isLogged == 0) { // mandatory login check
      this.router.navigate(['/login'], { replaceUrl: true });
    }

    if (this.customer.isEligibleAd != 1 ) { // mandatory login check
      this.router.navigate(['/home'], { replaceUrl: true });
    }


    if (this.cart.currentItem > 0) {
    this.initiate();
    } else {
      this.loading = 0;
      this.loadError = 0;
    }
  }
  checkoutClick = function () {
    if (this.cart.cartAmount < 20000 ) {
      this.dialog.open(DialogcomponentComponent, {
        data: 'A minimum cart value of ₹ 20000.00 is needed to apply for loan. ^*^ Can\'t Proceed Further'
      });
    } else {
      this.router.navigate(['/review']);
    }

  }
  goMenu = function () {
    this.router.navigate(['/menu'], { replaceUrl: true });
  }
  initiate = function () {
    this.url1 = "http://rmh-tcs1.njs.jelastic.vps-host.net/webapi/rmh/loan_eligibility/" + this.customer.account_number;
    // console.log(this.url1);
    this.http.get(this.url1).map((response: Response) => response.json()
    ).subscribe(
      (data) => {
        this.cart.eligibleAmount = data['eligibleAmount'];
        this.loading = 0;
        this.loadError = 0;
      },
      err => {
        this.loadError = 1;
        this.loading = 0;
        console.log(err);
      }
    );
  }
}

