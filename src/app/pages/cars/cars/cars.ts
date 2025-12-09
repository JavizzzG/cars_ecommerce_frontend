import { Component, inject, OnInit, signal } from '@angular/core';
import { NavbarNoAuth } from '../../../shared/components/navbars/navbar-no-auth/navbar-no-auth';
import { CarService } from '../../../core/Services/CarService/car-service';
import Car from '../../../core/Models/Car';
import CarImage from '../../../core/Models/CarImage';
import { from, map, mergeMap } from 'rxjs';
import { CarImageService } from '../../../core/Services/CarImageService/car-image-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cars',
  imports: [NavbarNoAuth],
  templateUrl: './cars.html',
  styleUrl: './cars.scss',
})
export class Cars implements OnInit {
  private router = inject(Router);
  carService = inject(CarService);
  carImageService = inject(CarImageService);

  cars = signal<Car[]>([]);

 ngOnInit(): void {
   this.carService.getCars().pipe(
    mergeMap((cars: Car[]) => {
      return from(cars);
    }),
    mergeMap((car: Car) => {
      return this.carImageService.getCarImagesByCarId(car.id!).pipe(
        map((imageResponse: CarImage[]) => ({
          ...car,
          image: imageResponse.length > 0 ? imageResponse[0].image : null
        }))
      )
    })
   ).subscribe(
    (next) => {
      this.cars.update((currentCars) => [...currentCars, next]);
    }
   )
 }

 seeDetails(id: number){
  this.router.navigate(['/car-detail/', id]);
 }
}
