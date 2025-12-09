import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import CarDetail from '../../Models/CarDetail';

@Injectable({
  providedIn: 'root',
})
export class CarDetailService {
  private apiURL = 'https://cars-ecommerce-backend.onrender.com/JCars/api/car-detail';
  
  constructor(private http: HttpClient){}

  getCarDetailsByCarId(carId: number):Observable<CarDetail>{
    return this.http.get<CarDetail>(this.apiURL+"/car/"+carId);
  }

  createCarDetail(carDetail: CarDetail):Observable<CarDetail>{
    return this.http.post<CarDetail>(this.apiURL, carDetail);
  }

  updateCarDetail(id: number, carDetail: CarDetail){
    return this.http.put(this.apiURL+"/"+id, carDetail);
  }

  deleteCarDetail(id: number){
    return this.http.delete(this.apiURL+"/"+id);
  }
  
}
