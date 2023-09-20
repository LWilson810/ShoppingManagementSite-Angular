import { from } from 'rxjs'
export interface LoginResponseModel {
  info: {
    name: string;
    gender: string;
    userID: string;
    email: string;
    authority: string;
    birthday: string;
    phone: string;
    password: string;
    field: string;
    shop: string;
  }
  token: string
}
