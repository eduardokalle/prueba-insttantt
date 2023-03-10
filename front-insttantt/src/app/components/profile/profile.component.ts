import { Component, OnInit  } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/service/user.service'; 

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  message: string = '';
  form: FormGroup;

  constructor(
    private userService: UserService,
    private fb: FormBuilder
    ) { 
      this.form = this.fb.group({
        email: ['', [Validators.required, Validators.email]],
        phoneNumber: ['', Validators.required],
        firstname: ['', Validators.required],
        lastname: ['', Validators.required],
        documentType: ['', Validators.required],
        documentNumber: ['', Validators.required],
        birthdate: ['', Validators.required],
        expeditionDate: ['', Validators.required],
        country: ['', Validators.required,],
        city: ['', Validators.required],
        address: ['', Validators.required],
        photoProfile: ['', Validators.required],
      });
    }

  ngOnInit(): void {
    this.userService.connect();

    // Escucha el evento 'message' del servidor
    this.userService.on('server:loaduserss', (data: any) => {
      this.message = data;
      console.log("server:loaduserss == ", this.message);
    });
    
  }

  onSubmit() {
    console.log(this.form.value);
      const data = this.form.value;
      this.userService.emit('client:updateuser', data)
    };
  
}
