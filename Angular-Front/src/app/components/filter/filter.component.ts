import { Component, OnInit } from '@angular/core';
import {ValidateService} from '../../services/validate.service'; 
import {LabService} from '../../services/lab.service';
import {ReservationService} from '../../services/reservation.service';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router'; 
import {NgFlashMessageService} from 'ng-flash-messages';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {
  labname:String;
  reserveddate:String;
  from:String;
  to:String;
  lablist = [];
  reservelist :any;
  can:boolean;
  constructor(
    private ngFlashMessageService: NgFlashMessageService,
    private validateService:ValidateService,
    private router:Router,
    private labService:LabService,
    private reservationService:ReservationService,
    private authService:AuthService
  ) { }

  ngOnInit() {
  }
 
    onChangeLab(id,reservation) {
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
