import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PendingdriverrequestsComponent } from './pendingdriverrequests.component';

describe('PendingdriverrequestsComponent', () => {
  let component: PendingdriverrequestsComponent;
  let fixture: ComponentFixture<PendingdriverrequestsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PendingdriverrequestsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PendingdriverrequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
