import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { AuthRoutingModule } from './auth-routing.module';
import { FirstRegisterComponent } from './components/first-register/first-register.component';
import { SecondRegisterComponent } from './components/second-register/second-register.component';
import { ThirdRegisterComponent } from './components/third-register/third-register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthActionService } from './auth.service';
import { DirectivesModule } from '@app/shared/directives/directives.module';
import { MatCheckboxModule } from '@angular/material/checkbox';
// import { DirectivesModule } from '../shared/directives/directives.module';


@NgModule({
  declarations: [
    SignInComponent, 
    SignUpComponent, FirstRegisterComponent, SecondRegisterComponent, ThirdRegisterComponent,
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    DirectivesModule,
    MatCheckboxModule,
  ],
  providers:[
    AuthActionService
  ]
})
export class AuthModule { }
