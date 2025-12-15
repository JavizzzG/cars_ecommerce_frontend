import { Component, inject} from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../../../../core/Services/UserService/user-service';

@Component({
  selector: 'app-navbar-auth',
  imports: [RouterLink],
  templateUrl: './navbar-auth.html',
  styleUrl: './navbar-auth.scss',
})
export class NavbarAuth {
  userService = inject(UserService);
  router = inject(Router);

  logout() {
    this.userService.logout();
    this.router.navigate(['/login']);
  }

}
