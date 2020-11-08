import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  isSignedIn$: BehaviorSubject<boolean>

  constructor(private authService: AuthService) {
    this.isSignedIn$ = this.authService.isSignedIn$;
  }

  ngOnInit(): void {
  }

}
