import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { CartserviceService } from './../cartservice.service';
import { CustomerService } from './../customer.service';
import {FormGroup, FormControl} from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-submit-page',
  templateUrl: './submit-page.component.html',
  styleUrls: ['./submit-page.component.css']
})
export class SubmitPageComponent implements OnInit {
  loading = 1;
  loadError = 0;
  url1;
  downPayment = 0;
  downPaymentNeeded;
  form;
  tandcVal;
  constructor(public cart: CartserviceService, private http: Http, private router: Router, private customer: CustomerService) {
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
    this.form = new FormGroup({
      tandc: new FormControl(false)
    });
  }
  tandcBox = function () {
    this.tandcVal = this.form.controls.tandc.value;
  }

  initiate = function () {
    this.url1 = "http://rmh-tcs1.njs.jelastic.vps-host.net/webapi/rmh/loan_eligibility/" + this.customer.account_number;
    // console.log(this.url1);
    this.http.get(this.url1).map((response: Response) => response.json()
    ).subscribe(
      (data) => {
        this.cart.eligibleAmount = data['eligibleAmount'];
        if (this.cart.eligibleAmount < this.cart.cartAmount) {
          this.downPayment = (this.cart.cartAmount - this.cart.eligibleAmount);
          this.downPaymentNeeded = 1;
        } else {
          this.downPaymentNeeded = 0;
        }
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

