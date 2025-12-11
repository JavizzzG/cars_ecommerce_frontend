import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Register } from './pages/auth/register/register';
import { Login } from './pages/auth/login/login';
import { Cars } from './pages/cars/cars/cars';
import { CarDetail } from './pages/cars/car-detail/car-detail';
import { NewCar } from './pages/cars/new-car/new-car';
import { Orders } from './pages/payment/orders/orders';
import { Payment } from './pages/payment/payment/payment';
import { NewOrder } from './pages/payment/new-order/new-order';

export const routes: Routes = [
    {path:"", component:Home},
    {path:"register", component:Register },
    {path:"login", component:Login},
    {path:"cars", component:Cars},
    {path:"car-detail/:id", component:CarDetail},
    {path:"new-car", component:NewCar},
    {path:"order", component:Orders},
    {path:"new-order/:id", component:NewOrder},
    {path:"payment", component:Payment}
    
];
