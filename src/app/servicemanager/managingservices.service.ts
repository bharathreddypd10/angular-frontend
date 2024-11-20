import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ManagingservicesService {

  private apiUrl = 'http://127.0.0.1:5000';

  constructor(private http: HttpClient) { }

  // Fetch all services
  getAllServices(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/getservice`);
  }

  // Add a new service
  addService(serviceData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/addservice`,serviceData);
  }

  // Update a service
  updateService(serviceId: number, serviceData: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/updateservice/${serviceId}`, serviceData);
  }

  // Delete a service
  deleteService(serviceId: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/deleteservice/${serviceId}`);
  }

}
