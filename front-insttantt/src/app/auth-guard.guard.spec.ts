import { Injectable } from "@angular/core"
import { Router, CanActivate } from "@angular/router"
import { LoginComponent } from "./components/login/login.component"

@Injectable()

export class AuthGuard implements CanActivate {

  constructor(public router: Router) {}
  
  canActivate(): boolean {
    
    const ls = localStorage.getItem('isLoggedIn') 
    if (ls !== 'true') {
      this.router.navigate(["login"])
      return false
    }
    return true
  }

 }