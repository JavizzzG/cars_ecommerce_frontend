import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import Car from '../../Models/Car';

@Injectable({
  providedIn: 'root',
})
export class CarService {
  private apiURL = 'https://cars-ecommerce-backend.onrender.com/JCars/api/car';
  // private apiURL = "http://localhost:8080/JCars/api/car";

  constructor(private http: HttpClient ){}

  getCars(): Observable<Car[]>{
    return this.http.get<Car[]>(this.apiURL);
  }

  getCarById(id: number): Observable<Car>{
    return this.http.get<Car>(`${this.apiURL}/${id}`);
  }

  createCar(car: Car): Observable<Car>{
    return this.http.post<Car>(this.apiURL, car);
  }

  updateCar(id: number, car: Car){
    return this.http.put(`${this.apiURL}/${id}`, car);
  }

  deleteCar(id: number){
    return this.http.delete(`${this.apiURL}/${id}`);
  }
  
}
