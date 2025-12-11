import { Component, inject, OnInit, signal } from '@angular/core';
import { BankService } from '../../../core/Services/BankService/bank-service';
import Bank from '../../../core/Models/Bank';
import { NavbarNoAuth } from '../../../shared/components/navbars/navbar-no-auth/navbar-no-auth';
import { BankCardService } from '../../../core/Services/BankCardService/bank-card-service';
import BankCard from '../../../core/Models/BankCard';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { PaymentService } from '../../../core/Services/PaymentService/payment-service';
import PaymentInterface from "../../../core/Models/Payment";

@Component({
  selector: 'app-payment',
  imports: [NavbarNoAuth, ReactiveFormsModule],
  templateUrl: './payment.html',
  styleUrl: './payment.scss',
})
export class Payment{
  fb = inject(FormBuilder)
  bankService = inject(BankService)
  bankCardService = inject(BankCardService)
  paymentService = inject(PaymentService)

  banks = signal<Bank[]>([]);
  bankCard= signal<BankCard>({} as BankCard);
  message = signal<string>("");

  paymentForm = this.fb.nonNullable.group({
    fkidOrder: [0, Validators.required],
    amount: [0, Validators.required],
    fkcodeBank: ["", Validators.required],
    status: [2, Validators.required],
    number: ["", [Validators.required, Validators.minLength(16), Validators.maxLength(16)]],
    cvc: ["", [Validators.required, Validators.minLength(3), Validators.maxLength(3)]],
    expire_date: ["", [Validators.required, Validators.minLength(5), Validators.maxLength(5)]]
  })

  handlePayment(){
    if(this.paymentForm.getRawValue().fkcodeBank == "002"){
      this.bankCardService.getBankCardByNumber(this.paymentForm.getRawValue().number).subscribe(
      (next) => {
        if(next.cvc == this.paymentForm.getRawValue().cvc && next.expire_date == this.paymentForm.getRawValue().expire_date){
          let pay: PaymentInterface = {
            fkidOrder: this.paymentForm.getRawValue().fkidOrder,
            amount: this.paymentForm.getRawValue().amount,
            fkcodeBank: this.paymentForm.getRawValue().fkcodeBank,
            status: this.paymentForm.getRawValue().status
          }
          this.paymentService.createPayment(pay).subscribe(
            (next) => {
              this.message.set("Payment successfully")
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

  bank(): void{

    this.bankService.getAllBanks().subscribe(
      (next) => {
        this.banks.update((banks) => [...banks, ...next]);
      }
    )
  }
}
