
import { Injectable } from "@angular/core"
import { Router, CanActivate } from "@angular/router"

@Injectable()

export class AuthGuard implements CanActivate {

  constructor(public router: Router) {}
  
  canActivate(): boolean {
    
    const ls = localStorage.getItem('isLoggedIn'); 
    const session =  sessionStorage.getItem("isLoggedIn");
    const cookie =  document.cookie = "username=isLoggedIn;  path=/ max-age=10*10";
    
    if (ls !== 'true' || session !== 'true' ) {
      this.router.navigate(["login"])
      return false
    }
    return true
  }

 }