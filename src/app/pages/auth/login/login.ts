import { Component, inject, signal } from '@angular/core';
import { UserService } from '../../../core/Services/UserService/user-service';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  userService = inject(UserService);
  fb = inject(FormBuilder);
  message = signal<string>("");
  router = inject(Router);

  loginForm = this.fb.nonNullable.group({
    email: ["", [Validators.email, Validators.required]],
    password: ["", [Validators.required]],
  })

  handleLogin() {
  this.userService.loginUser(this.loginForm.getRawValue()).subscribe({
    next: (user) => {
      if(user != null){
      this.message.set("Login successful!");
      this.loginForm.reset();
      this.userService.setUser(user);
      this.router.navigate(['/cars']);
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
