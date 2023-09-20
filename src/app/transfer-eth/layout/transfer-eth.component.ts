import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { NotificationService } from '@app/shared/services';
import { TransferService } from '../transfer.service';
// import web3 from 'web3';
// const TransferJson = require('../../../../ethDApp/build/contracts/transfer.json');


@Component({
  selector: 'transfer-eth',
  templateUrl: './transfer-eth.component.html',
  styleUrls: ['./transfer-eth.component.less']
})
export class TransferEthComponent implements OnInit {

  formSubmitted: Boolean = false;
  userForm: FormGroup;
  user: any;

  account_validation_messages = {
    'transferAddress': [
      { type: 'required', message: 'Transfer Address is required.' },
      { type: 'minLength', message: 'Transfer Address must be 42 characters long.' } ,
      { type: 'maxLength', message: 'Transfer Address must be 42 characters long.' }
    ],
    'amount': [
      { type: 'required', message: 'Amount is required.' },
      { type: 'pattern', message: 'Amount must be a positive number.' }
    ],
    'remarks': [
      { type: 'required', message: 'Remarks are required.' }
    ]
  }
  
  constructor(
    private fb: FormBuilder,
    private notificationService: NotificationService,
    private transferService: TransferService
  ) { 
    this.user = {
      address: '',
      transferAddress: '',
      balance: '',
      amount: '',
      remarks: ''
    };
    this.getAccountAndBalance();
    this.createForms();
  }

  createForms() : void {
    this.userForm = this.fb.group({
      transferAddress: new FormControl(
        this.user.transferAddress,   
        Validators.compose([
          Validators.required,
          Validators.minLength(42),
          Validators.maxLength(42)
        ])),
      amount: new FormControl(
        this.user.amount, 
        Validators.compose([
          Validators.required,
          Validators.pattern('^[+]?([.]\\d+|\\d+[.]?\\d*)$')
        ])),
      remarks: new FormControl(
        this.user.remarks, 
        Validators.compose([
          Validators.required
        ]))
      });
  } 

  getAccountAndBalance(): void {
    const self = this;
    this.transferService.getUserBalance().then(retAccount => {
      this.user.address = retAccount.account;
      this.user.balance = retAccount.balance;
      console.log('transfer.components :: getAccountAndBalance :: that.user');
      console.log(self.user);
    }).catch(err => {
      console.log(err);
    })
  }

  submitForm(): void {
    if( this.userForm.invalid ) {
      this.notificationService.error('transfer.components :: submitForm :: Form invalid');
      return;
    } else {
      console.log('transfer.components :: submitForm :: this.userForm.value');
      console.log(this.userForm.value);
    }
  }

  ngOnInit(): void {
  }

}
