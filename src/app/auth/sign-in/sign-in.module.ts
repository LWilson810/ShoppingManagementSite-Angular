import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; 
import { SignInComponent } from './sign-in.component';

@NgModule({
  declarations: [
    SignInComponent
  ],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    MatInputModule, MatIconModule, MatCheckboxModule,
    FormsModule, ReactiveFormsModule, 
  ],
  bootstrap: [SignInComponent]
})
export class SignInModule { }
