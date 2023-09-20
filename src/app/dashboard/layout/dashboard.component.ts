import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.less']
})
export class DashboardComponent implements OnInit {

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
    window.scrollTo(0,0);
  }

  goToStaffManage(): void {
    this.router.navigate(['/staff-manage']);
  }

  goToCommodityManage(): void {
    this.router.navigate(['/commodity-manage']);
  }
}
