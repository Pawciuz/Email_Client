import { AbstractControl, AsyncValidator, FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';
import { error } from '@angular/compiler-cli/src/transformers/util';
import { AuthService } from '../auth.service';

@Injectable({ providedIn: 'root' })
export class UniqueUsername implements AsyncValidator {
  constructor(
    private http: HttpClient,
    private authService: AuthService,
  ) {}

  validate = (control: AbstractControl) => {
    const { value } = control;
    return this.authService.usernameAvailable(value).pipe(
      map((value) => {
        return null;
      }),
      catchError((err) => {
        if (err.error.username) {
          return of({ nonUniqueUsername: true });
        } else {
          return of({ noConnection: true });
        }
      }),
    );
  };
}
