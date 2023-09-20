import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import { StaffManageComponent } from './layout/staff-manage.component';

export const routes: Routes = [
    { path: '', component: StaffManageComponent },      
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class StaffManageRoutingModule {
}
