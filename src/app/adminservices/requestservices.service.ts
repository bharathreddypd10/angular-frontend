import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RequestservicesService {
  private apiUrl = 'http://127.0.0.1:5000'; 

  constructor(private http: HttpClient) {}

  // Create new service request
  createServiceRequest(formData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/addrequest`, formData);
  }

  getPendingRequests(booking_id?: string): Observable<any> {
    let params = new HttpParams();
    // Set the booking_id parameter if provided
    if (booking_id) {
        params = params.set('booking_id', booking_id);
    }
    // Call the general endpoint and filter requests on the server-side or client-side
    return this.http.get<any>(`${this.apiUrl}/getrequest`, { params });
}
  // Accept a request
  acceptRequest(booking_id: string,status: string='accepted'): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/updaterequest/${booking_id}`,{status:status}
    );
  }

  getAcceptedRequests(booking_id?: string): Observable<any> {
    let params = new HttpParams();
    if (booking_id) {
        params = params.set('booking_id', booking_id);
    }
    return this.http.get<any>(`${this.apiUrl}/getrequest`, { params });
}

  // Delete a request
 deleteRequest(booking_id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/deleterequest`,{
      body: { booking_id }
    });
}

  // Get a request by booking ID
  getRequestByBookingId(bookingId: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/getrequest/${bookingId}`);
  }

  // Get requests by email
  getRequestsByUseremail(email: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/getrequest/email/${email}`);
  }

    // Get accepted requests by email
  getAcceptedRequestsByEmail(email: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/getrequest/email/${email}/status/accepted`);
  }

  // Get completed requests by email
  getCompletedRequestsByEmail(email: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/getrequest/email/${email}/status/completed`);
  }

  // Assign a driver to a request
  assignDriver(bookingId: string, driverId: string): Observable<any> {
    return this.http.put(`${this.apiUrl}/updaterequest/${bookingId}`, { driver_id: driverId });
  }

  markRequestAsCompleted(booking_id: string|null,status: string='completed'): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/updaterequest/${booking_id}`,{status:status});
  }

  // Fetch only completed requests
  getCompletedRequests(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/getrequest/status/completed`);
  }

    // Inside requestservices.service.ts
  getCompletedTasks(driverId: string):Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/getrequest/status/completed?driver_id=${driverId}`);
  }

}
