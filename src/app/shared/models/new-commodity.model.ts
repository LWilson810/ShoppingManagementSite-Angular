export class NewCommodity {
    public name: string;
    public field:string;
    public shop:string;
    public price:number;
    public stock:number;
    public description:string;
    public figures: any;
  
    constructor( commodityInfo: any ) {
      this.name = commodityInfo.name;
      this.field = commodityInfo.field;
      this.shop = commodityInfo.shop;
      this.price = commodityInfo.price;
      this.stock = commodityInfo.stock;
      this.description = commodityInfo.description;
      this.figures = commodityInfo.figures;
    }
}
    
