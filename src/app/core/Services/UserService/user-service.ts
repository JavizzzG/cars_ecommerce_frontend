import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import User from '../../Models/User';
import { Observable } from 'rxjs';
import Login from '../../Models/Login';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class UserService {

  router = inject(Router);

  private apiUrl = "https://cars-ecommerce-backend.onrender.com/JCars/api/user";

  isLoguedIn = signal<boolean>(this.getUser !== null);

  constructor(private http: HttpClient){}

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl);
  }

  getUserById(id: number): Observable<User>{
    return this.http.get<User>(`${this.apiUrl}/${id}`);
  }

  getUserByEmail(email: string): Observable<User>{
    return this.http.get<User>(`${this.apiUrl}/email/${email}`);
  }

  loginUser(data: Login): Observable<User>{
    return this.http.post<User>(`${this.apiUrl}/login`, data);
  }

  createUser(user: User): Observable<User>{
    return this.http.post<User>(this.apiUrl, user);
  }

  updateUser(id: number, user: User){
    return this.http.put(`${this.apiUrl}/${id}`, user);
  }

  deleteUser(id: number){
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  setUser(user: User){
    localStorage.setItem("user", JSON.stringify(user))
    this.isLoguedIn.set(true);
  }

  getUser(): User | null {
    const userData = localStorage.getItem("user");

    if(userData){
      return JSON.parse(userData) as User;
    }

    return null;
  }

  logout(){
    localStorage.removeItem("user");
    this.isLoguedIn.set(false);
  }
}
