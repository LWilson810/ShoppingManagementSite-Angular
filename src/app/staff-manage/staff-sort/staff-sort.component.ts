import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MyFieldInfo } from '@app/commodity-manage/models/myFieldInfo.model';
import { FieldModel } from '@app/shared/models/field.model';

@Component({
  selector: 'staff-sort',
  templateUrl: './staff-sort.component.html',
  styleUrls: ['./staff-sort.component.less']
})
export class StaffSortComponent implements OnInit {

  @Output() changeStaffType: EventEmitter<any> = new EventEmitter<any>();
  @Output() changeField: EventEmitter<any> = new EventEmitter<any>();
  @Output() changeShop: EventEmitter<any> = new EventEmitter<any>();
  @Input() myFieldInfo: MyFieldInfo;
  @Input() fields_shops: Array<FieldModel>;

  constructor(
    private fb: FormBuilder
  ) { }

  isShopShown: boolean = false;
  isFieldShown: boolean = false;
  authorities = [{
    value:'vice_president',
    display: 'Vice President'
  },{
    value:'shopkeeper',
    display: 'Shopkeeper'
  },{
    value:'staff',
    display: 'Staff'
  }]

  shops: any;
  field: string;
  shop: string;
  SortForm: FormGroup;

  ngOnInit(): void {
    this.SortForm = this.fb.group({
      authority: ['' ],
      field: [''],
      shop: ['']
    });
  }
  
  onChangeStaffType($e) {
    // console.log(form);
    if($e.target.value === 'all') {
      this.isFieldShown = false;
      this.isShopShown = false;
    } else if ($e.target.value === 'vice_president') {
      this.isFieldShown = true;
      this.isShopShown = false;
    } else {
      this.isFieldShown = true;
      this.isShopShown = true;
    }
    this.changeStaffType.emit($e.target.value);
  }

  onChangeField($e) {
    this.field = $e.target.value;
    this.changeField.emit($e.target.value);
    this.shops = this.field == 'all'? [] : this.fields_shops.filter(item => item.field == $e.target.value)[0].shopList;
    console.log(this.shops);
  }

  onChangeShop($e) {
    this.shop = $e.target.value;
    this.changeShop.emit($e.target.value);
  }

}
