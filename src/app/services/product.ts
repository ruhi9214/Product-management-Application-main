import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface ProductType {
  id: string;
  name: string;
  price: number;
  category: string;
}

@Injectable({
  providedIn: 'root',
})
export class Product {

  private product_api = environment.apiUrl + '/products';

  constructor(private http: HttpClient) {}

  getAll(): Observable<ProductType[]> {
    return this.http.get<ProductType[]>(this.product_api);
  }

  add(data: ProductType): Observable<ProductType> {
    return this.http.post<ProductType>(this.product_api, data);
  }

  update(id: string, data: ProductType): Observable<ProductType> {
    return this.http.put<ProductType>(`${this.product_api}/${id}`, data);
  }

  delete(id: any): Observable<void> {
    return this.http.delete<void>(`${this.product_api}/${id}`);
  }
}
