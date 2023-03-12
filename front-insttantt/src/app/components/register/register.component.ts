import { Component, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/service/user.service'; 
import Swal from 'sweetalert2';
import { isBefore , differenceInYears } from 'date-fns';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  message: string = '';
  form: FormGroup;
  selectedItem: string;
  @Output() item = 'Login';

  typeDocument: any[] = [
    { name: 'CC (cedula de ciudadanía)' },
    { name: 'CE (Cedula de expedición)' },
    { name: 'TI (Tarjeta de identidad)' },
    { name: 'PA(Pasaporte)' },
];

  constructor(
    private userService: UserService,
    private fb: FormBuilder,
    private router: Router,
    ) { 
      this.form = this.fb.group({
        email: ['', [Validators.required, Validators.email]],
        phoneNumber: ['',[Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/),Validators.minLength(10)]],
        firstname: ['', [Validators.required, Validators.maxLength(100), Validators.minLength(2), Validators.pattern(/^[a-z\s\u00E0-\u00FC\u00f1\u00d1]*$/i) ]],
        lastname: ['', [Validators.required, Validators.maxLength(100), Validators.minLength(2), Validators.pattern(/^[a-z\s\u00E0-\u00FC\u00f1\u00d1]*$/i) ]],
        documentType: ['', Validators.required],
        documentNumber: ['', [Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/)]],
        birthdate: ['', Validators.compose([Validators.required, this.validateAge.bind(this)])],
        expeditionDate: ['', Validators.compose([Validators.required, this.validatMinorDay.bind(this)])],
      });
    }

  ngOnInit(): void {
    this.userService.connect();
  }

  validateAge(date): { [key: string]: any } | null {
 
    const DateS = date.value;
    const age = differenceInYears(new Date(), DateS);
    if (age < 18) {
      return { 'invalidAge': true };
    }
    return null;
  }

  validatMinorDay(date): { [key: string]: any } | null {

    const DateS = date.value;
    
    if ( isBefore(new Date(), DateS )){
      return { 'invalidDate': true };
    }else{
      return null;
    }
    
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
      this.router.navigate(["dashboard/completeregister"]);
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
