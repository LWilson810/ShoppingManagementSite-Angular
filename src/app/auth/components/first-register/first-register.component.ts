import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { NotificationService } from '../../../shared/services/notification.service';
import { AuthActionService } from '@app/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'first-register',
  templateUrl: './first-register.component.html',
  styleUrls: ['./first-register.component.less', '../../auth.component.less']
})
export class FirstRegisterComponent implements OnInit {

  @Output() onClickNextBtn: EventEmitter<any> = new EventEmitter<any>();

  formgroup: FormGroup;
  constructor(
    private fb: FormBuilder,
    private notificationService: NotificationService,
    private authActionService: AuthActionService,
    private router: Router,
  ) {
    // this.onClickNextBtn = new EventEmitter();
    this.formgroup = this.fb.group({
      email: ['', [ Validators.required, Validators.email ]],
    })
  }

  onClickNextbtn() {
    if(this.formgroup.controls.email.errors) {
      if( this.formgroup.controls.email.errors.required) {
        this.notificationService.error("Please type your email address.");
        return ;
      } else {
        this.notificationService.error("Please confirm the email validation.");
        return ;
      }
    }
    this.authActionService.checkNewRegister(this.formgroup.value).subscribe((response) => {
      this.onClickNextBtn.emit(this.formgroup.value);
    })

    
  }

  onClickPrevbtn() {
    this.router.navigate(['/']);
  }

  ngOnInit(): void {
  }

}
