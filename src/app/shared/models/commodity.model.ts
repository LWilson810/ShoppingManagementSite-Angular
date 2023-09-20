export interface CommodityResponseModel {
    _id: string;
    name: string;
    price: number;
    description: string;
    field: string;
    shop: string;
    stock: number;
    remain: number;
    comment: Array<any>;
    figures: Array<any>;
}