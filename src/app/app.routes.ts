import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Register } from './pages/auth/register/register';
import { Login } from './pages/auth/login/login';

export const routes: Routes = [
    {path:"", component:Home},
    {path:"register", component:Register },
    {path:"login", component:Login}
];
