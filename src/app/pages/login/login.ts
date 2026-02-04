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
  selector: 'app-login',
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
    RouterModule,
  ],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  loading = false;

  form!: any;

  hide = true;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private snack: MatSnackBar,
    private Authservice: Auth,
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  togglePassword() {
    this.hide = !this.hide;
  }

  login() {
    if (this.form.invalid) return;

    this.loading = true;

    const { email, password } = this.form.value;

    this.Authservice.login(email!, password!).subscribe((res) => {
      this.loading = false;

      if (res.length) {
        this.Authservice.saveUser(res[0]);

        const isAdmin = this.Authservice.isAdmin(); //check role

        this.snack.open('Login successful ✅', 'Close', { duration: 2000 });

        this.router.navigate(['product-list']);
      } else {
        this.snack.open('Invalid email or password ❌', 'Close', { duration: 3000 });
      }
    });
  }
}
