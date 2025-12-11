import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import Bank from '../../Models/Bank';

@Injectable({
  providedIn: 'root',
})
export class BankService {
  private apiURL = 'https://cars-ecommerce-backend.onrender.com/JCars/api/bank';

  constructor(private http: HttpClient){}

  getAllBanks(): Observable<Bank[]>{
    return this.http.get<Bank[]>(this.apiURL)
  }


  getBankByCode(code: string): Observable<Bank>{
    return this.http.get<Bank>(this.apiURL+"/"+code)
  }
}
