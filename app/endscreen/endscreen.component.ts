import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { CartserviceService } from './../cartservice.service';
import { CustomerService } from './../customer.service';
import {MdDialog} from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import {DialogcomponentComponent} from './../dialogcomponent/dialogcomponent.component';
@Component({
  selector: 'app-endscreen',
  templateUrl: './endscreen.component.html',
  styleUrls: ['./endscreen.component.css']
})
export class EndscreenComponent implements OnInit {
  LoadError = 0;
  eligibilityLoading = 1;
  submissionLoading = 1;
  eligibilityLoad = 0;
  submissionLoad = 0;
  appid;
  cartAmount = 0;

  vendors = [];
  amount = [];
  serviceName = [];
  serviceDetails = [];
  vendorName = [];
  currentItem = 0;

  vendorAddress = [];
  vendorPhone = [];

  loanamount;
  vidSTR = "";
  vendorLoadError = 0;
  vendorLoading = 1;
  vendorLoad = 0;
  constructor(private router: Router, public dialog: MdDialog, public cart: CartserviceService, private http: Http, private customer: CustomerService) { }

  ngOnInit() {

    if (this.cart.currentItem == 0) { // mandatory login check
      this.router.navigate(['/review'], {replaceUrl: true});
    }

    if (this.cart.cartAmount > this.cart.eligibleAmount) {
      this.loanamount = this.cart.eligibleAmount;
    } else {
      this.loanamount = this.cart.cartAmount.toFixed(2);
    }

    this.loadEligibility();
  }
  loadEligibility = function () {
    this.url1 = "http://rmh-tcs1.njs.jelastic.vps-host.net/webapi/rmh/final_eligibility/" + this.customer.account_number + "/"+ this.loanamount;
    this.eligibilityLoading = 1;
    this.LoadError = 0;
    this.eligibilityLoad = 0;
    this.http.get(this.url1).map((response: Response) => response.json()
    ).subscribe(
      (data) => {
        var allok = 0;

      if (data['noloanCheck'] == 0) {
        this.dialog.open(DialogcomponentComponent, {
          data: 'You already have a \'Renovate My Home\' loan. Each customer is eligible to get only one  \'Renovate My Home\' loan at a time. ^*^ Unable to Proceed'
        });
        this.router.navigate(['/home'], { replaceUrl: true });
      } else {
        allok ++;
      }
        if (data['loanamount'] == 0) {
          this.dialog.open(DialogcomponentComponent, {
            data: 'Your loan application had quoted an amount which is more than your eligibility  ^*^ Unable to Proceed'
          });
          this.router.navigate(['/checkout'], { replaceUrl: true });
        } else {
          allok ++;
        }

        if (data['cibil'] != 1) {
          this.dialog.open(DialogcomponentComponent, {
            data: 'Your cibil score is less than required level  ^*^ Unable to Proceed'
          });
          this.router.navigate(['/home'], { replaceUrl: true });
        } else {
          allok ++;
        }

        if (allok == 3) {
          this.eligibilityLoad = 1;
          this.eligibilityLoading = 0;
          this.loadSubmission();
        }

      },
      err => {
        this.LoadError = 1;
        this.eligibilityLoading = 0;
      }
    );
  }

  loadSubmission = function () {
    this.LoadError = 0;
    var sidSTR = "", amountSTR = "", measureSTR = "";
    this.vidSTR = "";
    this.submissionLoading = 1;
    this.submissionLoad = 0;
    for (let i = 0; i < this.cart.amount.length; i++) {
      sidSTR += this.cart.services[i];
      this.vidSTR += this.cart.vendors[i];
      amountSTR += this.cart.amount[i].toFixed(2).toString();
      measureSTR += this.cart.measurement[i].toString();
      if (i != this.cart.amount.length - 1) {
        sidSTR += ",";
        this.vidSTR += ",";
        amountSTR += ",";
        measureSTR += ",";
      }
    }
    var today = new Date();
    var yr = today.getFullYear();
    var mon = ("0" + (today.getMonth() + 1)).slice(-2);
    var dt = ("0" + today.getDate()).slice(-2)
    var date = yr + "-" + mon + "-" + dt;
    this.appid = "RMH" + dt.toString() + mon.toString() + yr.toString() + ("0" + today.getHours()).slice(-2).toString() + ("0" + today.getMinutes()).slice(-2).toString() + ("0" + today.getSeconds()).slice(-2).toString() + Math.floor(Math.random() * (999 - 100 + 1 ) + 100).toString();

    this.url1 = "http://rmh-tcs1.njs.jelastic.vps-host.net/webapi/rmh/insert_loan/" + this.appid + "/" + this.customer.account_number + "/" + this.loanamount + "/" + sidSTR + "/" + this.vidSTR + "/" + amountSTR + "/" + measureSTR + "/" + date;
    //console.log(this.url1);
    this.http.get(this.url1).map((response: Response) => response.json()
    ).subscribe(
      (data) => {
        var status = data['status'];
        if (status == 'ok') {

          this.vendors = this.cart.vendors;
          this.amount = this.cart.amount;
          this.serviceName = this.cart.serviceName;
          this.serviceDetails = this.cart.serviceDetails;
          this.vendorName = this.cart.vendorName;
          this.currentItem = this.cart.currentItem;
          this.cart.reinitialize();
          window.history.pushState( {} , 'Home', '/home' );
          window.history.pushState( {} , 'Home', '/final' );
          this.submissionLoad = 1;
          this.submissionLoading = 0;
          this.loadOrder();
        } else {
          this.LoadError = 1;
          this.submissionLoading = 0;
        }
      },
      err => {
        this.LoadError = 1;
        this.submissionLoading = 0;
      }
    );


  }

  loadOrder = function() {
    this.vendorLoadError = 0;
    this.vendorLoading = 1;
    this.vendorLoad = 0;
    this.url1 = "http://rmh-tcs1.njs.jelastic.vps-host.net/webapi/rmh/vendor_details/" + this.vidSTR;
    //console.log(this.url1);
    this.http.get(this.url1).map((response: Response) => response.json()
    ).subscribe(
      (data) => {
        for (let i = 1; i <= data['0']['0']['total']; i++) {
          this.vendorAddress.push(data[i]['0']['address']);
          this.vendorPhone.push(data[i]['0']['phone']);
        }
        this.vendorLoad = 1;
        this.vendorLoading = 0;
      },
      err => {
        this.vendorLoadError = 1;
        this.vendorLoading = 0;
      }
    );
  }


}
