import { Component } from '@angular/core';
import { NavbarNoAuth } from '../../shared/components/navbars/navbar-no-auth/navbar-no-auth';

@Component({
  selector: 'app-home',
  imports: [NavbarNoAuth],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {

}
