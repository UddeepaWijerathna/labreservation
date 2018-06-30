import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter2'
})
export class Filter2Pipe implements PipeTransform {

  transform(value: any[], time: any): any {
    //check whether reserved date is undefined
    if(time ===undefined) return value;
    //return relevant reservations
    return value.filter(it=>{
      const username = it.username.includes(time) 
      const labname = it.labname.includes(time)
      const reserveddate = it.reserveddate.includes(time)
      const from = it.from.includes(time)
      const to = it.to.includes(time)
      return (username + labname +reserveddate+from+to  );  
    })
  }

}
