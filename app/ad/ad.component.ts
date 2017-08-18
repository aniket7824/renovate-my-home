import { Component, OnInit } from '@angular/core';
import { CustomerService } from './../customer.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Http, Response } from '@angular/http';
import {DialogcomponentComponent} from './../dialogcomponent/dialogcomponent.component';
import {MdDialog} from "@angular/material";

@Component({
  selector: 'app-ad',
  templateUrl: './ad.component.html',
  styleUrls: ['./ad.component.css']
})
export class AdComponent implements OnInit {
  ad_eligible = -1;
  url;
  showload = 1;
  load = 0;
  loaderror = 0;
  constructor(public dialog: MdDialog, public customerService: CustomerService, private router: Router, private route: ActivatedRoute, private http: Http) { }
  ngOnInit() {

    if (this.customerService.isLogged == 0) { // mandatory login check
      this.router.navigate(['/login'], { replaceUrl: true });
    }
   this.initialize();
  }
  initialize() {
    this.showload = 1;
    this.loaderror = 0;
    this.url = "http://rmh-tcs1.njs.jelastic.vps-host.net/webapi/rmh/ad_cibil/" + this.customerService.account_number
    this.http.get(this.url).map((response: Response) => response.json()
    ).subscribe(
      (data) => {
        // this.loginResponse.isLogin = data['loginSucess'];
        // this.loginResponse.isCustomer = data['isCustomer'];
        //console.log(data);
        this.customerService.cibil = data['cibil'];
        this.customerService.isEligibleAd = data['isEligibleAd'];
        this.ad_eligible = this.customerService.isEligibleAd;
        window.history.pushState( {} , 'Home', '/home' );
        window.history.pushState( {} , 'Home', '/home' );
        this.load = 1;
        this.showload = 0;
      },
      err => {
        this.loaderror = 1;
        this.showload = 0;
      }
    );



  }

  checkEligibilityNGoMenu() {

    this.customerService.isEligibleAd = this.ad_eligible;
    if (this.ad_eligible == 1) {
      this.router.navigate(['/menu']);
    }
}
  notEligibleDialog = function () {
    this.dialog.open(DialogcomponentComponent, {
      data: 'Your current cibil score is ' + this.customerService.cibil + '. To avail the Renovate My Home service you need a minumum cibil score of 50. ^*^ You are not eligible'
    });
  }

}
