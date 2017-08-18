import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CeilingComponent } from './ceiling.component';

describe('CeilingComponent', () => {
  let component: CeilingComponent;
  let fixture: ComponentFixture<CeilingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CeilingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CeilingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
