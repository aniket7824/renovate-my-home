import { Component, OnInit } from '@angular/core';
import { CustomerService } from './../customer.service';
import { ChoseServiceService } from './../chose-service.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Http } from '@angular/http';
import {FormGroup, FormControl , Validators} from '@angular/forms';

@Component({
  selector: 'app-paint',
  templateUrl: './paint.component.html',
  styleUrls: ['./paint.component.css']
})
export class PaintComponent implements OnInit {
  form;
  constructor(private customerService: CustomerService, private router: Router, private route: ActivatedRoute, private http: Http, public choose: ChoseServiceService) { }
  ngOnInit() {

    if (this.customerService.isLogged == 0) { // mandatory login check
      this.router.navigate(['/login'], { replaceUrl: true });
    }

    if (this.customerService.isEligibleAd != 1 ) { // mandatory login check
      this.router.navigate(['/home'], { replaceUrl: true });
    }


    this.choose.currentServiceCode = "P";
    this.choose.companyneed  = 1;
    this.form = new FormGroup({
      dim: new FormControl('', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(6),
        Validators.pattern('^[0-9\.]+$')
      ]),
      company: new FormControl(),
      type: new FormControl(),
      vendor: new FormControl()
    });
     this.choose.loadcompany();

  }
  resetRadio = function () {
     this.form.controls.vendor.setValue(null);
  }





}

