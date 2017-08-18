import { Injectable } from '@angular/core';
import { Http } from '@angular/http';



@Injectable()
export class CustomerService {
isLogged = 0;
account_number;
name;
cibil;
isEligibleAd= 0;
  constructor(private http: Http) { }
cibilAdEligibility = function (cibil) {


  this.http.get(this.url).map((response: Response) => response.json()
  ).subscribe(
    (data1) => {
      // this.loginResponse.isLogin = data['loginSucess'];
      // this.loginResponse.isCustomer = data['isCustomer'];

      if (data1['haveloan'] == 1) {
        this.isEligibleAd = 2;
      }

    },
    err => {
      console.log(err);
    }
  );
}
}
