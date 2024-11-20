import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { jwtDecode } from "jwt-decode";
@Injectable({
  providedIn: 'root'
})
export class LoginServiceService {
  private url = "http://127.0.0.1:5000/userlogin"; // Login API endpoint
  private updateUrl = "http://127.0.0.1:5000/updateuser";
  private updateadmin = "http://127.0.0.1:5000/updateadmin";
  private api ="http://127.0.0.1:5000"
  constructor(private http: HttpClient) { }
  login(userdata: any): Observable<any> {
    return this.http.post<any>(this.url, userdata);
  }
  validateCurrentPassword(currentPassword: string,newPassword:string): Observable<any> {
    return this.http.post(`${this.api}/verifypassword`,  {currentPassword: currentPassword,newPassword:newPassword} );
  }
  updateUserDetails(email:any,userDetails: any): Observable<any> {
    return this.http.put<any>(this.updateUrl, userDetails,email); // PUT request to update user details
  }
  updateAdminDetails(email:any,adminDetails: any): Observable<any> {
    return this.http.put<any>(this.updateadmin, adminDetails,email);
  }

  storeRole(role: string): void {
    sessionStorage.setItem('role', role); // Store the role in localStorage
  }

  getRole(): string | null {
    return sessionStorage.getItem('role'); // Retrieve the role from localStorage
  }

  storeToken(token: string): void {
  sessionStorage.setItem('jwt', token);
  }
  getToken(): string | null {
    return sessionStorage.getItem('jwt');
  }
  decodeToken(): any {
    const token = this.getToken();
    if (token) {
      try {
        return jwtDecode(token);  // Decode the token and return the payload
      } catch (error) {
        console.error("Error decoding token:", error);
        return null;
      }
    }
    return null;
  }

}
