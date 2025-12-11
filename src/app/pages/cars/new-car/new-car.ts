import { Component, inject, signal} from '@angular/core';
import { NavbarNoAuth } from '../../../shared/components/navbars/navbar-no-auth/navbar-no-auth';
import { FormBuilder, ReactiveFormsModule, Validators, ValueChangeEvent } from '@angular/forms';
import { CarService } from '../../../core/Services/CarService/car-service';
import { CarDetailService } from '../../../core/Services/CarDetailService/car-detail-service';
import Car from '../../../core/Models/Car';
import CarDetail from '../../../core/Models/CarDetail';
import { CarImageService } from '../../../core/Services/CarImageService/car-image-service';
import CarImage from '../../../core/Models/CarImage';

@Component({
  selector: 'app-new-car',
  imports: [NavbarNoAuth, ReactiveFormsModule],
  templateUrl: './new-car.html',
  styleUrl: './new-car.scss',
})
export class NewCar {
  message= signal<string>("");
  fb = inject(FormBuilder)
  carService = inject(CarService)
  carDetailService = inject(CarDetailService)
  carImageService = inject(CarImageService)


  carForm = this.fb.nonNullable.group({
    name: ["", [Validators.required, Validators.maxLength(100)]],
    model: ["", [Validators.required, Validators.maxLength(100)]],
    year: ["", [Validators.required, Validators.maxLength(4)]],
    fkidBrand: [0, [Validators.required, Validators.min(1)]],
    price: [0, [Validators.required, Validators.min(0.1)]],
    for_sale: [true, [Validators.required]],
    door: ["", [Validators.required]],
    seat: ["", [Validators.required]],
    motor: ["", [Validators.required, Validators.maxLength(20)]],
    hp: [0, [Validators.required, Validators.min(1)]],
    km: [0, [Validators.required, Validators.min(0)]],
    max_velocity: [0, [Validators.required, Validators.min(0)]],
    torque: [0, [Validators.required, Validators.min(0)]],
    fuel: [0, [Validators.required, Validators.min(1)]],
    hybrid: [0, [Validators.required]],
    autonomy: [0, [Validators.required, Validators.min(0)]],
    brake: [0, [Validators.required, Validators.min(1)]],
    modified: [0, [Validators.required]],
    description: ["", [Validators.maxLength(255)]],
    image: [""],
  })

  handleCarSubmit(){
    let carToService: Car = {
      name: this.carForm.getRawValue().name,
      model: this.carForm.getRawValue().model,
      year: this.carForm.getRawValue().year,
      fkidBrand: this.carForm.getRawValue().fkidBrand,
      price: this.carForm.getRawValue().price,
      for_sale: this.carForm.getRawValue().for_sale,
      fkidUser: 1
    }
    this.carService.createCar(carToService).subscribe({
      next: (car) => {
        let carCompleteToService: CarDetail = {
          fkidCar: car.id!,
          door: this.carForm.getRawValue().door,
          seat: this.carForm.getRawValue().seat,
          motor: this.carForm.getRawValue().motor,
          hp: this.carForm.getRawValue().hp,
          km: this.carForm.getRawValue().km,
          max_velocity: this.carForm.getRawValue().max_velocity,
          torque: this.carForm.getRawValue().torque,
          fuel: this.carForm.getRawValue().fuel,
          hybrid: this.carForm.getRawValue().hybrid,
          autonomy: this.carForm.getRawValue().autonomy,
          brake: this.carForm.getRawValue().brake,
          modified: this.carForm.getRawValue().modified,
          description: this.carForm.getRawValue().description,
        }
        this.carDetailService.createCarDetail(carCompleteToService).subscribe({
          next: (carComplete) => {
            this.message.set("Car created succesfully")
            let imageToService: CarImage = {
          fkidCar: car.id!,
          image: this.carForm.getRawValue().image!
        }
        this.carImageService.createCarImage(imageToService).subscribe()
          }
        })

        
      },
      error: (err) => {
        this.message.set("Car not created" + err)

      }}
    )
  }

}

