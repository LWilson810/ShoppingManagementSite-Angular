import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'third-register',
  templateUrl: './third-register.component.html',
  styleUrls: ['./third-register.component.less', '../../auth.component.less']
})
export class ThirdRegisterComponent implements OnInit {

  @Output() onClickNextBtn: EventEmitter<any> = new EventEmitter<any>();
  @Output() onClickPrevBtn: EventEmitter<any> = new EventEmitter<any>();
  constructor() { }

  ngOnInit(): void {
  }

  onClickNextbtn() {
    console.log("sdfdf");
    this.onClickNextBtn.emit();
  }

  onClickPrevbtn() {
    this.onClickPrevBtn.emit();
  }

}
