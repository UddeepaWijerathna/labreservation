import { Component, OnInit } from '@angular/core';
import { NgFlashMessageService } from 'ng-flash-messages';
import {ValidateService} from '../../services/validate.service'; 
import {LabService} from '../../services/lab.service';
import {ReservationService} from '../../services/reservation.service';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router'; 

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.css']
})
export class ReservationComponent implements OnInit {
  reserveddate:String;
  reservelist = [];
  
  

  constructor (
    private ngFlashMessageService: NgFlashMessageService,
    private validateService:ValidateService,
    private router:Router,
    private labService:LabService,
    private reservationService:ReservationService,
    private authService:AuthService
  ) { }

  ngOnInit(){
    console.log("wow");
    this.reservationService.getAllReservations().subscribe(reservation => {
      this.reservelist = reservation.reservelist;
      
    },
    err => {
      console.log(err);
      return false;
    });
    
    
  
  }


 
}
