import { TestBed } from '@angular/core/testing';

import { RequestservicesService } from './requestservices.service';

describe('RequestservicesService', () => {
  let service: RequestservicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RequestservicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
