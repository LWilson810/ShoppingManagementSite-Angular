import { Injectable } from '@angular/core';
// import Web3 from 'web3';
const TransferContract = require('../../../ethDApp/build/contracts/transfer.json');

declare let require: any;
declare let window: any;


@Injectable({
  providedIn: 'root'
})
export class TransferService {

  private _account: any = null;
  private readonly _web3: any;

  constructor() {
    if (typeof window.web3 !== 'undefined') {
      this._web3 = window.web3.currentProvider;
      console.log('WEB3333')
    } else {
      console.log('WEB3')
      // this._web3 = new Web3.providers.HttpProvider('http://127.0.0.1:7545');
    }
    // window.web3 = new Web3(this._web3);
    console.log('transfer.service :: this._web3');
    console.log(this._web3);
  }

  private async getAccount(): Promise<any> {
    console.log('transfer.service :: getAccount :: start');
    if( this._account == null ) {
      this._account = await new Promise((resolve, reject) => {
        console.log('transfer.service :: getAccount :: eth');
        console.log(window.web3.eth);
        window.web3.eth.getAccounts((err, retAccount) => {
          console.log('transfer.service :: getAccount: retAccount');
          console.log(retAccount);
          if (retAccount.length > 0) {
            this._account = retAccount[0];
            resolve(this._account);
          } else {
            alert('transfer.service :: getAccount :: no accounts found.');
            reject('No accounts found.');
          }
          if (err != null) {
            alert('transfer.service :: getAccount :: error retrieving account');
            reject('Error retrieving account');
          }
        });
      }) as Promise<any>;
    }
    return Promise.resolve(this._account);
  }

  public async getUserBalance(): Promise<any> {
    const account = await this.getAccount();
    console.log('transfer.service :: getUserBalance :: account');
    console.log(account);
    return new Promise((resolve, reject) => {
      window.web3.eth.getBalance(account, function(err, balance) {
        console.log('transfer.service :: getUserBalance :: getBalance');
        console.log(balance);
        if (!err) {
          const retVal = { account: account, balance: balance };
          console.log('transfer.service :: getUserBalance :: getBalance :: retVal');
          console.log(retVal);
          resolve(retVal);
        } else {
          reject({account: 'error', balance: 0});
        }
      });
    }) as Promise<any>;
  }

  // public async getInstance(web3) {
  //   const networkId = await web3.eth.net.getId();
  //   window.user = (await web3.eth.getAccounts())[0];
  //   const deploydNetwork = TransferContract.networks[networkId];
  //   window.instance = new Web3.eth.Contract(
  //     TransferContract.abi,
  //     deploydNetwork && deploydNetwork.address,
  //     {
  //       from : window.user
  //     }
  //   )
  // }
}
