import { Component, inject, OnInit, signal } from '@angular/core';
import { OrderService } from '../../../core/Services/OrderService/order-service';
import { NavbarNoAuth } from '../../../shared/components/navbars/navbar-no-auth/navbar-no-auth';
import { CarService } from '../../../core/Services/CarService/car-service';
import { from, map, merge, mergeMap } from 'rxjs';
import { CarImageService } from '../../../core/Services/CarImageService/car-image-service';
import OrderComplete from '../../../core/Models/OrderComplete';

@Component({
  selector: 'app-orders',
  imports: [NavbarNoAuth],
  templateUrl: './orders.html',
  styleUrl: './orders.scss',
})
export class Orders implements OnInit{
  orderService = inject(OrderService);
  carService = inject(CarService)
  carImageService = inject(CarImageService)
  orders = signal<OrderComplete[]>([]);
  userId = 1

  ngOnInit(): void {
    this.orders.set([])
    this.orderService.getOrdersByUserId(this.userId).pipe(
      mergeMap((orders) => {
        return from(orders)
      }),
      mergeMap((order) => {
        return this.carService.getCarById(order.fkidCar!).pipe(
          mergeMap((car) => {
            return this.carImageService.getCarImagesByCarId(car.id!).pipe(
              map((imageResponse) => ({
                ...order,
                name: car.name,
                price: car.price,
                image: imageResponse.length > 0 ? imageResponse[0].image : null
              }))
            )
          })
        )
      })
    ).subscribe(
      (next) => {
      this.orders.update((array) => [...array, next])
    }
    )
  }
  
}
