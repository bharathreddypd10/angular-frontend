import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationserviceService {
  private url = "http://127.0.0.1:5000";


  constructor(private http: HttpClient) { }

  // Fetch all notifications for a specific user from the backend
  fetchNotificationsForUser(userId: string): Observable<any> {
    return this.http.get(`${this.url}/getnotifications/${userId}`);
  }

  updateNotificationStatus(n_id: string): Observable<any> {
    return this.http.put(`${this.url}/updatenotification/${n_id}`, {});
  }

  // Send request accepted email
  sendRequestAcceptedEmail(email: string,bookingId: string): Observable<any> {
    const body = { email,booking_id: bookingId };
    return this.http.post(`${this.url}/request_accepted/notify`, body);
  }

  // Send driver assigned email
  sendDriverAssignedEmail(email: string, driverName: string, bookingId: string): Observable<any> {
    const body = { email, driver_name: driverName, booking_id: bookingId };
    return this.http.post(`${this.url}/driver_assigned/notify`, body);
  }

  // Send service completed email
  sendServiceCompletedEmail(email: string): Observable<any> {
    const body = { email };
    return this.http.post(`${this.url}/service_completed/notify`, body);
  }

  // Send billing invoice email
  sendBillingInvoiceEmail(email: string): Observable<any> {
    const body = { email };
    return this.http.post(`${this.url}/billing_invoice/notify`, body);
  } 

}
