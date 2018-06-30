import { Injectable } from '@angular/core';
import {Http,Headers} from '@angular/http';
import {map} from 'rxjs/operators';
import {JwtHelperService } from '@auth0/angular-jwt';



@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  //type of the 'user' and 'authtoken' is 'any'
  authToken:any;
  user:any;
  

  constructor(
    private http:Http
   
  ) { }
//register URL
  registerUser(user){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/users/register',user,{headers:headers})
      .pipe(map(res => res.json()));

  }

  loadUser(){
    return JSON.parse(localStorage.getItem('user'));
    
  }
 //login URL
  authenticateUser(user){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/users/authentication',user,{headers:headers})
    .pipe(map(res => res.json()));


  }

  getProfile(){
      
  
  
    let headers = new Headers();
    //call the function fetchToken
    this.loadToken();
    //authorization header
    headers.append('Authorization',this.authToken);
    headers.append('Content-Type', 'application/json');
    return this.http.get('http://localhost:3000/users/profile',{headers:headers})
    .pipe(map(res => res.json()));



  }

  // fetch the token in local storage
  loadToken(){

    const token = localStorage.getItem('id_token');
    this.authToken = token;


  }
  isAdmin(){
    const y= JSON.parse(localStorage.getItem('user'));
    if(y.email=="wijerathnauddeepa@gmail.com"){
      return true;
    }
    
  }
 


//checking whether the token is expired
loggedIn(){ 
    if (localStorage.id_token == undefined ){ 
      return true 
    }  else { 
      const helper = new JwtHelperService(); 
      console.log(helper.isTokenExpired(localStorage.id_token)); 
      return helper.isTokenExpired(localStorage.id_token); 
    }
  }



//storing the data on local storage
   storeUserData(token,user){
    localStorage.setItem('id_token',token);
    localStorage.setItem('user',JSON.stringify(user));
    this.authToken = token;
    this.user = user;
  }

  //when logging out local storage should be clear 
 logout(){
   this.authToken = null;
   this.user = null;
   localStorage.clear();
 }

  

 
}
