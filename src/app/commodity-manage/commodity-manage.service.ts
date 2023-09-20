import {Injectable} from '@angular/core';
import {HttpHelperService} from '../shared/services/http-helper.service';
import {LocalStorageService} from 'angular-2-local-storage';
import {Observable, Subject} from 'rxjs';
import {Config} from '../../../api/config';
import { FieldModel } from '@app/shared/models/field.model';
import { NewFilesViewModel } from '@app/shared/models/new-file.model';
import { CommodityResponseModel } from '@app/shared/models/commodity.model';
import { MyFieldInfo } from './models/myFieldInfo.model';

@Injectable()
export class CommodityManageActionService {

  private readonly GET_FIELD: string = Config.serverUrl + 'api/commodity/get/field';
  private readonly ADD_FIELD: string = Config.serverUrl + 'api/commodity/add/field';
  private readonly ADD_SHOP: string = Config.serverUrl + 'api/commodity/add/shop';
  private readonly GET_COMMODITY: string = Config.serverUrl + 'api/commodity/get/commodity';
  private readonly ADD_COMMODITY: string = Config.serverUrl + 'api/commodity/add/commodity';
  private readonly ADD_FIGURE: string = Config.serverUrl + 'api/commodity/add/figure';
  private subject = new Subject<CommodityResponseModel>();
  constructor(
      private httpHelperService: HttpHelperService,
      private localStorage: LocalStorageService,
  ) {
  }

//   public signUp(model: SignUpModel) {
//     return this.httpHelperService.jsonPost<LoginResponseModel>(this.POST_SIGN_UP, model);
//   }

  public getFields() {
    return this.httpHelperService.authJsonGet<Array<FieldModel>>(this.GET_FIELD);
  }

  public addField(newField) {
    return this.httpHelperService.authJsonPost<Array<FieldModel>>(this.ADD_FIELD, newField);
  }

  public addShop(newShop) {
    return this.httpHelperService.authJsonPost<Array<FieldModel>>(this.ADD_SHOP, newShop);
  }

  public getCommodities(myFieldInfo) {
    return this.httpHelperService.authJsonPost<Array<CommodityResponseModel>>(this.GET_COMMODITY, myFieldInfo);
  }

  public addCommodity(newCommodity) {
    const response = this.httpHelperService.authJsonPost<CommodityResponseModel>(this.ADD_COMMODITY, newCommodity);
    // response.subscribe(comm => {
    //   this.subject.next(comm);
    // })
    return response;
  }

  public addFigures(files, commodityName) {
    var data = new NewFilesViewModel();
    data.files = files;
    return this.httpHelperService.authUploadMultiFilesAsync(this.ADD_FIGURE + '/' + commodityName, data);
  }

  public toSubject(commodity) {
    this.subject.next(commodity);
  }

  getObservable() {
    return this.subject;
  }

}


