import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Login } from './pages/login/login';
import { ProductList } from './pages/product-list/product-list';


@Component({
  selector: 'app-root',
  standalone:true,
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('product-management');
}
