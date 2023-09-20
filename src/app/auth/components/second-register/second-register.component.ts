import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SignInModel } from '../../../shared/models/signin.model';
import { AuthActionService } from '@app/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'second-register',
  templateUrl: './second-register.component.html',
  styleUrls: ['./second-register.component.less', '../../auth.component.less']
})
export class SecondRegisterComponent implements OnInit {

  @Output() onClickSignUpBtn: EventEmitter<any> = new EventEmitter<any>();
  @Output() onClickPrevBtn: EventEmitter<any> = new EventEmitter<any>();
  formgroup: FormGroup;
  isSubmitted: boolean = false;
  constructor(
    private fb: FormBuilder,
    private authActionService: AuthActionService,
    private router: Router
  ) { 
    this.formgroup = this.fb.group({
      userID: ['', Validators.required],
      pwd: ['', Validators.required],
      confirm_pwd: ['']
    })
  }

  

  ngOnInit(): void {
  }

  onClickSignUp() {
    console.log("sdfdf");
    this.isSubmitted = true;
    if(this.formgroup.controls.userID.errors) {
      return ;
    }
    if(this.formgroup.controls.pwd.errors) {
      return;
    }
    if(this.formgroup.controls.pwd.value != this.formgroup.controls.confirm_pwd.value) {
      return ;
    }
    console.log(this.formgroup.value);
    var signUpData = {
      userID: this.formgroup.value.userID,
      password: this.formgroup.value.pwd
    };
    this.onClickSignUpBtn.emit(this.formgroup.value);
    // signUpData['userID'] = this.formgroup.value.userID;
    // signUpData['password'] = this.formgroup.value.pwd;
    // this.authActionService.signUp(signUpData).subscribe((response) => {
    //   this.router.navigate(['/']);
    // })
  }

  onClickPrevbtn() {
    this.onClickPrevBtn.emit();
  }

}
