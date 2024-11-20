import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewdriverComponent } from './viewdriver.component';

describe('ViewdriverComponent', () => {
  let component: ViewdriverComponent;
  let fixture: ComponentFixture<ViewdriverComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewdriverComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewdriverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
