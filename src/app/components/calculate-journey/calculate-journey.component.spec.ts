import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CalculateJourneyComponent } from './calculate-journey.component';

describe('CalculateJourneyComponent', () => {
  let component: CalculateJourneyComponent;
  let fixture: ComponentFixture<CalculateJourneyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CalculateJourneyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalculateJourneyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
