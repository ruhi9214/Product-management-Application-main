import { AfterViewInit, Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ProductAddEdit } from '../product-add-edit/product-add-edit';
import { Product } from '../../services/product';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { Core } from '../../services/core';
import { Auth } from '../../services/auth'
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';



@Component({
  selector: 'app-product-list',
  standalone:true,
  imports: [
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    MatTableModule,
    MatInputModule,
    MatPaginatorModule,
    MatSortModule,
    CommonModule,
    RouterLink
],
  templateUrl: './product-list.html',
  styleUrl: './product-list.css',
})
export class ProductList implements OnInit {

  displayedColumns: string[] = ['id', 'name', 'price', 'category', 'Action'];
  dataSource! : MatTableDataSource<any>
  @ViewChild(MatPaginator) paginator! : MatPaginator;
  @ViewChild(MatSort) sort! : MatSort;

    constructor(private dialog : MatDialog, 
      private Pservice : Product,
     private snack : Core,
     public auth : Auth,
     private router : Router
    ){}

    ngOnInit(): void {
      this.getAllProductList()
    }

  openAddEditProductForm(){
   const dialogRef =  this.dialog.open(ProductAddEdit)
   dialogRef.afterClosed().subscribe({
    next:(val)=>{
      if(val){
        this.getAllProductList()
      }
    }
   })
  }

  getAllProductList(){
    this.Pservice.getAll().subscribe({
      next:(res:any)=>{
        this.dataSource = new MatTableDataSource(res)
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        
      },
      error:(err)=>{
        console.log(err)
      }
    })
  }

    
 

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

   
  }

  deleteProduct(id:number){

    const isConfirm = confirm('Are you sure you want to delete this product?')

    if(!isConfirm) return ; //stop

    this.Pservice.delete(id).subscribe({
      next:()=>{
        this.snack.openSnackBar('Product delete sucessfully !!')
        this.getAllProductList()
      },
      error:(err)=>{
        console.log(err);
        
      }
    })
  }

    openEditForm(data:any){
   const dialogRef = this.dialog.open(ProductAddEdit,{
    data,
   })

    dialogRef.afterClosed().subscribe({
    next:(val)=>{
      if(val){
        this.getAllProductList()
      }
    }
   })
 
  }

  logout(){
    this.auth.logout();
    this.router.navigate(['login'])
  }

}


