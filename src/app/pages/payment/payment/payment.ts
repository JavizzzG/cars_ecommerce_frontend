import { Component, inject, OnInit, signal } from '@angular/core';
import { BankService } from '../../../core/Services/BankService/bank-service';
import Bank from '../../../core/Models/Bank';
import { BankCardService } from '../../../core/Services/BankCardService/bank-card-service';
import BankCard from '../../../core/Models/BankCard';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { PaymentService } from '../../../core/Services/PaymentService/payment-service';
import PaymentInterface from "../../../core/Models/Payment";
import { ActivatedRoute, Router } from '@angular/router';
import { OrderService } from '../../../core/Services/OrderService/order-service';
import Order from '../../../core/Models/Order';
import { CarService } from '../../../core/Services/CarService/car-service';

@Component({
  selector: 'app-payment',
  imports: [ReactiveFormsModule],
  templateUrl: './payment.html',
  styleUrl: './payment.scss',
})
export class Payment implements OnInit {
  fb = inject(FormBuilder)
  bankService = inject(BankService)
  bankCardService = inject(BankCardService)
  paymentService = inject(PaymentService)
  router = inject(Router)
  activeRoute = inject(ActivatedRoute)
  orderService = inject(OrderService)

  bankCard= signal<BankCard>({} as BankCard);
  order = signal<Order>({} as Order);
  message = signal<string>("");

  paymentForm = this.fb.nonNullable.group({
    fkcodeBank: ["", Validators.required],
    status: ["", Validators.required],
    number: ["", [Validators.required, Validators.minLength(16), Validators.maxLength(16)]],
    cvc: ["", [Validators.required, Validators.minLength(3), Validators.maxLength(3)]],
    expire_date: ["", [Validators.required, Validators.minLength(5), Validators.maxLength(5)]]
  })

  ngOnInit(): void {
    this.orderService.getOrderById(Number(this.activeRoute.snapshot.paramMap.get('id'))).subscribe(
      (next) => {
        this.order.set(next);
      }
    )
  }

  handlePayment(){
    if(this.paymentForm.getRawValue().fkcodeBank == "002"){
      this.bankCardService.getBankCardByNumber(this.paymentForm.getRawValue().number).subscribe(
      (next) => {
        if(next.cvc == this.paymentForm.getRawValue().cvc && next.expire_date == this.paymentForm.getRawValue().expire_date){
          let pay: PaymentInterface = {
            fkidOrder: Number(this.activeRoute.snapshot.paramMap.get('id')),
            amount: this.order().amount,
            fkcodeBank: this.paymentForm.getRawValue().fkcodeBank,
            status: Number(this.paymentForm.getRawValue().status)
          }
          this.paymentService.createPayment(pay).subscribe(
            (next) => {
              this.message.set("Payment successfully")
              this.order().status = pay.status == 1 ? 1 : (pay.status == 2 ? 2 : 3);
              this.orderService.updateOrder(this.order().id!, this.order()).subscribe(
                () => {
                  this.router.navigate(['/order']);
                }
              )
            }
          )
          
        }else{
          this.message.set("Incorrect information")
        }
      },
      error => {
        this.message.set("Incorrect information")
      }
    )
    }else{
      this.message.set("This payment method is not supported")
    }
  }
}
