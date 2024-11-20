import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
// import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import { Observable, Subject } from 'rxjs';
import { io,Socket } from 'socket.io-client';
@Injectable({
  providedIn: 'root'
})
export class StatusupdateService {
  private socket: Socket;  // Use the Socket type from socket.io-client
  private statusUpdatesSubject: Subject<number> = new Subject<number>();
  private notificationSubject: Subject<{ type: string, message: string, user_id: string }> = new Subject<{ type: string, message: string, user_id: string }>();
  constructor() {
    // Connect to the Socket.IO server
    this.socket = io('http://localhost:5000'); // Replace with your backend server URL if different

    // Log when connected
    this.socket.on('connect', () => {
      console.log('Socket.IO connection established');
    });

    // Listen for the 'status_update' event from the server
    this.socket.on('status_update', (data: number) => {
      console.log('Status update from server:', data);
      this.statusUpdatesSubject.next(data); // Notify all subscribers of the new status index
    });

    // Listen for 'notification' events from the server
    this.socket.on('notification', (notification: { type: string, message: string, user_id: string }) => {
    console.log('Notification received from server:', notification);

    // Use the structured notification object for better data handling
    this.notificationSubject.next(notification); // Pass the notification to all subscribers
    });

    // Handle disconnection events if needed
    this.socket.on('disconnect', () => {
      console.log('Socket.IO connection disconnected');
    });
  }

  // Send status update to the server
  sendStatusUpdate(newStatusIndex: number): void {
    this.socket.emit('update_status', newStatusIndex);  // Emit 'update_status' event with the new status index
  }

  // Observable for components to subscribe to for status updates
  getStatusUpdates(): Observable<number> {
    return this.statusUpdatesSubject.asObservable();
  }

  // Function to send a notification to the server
  sendNotification(eventType: string, userId: string|null,booking_id:string|null): void {
    console.log('Sending notification:', eventType, userId);
    this.socket.emit('trigger_notification', {
      event_type: eventType,
      user_id: userId,
      booking_id:booking_id
    });
  }

  // Observable to allow components to subscribe to notifications
  getNotifications(): Observable<{ type: string, message: string, user_id: string }> {
    return this.notificationSubject.asObservable();
  }
  
}
