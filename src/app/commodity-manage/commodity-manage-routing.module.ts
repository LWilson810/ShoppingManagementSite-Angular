import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import { CommodityManageComponent } from './layout/commodity-manage.component';

export const routes: Routes = [
    { path: '', component: CommodityManageComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class CommodityManageRoutingModule {
}
