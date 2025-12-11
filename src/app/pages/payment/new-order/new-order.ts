
import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { NavbarNoAuth } from '../../../shared/components/navbars/navbar-no-auth/navbar-no-auth';
import { OrderService } from '../../../core/Services/OrderService/order-service';
import OrderInterface from '../../../core/Models/Order';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-new-order',
  imports: [NavbarNoAuth, ReactiveFormsModule],
  templateUrl: './new-order.html',
  styleUrl: './new-order.scss',
})
export class NewOrder {
  fb = inject(FormBuilder)
  orderService = inject(OrderService)
  private route = inject(ActivatedRoute);

  message = signal<string>("");

  newOrderForm = this.fb.nonNullable.group({
    fkidUser: [0, Validators.required],
    amount: [0, Validators.required],
    date: ['', Validators.required],
    address: ['', Validators.required],
    phone: ['', Validators.required],
    status: [2, Validators.required]
  })

  handleOrder() {
    const orderData = this.newOrderForm.getRawValue();
    let order: OrderInterface = {
      fkidUser: orderData.fkidUser,
      fkidCar: Number(this.route.snapshot.paramMap.get('id')),
      amount: orderData.amount,
      date: new Date(orderData.date),
      address: orderData.address,
      phone: orderData.phone,
      status: orderData.status
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
