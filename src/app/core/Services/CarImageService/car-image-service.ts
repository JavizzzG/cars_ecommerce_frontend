import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import CarImage from '../../Models/CarImage';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CarImageService {
  private apiURL = 'https://cars-ecommerce-backend.onrender.com/JCars/api/car-image';
  // private apiURL = "http://localhost:8080/JCars/api/car-image";

  constructor(private http: HttpClient){}

  getCarImagesByCarId(carId: number): Observable<CarImage[]>{
    return this.http.get<CarImage[]>(`${this.apiURL}/car/${carId}`);
  }

  createCarImage(carImage: FormData): Observable<CarImage>{
    return this.http.post<CarImage>(this.apiURL, carImage);
  }

  uploadCarImage(carId: number, imageData: FormData){
    return this.http.post(`${this.apiURL}/car/${carId}/upload`, imageData);
  }

  deleteCarImage(imageId: number){
    return this.http.delete(`${this.apiURL}/${imageId}`);
  }
}
