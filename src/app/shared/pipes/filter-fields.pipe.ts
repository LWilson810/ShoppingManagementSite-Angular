import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'filterFields'
})
export class FilterFieldsPipe implements PipeTransform {

  transform(data: any[], filter: string): any {
    console.log(data);
    let res = [];
    if(filter == '') {
        res = data;
        return res;
    } else {
        res = data.filter(item => item.field == filter);
        return res;
    }
  }

}
