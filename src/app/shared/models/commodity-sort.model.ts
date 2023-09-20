import { CommodityResponseModel } from "./commodity.model";

export class CommoditySortModel {
    fields: Array<FieldDetail>
}

export class FieldDetail {
    field: string;
    shopList: Array<ShopDetail>;
}

export class ShopDetail {
    shop: string;
    commodities: Array<CommodityResponseModel>;
}