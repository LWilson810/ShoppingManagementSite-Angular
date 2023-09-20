import { Component, OnInit } from '@angular/core';
import { AuthService } from '@app/shared/services/auth.service';
import { Router } from '@angular/router';
import { AuthActionService } from '@app/auth/auth.service';
@Component({
  selector: 'dashboard-topbar',
  templateUrl: './dashboard-topbar.component.html',
  styleUrls: ['./dashboard-topbar.component.less']
})



export class DashboardTopbarComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private router: Router,
    private authActionService: AuthActionService
  ) { }

  ngOnInit(): void {
  }

  signOut(): void {
    const data = { userID: this.authService.getUserID() };
    this.authActionService.signOut(data).subscribe((response) => {
      this.authService.reset();
      this.router.navigate(['/']);
    });
  }

}
