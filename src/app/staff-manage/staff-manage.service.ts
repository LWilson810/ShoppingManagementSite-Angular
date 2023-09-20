import {Injectable} from '@angular/core';
import {HttpHelperService} from '../shared/services/http-helper.service';
import {LocalStorageService} from 'angular-2-local-storage';
import {Observable, Subject} from 'rxjs';
import {Config} from '../../../api/config';
import { UserInfoModel } from '@app/shared/models/user.model';
@Injectable()
export class StaffManageActionService {

  private readonly ADD_NEW_STAFF: string = Config.serverUrl + 'api/users/addNewStaff';
  private readonly GET_STAFF: string = Config.serverUrl + 'api/users/getStaff';
  private subject = new Subject<UserInfoModel>();
  constructor(
      private httpHelperService: HttpHelperService,
      private localStorage: LocalStorageService,
  ) {
  }

//   public signUp(model: SignUpModel) {
//     return this.httpHelperService.jsonPost<LoginResponseModel>(this.POST_SIGN_UP, model);
//   }

  public addNewStaff(newStaff) {
    return this.httpHelperService.authJsonPost(this.ADD_NEW_STAFF, newStaff);
  }

  public getStaff(myFieldInfo) {
    return this.httpHelperService.authJsonPost<Array<UserInfoModel>>(this.GET_STAFF, myFieldInfo);
  }

}


