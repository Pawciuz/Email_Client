import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatchPassword } from '../validators/match-password';
import { JsonPipe, NgIf } from '@angular/common';
import { UniqueUsername } from '../validators/unique-username';
import { HttpClientModule } from '@angular/common/http';
import { InputComponent } from '../../shared/input/input.component';
import { AuthService, SignupCredentials } from '../auth.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    JsonPipe,
    HttpClientModule,
    InputComponent,
    NgIf,
  ],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss',
})
export class SignupComponent {
  authForm = new FormGroup(
    {
      username: new FormControl(
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(20),
          Validators.pattern(/^[a-zA-Z0-9]+$/),
        ],
        [this.uniqueUsername.validate],
      ),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(20),
      ]),
      passwordConfirmation: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(20),
      ]),
    },
    { validators: [this.matchPassword.validate] },
  );

  constructor(
    private matchPassword: MatchPassword,
    private uniqueUsername: UniqueUsername,
    private authService: AuthService,
    private router: Router,
  ) {}

  onSubmit() {
    if (this.authForm.invalid) {
      return;
    }
    this.authService
      .signup(this.authForm.value as SignupCredentials)
      .subscribe({
        next: (response) => {
          this.router.navigate(['/inbox']);
        },
        error: (err) => {
          if (!err.status) {
            this.authForm.setErrors({ noConnection: true });
          } else {
            this.authForm.setErrors({ unknownError: true });
          }
        },
      });
  }
}
