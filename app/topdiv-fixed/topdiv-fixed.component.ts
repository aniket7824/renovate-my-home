import { Component, OnInit } from '@angular/core';
import { CustomerService } from './../customer.service';
import { Router, ActivatedRoute } from '@angular/router';
import { CartserviceService } from './../cartservice.service';
import {MdDialog} from '@angular/material';
import {LogoutWarningComponent} from './../logout-warning/logout-warning.component';
@Component({
  selector: 'app-topdiv-fixed',
  templateUrl: './topdiv-fixed.component.html',
  styleUrls: ['./topdiv-fixed.component.css']
})
export class TopdivFIXEDComponent implements OnInit {

  constructor(private cart: CartserviceService, public dialog: MdDialog, private customerService: CustomerService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
  }
  logout = function () {
    let datatosend = "Are you sure to logout? ^*^ ";
    if (this.cart.currentItem > 0) {
      datatosend += "If you logout from this device, your cart information will be lost. ";
    }
    datatosend += "Press OK to logout or Press CANCEL to abort the operation ^*^ OK ^*^ CANCEL";
    let dialogref = this.dialog.open(LogoutWarningComponent, {
      data: datatosend});
    dialogref.afterClosed().subscribe(result => {
      if (result == 1) {
        this.customerService.isLogged = 0;
        this.customerService.name = null;
        this.customerService.account_number = null;
        this.customerService.isEligibleAd = null;
        this.router.navigate(['/login'], { replaceUrl: true });
      }
      }

    )


  }
}
