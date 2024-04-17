import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { single } from 'rxjs';
import { InputComponent } from '../../shared/input/input.component';
import {
  AuthService,
  SignInCredentials,
  SignupCredentials,
} from '../auth.service';
import { JsonPipe, NgIf } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [ReactiveFormsModule, InputComponent, NgIf, JsonPipe],
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.scss',
})
export class SigninComponent {
  authForm = new FormGroup({
    username: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(20),
      Validators.pattern(/^[a-zA-Z0-9]+$/),
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(20),
    ]),
  });

  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  onSubmit() {
    if (this.authForm.invalid) {
      return;
    }
    this.authService
      .signin(this.authForm.value as SignInCredentials)
      .subscribe({
        next: () => {
          this.router.navigate(['/inbox']);
        },
        error: ({ error }) => {
          if (error.username || error.password) {
            this.authForm.setErrors({ credentials: true });
          }
        },
      });
  }
}
