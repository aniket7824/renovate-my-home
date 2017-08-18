import { Component, OnInit } from '@angular/core';
import { CartserviceService } from './../cartservice.service';
@Component({
  selector: 'app-rmh-servicename-fixed',
  templateUrl: './rmh-servicename-fixed.component.html',
  styleUrls: ['./rmh-servicename-fixed.component.css']
})
export class RmhServicenameFixedComponent implements OnInit {
items = "0";
  constructor(public cart: CartserviceService) { }

  ngOnInit() {
    this.items = this.cart.currentItem.toString();
    if (this.cart.currentItem > 9) {
      this.items = "9+";
    }
  }

}
