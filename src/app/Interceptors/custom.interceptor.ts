import { HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { LoginServiceService } from '../login services/login-service.service';
import { inject } from '@angular/core';

export const customInterceptor: HttpInterceptorFn = (req, next) => {
  const loginService = inject(LoginServiceService);
  const token = loginService.getToken();
  const clonedReq = token ? 
  req.clone({
    setHeaders: {
      Authorization: `Bearer ${token}`
    }
  }) : req;

  return next(clonedReq);
};
