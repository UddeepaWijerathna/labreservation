import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {RouterModule,Routes} from '@angular/router';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ProfileComponent } from './components/profile/profile.component';
import {ValidateService} from './services/validate.service';
import {AuthService} from './services/auth.service';
import {AuthGuard} from './services/auth.guard';
import {ReservationService} from './services/reservation.service';
import { NgFlashMessagesModule } from 'ng-flash-messages';

import { ReservationComponent } from './components/reservation/reservation.component';
import { ReportComponent } from './components/report/report.component';
import { AddreservationComponent } from './components/addreservation/addreservation.component';
import { UpdatereservationComponent } from './components/updatereservation/updatereservation.component';
import { AddlabComponent } from './components/addlab/addlab.component';
import { FilterComponent } from './components/filter/filter.component';
import { FilterPipe } from './filter.pipe';
import { Filter2Pipe } from './filter2.pipe';

const appRoutes:Routes = [ 
  {path:'',component:HomeComponent},
  {path:'register',component:RegisterComponent},
  {path:'login',component:LoginComponent},
  //guarding the routes which should be limited to authentiated users
  {path:'dashboard',component:DashboardComponent,canActivate:[AuthGuard]},
  {path:'addlab',component:AddlabComponent,canActivate:[AuthGuard]},
  {path:'addreservation',component:AddreservationComponent,canActivate:[AuthGuard]},
  {path:'updatereservation',component:UpdatereservationComponent,canActivate:[AuthGuard]},
  {path:'profile',component:ProfileComponent,canActivate:[AuthGuard]},
  {path:'addreservation',component:AddreservationComponent },
  {path:'reservation',component:ReservationComponent,canActivate:[AuthGuard]},
  {path:'report',component:ReportComponent,canActivate:[AuthGuard]},
]
@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    DashboardComponent,
    ProfileComponent,
    ReservationComponent,
    ReportComponent,
    AddreservationComponent,
    UpdatereservationComponent,
    AddlabComponent,
    FilterComponent,
    FilterPipe,
    Filter2Pipe
   
    
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes),
    NgFlashMessagesModule 
  ],
//registering the service in the providers
  providers:[ValidateService,AuthService,AuthGuard,ReservationService],
  bootstrap: [AppComponent]
})


export class AppModule { }
