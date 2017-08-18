import {Component, Inject, OnInit} from '@angular/core';
import {MdDialogRef, MD_DIALOG_DATA} from '@angular/material';
@Component({
  selector: 'app-logout-warning',
  templateUrl: './logout-warning.component.html',
  styleUrls: ['./logout-warning.component.css']
})
export class LogoutWarningComponent implements OnInit {

  title = null;
  body = null;
  buttonYes = null;
  buttonNo = null;
  dataarray;
  constructor(public thisDialogRef: MdDialogRef<LogoutWarningComponent>, @Inject(MD_DIALOG_DATA) public data: string) {
    this.dataarray = data.split(" ^*^ ");
  }

  ngOnInit() {
    this.title = this.dataarray[0];
    this.body = this.dataarray[1];
    this.buttonYes = this.dataarray[2];
    this.buttonNo = this.dataarray[3];
  }
  no() {
    this.thisDialogRef.close(0);
  }
  yes() {
    this.thisDialogRef.close(1);
  }
}
