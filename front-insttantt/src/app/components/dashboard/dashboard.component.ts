import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit , Input } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { UserService } from 'src/app/service/user.service'; 

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  muId: any;
  validaButoonProfile: boolean

  constructor(
    private router: Router,
    private cookieService: CookieService,
    private userService: UserService,
    ) { }

  ngOnInit(): void {
    this.userService.connect();
    this.validDataUser();
  }

 async validDataUser(){
     
    const muId = localStorage.getItem("myID");
    this.userService.emit('client:getuser', muId);
    this.getdataUSER();
   
  }

 async getdataUSER(){
  
  await this.userService.on('server:getuser', ( data: any) => {  
      console.log(data);
      //  if(data){
      //    this.validaButoonProfile = false
      //   this.router.navigate(["dashboard/completeregister"]);
      //  }else {
      //    this.validaButoonProfile = true
      //  }
     })

  }

  logout(){
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("myID");
    localStorage.removeItem("miCookieExp")
    sessionStorage.removeItem("isLoggedIn");
    this.cookieService.delete('miCookieisLoggedIn');
    this.router.navigate(["login"]);
  }
}


