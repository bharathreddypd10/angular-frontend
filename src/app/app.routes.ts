import { Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { ContactComponent } from './contact/contact.component';
import { UserdashboardComponent } from './userdashboard/userdashboard.component';
import { AdmindashboardComponent } from './admindashboard/admindashboard.component';
import { RegisteredUsersComponent } from './registered-users/registered-users.component';
import { AdminSidebarComponent } from './admin-sidebar/admin-sidebar.component';
import { ServiceRequestComponent } from './service-request/service-request.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { UserSidebarComponent } from './user-sidebar/user-sidebar.component';
import { authGuard } from './guards/auth.guard';
import { adminGuardGuard } from './guards/admin-guard.guard';
import { AdminProfileComponent } from './admin-profile/admin-profile.component';
import { GooglemapsComponent } from './googlemaps/googlemaps.component';
import { AdminhomeComponent } from './adminhome/adminhome.component';
import { UserhomeComponent } from './userhome/userhome.component';
import { HistoryComponent } from './history/history.component';
import { UpcomingbookingsComponent } from './upcomingbookings/upcomingbookings.component';
import { PendingservicerequestsComponent } from './pendingservicerequests/pendingservicerequests/pendingservicerequests.component';
import { AcceptedservicerequestsComponent } from './acceptedservicerequests/acceptedservicerequests/acceptedservicerequests.component';
import { PendingdriverrequestsComponent } from './pendingdriverrequests/pendingdriverrequests/pendingdriverrequests.component';
import { AccepteddriverrequestsComponent } from './accepteddriverrequests/accepteddriverrequests/accepteddriverrequests.component';
import { ServicesmanagementComponent } from './servicesmanagement/servicesmanagement/servicesmanagement.component';
import { AssigndriversComponent } from './assigndrivers/assigndrivers/assigndrivers.component';
import { DriversmanagementComponent } from './drivermanagement/driversmanagement/driversmanagement.component';
import { DriverSidebarComponent } from './driver-sidebar/driver-sidebar/driver-sidebar.component';
import { DriverdashboardComponent } from './driverdashboard/driverdashboard/driverdashboard.component';
import { DriverhomeComponent } from './driverhome/driverhome/driverhome.component';
import { DriverprofileComponent } from './driverprofile/driverprofile/driverprofile.component';
import { driverGuardGuard } from './guards/driver-guard.guard';
import { AssignedtasksComponent } from './assigned tasks/assignedtasks/assignedtasks.component';
import { CompletedtasksComponent } from './completed tasks/completedtasks/completedtasks.component';
import { ViewdriverComponent } from './userdriver/viewdriver/viewdriver.component';
import { UsertaskComponent } from './usertask/usertask/usertask.component';
import { NotificationsComponent } from './notifications/notifications/notifications.component';
import { SettingsComponent } from './settings/settings/settings.component';
import { CompletedservicesComponent } from './completedservices/completedservices/completedservices.component';
import { ForgotpasswordComponent } from './forgotpassword/forgotpassword/forgotpassword.component';
import { NavbarComponent } from './navbar/navbar.component';

export const routes: Routes = [
    {
        path: '',
        component: NavbarComponent,  // Parent layout component with navbar
        children: [
            { path: '', redirectTo: 'home', pathMatch: 'full' },
            { path: 'home', component: HomeComponent },
            { path: 'about', component: AboutComponent },
            { path: 'contact', component: ContactComponent },
            { path: 'login', component: LoginComponent },
            { path: 'signup', component: SignupComponent },
            { path: 'forgotpassword', component: ForgotpasswordComponent }
        ]
    },
    { path: 'userdashboard', component:  UserdashboardComponent,children:[
        { path: '', component: UserhomeComponent },
        { path: 'userprofile', component: UserProfileComponent },
        { path: 'servicerequest', component: ServiceRequestComponent },
        { path: 'upcomingbookings', component: UpcomingbookingsComponent },
        { path: 'history', component: HistoryComponent },
        { path: 'viewdriver', component: ViewdriverComponent },
        { path: 'notifications', component: NotificationsComponent },
        { path: 'settings', component: SettingsComponent }
        
    ],canActivate:[authGuard]},
    { path: 'admindashboard', component:  AdmindashboardComponent,children:[
        { path: '', component: AdminhomeComponent },
        { path: 'adminprofile', component: AdminProfileComponent },
        { path: 'registered-users', component: RegisteredUsersComponent },
        { path: 'servicesmanagement', component: ServicesmanagementComponent },
        { path: 'drivermanagement', component: DriversmanagementComponent },
        { path: 'pendingservices', component: PendingservicerequestsComponent },
        { path: 'acceptedservices', component: AcceptedservicerequestsComponent },
        { path: 'pendingdrivers', component: PendingdriverrequestsComponent },
        { path: 'accepteddrivers', component: AccepteddriverrequestsComponent } ,
        { path: 'assigndrivers', component: AssigndriversComponent },
        { path: 'completedservices', component: CompletedservicesComponent },
        { path: 'notifications', component: NotificationsComponent },
        { path: 'settings', component: SettingsComponent }
    ],canActivate:[adminGuardGuard] }, 
    {path:'driverdashboard',component:DriverdashboardComponent,children:[
        {path:'', component: DriverhomeComponent},
        {path:'driverprofile',component:DriverprofileComponent},
        {path:'assignedtasks',component:AssignedtasksComponent},
        {path:'completedtasks',component:CompletedtasksComponent},
        {path:'usertask',component:UsertaskComponent},
        { path: 'notifications', component: NotificationsComponent },
        { path: 'settings', component: SettingsComponent }
    ], canActivate: [driverGuardGuard] },
    { path: 'admin-sidebar', component: AdminSidebarComponent },  
    { path: 'user-sidebar', component: UserSidebarComponent },
    { path: 'driver-sidebar', component: DriverSidebarComponent },
    { path: 'googlemaps', component: GooglemapsComponent },  
    { path: '**', redirectTo: '/home' }
];
