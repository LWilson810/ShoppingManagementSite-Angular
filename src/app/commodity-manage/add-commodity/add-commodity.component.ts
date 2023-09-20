import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CommodityManageActionService } from '../commodity-manage.service';
import { AuthService } from '@app/shared/services/auth.service';
import { FieldModel } from '@app/shared/models/field.model';
import { MyFieldInfo } from '../models/myFieldInfo.model';
import { NotificationService } from '@app/shared/services';

import $ from 'jquery';
import { NewCommodity } from '@app/shared/models/new-commodity.model';
import { Subject } from 'rxjs';
import { CommodityResponseModel } from '@app/shared/models/commodity.model';



@Component({
  selector: 'add-commodity',
  templateUrl: './add-commodity.component.html',
  styleUrls: ['./add-commodity.component.less']
})
export class AddCommodityComponent implements OnInit {

  formgroup: FormGroup;
  fields_shops: Array<FieldModel>;
  myFieldInfo: MyFieldInfo;
  shops: any;
  filenames: string;
  figures = [];

  constructor(
    // private form: FormGroup,
    private modalService: NgbActiveModal,
    private formBuilder: FormBuilder,
    private commodityManageActionService: CommodityManageActionService,
    private authService: AuthService,
    private notificationService: NotificationService,
  ) {
      this.formgroup = this.formBuilder.group({
        name:['', Validators.required],
        field:['', Validators.required],
        shop:['', Validators.required],
        price:[null, Validators.required],
        stock:[null, Validators.required],
        description:['', Validators.required],
    })
      // this.store : this.storeService.store<State>;
  }

  ngOnInit(): void {
    // this.storeService.store.dispatch()
    // alert("sdf");
    // console.log(this.fields_shops, this.myFieldInfo);
  }

  closeModal(): void {
    this.modalService.dismiss();
    // this.modalService.close({string:"ssfdfdfdf"});
  }

  onChangeField(): void {
    this.shops = this.fields_shops.filter(item => item.field == this.formgroup.controls.field.value)[0].shopList;
  }

  onClickUploadBtn(): void {
    document.getElementById('file').click();
  }

  onFileUploading($e): void {
    if($e.target.files.length == 0) {
      // document.getElementsByClassName('check')
      $(".check").addClass('hidden');
      return;
    }

    if($e.target.files.length != 3 ) {
      this.notificationService.error('Files must be 3.', 'Error');
      return;
    }

    if($e.target.files.length == 3) {
      $(".check").removeClass('hidden');
      this.figures = $e.target.files;
      // console.log(this.formgroup.value);
    }
  }

  addNewCommodity(): void {
    if(this.formgroup.status =='INVALID'){
      console.log(this.formgroup);
      this.notificationService.error('Please check the commodity detail field.');
      return;
    } else if(this.figures.length != 3) {
      this.notificationService.error('Please check the commodity figures.'); 
      return;
    } else {
      const newCommodity = new NewCommodity({...this.formgroup.value, figures: [this.figures[0].name, this.figures[1].name, this.figures[2].name]});
      console.log(newCommodity);
      this.commodityManageActionService.addCommodity(newCommodity).subscribe(response => {
        const added :CommodityResponseModel = response;
        this.commodityManageActionService.addFigures(this.figures, response._id).subscribe(response => {
          if(response && response.isCompleted) {
            this.modalService.dismiss();
            this.commodityManageActionService.toSubject(added);
          }
        })
      })
    }
  }
}
