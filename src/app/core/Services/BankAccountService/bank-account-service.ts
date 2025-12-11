import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import BankAccount from '../../Models/BankAccount';

@Injectable({
  providedIn: 'root',
})
export class BankAccountService {
  apiURL = 'https://cars-ecommerce-backend.onrender.com/JCars/api/bank-account';

  constructor(private http: HttpClient){}


  getBankAccountByDocument(document: string): Observable<BankAccount>{
    return this.http.get<BankAccount>(this.apiURL+"/document/"+document)
  }
}
