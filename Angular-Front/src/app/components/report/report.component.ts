import { Component, OnInit ,ViewChild,ElementRef} from '@angular/core';
import { NgFlashMessageService } from 'ng-flash-messages';
import {ValidateService} from '../../services/validate.service'; 
import {LabService} from '../../services/lab.service';
import {ReservationService} from '../../services/reservation.service';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router'; 
import * as jsPDF from 'jspdf';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {

  @ViewChild('content') content:ElementRef;
  today:any;
  reservelist = [];

  constructor (
    private ngFlashMessageService: NgFlashMessageService,
    private validateService:ValidateService,
    private router:Router,
    private labService:LabService,
    private reservationService:ReservationService,
    private authService:AuthService) { }

  ngOnInit(){
    console.log("wow");
    const today=Date.now();
    console.log(today);
    this.reservationService.getAllReservations().subscribe(reservation => {
      this.reservelist = reservation.reservelist;
      
    },
    err => {
      console.log(err);
      return false;
    });
    
    
  
  }

  downloadPDF(){
    let doc = new jsPDF();
    let specialElementHandlers = {
        '#editor' :function (element, renderer) {
          return true;
        }
    };
    let content = this.content.nativeElement;
    doc.fromHTML(content.innerHTML ,15,15,{
      'width' :190,
      'elementHandlers': specialElementHandlers
    });
    doc.save('reservation.pdf');
  }

  }


