import { Component, OnInit, Input } from '@angular/core';
import { FieldModel } from '@app/shared/models/field.model';
import { MyFieldInfo } from '../models/myFieldInfo.model';
import { CommodityManageActionService } from '../commodity-manage.service';
import { CommodityResponseModel } from '@app/shared/models/commodity.model';
import { Subscription } from 'rxjs';
import { CommoditySortModel } from '@app/shared/models/commodity-sort.model';

import {Config} from '../../../../api/config';

@Component({
  selector: 'commodity-list',
  templateUrl: './commodity-list.component.html',
  styleUrls: ['./commodity-list.component.less']
})
export class CommodityListComponent implements OnInit {

  @Input() fields_shops: Array<FieldModel>;
  @Input() myFieldInfo: MyFieldInfo;
  @Input() commodities: Array<CommodityResponseModel>;
  @Input() field: string;
  @Input() shop: string;
  // commoditySubscription: Subscription;
  sortedCommodities: CommoditySortModel = new CommoditySortModel();
  serverURL = Config.serverUrl;
  
  constructor(
    private commodityManageActionService: CommodityManageActionService
  ) { 
  }

  ngOnInit(): void {
    // this.commoditySubscription = this.commodityManageActionService.getObservable().subscribe(commodity => {
    //   this.commodities.push(commodity);
    //   console.log(this.commodities);
    // })
  }
}
