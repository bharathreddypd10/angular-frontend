import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpcomingbookingsComponent } from './upcomingbookings.component';

describe('UpcomingbookingsComponent', () => {
  let component: UpcomingbookingsComponent;
  let fixture: ComponentFixture<UpcomingbookingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpcomingbookingsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpcomingbookingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
