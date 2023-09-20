import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'filterAuthority'
})
export class FilterAuthorityPipe implements PipeTransform {

  transform(data: any[], filter: string): any {
    // console.log(data);
    let res = [];
    if(filter == 'president') {
        res = data;
        return res;
    } else if( filter == 'vice_president') {
        res = data.filter(item => item.value != 'vice_president');
        return res;
    } else if( filter == 'shopkeeper') {
        res = data.filter(item => item.value == 'staff');
        return res;
    }


    // if (!properties || !filter) {
    //   res = data;
    // } else {
    //   if (!Array.isArray(properties)) {
    //     properties = [properties];
    //   }
    //   filter = filter.toLocaleLowerCase();
    //   res = data.filter(el => {
    //     const values = (properties as string[]).map(property => el[property] ? el[property].toLocaleLowerCase() : el[property])
    //     if (values.some(value => value && value.indexOf(filter) !== -1)) {
    //       return true;
    //     }
    //     return false;
    //   });
    // }
    // return res;
  }

}
