import {Component, Inject, OnInit} from '@angular/core';
import {MdDialogRef, MD_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'app-dialogcomponent',
  templateUrl: './dialogcomponent.component.html',
  styleUrls: ['./dialogcomponent.component.css']
})
export class DialogcomponentComponent implements OnInit {
title = null;
body = null;
dataarray;
isTitle;
  constructor(public thisDialogRef: MdDialogRef<DialogcomponentComponent>, @Inject(MD_DIALOG_DATA) public data: string) {
    // first data then title
    this.dataarray = data.split(" ^*^ ");
  }
  ngOnInit() {
    if (this.dataarray.length < 2) {
      this.isTitle = 0;
      this.body = this.dataarray[0];
    } else if (this.dataarray.length == 2) {
      this.isTitle = 1;
      this.body = this.dataarray[0];
      this.title = this.dataarray[1];
    }

  }

}
