import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import { LoginGuard } from './shared/infrastructures/login.guard';
import { AuthGuard } from './shared/infrastructures/auth.guard';
// import { SignInComponent } from './auth/sign-in/sign-in.component';

const routes: Routes = [
  {
    path:'',
    // component: SignInComponent
    canActivate: [LoginGuard],
    loadChildren: () => import('app/auth/auth.module').then(m => m.AuthModule)
  },
  {
    canActivate: [AuthGuard],
    path:'dashboard',
    loadChildren: () => import('app/dashboard/dashboard.module').then(m => m.DashboardModule)
  },
  {
    path:'staff-manage',
    // canActivate: [AuthGuard],
    loadChildren: () => import('app/staff-manage/staff-manage.module').then(m => m.StaffManageModule)
  },
  {
    path:'commodity-manage',
    canActivate: [AuthGuard],
    loadChildren: () => import('app/commodity-manage/commodity-manage.module').then(m => m.CommodityManageModule)
  },
  {
    path:'transfer-eth',
    canActivate: [AuthGuard],
    loadChildren: () => import('app/transfer-eth/transfer-eth.module').then(m => m.TransferEthModule)
  }
];
@NgModule({
  imports: [RouterModule.forRoot(routes, {
    onSameUrlNavigation: 'reload'
  })],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
