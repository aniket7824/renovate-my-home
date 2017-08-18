import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RmhServicenameFixedComponent } from './rmh-servicename-fixed.component';

describe('RmhServicenameFixedComponent', () => {
  let component: RmhServicenameFixedComponent;
  let fixture: ComponentFixture<RmhServicenameFixedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RmhServicenameFixedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RmhServicenameFixedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
