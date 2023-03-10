import { Component, OnInit, NgZone } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
 
  isSignedIn = false
  constructor(
    private router: Router,
    ){}
  ngOnInit(){
    if(localStorage.getItem('user')!== null){ 
    this.isSignedIn= true
    } else
    this.isSignedIn = false
  }
  async onSignin(email:string,password:string){

  }
  handleLogout(){
    this.isSignedIn = false
  }
}