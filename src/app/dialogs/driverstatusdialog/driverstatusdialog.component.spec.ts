import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DriverstatusdialogComponent } from './driverstatusdialog.component';

describe('DriverstatusdialogComponent', () => {
  let component: DriverstatusdialogComponent;
  let fixture: ComponentFixture<DriverstatusdialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DriverstatusdialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DriverstatusdialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
