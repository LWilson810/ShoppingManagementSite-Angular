import {Injectable} from '@angular/core';
import {HttpHelperService} from '../shared/services/http-helper.service';
import { SignInModel } from '../shared/models/signin.model';
import {LocalStorageService} from 'angular-2-local-storage';
// import {SignUpModel} from './models/sign-up.model';
// import { LoginResponseModel } from './models/login-response.model';
import {Observable} from 'rxjs';
import { LoginResponseModel } from '../shared/models/login-response.model';
import {Config} from '../../../api/config';
@Injectable()
export class AuthActionService {

  // private readonly POST_SIGN_IN: string = 'http://localhost:5005/api/v1/account/signin';
  private readonly POST_SIGN_IN: string = Config.serverUrl + 'api/users/signin';
  private readonly POST_SIGN_OUT: string = Config.serverUrl + 'api/users/signout';
  private readonly POST_CHECK_REGISTER: string = Config.serverUrl + 'api/users/checkRegister';
  private readonly POST_SIGN_UP: string = Config.serverUrl + 'api/users/signup';
  private readonly POST_FORGOT_PASSWORD: string = '/api/v1/account/forgot-password';
  private readonly POST_RESET_PASSWORD: string = '/api/v1/account/reset-password';

  constructor(
      private httpHelperService: HttpHelperService,
      private localStorage: LocalStorageService,
  ) {
  }

//   public signUp(model: SignUpModel) {
//     return this.httpHelperService.jsonPost<LoginResponseModel>(this.POST_SIGN_UP, model);
//   }

  public signIn(model: SignInModel) {
    return this.httpHelperService.jsonPost<LoginResponseModel>(this.POST_SIGN_IN, model);
  }

  public signUp(model) {
    return this.httpHelperService.jsonPost(this.POST_SIGN_UP, model);
  }

  public signOut(model) {
    console.log(model);
    return this.httpHelperService.authJsonDelete<{}>(this.POST_SIGN_OUT, model);
    // this.localStorage.remove(this.BEARER_TOKEN);
  }

  public checkNewRegister(data) {
    return this.httpHelperService.jsonPost(this.POST_CHECK_REGISTER, data);
  }



}


