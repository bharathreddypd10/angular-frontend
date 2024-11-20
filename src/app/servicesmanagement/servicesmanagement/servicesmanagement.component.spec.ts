import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServicesmanagementComponent } from './servicesmanagement.component';

describe('ServicesmanagementComponent', () => {
  let component: ServicesmanagementComponent;
  let fixture: ComponentFixture<ServicesmanagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ServicesmanagementComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ServicesmanagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
