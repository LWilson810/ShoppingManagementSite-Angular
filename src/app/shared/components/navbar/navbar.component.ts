import { Component, OnInit } from '@angular/core';
import { AuthActionService } from '@app/auth/auth.service';
import { AuthService } from '@app/shared/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.less']
})
export class NavbarComponent implements OnInit {

  constructor(
    private authActionService: AuthActionService,
    private authService: AuthService,
    private router: Router,
  ) { }

  ngOnInit(): void {
  }

  signOut(): void {
    this.authActionService.signOut({userID: this.authService.getUserID()}).subscribe(response => {
      this.authService.reset();
      this.router.navigate(['/']);
    })
  }

}
