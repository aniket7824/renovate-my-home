import { Component, OnInit } from '@angular/core';
import { CustomerService } from './../customer.service';
import { ChoseServiceService } from './../chose-service.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Http } from '@angular/http';
import {FormGroup, FormControl , Validators} from '@angular/forms';

@Component({
  selector: 'app-ac',
  templateUrl: './ac.component.html',
  styleUrls: ['./ac.component.css']
})
export class AcComponent implements OnInit {
  form;
  constructor(private customerService: CustomerService, private router: Router, private route: ActivatedRoute, private http: Http, public choose: ChoseServiceService) { }
  ngOnInit() {

      this.choose.currentServiceCode = "A";
    this.choose.companyneed  = 1;
    this.form = new FormGroup({
      dim: new FormControl('', [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(2),
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

