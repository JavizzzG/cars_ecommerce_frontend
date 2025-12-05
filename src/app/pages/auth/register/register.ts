import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import User from '../../../core/Models/User';
import { UserService } from '../../../core/Services/UserService/user-service';
import { NavbarNoAuth } from '../../../shared/components/navbars/navbar-no-auth/navbar-no-auth';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, NavbarNoAuth],
  templateUrl: './register.html',
  styleUrl: './register.scss',
})
export class Register {
  fb = inject(FormBuilder);
  userService = inject(UserService);
  message = signal<string | null>(null);
  usersArray: User[] = [];

  userRegisterForm = this.fb.nonNullable.group({
    name: ["", [Validators.required, Validators.maxLength(100)]],
    email: ["", [Validators.required, Validators.maxLength(40), Validators.email]],
    password: ["", [Validators.required, Validators.maxLength(25), Validators.minLength(8)]],
    birthdate: [null, [Validators.required]],
    document: ["", [Validators.maxLength(13)]],
    phone: ["", [Validators.maxLength(15)]]
  })


  handleUserSubmit(){
    this.userService.createUser(this.userRegisterForm.getRawValue()).subscribe(

    resp => {

      this.message.set("User registered successfully!");
      this.userRegisterForm.reset();

    });
  }
}
