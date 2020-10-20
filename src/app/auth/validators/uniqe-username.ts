import { Injectable } from '@angular/core';
import { AsyncValidator, FormControl } from '@angular/forms';
import { of } from 'rxjs';
import { AuthService } from '../auth.service';
import { catchError, map } from 'rxjs/operators'

@Injectable({ providedIn: 'root' })

export class UniqeUsername implements AsyncValidator {

    constructor(
        private authService: AuthService
    ) {}

    validate = (control : FormControl) => {
        const { value } = control;
        return this.authService.isUsernameUniqe(value)
        .pipe(
            map(() => null),
            catchError(({ error }) => {
                if (error.username) {
                    return of({ nonUniqeUsername: true });
                } else {
                    return of({ noInternetConnection: true })
                }
            })
        )
        
    }
}
