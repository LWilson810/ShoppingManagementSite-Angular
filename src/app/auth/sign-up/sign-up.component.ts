import { Component, OnInit } from '@angular/core';
import { SignUpModel } from '@app/shared/models/signup.model';
import { AuthActionService } from '../auth.service';
import { Router } from '@angular/router';
import { NotificationService } from '@app/shared/services';

@Component({
  selector: 'sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.less', '../auth.component.less']
})
export class SignUpComponent implements OnInit {

  constructor(
    private authActionService: AuthActionService,
    private router: Router,
    private notificationService: NotificationService
  ) { }

  signUpData = new SignUpModel();
  step: number = 1;

  ngOnInit(): void {
    this.notificationService.info('Be sure if your manager has registered you', 'Check');
  }

  goToNextStep(value) : void {
    this.step += 1; 
    this.signUpData.email = value.email;
  }

  goToPrevStep() : void {
    this.step -= 1;
  }

  signUp(value): void {
    this.signUpData.userID = value.userID;
    this.signUpData.password = value.pwd;
    this.authActionService.signUp(this.signUpData).subscribe((response) => {
      this.router.navigate(['/']);
    })
  }

}
