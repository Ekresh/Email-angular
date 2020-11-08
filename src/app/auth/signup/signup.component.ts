import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { MatchPassword } from '../validators/match-password';
import { UniqeUsername } from '../validators/uniqe-username';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  
  signupForm = new FormGroup({
    username: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(20),
      Validators.pattern(/^[a-z0-9]+$/)
    ],
    [this.uniqeUsername.validate]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(20),
    ]),
    passwordConfirmation: new FormControl('', [
      Validators.required,
    ])
  }, { validators: [this.matchPassword.validate]});

  errorOrSuccessText = '';
  isErrorOrsuccess = false;
  buttonDisabled = false;

  constructor(
    private matchPassword: MatchPassword,
    private uniqeUsername: UniqeUsername,
    private authService: AuthService,
    private router: Router,
  ) { }

  ngOnInit(): void {
  }

  get passwordDontMatchError() {
    return ( 
      (this.signupForm.get('passwordConfirmation').dirty) 
      || 
      (this.signupForm.get('passwordConfirmation').touched && this.signupForm.get('passwordConfirmation').value === '') 
    ) 
      && this.signupForm.errors?.passwordDontMatch;
  }

  onCreateAccount() {
    this.isErrorOrsuccess = false;
    this.buttonDisabled = true;
    if (this.signupForm.invalid) {
      return;
    }
    this.authService.signup(this.signupForm.value).subscribe({
      next: response => {
        this.router.navigateByUrl('');
      },
      error: err => {        
        this.isErrorOrsuccess = true;
        this.buttonDisabled = false;
        if (err.error) {
          Object.values(err.error).forEach((singlError:string) => this.errorOrSuccessText = singlError);
        }
        if (err.status === 0) {
          // this.signupForm.setErrors({ noInternetConnection: true });
          this.errorOrSuccessText = 'No internet connection';
        }
      },
    });
  }

}
