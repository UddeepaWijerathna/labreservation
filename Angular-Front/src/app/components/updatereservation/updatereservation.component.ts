import { Component, OnInit } from '@angular/core';
import { NgFlashMessageService } from 'ng-flash-messages';
import {ValidateService} from '../../services/validate.service'; 
import {ReservationService} from '../../services/reservation.service';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router'; 

@Component({
  selector: 'app-updatereservation',
  templateUrl: './updatereservation.component.html',
  styleUrls: ['./updatereservation.component.css']
})
export class UpdatereservationComponent implements OnInit {

  y:any;
  reservelist=[];

  constructor(
    private ngFlashMessageService: NgFlashMessageService,
    private validateService:ValidateService,
    private router:Router,
    private reservationService:ReservationService,
    private authservice: AuthService
  ) { }

  ngOnInit(){
    console.log("wow");
    this.y=this.authservice.loadUser();
    this.reservationService.getMyReservation(this.y.username).subscribe(updatereservation => {
      this.reservelist = updatereservation.reservelist;
     
    },
    err => {
      console.log(err);
      return false;
    });
  }

  onReservationDelete(id) {
    this.reservationService.deleteReservation(id).subscribe(data =>{
      if(data.success){
        this.ngFlashMessageService.showFlashMessage({
          messages: ["Deleted Successfully"], 
          dismissible: true, 
          timeout: 5000,
          type: 'success'
       }); 
       this.router.navigate(['/updatereservation']) 
      } else {
        this.ngFlashMessageService.showFlashMessage({
          messages: ["Something went wrong"], 
          dismissible: true, 
          timeout: 5000,
          type: 'danger'
       }); 
      }
    })
  }

  
  onReservationEdit(id,reservation) {
    this.reservationService.updateReservation(id,reservation).subscribe(data =>{
      if(data.success){
        this.ngFlashMessageService.showFlashMessage({
          messages: ["Updated Successfully"], 
          dismissible: true, 
          timeout: 2000,
          type: 'success'
       }); 
       this.router.navigate(['/updatereservation']) 
      } else {
        this.ngFlashMessageService.showFlashMessage({
          messages: ["Something went wrong"], 
          dismissible: true, 
          timeout: 2000,
          type: 'danger'
       }); 
      }
    })
  }

}
