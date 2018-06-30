import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value:any[], reserveddat: any): any {
    //check whether reserved date is undefined
    if(reserveddat ===undefined) return value;
    //return relevant reservations
    return value.filter(it=>{
      const username = it.username.includes(reserveddat) 
      const labname = it.labname.includes(reserveddat)
      const reserveddate = it.reserveddate.includes(reserveddat)
      const from = it.from.includes(reserveddat)
      const to = it.to.includes(reserveddat)
      return (username + labname +reserveddate+from+to  );  
    })

    

  }

  

}
