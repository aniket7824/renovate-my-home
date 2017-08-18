import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WaterProofingComponent } from './water-proofing.component';

describe('WaterProofingComponent', () => {
  let component: WaterProofingComponent;
  let fixture: ComponentFixture<WaterProofingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WaterProofingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WaterProofingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
