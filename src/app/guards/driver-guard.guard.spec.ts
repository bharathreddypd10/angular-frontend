import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { driverGuardGuard } from './driver-guard.guard';

describe('driverGuardGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => driverGuardGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
