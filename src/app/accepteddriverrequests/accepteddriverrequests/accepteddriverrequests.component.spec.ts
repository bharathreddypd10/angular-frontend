import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccepteddriverrequestsComponent } from './accepteddriverrequests.component';

describe('AccepteddriverrequestsComponent', () => {
  let component: AccepteddriverrequestsComponent;
  let fixture: ComponentFixture<AccepteddriverrequestsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccepteddriverrequestsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccepteddriverrequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
