import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TopdivFIXEDComponent } from './topdiv-fixed.component';

describe('TopdivFIXEDComponent', () => {
  let component: TopdivFIXEDComponent;
  let fixture: ComponentFixture<TopdivFIXEDComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TopdivFIXEDComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopdivFIXEDComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
