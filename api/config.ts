

export class Config {
  static readonly host = 'https://umfadunamis-webmanagementportal-test.azurewebsites.net';
  static readonly login = 'dev@byteant.com';
  static readonly password = 'Instance@1';
  static readonly serverUrl = "http://localhost:5005/";
  static readonly serverIP = "http://localhost";
  static token: string = '';

  static building = {
    id: 'a1ce3a12-1d89-4017-8db6-3fcda19e20f0',
    name: '_MyHouse'
  }
  static category = {
    id: '6e6ced0e-ed7b-4b71-a21a-343cdcdc8fb5',
    name: 'Retail'
  };
  private static server: any;

  constructor() {
  }


}

export class Request {
  
}
