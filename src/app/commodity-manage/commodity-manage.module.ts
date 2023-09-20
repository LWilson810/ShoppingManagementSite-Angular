import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { CommodityManageRoutingModule } from './commodity-manage-routing.module';
import { CommoditySortComponent } from './commodity-sort/commodity-sort.component';
import { CommodityListComponent } from './commodity-list/commodity-list.component';
import { AddCommodityComponent } from './add-commodity/add-commodity.component';
import { CommodityManageComponent } from './layout/commodity-manage.component';
import { ShareModule } from '@app/shared/share.module';
import { CommodityManageActionService } from './commodity-manage.service';
import { PipesModule } from '@app/shared/pipes/pipes.module';


@NgModule({
 
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CommodityManageRoutingModule,
    ShareModule,
    PipesModule
  ],
  exports: [RouterModule],
  declarations: [
    CommoditySortComponent,
    CommodityListComponent,
    AddCommodityComponent,
    CommodityManageComponent,
  ],

  providers: [
    CommodityManageActionService
  ]

})
export class CommodityManageModule { }
