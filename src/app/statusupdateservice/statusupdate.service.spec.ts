import { TestBed } from '@angular/core/testing';

import { StatusupdateService } from './statusupdate.service';

describe('StatusupdateService', () => {
  let service: StatusupdateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StatusupdateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
