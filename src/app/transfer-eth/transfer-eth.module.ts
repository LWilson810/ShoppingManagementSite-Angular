import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TransferEthRoutingModule } from './transfer-eth-routing.module'
import { TransferEthComponent } from './layout/transfer-eth.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { PipesModule } from '@app/shared/pipes/pipes.module';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TransferService } from './transfer.service';


@NgModule({
  declarations: [ TransferEthComponent ],
  imports: [
    CommonModule,
    TransferEthRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatRadioModule,
    PipesModule,
    MatInputModule, MatDatepickerModule, MatNativeDateModule,
  ],
  providers: [
    TransferService
  ]
})
export class TransferEthModule { }
