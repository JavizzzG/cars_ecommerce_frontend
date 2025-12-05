import { Component } from '@angular/core';
import { NavbarNoAuth } from '../../shared/components/navbars/navbar-no-auth/navbar-no-auth';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [NavbarNoAuth, RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {

}
