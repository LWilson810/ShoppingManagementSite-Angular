
import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
@Component({
  selector: 'pagination1',
  templateUrl: './pagination1.component.html',
  styleUrls: ['./pagination1.component.less']
})
export class Pagination1Component implements OnInit {
  pages: number[];

  @Input() total = 0;
  // @Input() pageSize: number;
  @Input() page = 1;
  @Output() onPageChange = new EventEmitter<number>(); 
  @Output() PageSizeChange = new EventEmitter<number>(); 
  pageSize =5;
  constructor() {
  }

  ngOnInit() {
  }
  setPage(event) {
    this.page = event;
    this.onPageChange.emit(this.page);
  }
  
  onPageSizeChange(){
    this.PageSizeChange.emit(this.pageSize);
  }
}
