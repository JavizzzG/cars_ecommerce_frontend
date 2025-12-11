import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import  Payment  from '../../../core/Models/Payment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PaymentService {
  private apiURL = 'https://cars-ecommerce-backend.onrender.com/JCars/api/payment';

  constructor(private http: HttpClient) {}

  getPaymentByUserId() {
    return this.http.get(this.apiURL);
  }

  createPayment(payment: Payment): Observable<Payment> {
    return this.http.post<Payment>(this.apiURL, payment);
  }
}
