import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddCommodityComponent } from '../add-commodity/add-commodity.component';
import { CommodityManageActionService } from '../commodity-manage.service';
import { AuthService } from '@app/shared/services/auth.service';
import { FieldModel } from '@app/shared/models/field.model';
import { MyFieldInfo } from '../models/myFieldInfo.model';
import { CommodityResponseModel } from '@app/shared/models/commodity.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'commodity-manage',
  templateUrl: './commodity-manage.component.html',
  styleUrls: ['./commodity-manage.component.less']
})

export class CommodityManageComponent implements OnInit {

  commoditySubscription: Subscription;
  constructor(
    private modalService: NgbModal,
    private commodityManageActionService: CommodityManageActionService,
    private authService: AuthService,
  ) { }

  fields_shops: Array<FieldModel>;
  myAuthority: string;
  myField: string;
  myShop: string;
  myFieldInfo: any;
  commodities: Array<CommodityResponseModel>
  field: string;
  shop: string;
  ngOnInit(): void {
    window.scrollTo(0,0);
    this.commoditySubscription = this.commodityManageActionService.getObservable().subscribe(commodity => {
      this.commodities = this.commodities.concat(commodity);
      console.log(this.commodities);
    })
    this.commodityManageActionService.getFields().subscribe((response) => {
      this.fields_shops = response;
      // console.log(this.fields_shops);
    })
    this.myFieldInfo = new MyFieldInfo(this.authService.getAuthority(), this.authService.getField(), this.authService.getShop());
    this.commodityManageActionService.getCommodities(this.myFieldInfo).subscribe((response) => {
      this.commodities = response;
      // console.log(this.commodities);
    })
    // console.log(this.myFieldInfo);
  }

  addCommodity(): void {
    const options: any = {
      backdrop: true,
      size: '60vw',
      centered: true,
      keyboard: true,
    }
    const modalRef = this.modalService.open(AddCommodityComponent, options);
    
    modalRef.componentInstance.fields_shops = this.fields_shops;
    modalRef.componentInstance.myFieldInfo = this.myFieldInfo;
  }

  changeField(value): void {
    this.field = value;
  }

  changeShop(value): void {
    this.shop = value;
  }

  onAddField(value): void {
    this.fields_shops = value
  }

  onAddShop(value): void {
    this.fields_shops = value
  }

}
