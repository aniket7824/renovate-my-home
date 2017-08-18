import { Component, OnInit } from '@angular/core';
import { CustomerService } from './../customer.service';
import { CartserviceService } from './../cartservice.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Http, Response } from '@angular/http';
import {FormGroup, FormControl, Validators} from '@angular/forms';

import 'rxjs/add/operator/map';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form;
  url;
  responseStatus;
  showload = 0;
  loginerror = 0;
  constructor(private cart: CartserviceService, private customerService: CustomerService, private router: Router, private route: ActivatedRoute, private http: Http) { }
  ngOnInit() {

    this.cart.reinitialize();
    this.form = new FormGroup({
      username: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
        Validators.pattern('^[0-9\.]+$')
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8)
      ]),
    });
  }

  login = function () {
    this.loginerror = 0;
    this.showload = 1;
    this.url = "http://rmh-tcs1.njs.jelastic.vps-host.net/webapi/rmh/login/" +
      this.form.get('username').value + "/" +
      this.form.get('password').value;
    this.http.get(this.url).map((response: Response) => response.json()
    ).subscribe(
      (data) => {
        // this.loginResponse.isLogin = data['loginSucess'];
        // this.loginResponse.isCustomer = data['isCustomer'];
        //console.log(data);
        if (data['loginSucess'] == 1) {
          this.customerService.isLogged = data['loginSucess'];
          this.customerService.name = data['name'];
          this.customerService.account_number = data['accountNumber'];
          this.router.navigate(['/home'], { replaceUrl: true })
        } else {
          this.loginerror = 1;
        }
        this.showload = 0;
      },
      err => {
        this.loginerror = 2;
        this.showload = 0;
      }
    );
  }

}
