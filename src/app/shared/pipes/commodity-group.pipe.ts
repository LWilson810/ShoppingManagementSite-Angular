import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'groupCommodities'
})
export class GroupCommoditiesPipe implements PipeTransform {

  transform(data: any[], filter: string): any {
    if(data == undefined) {
        return [];
    }
    let res = [];
    let arr = data.filter(item => item.shop == filter);
    for(var i = 0; i < arr.length; i+= 8) {
        let array = [];
        for(var j = i; j < i + 8; j++) {
            if( arr[j] != undefined ) {
                array.push(arr[j]);
            }
        }
        res.push(array);
    }
    return res;
  }

}
