import { Component, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/service/user.service'; 
import Swal from 'sweetalert2';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  message: string = '';
  form: FormGroup;
  @Output() item = 'Login';

  constructor(
    private userService: UserService,
    private fb: FormBuilder
    ) { 
      this.form = this.fb.group({
        email: ['', [Validators.required, Validators.email]],
        phoneNumber: ['',[Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/),Validators.minLength(10)]],
        firstname: ['', [Validators.required, Validators.maxLength(2), Validators.minLength(100)]],
        lastname: ['', [Validators.required, Validators.maxLength(2), Validators.minLength(100)]],
        documentType: ['', Validators.required],
        documentNumber: ['', [Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/)]],
        birthdate: ['', Validators.required],
        expeditionDate: ['', Validators.required],
      });
    }

  ngOnInit(): void {
    this.userService.connect();
  }

  onSubmit() {
      console.log(this.form.value);
      const data = this.form.value;
      this.userService.emit('client:newuser', data);
      this.resData();
    };

   async resData () {
    // Escucha el evento 'message' del servidor
   await this.userService.on('server:newuser', (data: any) => {

     if (data != "usuario en db") {
      localStorage.setItem("myID", data);
      localStorage.setItem("isLoggedIn", "true");
      sessionStorage.setItem("isLoggedIn", "true");
      document.cookie = `isLoggedIn=true;  path=/ max-age=10*10`;
      Swal.fire({
        icon: 'success',
        title: 'Usuario registrado con id  ' +  data,
        showConfirmButton: false,
        timer: 1500
      })
     }else if (data == "usuario en db") {
      Swal.fire({
        icon: 'error',
        title: 'Usaurio ya regitrado',
        text: 'el campo document number ya se encuentra registardo !',
      })
     }else{
      Swal.fire({
        icon: 'error',
        title: 'Oops...error',
        text: 'Algo salio mal!',
      })
     }
      console.log("server:newuser == ", data);
    });
  }  
  
}
