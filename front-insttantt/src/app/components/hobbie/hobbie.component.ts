import { Component, OnInit  } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/service/user.service'; 
import Swal from 'sweetalert2'
import { CookieService } from 'ngx-cookie-service';
import { isAfter } from 'date-fns';


@Component({
  selector: 'app-hobbie',
  templateUrl: './hobbie.component.html',
  styleUrls: ['./hobbie.component.css']
})
export class HobbieComponent implements OnInit {

  datalis = [];
  datalisSlice = [];
  form: FormGroup;
  muId: any; 
  miCookieExp;
  isDisabled  = true;

  constructor(
    private userService: UserService,
    private fb: FormBuilder,
    private cookieService: CookieService
    
    ) { 
      this.form = this.fb.group({
        Hobbies: ['', Validators.required,],
      });
    }

  ngOnInit(): void {
    this.userService.connect();
    this.getDataHobbies();
    this.muId = localStorage.getItem("myID");
  }

  onSubmit() {
    console.log(this.form.value);
      const data = this.form.value;
      this.muId = localStorage.getItem("myID");

      const newData = {
        hobbie: data.Hobbies,
        idUser: this.muId
      }

      console.log(data);
      this.userService.emit('client:newhobbies', newData);
      this.resDataHobbies(); 
      this.getDataHobbies();

    };

    async getDataHobbies() {

      this.muId = localStorage.getItem("myID");
      await this.userService.emit('client:gethobbies',this.muId)
      await this.userService.on('server:selectedhobbies', (data: any) => {

          this.datalis  = data
          this.datalis = this.datalis.slice(-5);
          console.log("server:selectedhobbies == ",this.datalis);  
          this.miCookieExp = localStorage.getItem("miCookieExp");
          //this.miCookieExp = Date.parse(this.miCookieExp)
          console.log("miCookieExp..",this.miCookieExp.typeOf);
          
          const fechaActual = new Date();
          if (isAfter(fechaActual, fechaActual)) {
            console.log('La fecha ha caducado');
          } else {
            console.log('La fecha no ha caducado');
          }
      });

    }

    async resDataHobbies () {
    
     await this.userService.on('server:newhobbies', (data: any) => {
     
       if (data) {
        Swal.fire({
          icon: 'success',
          title: 'Hobbie registrado',
          showConfirmButton: false,
          timer: 1500
        })
        this.getDataHobbies()
       }else{
        Swal.fire({
          icon: 'error',
          title: 'Oops...error',
          text: 'Algo salio mal!',
        })
       }
      });
    }  
}


