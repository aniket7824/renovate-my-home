import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule  } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpModule } from '@angular/http';
import {MdButtonModule, MdProgressBarModule, MdInputModule, MdSelectModule, MdRadioModule, MdDialogModule, MdDialog, MdCheckboxModule, MdProgressSpinnerModule} from '@angular/material';

import { CustomerService } from './customer.service';
import { ChoseServiceService } from './chose-service.service';
import { CartserviceService } from './cartservice.service';

import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { LoginComponent } from './login/login.component';
import { AdComponent } from './ad/ad.component';
import { TopdivFIXEDComponent } from './topdiv-fixed/topdiv-fixed.component';
import { RmhServicenameFixedComponent } from './rmh-servicename-fixed/rmh-servicename-fixed.component';
import { PaintComponent } from './paint/paint.component';
import { FinalCheckoutComponent} from './final-checkout/final-checkout.component';
import { DialogcomponentComponent } from './dialogcomponent/dialogcomponent.component';
import { LogoutWarningComponent } from './logout-warning/logout-warning.component';
import { SubmitPageComponent } from './submit-page/submit-page.component';
import { EndscreenComponent } from './endscreen/endscreen.component';
import { FloorComponent } from './floor/floor.component';
import { CeilingComponent } from './ceiling/ceiling.component';
import { WaterProofingComponent } from './water-proofing/water-proofing.component';
import { CurtainsComponent } from './curtains/curtains.component';
import { AcComponent } from './ac/ac.component';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    LoginComponent,
    AdComponent,
    TopdivFIXEDComponent,
    RmhServicenameFixedComponent,
    PaintComponent,
    FinalCheckoutComponent,
    DialogcomponentComponent,
    LogoutWarningComponent,
    SubmitPageComponent,
    EndscreenComponent,
    FloorComponent,
    CeilingComponent,
    WaterProofingComponent,
    CurtainsComponent,
    AcComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    MdButtonModule,
    MdProgressBarModule,
    MdInputModule,
    MdSelectModule,
    MdRadioModule,
    MdDialogModule,
    MdCheckboxModule,
    MdProgressSpinnerModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    RouterModule.forRoot([
      {
        path: 'login',
        component: LoginComponent,
        data: {depth: 1}
      },
      {
        path: 'home',
        component: AdComponent,
        data: {depth: 2}
      },
      {
        path: 'menu',
        component: MenuComponent,
        data: {depth: 3}
      },
      {
        path: 'menu/paint',
        component: PaintComponent,
        data: {depth: 4}
      },
      {
        path: 'menu/floor',
        component: FloorComponent,
        data: {depth: 4}
      },
      {
        path: 'menu/ceiling',
        component: CeilingComponent,
        data: {depth: 4}
      },
      {
        path: 'menu/waterproofing',
        component: WaterProofingComponent,
        data: {depth: 4}
      },
      {
        path: 'menu/curtains',
        component: CurtainsComponent,
        data: {depth: 4}
      },
      {
        path: 'menu/ac',
        component: AcComponent,
        data: {depth: 4}
      },
      {
        path: 'checkout',
        component: FinalCheckoutComponent,
        data: {depth: 5}
      },
      {
        path: 'review',
        component: SubmitPageComponent,
        data: {depth: 6}
      },
      {
        path: 'final',
        component: EndscreenComponent,
        data: {depth: 7}
      }

    ])
  ],
  entryComponents: [
    DialogcomponentComponent,
    LogoutWarningComponent
  ],
  providers: [CustomerService, ChoseServiceService, CartserviceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
