import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'staff-list',
  templateUrl: './staff-list.component.html',
  styleUrls: ['./staff-list.component.less']
})
export class StaffListComponent implements OnInit {

  @Input() staff_list: any
  constructor() { }
  
  staff_shown : any

  // staff_list = [{name:'Hye Song', userID:'Admin', authority:'vice president', sort:'Industry'},
  //               {name:'Hye Song', userID:'Admin', authority:'', sort:'Industry'},
  //               {name:'Hye Song', userID:'Admin', authority:'vice president', sort:'Industry'},
  //               {name:'Hye Song', userID:'Admin', authority:'vice president', sort:'Industry'}];

  ngOnInit(): void {
    // console.log(this.staff_list);
    
  }

  

  // setDefaultPage(): void {
  //   console.log("setDefaultPage");
  //   this.setPage(1);
  // }

}
