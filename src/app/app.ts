import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarNoAuth } from './shared/components/navbars/navbar-no-auth/navbar-no-auth';
import { NavbarAuth } from './shared/components/navbars/navbar-auth/navbar-auth';
import { UserService } from './core/Services/UserService/user-service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarNoAuth, NavbarAuth],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  userService = inject(UserService);
  protected readonly title = signal('cars_ecommerce_frontend');

  isAuth(){
    if(this.userService.isLoguedIn()){
      return true;
    }else{
      return false;
    }
  }
}
