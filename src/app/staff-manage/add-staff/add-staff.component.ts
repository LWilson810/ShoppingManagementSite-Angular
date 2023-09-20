import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NotificationService } from '@app/shared/services';
import { StaffManageActionService } from '../staff-manage.service';
import { CommodityManageActionService } from '@app/commodity-manage/commodity-manage.service';
import { AuthService } from '@app/shared/services/auth.service';

@Component({
  selector: 'add-staff',
  templateUrl: './add-staff.component.html',
  styleUrls: ['./add-staff.component.less']
})
export class AddStaffComponent implements OnInit {

  formgroup: FormGroup;
  isSubmitted: boolean = false;
  fields_shops: any;
  shops: any;
  myAuthority: string;
  myField: string;
  myShop: string;
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
  constructor(
    private notificationService: NotificationService,
    private modalService: NgbActiveModal,
    private formBuilder: FormBuilder,
    private staffManageActionService: StaffManageActionService,
    private commodityManageActionService: CommodityManageActionService,
    private authService: AuthService,
  ) {
      this.formgroup = this.formBuilder.group({
        first_name: ['', Validators.required],
        second_name: ['', Validators.required],
        gender: ['male'],
        email: ['', [Validators.required, Validators.email]],
        authority: ['', [Validators.required]],
        birthday:['', Validators.required],
        phone:[''],
        field:[''],
        shop:['']
    })
  }

  ngOnInit(): void {
    this.commodityManageActionService.getFields().subscribe((response) => {
      this.fields_shops = response;
      console.log(this.fields_shops);
    })
    this.myAuthority = this.authService.getAuthority();
    this.myField = this.authService.getField();
    this.myShop = this.authService.getShop();
    // this.myAuthority = 'shopkeeper';
    // this.myField = 'industry';
    // this.myShop = 'electronic product';
  }

  onChangeField(): void {
    this.shops = this.fields_shops.filter(item => item.field == this.formgroup.controls.field.value)[0].shopList;
  }

  closeModal(): void {
    this.modalService.dismiss();
  }

  addNewStaff(): void {
    this.isSubmitted = true;
    if(this.formgroup.controls.first_name.errors) {
      this.notificationService.error("Please type the first name.");
    }
    if (this.formgroup.controls.second_name.errors) {
      this.notificationService.error("Please type the second name.");
    }
    if(this.formgroup.controls.email.errors) {
      if( this.formgroup.controls.email.errors.required) {
        this.notificationService.error("Please type the email address.");

      } else {
        this.notificationService.error("Please confirm the email validation.");

      }
    }

    if (this.formgroup.controls.authority.errors) {
      this.notificationService.error("Please choose the authority.");
    } 

    if (this.formgroup.controls.birthday.errors) {
      this.notificationService.error("Please type the birthday.");
    } 

    if(this.formgroup.status == 'VALID'){
      console.log(this.formgroup.value);
      this.staffManageActionService.addNewStaff(this.formgroup.value).subscribe((response) => {
        this.closeModal();
      });
    }
  }

}
