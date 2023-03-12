import { Component, OnInit, NgZone, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/service/user.service'; 
import Swal from 'sweetalert2'
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
 
  form: FormGroup;
  isSignedIn = false;


  constructor(
    private userService: UserService,
    private fb: FormBuilder,
    private router: Router,
    ) { 
      this.form = this.fb.group({
        user: ['', [Validators.required, Validators.email]],
        password: ['', Validators.required]
      });
    }

  ngOnInit(){
    this.userService.connect();
    if(localStorage.getItem('user')!== null){ 
    this.isSignedIn= true
    } else
    this.isSignedIn = false
  }

  routRegister() {
    this.router.navigate(["register"]);
  }
  
  onSubmit() {
    console.log(this.form.value);
    const data = this.form.value;
    this.userService.emit('client:login', data);
    this.resData();
  };

  async resData () {
   await this.userService.on('server:login', (data: any) => {
   
     if (data == "credenciales correctas") {
       this.userService.on('server:loginID', (data: any) => {
        localStorage.setItem("myID", data);
      });
      localStorage.setItem("isLoggedIn", "true");
      sessionStorage.setItem("isLoggedIn", "true");
      document.cookie = "isLoggedIn=true;  path=/ max-age=10*10";
      Swal.fire({
        icon: 'success',
        title: 'Credenciales correctas usuario registrado con id',
        showConfirmButton: false,
        timer: 1500
      })
      this.router.navigate(["dashboard"]);
     }else if (data == "credenciales incorrectas") {
      Swal.fire({
        icon: 'error',
        title: 'credenciales incorrectas',
        text: 'por favor revisa  tu usuario o password !',
      })
     } else if (data == "el usuario no existe registrese porfavor") {
      Swal.fire({
        icon: 'error',
        title: 'credenciales incorrectas',
        text: 'el usuario no existe registrese porfavor!',
      })
     } else{
      Swal.fire({
        icon: 'error',
        title: 'Oops...error',
        text: 'Algo salio mal!',
      })
     }
      console.log("server:newuser == ", data);
    });
  }  

  handleLogout(){
    this.isSignedIn = false
  }
}