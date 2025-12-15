import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import Order from '../../Models/Order';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private apiURL= 'https://cars-ecommerce-backend.onrender.com/JCars/api/order';

  constructor(private http: HttpClient ){}

  getOrders(): Observable<Order[]>{
    return this.http.get<Order[]>(this.apiURL);
  }

  getOrderById(id: number): Observable<Order>{
    return this.http.get<Order>(`${this.apiURL}/${id}`);
  }

  getOrdersByUserId(id: number): Observable<Order[]>{
    return this.http.get<Order[]>(`${this.apiURL}/user/${id}`);
  }



  createOrder(order: Order): Observable<Order>{
    return this.http.post<Order>(this.apiURL, order);
  }

  updateOrder(id: number, order: Order): Observable<void>{
    return this.http.put<void>(`${this.apiURL}/${id}`, order);
  }


}
