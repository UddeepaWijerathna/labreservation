import { Injectable } from '@angular/core';
import {Http,Headers} from '@angular/http';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ReservationService { 
  reservation:any;
  username:any;
  authToken:any;

  constructor(
    private http:Http
  ) { }
//URL for adding a reservation
  insertReservation(reservation){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/reservations/newreservation',reservation,{headers:headers})
      .pipe(map(res => res.json()));
  
  }
//url to get all reservations
  getAllReservations() {
    
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    return this.http.get('http://localhost:3000/reservations/allreservations',{headers:headers})
      .pipe(map(res => res.json()));
    }
// URL for getting one user's all reservations
  getMyReservation(username) {
    console.log(username);

    let headers = new Headers();
    headers.append('Content-Type','application/json');
    return this.http.get('http://localhost:3000/reservations/myreservations/'+username,{headers:headers})
      .pipe(map(res => res.json()));
    }

//url to get  reservations according to the date
getReservations(reserveddate) {
    
  let headers = new Headers();
  console.log("k");
  headers.append('Content-Type','application/json');
  return this.http.get('http://localhost:3000/reservations/datereservations'+reserveddate,{headers:headers})
    .pipe(map(res => res.json()));
  }

    //delete selected reservation URL
    deleteReservation(id) {
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      return this.http.delete('http://localhost:3000/reservations/'+id,{headers:headers})
        .pipe(map(res => res.json()));
    }
//url for reservations which  are filtered by time 


    updateReservation(id,reservation) {
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      return this.http.post('http://localhost:3000/reservations/editreservation/'+id,reservation,{headers:headers})
        .pipe(map(res => res.json()));

    }


    

  }





