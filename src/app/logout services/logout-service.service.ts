import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LogoutServiceService {

  constructor(private router: Router) {}
  logout(): void {
    // Clear user session or token here
    sessionStorage.removeItem('jwt');
    sessionStorage.removeItem('role');
    // Redirect to login page or any other page
    this.router.navigate(['/login']);
  }
}
