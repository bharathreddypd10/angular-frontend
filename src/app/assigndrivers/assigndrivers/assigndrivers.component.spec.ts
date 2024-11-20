import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssigndriversComponent } from './assigndrivers.component';

describe('AssigndriversComponent', () => {
  let component: AssigndriversComponent;
  let fixture: ComponentFixture<AssigndriversComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AssigndriversComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssigndriversComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
