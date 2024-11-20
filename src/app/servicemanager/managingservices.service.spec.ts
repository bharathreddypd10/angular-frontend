import { TestBed } from '@angular/core/testing';

import { ManagingservicesService } from './managingservices.service';

describe('ManagingservicesService', () => {
  let service: ManagingservicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ManagingservicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
