import { Component, OnInit } from '@angular/core';
import { NgFlashMessageService } from 'ng-flash-messages';
import {ValidateService} from '../../services/validate.service'; 
import {LabService} from '../../services/lab.service';
import {ReservationService} from '../../services/reservation.service';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router'; 

@Component({
  selector: 'app-addreservation',
  templateUrl: './addreservation.component.html',
  styleUrls: ['./addreservation.component.css']
})
export class AddreservationComponent implements OnInit {

  // username:string;
  // useremail:string;
  labname:String;
  reserveddate:String;
  from:String;
  to:String;
  lablist = [];
  reservelist =[];
  can:boolean;
  // result=String;

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
  onReserveLab() {
    console.log("lll");
    const user = this.authService.loadUser();
    // const rdate = this.reserveddate.toString();
    // const realdate = this.processdates(rdate);
    // console.log(realdate);
    const reservation = {
      username:user.username,
      useremail:user.email,
      labname:this.labname,
      // reserveddate:realdate,
      reserveddate:this. reserveddate,
      from:this.from,
      to:this.to
      
    }
    console.log(reservation);
    
   if(!this.validateService.validateReservation(reservation)){
      //console.log(lab.labname);
      //console.log(lab.description);
      this.ngFlashMessageService.showFlashMessage({
        messages: ["Please fill Required Fields"], 
         dismissible: true, 
         timeout: 5000,
         type: 'danger'
       });
       return false;
    }

    this.reservationService.getAllReservations().subscribe(addreservation=> {
      this.reservelist = addreservation.reservelist;
      console.log(this.reservelist);
      
      console.log(this.labname);
      if(this.reservelist.length !=0){
      
         for(var element in this.reservelist){
          
            if((this.labname==this.reservelist[element].labname)&&(this.reserveddate==this.reservelist[element].reserveddate) ){
              if((this.from==this.reservelist[element].from) && (this.to==this.reservelist[element].to))    
                    this.can= false;
            }
            else{
              this.can= true;
            }
                
          }
      }
  //  console.log(this.can);
  // this.can== true;
    if(this.can==true){
      this.reservationService.insertReservation(reservation).subscribe(data => {
        if(data.success) {
          this.ngFlashMessageService.showFlashMessage({
            messages: ["Reserved successfully"], 
            dismissible: true, 
            timeout: 5000,
            type: 'success'
          }); 
        // this.ngOnInit();
        this.router.navigate(['/reservation']); 
        }else {
          this.ngFlashMessageService.showFlashMessage({
            messages: [data.msg], 
            dismissible: true, 
            timeout: 5000,
            type: 'danger'
            });  
            this.router.navigate(['/addreservation']); 
            }
      });
    }else{
      this.ngFlashMessageService.showFlashMessage({
        messages: ["Time Slot is already allocated."], 
        dismissible: true, 
        timeout: 5000,
        type: 'danger'
      });  
      this.router.navigate(['/addreservation']); 
    }

    });
  }
}
