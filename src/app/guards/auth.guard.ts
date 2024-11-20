import { CanActivateFn, Router } from '@angular/router';
import { LoginServiceService } from '../login services/login-service.service';
import { inject } from '@angular/core';
export const authGuard: CanActivateFn = (route, state) => {
  const loginService= inject(LoginServiceService);
  const router = inject(Router);
  const token = loginService.getToken();
  const role = loginService.getRole();
  if(token && role==='user'){
    return true;
  } else{
    router.navigateByUrl('login');
    return false;
  }
};

