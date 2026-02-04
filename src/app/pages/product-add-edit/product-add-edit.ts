import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatAnchor } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Product } from '../../services/product';
import { Core } from '../../services/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-add-edit',
  standalone: true,
  imports: [
    MatDialogModule,
    MatAnchor,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './product-add-edit.html',
  styleUrl: './product-add-edit.css',
})
export class ProductAddEdit implements OnInit {
  addProductForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private Pservice: Product,
    private dialogref: MatDialogRef<ProductAddEdit>,
    private snack: Core,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.addProductForm = this.fb.group({
      name:['' , [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
      price: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      category: ['', Validators.required],
    });
  }

  // validations
  get f(){
    return this.addProductForm.controls;
  }


  ngOnInit(): void {
    this.addProductForm.patchValue(this.data);
  }

  onFormSubmit() {
    if (this.addProductForm.valid) {
      if (this.data) {
        this.Pservice.update(this.data.id, this.addProductForm.value).subscribe({
          next: (val: any) => {
            console.log(val);
            
            this.snack.openSnackBar("Product Detail Updated !!")
            this.dialogref.close(true);
          },
          error: (err: any) => {
            console.error(err);
          },
        });
      } else {
        this.Pservice.add(this.addProductForm.value).subscribe({
          next: (val: any) => {

            this.snack.openSnackBar('Product Added Sucessfully !!')
            this.dialogref.close(true);
          },
          error: (err: any) => {
            console.error(err);
          },
        });
      }
    }
  }
}
