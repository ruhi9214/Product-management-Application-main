import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Router, RouterModule } from '@angular/router';
import { Auth } from '../../services/auth';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatSnackBarModule,
    MatIconModule,
    MatProgressSpinnerModule,
    RouterModule 
  ],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class Register {

  hidePassword = true;
  loading = false;
  registerForm: any;

  constructor(
    private fb: FormBuilder,
    private snack: MatSnackBar,
    private router: Router,
    private authService: Auth
  ) {}

  ngOnInit() {
    this.registerForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  togglePassword() {
    this.hidePassword = !this.hidePassword;
  }

  register() {
    if (this.registerForm.invalid) return;

    this.loading = true;
    const userData = this.registerForm.value;

    this.authService.register(userData).subscribe({
      next: (res:any) => {
        this.loading = false;
        this.snack.open('Registration Successful ✅', 'Close', { duration: 2000 });
        this.router.navigate(['/login']); 
      },
      error: (err:any) => {
        this.loading = false;
        console.error(err);
        this.snack.open('Registration Failed ❌', 'Close', { duration: 3000 });
      }
    });
  }
}
