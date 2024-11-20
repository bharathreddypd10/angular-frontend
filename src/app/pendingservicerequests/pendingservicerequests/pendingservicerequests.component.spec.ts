import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PendingservicerequestsComponent } from './pendingservicerequests.component';

describe('PendingservicerequestsComponent', () => {
  let component: PendingservicerequestsComponent;
  let fixture: ComponentFixture<PendingservicerequestsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PendingservicerequestsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PendingservicerequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
