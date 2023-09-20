import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NotificationService } from '../../shared/services/notification.service';
import { CommodityManageActionService } from '../commodity-manage.service';
import { FieldModel } from '@app/shared/models/field.model';

@Component({
  selector: 'commodity-sort',
  templateUrl: './commodity-sort.component.html',
  styleUrls: ['./commodity-sort.component.less']
})
export class CommoditySortComponent implements OnInit {

  @Input() fields_shops: Array<FieldModel>; 
  @Input() myFieldInfo: any;
  @Output() changeField: EventEmitter<string> = new EventEmitter<string>();
  @Output() changeShop: EventEmitter<string> = new EventEmitter<string>();
  @Output() onAddField: EventEmitter<Object> = new EventEmitter<Object>();
  @Output() onAddShop: EventEmitter<Object> = new EventEmitter<Object>();
  formgroup: FormGroup;

  isAddNewField: boolean = false;
  isAddNewShop: boolean = false;
  field: string = 'all';
  shop: string = 'all';
  // fields_shops: Array<FieldModel>;

  selected_field: FieldModel;
  shops: any;

  // newField: string;
  // newShop: string;

  constructor(
    private fb: FormBuilder,
    private notification: NotificationService,
    private commodityManageActionService: CommodityManageActionService
  ) { 
    this.formgroup = this.fb.group({
      newField: ['', Validators.required],
      newShop: ['', Validators.required],
      field:['all'],
      shop:['all']
    })
  }

  

  ngOnInit(): void {
    // console.log(this.myFieldInfo);
  }

  addField(): void {
    this.isAddNewField = true;
  }

  addShop(): void {
    this.isAddNewShop = true;
  }

  onChangeField(ev): void {
    this.field = ev.target.value;
    if( ev.target.value == 'all') {
      this.changeField.emit("");
      this.changeShop.emit("");
      this.shop  = ev.target.value;
    }
    else 
      this.changeField.emit(ev.target.value);
    if(ev.target.value != "all")
      this.shops = this.fields_shops.filter(item => item.field == ev.target.value)[0].shopList;
  }

  onChangeShop(ev): void {
    this.shop = ev.target.value;
    if( ev.target.value == 'all')
      this.changeShop.emit("");
    else 
      this.changeShop.emit(ev.target.value);
  }

  closeAddField(): void {
    this.isAddNewField = false;
  }
  
  closeAddShop(): void {
    this.isAddNewShop = false;
  }

  addNewField(): void {
    if(this.formgroup.controls.newField.errors) {
      this.notification.info('Please fill.');
      return ;
    } 
    this.closeAddField();
    
    // this.formgroup.setValue({newField:""});
    this.commodityManageActionService.addField({ field: this.field }).subscribe((response) => {
      this.onAddField.emit(response);
      this.fields_shops = response;
    });
  }

  addNewShop(): void {
    if(this.formgroup.controls.newShop.errors) {
      this.notification.info('Please fill.');
      return ;
    }
    this.closeAddShop();
    
    // this.formgroup.setValue({newShop:""});
    this.commodityManageActionService.addShop({ field: this.field, shop: this.formgroup.controls.newShop.value }).subscribe((response) => {
      this.onAddShop.emit( response );
      this.fields_shops = response;
      this.shops = this.fields_shops.filter(item => item.field == this.field)[0].shopList;
    });
  }
}
