import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LogoutWarningComponent } from './logout-warning.component';

describe('LogoutWarningComponent', () => {
  let component: LogoutWarningComponent;
  let fixture: ComponentFixture<LogoutWarningComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LogoutWarningComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LogoutWarningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
