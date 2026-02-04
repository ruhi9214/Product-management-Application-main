import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Auth } from './auth';

export interface ProductType {
  id: number;
  name: string;
  price: number;
  category: string;
  userId?: number;
}

@Injectable({
  providedIn: 'root',
})
export class Product {

  private product_api = environment.apiUrl + '/products';

  constructor(private http: HttpClient, private auth : Auth) {}

  getAll(): Observable<ProductType[]> {

    const USER = this.auth.getUser();

    if(USER.role === 'ADMIN'){  
        return this.http.get<ProductType[]>(this.product_api);
    }

       return this.http.get<ProductType[]>(
      `${this.product_api}?userId=${USER.id}`
    );
  
  }

  add(data: ProductType): Observable<ProductType> {

    const USER = this.auth.getUser();

  
    //stores only that particular id
       data.userId = Number(USER.id);
    return this.http.post<ProductType>(this.product_api, data);
  }

  update(id: any, data: ProductType): Observable<ProductType> {

    return this.http.patch<ProductType>(`${this.product_api}/${id}`, data);
  }

  delete(id: any): Observable<void> {
    return this.http.delete<void>(`${this.product_api}/${id}`);
  }
}
