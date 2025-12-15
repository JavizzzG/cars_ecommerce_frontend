import { Component, inject, OnInit, signal } from '@angular/core';
import { OrderService } from '../../../core/Services/OrderService/order-service';
import { CarService } from '../../../core/Services/CarService/car-service';
import { from, map, mergeMap } from 'rxjs';
import { CarImageService } from '../../../core/Services/CarImageService/car-image-service';
import OrderComplete from '../../../core/Models/OrderComplete';
import { Router } from '@angular/router';
import { UserService } from '../../../core/Services/UserService/user-service';

@Component({
  selector: 'app-orders',
  imports: [],
  templateUrl: './orders.html',
  styleUrl: './orders.scss',
})
export class Orders implements OnInit{
  orderService = inject(OrderService);
  carService = inject(CarService)
  carImageService = inject(CarImageService)
  userService = inject(UserService)
  orders = signal<OrderComplete[]>([]);
  private router = inject(Router);
  userId = this.userService.getUser()!.id!;

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

  goToPayment(id: number){
    return this.router.navigate(["/payment/", id])
  }
  
}
