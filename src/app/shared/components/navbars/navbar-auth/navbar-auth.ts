import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../../../../core/Services/UserService/user-service';

@Component({
  selector: 'app-navbar-auth',
  imports: [RouterLink],
  templateUrl: './navbar-auth.html',
  styleUrl: './navbar-auth.scss',
})
export class NavbarAuth implements  OnInit {
  userService = inject(UserService);
  router = inject(Router);

  ngOnInit(): void {
    if(this.userService.getUser() == null){
      this.router.navigate(['/login']);
    }
  }

  logout() {
    this.userService.logout();
    this.router.navigate(['/login']);
  }

}
