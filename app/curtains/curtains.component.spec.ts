import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CurtainsComponent } from './curtains.component';

describe('CurtainsComponent', () => {
  let component: CurtainsComponent;
  let fixture: ComponentFixture<CurtainsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CurtainsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CurtainsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
