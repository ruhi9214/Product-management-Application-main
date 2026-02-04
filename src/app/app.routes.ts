import { Routes } from '@angular/router';
import { Login } from './pages/login/login';
import { ProductList } from './pages/product-list/product-list';
import { authGuard } from './guards/auth-guard-guard';
import { Register } from './pages/register/register';
import { Admin } from './pages/admin/admin';
import { roleGuard } from './guards/role-guard';


export const routes: Routes = [
  //login
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: Login },
  {path : 'register', component: Register},
  { path: 'product-list', component: ProductList, canActivate: [authGuard] },
  {path : 'admin', component:Admin, canActivate: [authGuard, roleGuard] , data:{role: 'ADMIN'}}
];
