import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcceptedservicerequestsComponent } from './acceptedservicerequests.component';

describe('AcceptedservicerequestsComponent', () => {
  let component: AcceptedservicerequestsComponent;
  let fixture: ComponentFixture<AcceptedservicerequestsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AcceptedservicerequestsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AcceptedservicerequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
