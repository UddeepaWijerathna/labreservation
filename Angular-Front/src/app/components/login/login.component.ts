import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import {Router} from '@angular/router';
import { NgFlashMessageService } from 'ng-flash-messages'; 
import { ValidateService } from '../../services/validate.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email:String;
  password:String;

  constructor(
    private authService:AuthService,
    private validateService:ValidateService,
    private ngFlashMessageService: NgFlashMessageService,
    private router:Router
   ) { }

  ngOnInit() {
  }
  OnLoginSubmit(){
    const user = {
      email:this.email,
      password:this.password
    }
    if(!this.validateService.validateEmail(user.email)){
      this.ngFlashMessageService.showFlashMessage({
        messages: ["Incorrest format for email"], 
         dismissible: true, 
         timeout: 5000,
         type: 'danger'
       });
       return false;
    }
    this.authService.authenticateUser(user).subscribe(data => {
        if(data.success){
          this.authService.storeUserData(data.token,data.user);
          this.ngFlashMessageService.showFlashMessage({
            messages: ["You are logging in"], 
            dismissible: true, 
            timeout: 1000,
            type: 'success'
           });
           if(user.email=="wijerathnauddeepa@gmail.com"){
           this.router.navigate(['/dashboard']);
           }else{
            this.router.navigate(['/reservation']) 
           }


        } else {
          this.ngFlashMessageService.showFlashMessage({
            messages: [data.msg], 
            dismissible: true, 
            timeout: 5000,
            type: 'danger'
           });
           this.router.navigate(['/login']);
        }
    });
  }


} 
