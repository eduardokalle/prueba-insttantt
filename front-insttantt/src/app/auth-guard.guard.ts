
import { Injectable } from "@angular/core";
import { Router, CanActivate } from "@angular/router";
import { CookieService } from 'ngx-cookie-service';

@Injectable()

export class AuthGuard implements CanActivate {

  constructor(
    public router: Router,
    private cookieService: CookieService
    ) {}
  
  canActivate(): boolean {
    
    const ls = localStorage.getItem('isLoggedIn'); 
    const session =  sessionStorage.getItem("isLoggedIn");
    //const cookie =  document.cookie = "username=isLoggedIn;  path=/ max-age=10*10";
    const cookie =  this.cookieService.get('miCookieisLoggedIn');
    console.log('cookie ', cookie);
    
    
    if (ls !== 'true' || session !== 'true' || cookie !== 'miCookieisLoggedIn') {
      this.router.navigate(["login"])
      return false
    }
    return true
  }

 }