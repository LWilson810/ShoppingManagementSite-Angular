import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddStaffComponent } from '../add-staff/add-staff.component';
import { LoginResponseModel } from '@app/shared/models/login-response.model';
import { UserInfoModel } from '@app/shared/models/user.model';
import { MyFieldInfo } from '@app/commodity-manage/models/myFieldInfo.model';
import { AuthService } from '@app/shared/services/auth.service';
import { StaffManageActionService } from '../staff-manage.service';
import { CommodityManageActionService } from '@app/commodity-manage/commodity-manage.service';
import { FieldModel } from '@app/shared/models/field.model';

@Component({
  selector: 'staff-manage',
  templateUrl: './staff-manage.component.html',
  styleUrls: ['./staff-manage.component.less']
})
export class StaffManageComponent implements OnInit {

  authority: string = 'all';
  field: string = 'all';
  shop: string = 'all';
  page: number = 1
  pageSize: number = 5;
  myFieldInfo: MyFieldInfo;
  fields_shops: Array<FieldModel>;
  staff_list = new Array<UserInfoModel>();
  staff_list_shown = new Array<UserInfoModel>();
  staff_shown = new Array<UserInfoModel>();

  constructor(
    private modalService: NgbModal,
    private authService: AuthService,
    private staffManageActionService: StaffManageActionService,
    private commodityManageActionService: CommodityManageActionService
  ) { 

  }

  
  ngOnInit(): void {
    this.myFieldInfo = new MyFieldInfo(this.authService.getAuthority(), this.authService.getField(), this.authService.getShop());
    this.staffManageActionService.getStaff(this.myFieldInfo).subscribe(response => {
      this.staff_list = response;
      this.staff_list_shown = this.staff_list;
      this.staff_shown = this.staff_list.slice(0, this.pageSize);
      // console.log(this.staff_list);
    })
    this.commodityManageActionService.getFields().subscribe(response => {
      this.fields_shops = response;
    })
    
    // console.log(this.staff_shown);
    window.scrollTo(0,0);
  }

  changeStaffType(value): void {
    this.authority = value;
    this.staff_list_shown = this.authority == 'all' ? this.filterStaffList('all', 'all', 'all') : this.filterStaffList(value, this.field, this.shop);
    this.setPage(1);
  }

  changeField(value): void {
    this.field = value;
    this.staff_list_shown = this.field == 'all' ? this.filterStaffList(this.authority, 'all' , this.shop) : this.filterStaffList(this.authority, value, this.shop);
    this.setPage(1);
  }

  changeShop(value): void {
    this.shop = value;
    this.staff_list_shown = this.shop == 'all' ?this.filterStaffList(this.authority, this.field, 'all'): this.filterStaffList(this.authority, this.field, value);
    this.setPage(1);
  }

  filterStaffList(authority, field, shop): any {
    var array = [];
    array = authority == 'all' ? this.staff_list  : this.staff_list.filter(mem => mem.authority == authority);
    array = field == 'all' ? array: array.filter(mem => mem.field == field);
    array = shop == 'all' ? array: array.filter(mem => mem.shop == shop);
    return array;
  }

  setPage(value): void {
    this.page = value;
    this.staff_shown = this.staff_list_shown.slice(this.pageSize*(value-1),this.pageSize*(value))
  }

  pageSizeChange(value): void {
    this.pageSize = value;
    this.staff_shown = this.staff_list_shown.slice(this.pageSize*(this.page-1), this.pageSize*(this.page))
  }

  addStaff(): void {
    const options: any = {
      backdrop: true,
      size: '60vw',
      centered: true,
      keyboard: true,
    }
    const modalRef = this.modalService.open(AddStaffComponent, options);
    // modalRef.componentInstance.model = new BranchViewModel();
    // modalRef.componentInstance.isNew = true;
    // modalRef.componentInstance.detailedBankAccount = false;
  }

}
