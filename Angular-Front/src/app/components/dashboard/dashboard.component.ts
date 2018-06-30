import { Component, OnInit } from '@angular/core';
import { NgFlashMessageService } from 'ng-flash-messages';
import {ValidateService} from '../../services/validate.service'; 
import {LabService} from '../../services/lab.service';
import {Router} from '@angular/router'; 


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {
  labname:String;
  description:String;
  lablist = [];

  constructor(
    private ngFlashMessageService: NgFlashMessageService,
    private validateService:ValidateService,
    private router:Router,
    private labService:LabService,
    
  ) { }

  ngOnInit() {
    this.labService.getAllLabs().subscribe(dashboard => {
      this.lablist = dashboard.lablist;
      
    },
    err => {
      console.log(err);
      return false;
    });
    this.labname='';
    this.description='';
    
  }

 

  
onLabDelete(id) {
  this.labService.deletelab(id).subscribe(data =>{
    if(data.success){
      this.ngFlashMessageService.showFlashMessage({
        messages: ["Deleted Successfully"], 
        dismissible: true, 
        timeout: 5000,
        type: 'success'
     }); 
     this.ngOnInit();
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
  

}
