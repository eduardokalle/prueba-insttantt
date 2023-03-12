import { Component, OnInit  } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/service/user.service'; 
import Swal from 'sweetalert2'

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

  constructor(
    private userService: UserService,
    private fb: FormBuilder
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
      await this.userService.emit('client:gethobbies',this.muId
      );
      await this.userService.on('server:selectedhobbies', (data: any) => {

          this.datalis  = data
          this.datalis = this.datalis.slice(-5);
          console.log("server:selectedhobbies == ",this.datalis); 
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


