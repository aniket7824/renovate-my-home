import { Injectable } from '@angular/core';
import {MdDialog} from '@angular/material';
import {LogoutWarningComponent} from './logout-warning/logout-warning.component';

@Injectable()
export class CartserviceService {
  services = [];
  measurement = [];
  cartAmount = 0;
  vendors = [];
  amount = [];
  serviceName = [];
  serviceDetails = [];
  vendorName = [];
  currentItem = 0;
  eligibleAmount;
  constructor(public dialog: MdDialog) { }
  add2cart = function (serviceId, vendorId, amount, measure, servicename, serviceDetails, vendorName) {
  this.services.push(serviceId);
  this.serviceDetails.push(serviceDetails);
  this.vendorName.push(vendorName);
  this.vendors.push(vendorId);
  this.amount.push(amount);
  this.measurement.push(measure);
  this.serviceName.push(servicename);
  this.currentItem++;
  this.cartAmount += amount;
}
  removeItem = function(index)
  {
    let datatosend = "Are you sure to remove? ^*^ Press OK to remove the item or Press CANCEL to abort the operation ^*^ OK ^*^ CANCEL";
    let dialogref = this.dialog.open(LogoutWarningComponent, {
      data: datatosend});
    dialogref.afterClosed().subscribe(result => {
      if (result == 1) {
        this.services.splice(index, 1);
        this.serviceDetails.splice(index, 1);
        this.vendorName.splice(index, 1);
        this.vendors.splice(index, 1);
        this.cartAmount -= this.amount[index];
        this.amount.splice(index, 1);
        this.measurement.splice(index, 1);
        this.serviceName.splice(index, 1);
        this.currentItem--;
      }
    }
    )
  }
  reinitialize () {
    this.cartAmount = 0;
    this.services = [];
    this.vendors = [];
    this.amount = [];
    this.measurement = [];
    this.serviceName = [];
    this.serviceDetails = [];
    this.vendorName = [];
    this.currentItem = 0;
    this.eligibleAmount = 0;
  }
}
