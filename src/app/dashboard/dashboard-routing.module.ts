import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import { DashboardComponent } from './layout/dashboard.component';

export const routes: Routes = [
    // {
        // path: '', component: SignInComponent, children: [
            { path: '', component: DashboardComponent },
        // ]
    // }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class DashboardRoutingModule {
}
