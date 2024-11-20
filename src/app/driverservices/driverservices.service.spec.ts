import { TestBed } from '@angular/core/testing';

import { DriverservicesService } from './driverservices.service';

describe('DriverservicesService', () => {
  let service: DriverservicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DriverservicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
