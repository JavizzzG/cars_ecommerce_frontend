import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import BankCard from '../../Models/BankCard';

@Injectable({
  providedIn: 'root',
})
export class BankCardService {
  private apiURL = 'https://cars-ecommerce-backend.onrender.com/JCars/api/bank-card';

  constructor(private http: HttpClient) {}

  getBankCardByNumber(number: string): Observable<BankCard> {
    return this.http.get<BankCard>(this.apiURL + '/number/' + number);
  }
}
