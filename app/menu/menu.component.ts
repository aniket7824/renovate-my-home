import { Component, OnInit } from '@angular/core';
import { CustomerService } from './../customer.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ChoseServiceService } from './../chose-service.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  done;
  constructor(private customerService: CustomerService, private router: Router, private route: ActivatedRoute, public choose: ChoseServiceService) {}

  ngOnInit() {
    if (this.customerService.isLogged == 0) { // mandatory login check
      this.router.navigate(['/login'], { replaceUrl: true });
    }

    if (this.customerService.isEligibleAd != 1 ) { // mandatory login check
      this.router.navigate(['/home'], { replaceUrl: true });
    }

    window.history.pushState( {} , 'Home', '/home' );
    window.history.pushState( {} , 'Home', '/menu' );
    this.choose.reinitialize();
  }

  goService = function (initial) {
    if (initial == 'P') {
      this.router.navigate(['/menu/paint']);
    } else if (initial == 'F') {
      this.router.navigate(['/menu/floor']);
    } else if (initial == 'R') {
      this.router.navigate(['/menu/ceiling']);
    } else if (initial == 'W') {
      this.router.navigate(['/menu/waterproofing']);
    } else if (initial == 'C') {
      this.router.navigate(['/menu/curtains']);
    } else if (initial == 'A') {
      this.router.navigate(['/menu/ac']);
    }
  }
}
