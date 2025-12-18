import { Component, inject, OnInit, signal} from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators, ValueChangeEvent } from '@angular/forms';
import { CarService } from '../../../core/Services/CarService/car-service';
import { CarDetailService } from '../../../core/Services/CarDetailService/car-detail-service';
import Car from '../../../core/Models/Car';
import CarDetail from '../../../core/Models/CarDetail';
import { CarImageService } from '../../../core/Services/CarImageService/car-image-service';
import CarImage from '../../../core/Models/CarImage';
import { UserService } from '../../../core/Services/UserService/user-service';
import Brand from '../../../core/Models/Brand';
import { BrandService } from '../../../core/Services/BrandService/brand-service';

@Component({
  selector: 'app-new-car',
  imports: [ReactiveFormsModule],
  templateUrl: './new-car.html',
  styleUrl: './new-car.scss',
})
export class NewCar implements OnInit {
  message= signal<string>("");
  fb = inject(FormBuilder)
  carService = inject(CarService)
  carDetailService = inject(CarDetailService)
  carImageService = inject(CarImageService)
  userService = inject(UserService)
  brandService = inject(BrandService)

  brands = signal<Brand[]>([]);

  ngOnInit(): void {
    this.brandService.getAllBrands().subscribe(
      (next) => {
        this.brands.set(next);
      }
    )
  }


  carForm = this.fb.nonNullable.group({
    name: ["", [Validators.required, Validators.maxLength(100)]],
    model: ["", [Validators.required, Validators.maxLength(100)]],
    year: ["", [Validators.required, Validators.maxLength(4), Validators.minLength(4)]],
    fkidBrand: ["", [Validators.required]],
    price: [0, [Validators.required, Validators.min(0.1)]],
    for_sale: ["", [Validators.required]],
    door: [""],
    seat: [""],
    motor: ["", Validators.maxLength(20)],
    hp: [0, [Validators.required, Validators.min(1)]],
    km: [0, [Validators.required, Validators.min(0)]],
    max_velocity: [0, [Validators.required, Validators.min(0)]],
    torque: [0, [Validators.required, Validators.min(0)]],
    fuel: ["", [Validators.required, Validators.min(1)]],
    hybrid: ["", [Validators.required]],
    autonomy: [0, [Validators.required, Validators.min(0)]],
    brake: ["", [Validators.required, Validators.min(1)]],
    modified: ["", [Validators.required]],
    description: ["", [Validators.maxLength(255)]],
    image: [""],
  })

  handleCarSubmit(){
    let carToService: Car = {
      name: this.carForm.getRawValue().name,
      model: this.carForm.getRawValue().model,
      year: this.carForm.getRawValue().year,
      fkidBrand: Number(this.carForm.getRawValue().fkidBrand),
      price: this.carForm.getRawValue().price,
      for_sale: this.carForm.getRawValue().for_sale == "1" ? true : false,
      fkidUser: this.userService.getUser()!.id!
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
          fuel: Number(this.carForm.getRawValue().fuel),
          hybrid: this.carForm.getRawValue().hybrid == "1" ? 1 : 0,
          autonomy: this.carForm.getRawValue().autonomy,
          brake: Number(this.carForm.getRawValue().brake),
          modified: this.carForm.getRawValue().modified == "1" ? 1 : 0,
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
          this.carForm.reset();
          }
        })

        
      },
      error: (err) => {
        this.message.set("Car not created" + err)

      }}
    )
  }

  

}

