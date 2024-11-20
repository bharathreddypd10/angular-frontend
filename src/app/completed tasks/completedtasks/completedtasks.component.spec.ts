import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompletedtasksComponent } from './completedtasks.component';

describe('CompletedtasksComponent', () => {
  let component: CompletedtasksComponent;
  let fixture: ComponentFixture<CompletedtasksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CompletedtasksComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompletedtasksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
