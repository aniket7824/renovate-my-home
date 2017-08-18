import { Component, OnInit } from '@angular/core';
import { CustomerService } from './../customer.service';
import { ChoseServiceService } from './../chose-service.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Http } from '@angular/http';
import {FormGroup, FormControl , Validators} from '@angular/forms';

@Component({
  selector: 'app-floor',
  templateUrl: './floor.component.html',
  styleUrls: ['./floor.component.css']
})
export class FloorComponent implements OnInit {
  form;
  constructor(private customerService: CustomerService, private router: Router, private route: ActivatedRoute, private http: Http, public choose: ChoseServiceService) { }
  ngOnInit() {


    if (this.customerService.isLogged == 0) { // mandatory login check
      this.router.navigate(['/login'], { replaceUrl: true });
    }

    if (this.customerService.isEligibleAd != 1 ) { // mandatory login check
      this.router.navigate(['/home'], { replaceUrl: true });
    }


    this.form = new FormGroup({
      dim: new FormControl('', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(6),
        Validators.pattern('^[0-9\.]+$')
      ]),
      company: new FormControl(),
      type: new FormControl(),
      vendor: new FormControl(),
      floorType: new FormControl()
    });

  }
  flooringType = function (floorType) {

    if (floorType == "M") {
      this.choose.companyneed  = 0;
      this.resetDropdownType();
      if (this.choose.currentServiceCode != "M") {
        this.choose.currentServiceCode = "M";
        this.choose.loadtype();
      }
    } else {
      this.choose.companyneed  = 1;
      this.resetDropdownCompany();
      if (this.choose.currentServiceCode != "T") {
        this.choose.currentServiceCode = "T";
        this.choose.loadcompany();
      }
    }
  }
  resetRadio = function () {
    this.form.controls.vendor.setValue(null);
  }
  resetDropdownType = function () {
    this.form.controls.type.setValue(null);
    }
  resetDropdownCompany = function () {
    this.form.controls.company.setValue(null);
  }




}

