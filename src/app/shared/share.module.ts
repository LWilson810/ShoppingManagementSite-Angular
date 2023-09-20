import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { Pagination1Component } from './components/pagination1/pagination1.component';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card'
import { NavbarComponent } from './components/navbar/navbar.component';
import { RouterModule } from '@angular/router';
import { PipesModule } from './pipes/pipes.module';
import { AuthActionService } from '@app/auth/auth.service';
import { AuthService } from './services/auth.service';

@NgModule({
  declarations: [
    Pagination1Component,
    NavbarComponent
  ],
  imports: [
    CommonModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatCardModule,
    RouterModule,
  ],
  exports:[
    Pagination1Component,
    NavbarComponent
  ],
  providers:[
    AuthActionService,
    AuthService
  ]
})
export class ShareModule { }
