import { Component, OnInit  } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/service/user.service'; 
import Swal from 'sweetalert2'

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  message: string = '';
  form: FormGroup;

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

    // Escucha el evento 'message' del servidor
  }

  onSubmit() {
    console.log(this.form.value);
      const data = this.form.value;
      this.userService.emit('client:newhobbies', data)
    };

    async resData () {
      // Escucha el evento 'message' del servidor
     await this.userService.on('server:newhobbies', (data: any) => {
     
       if (data) {
        localStorage.setItem("myID", data);
        Swal.fire({
          icon: 'success',
          title: 'Hobbie registrado',
          showConfirmButton: false,
          timer: 1500
        })
       }else{
        Swal.fire({
          icon: 'error',
          title: 'Oops...error',
          text: 'Algo salio mal!',
        })
       }
        console.log("server:newhobbies == ", data);
      });
    }  
  
}


