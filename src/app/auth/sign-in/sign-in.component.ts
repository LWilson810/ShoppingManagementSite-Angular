import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NotificationService } from '@app/shared/services';
import { AuthActionService } from '../auth.service';
import { SignInModel } from '../../shared/models/signin.model';
import { LoginResponseModel } from '@app/shared/models/login-response.model';
import { AuthService } from '@app/shared/services/auth.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.less', '../auth.component.less',]
})
export class SignInComponent implements OnInit {

  loginForm: FormGroup
  constructor(
    private router: Router,
    private fb: FormBuilder,
    private notificationService: NotificationService,
    private authAction: AuthActionService,
    private authService: AuthService,
    private http: HttpClient
  ) { 
    this.loginForm = this.fb.group({
      userID: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  ngOnInit(): void {
  }

  login(): void  {
    if(!this.loginForm.controls.userID.errors && !this.loginForm.controls.password.errors) {
      // console.log(this.loginForm.value);
      const data : SignInModel = this.loginForm.value;
      // this.http.post('http://localhost:5005/api/users/signin', data).toPromise()
      // .then((res) => {
      //   console.log(res);
      // }).catch(err => console.log(err));
      this.authAction.signIn(data).subscribe((response) => {
        this.authService.setAuthToken(response.token);
        this.router.navigate(['/dashboard']);
      })
    } else {
      if(this.loginForm.controls.userID.errors) {
        this.notificationService.error("You must input your user ID.")
      }
      if(this.loginForm.controls.password.errors) {
        this.notificationService.error("You must input your password.")
      }
    }
    // this.router.navigate(['/dashboard']);
  }

}
