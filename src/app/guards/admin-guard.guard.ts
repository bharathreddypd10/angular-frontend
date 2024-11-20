import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { LoginServiceService } from '../login services/login-service.service';

export const adminGuardGuard: CanActivateFn = (route, state) => {
  const loginService= inject(LoginServiceService);
  const router = inject(Router);
  const token = loginService.getToken();
  const role = loginService.getRole();
  if(token && role==='admin'){
    return true;
  } else{
    router.navigateByUrl('login');
    return false;
  }
};
