import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'filterFieldsShops'
})
export class FilterFieldsShopsPipe implements PipeTransform {

  transform(data: any[], type:string, filter: any): any {
    // console.log(data);
    if(data == undefined) {
        return [];
    }
    let res = [];
    if(typeof(filter) == 'string') {
      if(filter == '') {
        res = data;
        return res;
      } else {
        res = data.filter(item => item[type] == filter);
        return res;
      }
    } else if (typeof(filter) == 'object') {
      console.log(type, filter);
      if(filter.length == 0) {
        res = data;
        return res;
      } else {
        var arr;
        if(filter[0] == undefined || filter[0] == "") {
          arr = data;
        } else {
          arr = data.filter(item => item[type] == filter[0]);
        }
        if(filter[1] == undefined || filter[1] == '') {
          res = arr;
        } else {
          res = arr.filter(item => item[type] == filter[1]);
        }
        // res = arr.filter(item => item[type] == filter[1]);
        return res;
      }
    }
  }

}
