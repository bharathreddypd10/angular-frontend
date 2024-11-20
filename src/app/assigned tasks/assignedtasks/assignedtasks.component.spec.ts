import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignedtasksComponent } from './assignedtasks.component';

describe('AssignedtasksComponent', () => {
  let component: AssignedtasksComponent;
  let fixture: ComponentFixture<AssignedtasksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AssignedtasksComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssignedtasksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
