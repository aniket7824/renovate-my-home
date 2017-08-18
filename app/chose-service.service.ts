import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { CartserviceService } from './cartservice.service';
import { Router, ActivatedRoute } from '@angular/router';
import {MdDialog} from '@angular/material';
import {DialogcomponentComponent} from './dialogcomponent/dialogcomponent.component';


@Injectable()
export class ChoseServiceService {
  currentServiceCode;
  types = {
    type: [],
    serviceId: []
  };
  vendors = {
    name: [],
    vendorId: [],
    rate: [],
    address: []
  };
  company = [];
  companyload = 0;
  companyloadError = 0;
  typeload = 0;
  typeloadError = 0;
  vendorload = 0;
  vendorloadError = 0;
  Loading = 0;
  currentVendorName;
  currentCompany;
  currentType;
  currentVendor;
  currentServiceID;
  currentVendorID;
  currentRate = 0;
  currentDim = 0;
  companyneed;
  url1;
  constructor(public dialog: MdDialog, private http: Http, private cart: CartserviceService, private router: Router, private route: ActivatedRoute) { }
  loadcompany = function () {
    this.vendorload = 0;
    this.typeload = 0;
    this.currentRate = 0;
    this.company = [];
    this.Loading = 1;
    this.companyload = 0;
    this.companyloadError = 0;
    this.url1 = "http://rmh-tcs1.njs.jelastic.vps-host.net/webapi/rmh/company/" + this.currentServiceCode;
    // console.log(this.url1);
    this.http.get(this.url1).map((response: Response) => response.json()
    ).subscribe(
      (data) => {
        // console.log(data);
        for (let i = 1; i <= data['0']['0']['total']; i++) {
          this.company.push(data[i]['0']['name']);
        }
        this.companyload = 1;
        this.Loading = 0;
      },
      err => {
        this.companyloadError = 1;
        this.Loading = 0;
        console.log(err);
      }
    );
  }
  getRate = function (rate, vendorId, vendorName) {
    this.currentRate = rate;
    this.currentVendor = vendorId;
    this.currentVendorName = vendorName;
  }
  getDim = function (measure) {
    this.currentDim = measure;
  }
  loadvendor = function (serviceId, type) {
    //console.log(this.types.type.length);
    this.currentType = type;
    this.currentRate = 0;
    this.currentServiceID = serviceId;
    this.vendors.name = [];
    this.vendors.vendorId = [];
    this.vendors.rate = [];
    this.vendors.address = [];
    this.Loading = 1;
    this.vendorload = 0;
    this.vendorloadError = 0;
    this.url1 = "http://rmh-tcs1.njs.jelastic.vps-host.net/webapi/rmh/vendor/" + this.currentServiceID;
    // console.log(this.types);
    this.http.get(this.url1).map((response: Response) => response.json()
    ).subscribe(
      (data) => {
        // console.log(data);
        for (let i = 1; i <= data['0']['0']['total']; i++) {
          this.vendors.name.push(data[i]['0']['name']);
          this.vendors.vendorId.push(data[i]['0']['vendorId']);
          this.vendors.rate.push(data[i]['0']['rate']);
          this.vendors.address.push(data[i]['0']['address']);
        }
        // console.log(this.company);
        this.vendorload = 1;
        this.Loading = 0;
      },
      err => {
        console.log(err);
        this.vendorloadError = 1;
        this.Loading = 0;
      }
    );
  }
  loadtype = function (com) {
    this.vendorload = 0;
    this.currentRate = 0;
    this.currentVendor = null;
    this.types.serviceId = [];
    this.types.type = [];
    this.currentCompany = com;
    this.Loading = 1;
    this.typeload = 0;
    this.typeloadError = 0;
    if (this.companyneed == 1) {
      this.url1 = "http://rmh-tcs1.njs.jelastic.vps-host.net/webapi/rmh/type/" + this.currentServiceCode +"/"+ this.currentCompany;
    } else {
      this.url1 = "http://rmh-tcs1.njs.jelastic.vps-host.net/webapi/rmh/type/" + this.currentServiceCode;
    }
    // console.log(this.types);
    this.http.get(this.url1).map((response: Response) => response.json()
    ).subscribe(
      (data) => {
        // console.log(data);
        for (let i = 1; i <= data['0']['0']['total']; i++) {
          this.types.type.push(data[i]['0']['type']);
          this.types.serviceId.push(data[i]['0']['serviceId']);
        }
        // console.log(this.company);
        this.typeload = 1;
        this.Loading = 0;
      },
      err => {
        console.log(err);
        this.typeloadError = 1;
        this.Loading = 0;
      }
    );
  }
  proceed() {
  var cost = (this.currentRate * this.currentDim);
  var service;
  var serviceDetails = "";
  if (this.currentServiceCode == 'P') {
    service = "Painting";
    serviceDetails = this.currentCompany + ' | ' + this.currentType;
  } else if (this.currentServiceCode == 'M') {
    service = "Marbel Flooring";
    serviceDetails = this.currentType;
  } else if (this.currentServiceCode == 'T') {
    service = "Floor Tiles";
    serviceDetails = this.currentCompany + ' | ' + this.currentType;
  } else if (this.currentServiceCode == 'R') {
  service = "Ceiling";
  serviceDetails = this.currentType;
  } else if (this.currentServiceCode == 'W') {
    service = "Water Proofing";
    serviceDetails = this.currentCompany + ' | ' + this.currentType;
  } else if (this.currentServiceCode == 'C') {
    service = "Curtains";
    serviceDetails = this.currentCompany + ' | ' + this.currentType;
  } else if (this.currentServiceCode == 'A') {
    service = "AC";
    serviceDetails = this.currentCompany + ' | ' + this.currentType;
  }
  this.cart.add2cart(this.currentServiceID, this.currentVendor, cost, this.currentDim, service, serviceDetails, this.currentVendorName);
  this.dialog.open(DialogcomponentComponent, {
    data: 'Item added to cart'
  });
    this.router.navigate(['/checkout'], { replaceUrl: true });
  }
  reinitialize() {
    this.currentServiceCode = null;
    this.types.type = [];
    this.types.serviceId = [];
    this.vendors.name = [];
    this.vendors.vendorId = [];
    this.vendors.rate = [];
    this.vendors.address = [];
    this.company = [];
    this.companyload = 0;
    this.companyloadError = 0;
    this.typeload = 0;
    this.typeloadError = 0;
    this.vendorload = 0;
    this.vendorloadError = 0;
    this.Loading = 0;
    this.currentCompany = null;
    this.currentVendor = null;
    this.currentServiceID = null;
    this.currentVendorID = null;
    this.currentRate = 0;
    this.currentDim = 0;
    this.url1 = null;
    this.companyneed = null;
  }
}
