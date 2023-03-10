import { Component, OnInit  } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/service/user.service'; 


@Component({
  selector: 'app-completeregister',
  templateUrl: './completeregister.component.html',
  styleUrls: ['./completeregister.component.css']
})
export class CompleteregisterComponent implements OnInit {
  message: string = '';
  form: FormGroup;

  constructor(
    private userService: UserService,
    private fb: FormBuilder
    ) { 
      this.form = this.fb.group({
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
      this.userService.emit('client:updateusercomplete', data)
    };
  
}

