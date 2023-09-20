import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StaffManageRoutingModule } from './staff-manage-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StaffSortComponent } from './staff-sort/staff-sort.component';
import { StaffListComponent } from './staff-list/staff-list.component';
import { StaffManageComponent } from './layout/staff-manage.component';
import { DirectivesModule } from '@app/shared/directives/directives.module';
import { ShareModule } from '@app/shared/share.module';
import { AddStaffComponent } from './add-staff/add-staff.component';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { StaffManageActionService } from './staff-manage.service';
import { CommodityManageActionService } from '@app/commodity-manage/commodity-manage.service';
import { PipesModule } from '@app/shared/pipes/pipes.module';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

@NgModule({
  declarations: [
    StaffListComponent,
    StaffSortComponent,
    StaffManageComponent,
    AddStaffComponent
  ],
  imports: [
    CommonModule,
    StaffManageRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ShareModule,
    DirectivesModule,
    MatSelectModule,
    MatRadioModule,
    PipesModule,
    MatInputModule, MatDatepickerModule, MatNativeDateModule
  ],
  providers:[
    StaffManageActionService,
    CommodityManageActionService
    // NotificationService
  ]
})
export class StaffManageModule { }
