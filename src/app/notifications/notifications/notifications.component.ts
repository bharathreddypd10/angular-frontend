import { Component, OnInit } from '@angular/core';
import { StatusupdateService } from '../../statusupdateservice/statusupdate.service';
import { LoginServiceService } from '../../login services/login-service.service';
import { CommonModule } from '@angular/common';
import { NotificationserviceService } from '../../notificationservices/notificationservice.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-notifications',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './notifications.component.html',
  styleUrl: './notifications.component.css'
})
export class NotificationsComponent implements OnInit {
  notifications: any[] = [];
  user_id='';

  constructor(private statusUpdateService: StatusupdateService,private loginservice:LoginServiceService,private notificationservice:NotificationserviceService, private router: Router) {}

  ngOnInit(): void {
    // Decode token to get user ID and fetch notifications on component init
    const decodedToken = this.loginservice.decodeToken();
    this.user_id = decodedToken['sub'];

    this.fetchNotifications(); // Call fetchNotifications to load initial data


    // Subscribe to real-time notifications
    this.statusUpdateService.getNotifications().subscribe(notification => {
      console.log('Real-time notification:', notification);
      this.notifications.push(notification);  // Add real-time notifications to the list
    });
  }

  // Method to fetch all notifications for the user from the backend
  fetchNotifications(): void {
    this.notificationservice.fetchNotificationsForUser(this.user_id).subscribe({
      next: (data: any) => {
        console.log("Fetched notifications:", data.notifications);
        this.notifications = data.notifications; // Load the list of notifications
        this.sortNotifications(); 
      },
      error: (err: any) => {
        console.error('Error fetching notifications:', err);
      }
    });
  }

  // Sort notifications by created_at in descending order
  sortNotifications(): void {
    this.notifications.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
  }

  // Mark a notification as read when clicked and refresh the notifications list
  viewNotification(notification: any): void {
    if (!notification.is_read) {
      this.notificationservice.updateNotificationStatus(notification.n_id).subscribe({
        next: () => {
          this.fetchNotifications(); // Refresh notifications after marking one as read
        },
        error: (error) => {
          console.error('Error updating notification status:', error);
        }
      });
    }
    this.router.navigate(['/userdashboard/upcomingbookings']);
  }

}
