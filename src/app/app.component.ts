import { SignupComponent } from './signup/signup.component';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { AboutComponent } from './about/about.component';
import { FooterComponent } from "./footer/footer.component";
import { ContactComponent } from './contact/contact.component';
import { filter } from 'rxjs';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,FooterComponent,ContactComponent, NavbarComponent, HomeComponent, LoginComponent, SignupComponent, AboutComponent, FormsModule, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent{
  isUserDashboard: boolean = false;
  title = 'my-project';
  constructor(private router: Router) {
    // Listen to route changes
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        // Check if the current route is '/userdashboard'
        this.isUserDashboard = event.url === '/userdashboard';
        // this.isUserDashboard = ['/userdashboard', '/login', '/signup'].includes(event.url);

      });
  }

}
