
import { Component, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { OrderService } from '../../../core/Services/OrderService/order-service';
import OrderInterface from '../../../core/Models/Order';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../../core/Services/UserService/user-service';
import { CarService } from '../../../core/Services/CarService/car-service';
import Car from '../../../core/Models/Car';

@Component({
  selector: 'app-new-order',
  imports: [ReactiveFormsModule],
  templateUrl: './new-order.html',
  styleUrl: './new-order.scss',
})
export class NewOrder implements OnInit {
  fb = inject(FormBuilder)
  orderService = inject(OrderService)
  carService = inject(CarService)
  userService = inject(UserService)
  private route = inject(ActivatedRoute);

  car = signal<Car>({} as Car);

  message = signal<string>("");

  newOrderForm = this.fb.nonNullable.group({
    address: ['', Validators.required],
    phone: ['', Validators.required],
  })

  ngOnInit(): void {
    this.carService.getCarById(Number(this.route.snapshot.paramMap.get('id'))).subscribe(
      (next) => {
        this.car.set(next);
      },
      (error) => {
        this.message.set("Error fetching car details");
      }
    );

  }

  handleOrder() {
    const orderData = this.newOrderForm.getRawValue();
    let order: OrderInterface = {
      fkidUser: this.userService.getUser()!.id!,
      fkidCar: Number(this.route.snapshot.paramMap.get('id')),
      amount: this.car().price,
      date: new Date(),
      address: orderData.address,
      phone: orderData.phone,
      status: 4 // Unpaid
    }

    this.orderService.createOrder(order).subscribe(
      (next) => {
        this.message.set("Order created successfully");
        this.newOrderForm.reset();
      },
      (error) => {
        this.message.set("Error creating order");
      }
    );
  }
}
