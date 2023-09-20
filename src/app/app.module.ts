//Basic Module
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {SvgIconSpriteModule} from 'ng-svg-icon-sprite';
import {ToastrModule} from 'ngx-toastr';
import {AppRoutingModule} from './app-routing.module';
import {LocalStorageModule} from 'angular-2-local-storage';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {TextMaskModule} from 'angular2-text-mask';

//AuthModule
// import {AuthenticationModule} from 'app/auth/auth.module';
import {ServicesModule} from 'app/shared/services/index';
//ChatModule
// import { ChatModule } from 'app/share/chat/chat.module';
//Redux Module
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {NgrxFormsModule} from 'ngrx-forms';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
//Basic Component
import {AppComponent} from './app.component';
import {metaReducers} from '@app/app.reducer';
import {MatSelectModule} from '@angular/material/select';
import { ChartModule } from 'angular2-chartjs';
// import { AmChartsModule } from '@amcharts/amcharts3-angular';
// import { ChartModule } from 'angular-highcharts';
// import { ChartsModule } from 'ng2-charts';

// import {TopBarComponent} from '@app/share/top-bar/top-bar.component'
// import {FooterComponent} from '@app/share/footer/footer.component'

import { from } from 'rxjs';
import { AuthComponent } from './auth/auth.component';
import { PipesModule } from './shared/pipes/pipes.module';
import { AuthActionService } from './auth/auth.service';
import { AuthGuard } from './shared/infrastructures/auth.guard';
import { LoginGuard } from './shared/infrastructures/login.guard';
// import { DashboardComponent } from './dashboard/dashboard.component';
// import { DashboardTopbarComponent } from './dashboard/dashboard-topbar/dashboard-topbar.component';
// import { DashboardChartComponent } from './dashboard/dashboard-chart/dashboard-chart.component';
// import { StaffManageComponent } from './staff-manage/staff-manage.component';
// import { StaffSortComponent } from './staff-manage/staff-sort/staff-sort.component';
// import { StaffListComponent } from './staff-manage/staff-list/staff-list.component';
// import { NavbarModule } from './shared/components/navbar/navbar.module';
// import { NavbarComponent } from './shared/components/navbar/navbar.component';
// import { CommodityManageComponent } from './commodity-manage/commodity-manage.component'; 
// import { CommoditySortComponent } from './commodity-manage/commodity-sort/commodity-sort.component'
// import { CommodityListComponent } from './commodity-manage/commodity-list/commodity-list.component';
// import { CommodityManageModule } from './commodity-manage/commodity-manage.module';

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    // DashboardComponent,
    // DashboardTopbarComponent,
    // DashboardChartComponent,
    // StaffManageComponent,
    // StaffSortComponent,
    // StaffListComponent,
    // NavbarComponent,
    // CommodityManageComponent,
    // CommoditySortComponent,
    // CommodityListComponent
    // TopBarComponent,
    // FooterComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({appId: 'ng-cli-universal'}),
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ChartModule,
    // PipesModule,
    // AmChartsModule,
    // NavbarModule,
    // CommodityManageModule,
    // ChartsModule,
    ReactiveFormsModule,
    SvgIconSpriteModule,
    NgbModule,
    MatSelectModule,
    ToastrModule.forRoot({
      closeButton: true
    }),
    LocalStorageModule.forRoot({
      prefix: 'ShopService',
      storageType: 'localStorage'
    }),
    StoreModule.forRoot({}, {
      metaReducers,
      runtimeChecks: {
        strictStateImmutability: false,
        strictActionImmutability: false,
      }
    }),
    EffectsModule.forRoot([]),
    NgrxFormsModule,
    StoreDevtoolsModule.instrument({
      maxAge: 25,
    }),
    TextMaskModule,
    AppRoutingModule,
    // AuthenticationModule,
    ServicesModule,
    // ChatModule
  ],
  exports: [
    ToastrModule
  ],
  providers: [
    AuthActionService,
    AuthGuard,
    LoginGuard,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
