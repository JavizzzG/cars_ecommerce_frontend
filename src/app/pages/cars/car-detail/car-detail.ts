import { Component, inject, OnInit, signal } from '@angular/core';
import { CarDetailService } from '../../../core/Services/CarDetailService/car-detail-service';
import { ActivatedRoute, Router } from '@angular/router';
import CarComplete from '../../../core/Models/CarComplete';
import { switchMap, map } from 'rxjs'; // 1. Importar switchMap
import { CarService } from '../../../core/Services/CarService/car-service';
import { CarImageService } from '../../../core/Services/CarImageService/car-image-service';
import { NavbarNoAuth } from '../../../shared/components/navbars/navbar-no-auth/navbar-no-auth';

@Component({
  selector: 'app-car-detail',
  imports: [NavbarNoAuth],
  templateUrl: './car-detail.html',
  styleUrl: './car-detail.scss',
})
export class CarDetail implements OnInit {
  private route = inject(ActivatedRoute);
  private carService = inject(CarService);
  private carImageService = inject(CarImageService);
  private carDetailService = inject(CarDetailService);
  private router = inject(Router);
  
  // Signals inicializados
  carComplete = signal<CarComplete | null>(null);
  carImages = signal<string[]>([]);

  ngOnInit(): void {
  const carId = Number(this.route.snapshot.paramMap.get('id'));

  this.carService.getCarById(carId).pipe(
    switchMap((car) => {
      return this.carDetailService.getCarDetailsByCarId(car.id!).pipe(
        map((response: any) => {

          // 🛠️ FIX: Si es un array, tomamos la posición 0. Si es objeto, lo dejamos igual.
          const detailObj = Array.isArray(response) ? response[0] : response;

          return {
            ...car,
            ...detailObj
          };
        })
      );
    })
  ).subscribe({
    next: (fullData) => {
      this.carComplete.set(fullData as CarComplete);
    },
    error: (err) => console.error('Error cargando carro:', err)
  });

  // ... código de imágenes ...


    // ----------------------------------------------------
    // SOLUCIÓN 2: Carga de Imágenes Optimizada
    // ----------------------------------------------------
    this.carImageService.getCarImagesByCarId(carId).subscribe(
      (imagesData) => {
        // Mapeamos todo el array de una vez.
        // Evitamos hacer un bucle for con .set() adentro (renderiza muchas veces).
        const urls = imagesData.map(img => img.image);
        this.carImages.set(urls);
      }
    );
  }

  orderCar(id: number){
    this.router.navigate(['/new-order/', id]);
  }
}
