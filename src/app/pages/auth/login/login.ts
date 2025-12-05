import { Component, inject, signal } from '@angular/core';
import { UserService } from '../../../core/Services/UserService/user-service';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { NavbarNoAuth } from '../../../shared/components/navbars/navbar-no-auth/navbar-no-auth';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, NavbarNoAuth],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  userService = inject(UserService);
  fb = inject(FormBuilder);
  message = signal<string>("");

  userLoginForm = this.fb.nonNullable.group({
    email: ["", [Validators.email, Validators.required]],
    password: ["", [Validators.required]],
  })

  handleUserLogin() {
  this.userService.getUserByEmail(this.userLoginForm.value.email!).subscribe({
    next: (user) => {
      if(user.password === this.userLoginForm.value.password){
        this.message.set("Login successful!");
      }else{
        this.message.set("Invalid email or password.");
      }
    },
    error: (err) => {
      this.message.set("Invalid email or password.");
    }
  })
  }
}
