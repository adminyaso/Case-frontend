import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerForm: FormGroup;
  errorMessage: string = '';
  successMessage: string = '';

  constructor(private fb: FormBuilder,
              private authService: AuthService,
              private router: Router) {
    this.registerForm = this.fb.group({
      username: ['', Validators.required, Validators.minLength(3)],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit(): void {
    if (this.registerForm.invalid) return;
    
    const { username, password } = this.registerForm.value;
    this.authService.register(username, password).subscribe({
      next: (res) => {
        console.log('Registration successful:', res);
        this.successMessage = 'Kayıt başarılı, lütfen login olun.';
        this.router.navigate(['/login']);
      },
      error: (err) => {
        console.error('Registration error:', err);
        // err.error'nin description'ı alma
        if (err.error && Array.isArray(err.error) && err.error.length > 0) {
          this.errorMessage = err.error[0].description;
        }
      }
    });
  }
  
}
