import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserManagementService {

  private baseUrl = 'http://127.0.0.1:5000';

  constructor(private http: HttpClient) {}

  addUser(userData: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/usersignup`, userData);
  }

  fetchUsers(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/userdetails`);
  }

  updateUser(userData: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/updateuser`, userData);
  }

  deleteUser(email: string): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/deleteuser`, {
      body: { email }
    });
  }
}
