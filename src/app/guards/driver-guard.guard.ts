import { CanActivateFn, Router } from '@angular/router';
import { LoginServiceService } from '../login services/login-service.service';
import { inject } from '@angular/core';

export const driverGuardGuard: CanActivateFn = (route, state) => {

  const loginService = inject(LoginServiceService);
  const router = inject(Router);

  const token = loginService.getToken();
  const role = loginService.getRole();

  // Allow access only if the role is 'driver' and a valid token exists
  if (token && role === 'driver') {
    return true;
  } else {
    // Redirect to login if no access
    router.navigateByUrl('/login');
    return false;
  }
};
