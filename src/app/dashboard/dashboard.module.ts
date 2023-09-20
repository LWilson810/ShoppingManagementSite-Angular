import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardTopbarComponent } from './dashboard-topbar/dashboard-topbar.component';
import { DashboardChartComponent } from './dashboard-chart/dashboard-chart.component';
import { DashboardComponent } from './layout/dashboard.component';
import { AmChartsModule } from '@amcharts/amcharts3-angular';
import { AuthActionService } from '@app/auth/auth.service';

@NgModule({
  declarations: [
    DashboardComponent,
    DashboardChartComponent,
    DashboardTopbarComponent,
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    RouterModule,
    AmChartsModule,
  ],
  providers: [
    AuthActionService,
  ]
})
export class DashboardModule { }
