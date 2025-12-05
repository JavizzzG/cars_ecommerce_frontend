import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import User from '../../Models/User';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {

  private apiUrl = "http://localhost:8080/JCars/api/user";

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

  createUser(user: User): Observable<User>{
    return this.http.post<User>(this.apiUrl, user);
  }

  updateUser(id: number, user: User){
    return this.http.put(`${this.apiUrl}/${id}`, user);
  }

  deleteUser(id: number){
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
