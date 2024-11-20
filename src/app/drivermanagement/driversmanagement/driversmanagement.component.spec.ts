import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DriversmanagementComponent } from './driversmanagement.component';

describe('DriversmanagementComponent', () => {
  let component: DriversmanagementComponent;
  let fixture: ComponentFixture<DriversmanagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DriversmanagementComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DriversmanagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
