import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DriverservicesService {
  private apiUrl = 'http://127.0.0.1:5000';

  constructor(private http: HttpClient) {}

  getDrivers(): Observable<any> {
    return this.http.get(`${this.apiUrl}/getdriverdetails`);
  }

  getDriversByStatus(status: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/getdriverdetails`, {
      params: { Status:status }
    });
  }

  // Get driver by booking ID
  getDriverByBookingId(bookingId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/getdriverdetails`, {
      params: { booking_id: bookingId }
    });
  }

  addDriver(formData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/adddriver`, formData);
  }

  updateDriver(driverId: string,driverData: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/updatedriver/${driverId}`, driverData);
  }

  deleteDriver(driver_id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${driver_id}`);
  }

}
