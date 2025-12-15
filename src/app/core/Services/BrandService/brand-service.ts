import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import Brand from '../../Models/Brand';

@Injectable({
  providedIn: 'root',
})
export class BrandService {

  private apiURL = 'https://cars-ecommerce-backend.onrender.com/JCars/api/car-brand';

  constructor(private http: HttpClient) {}
  
  getAllBrands(): Observable<Brand[]> {
    return this.http.get<Brand[]>(this.apiURL);
  }

}
