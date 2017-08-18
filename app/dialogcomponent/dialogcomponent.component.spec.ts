import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogcomponentComponent } from './dialogcomponent.component';

describe('DialogcomponentComponent', () => {
  let component: DialogcomponentComponent;
  let fixture: ComponentFixture<DialogcomponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogcomponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogcomponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
