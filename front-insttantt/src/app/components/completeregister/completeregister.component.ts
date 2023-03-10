import { Component, OnInit,  ElementRef, ViewChild , Output , EventEmitter  } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Pipe, PipeTransform } from '@angular/core';

import { UserService } from 'src/app/service/user.service'; 
import { MockCountryCityService } from 'src/app/service/mock-country-city.service'; 

import Swal from 'sweetalert2';
import { Router } from '@angular/router';


@Component({
  selector: 'app-completeregister',
  templateUrl: './completeregister.component.html',
  styleUrls: ['./completeregister.component.css']
})
export class CompleteregisterComponent implements OnInit {
  @Output() evenData = new EventEmitter<any> 
  message: string = '';
  form: FormGroup;
  selectedCountry: any;
  selectedCity: any;

  dataCities: any[];
  datCountrys: any[];

  video: any;
  videoElement: any;

  MediaDevices: any;
  photoElement: any;

  labelcamare: string = 'Activar camara';
  photoUrl: any;
  photo : any;


  constructor(
    private userService: UserService,
    private fb: FormBuilder,
    private router: Router,
    private mockCountryCityService: MockCountryCityService
    ) { 
      this.form = this.fb.group({
        country: ['', Validators.required,],
        city: ['', Validators.required],
        address: ['', [Validators.required, Validators.maxLength(100)]],
       // photoProfile: ['', Validators.required],
      });
    }

  ngOnInit(): void {
    this.userService.connect();
    this.dataCities = this.mockCountryCityService.getDataCities();
    this.datCountrys= this.mockCountryCityService.getDataCountri();
    this.evenData.emit(false);
  }

  capturePhoto() {
   
    const video = document.querySelector('video');
    
    navigator.mediaDevices.getUserMedia({ video: true })
      .then(stream => {
        video.srcObject = stream;
        video.play();
      })
      .catch(error => {
        console.log('Error al acceder a la cámara: ', error);
        Swal.fire({
          icon: 'error',
          title: 'Oops...error',
          text: 'Error al acceder a la cámara!',
        })
      });

      this.labelcamare = "Tomar foto";
    
    const canvas = document.querySelector('canvas');
    const context = canvas.getContext('2d');
    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    this.photoUrl = canvas.toDataURL();
    const photo = new Image();
    photo.src = this.photoUrl;
    
    this.photoElement = document.querySelector('#photo');
    this.photoElement.src = this.photoUrl;
    //console.log(photo);
    //console.log(this.photoUrl);
    this.photo = this.photoElement.src;
    console.log(this.photo);
  }

  onSubmit() {
    console.log(this.form.value);
    const data = this.form.value;
    const muId = localStorage.getItem("myID");
    console.log(this.photo);

    const newData = {
      country: data.country.name,
      city: data.city,
      address: data.address,
      photoProfile: this.photo,
      _id: muId
    }

    console.log(newData);
    

    this.userService.emit('client:updateusercomplete', newData);
    this.resData();
  };

  async resData () {
    
   await this.userService.on('server:updateusercomplete', (data: any) => {
     console.log(data);
     if (data == "resgitro completado") {
      Swal.fire({
        icon: 'success',
        title: 'Usuario registrado Completamente',
        showConfirmButton: false,
        timer: 1500
      })
      this.router.navigate(["dashboard"]);
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

@Pipe({
  name: 'filterByCountry'
})
export class FilterByCountryPipe implements PipeTransform {
  transform(items: any[], countryId: number): any[] {
    
    if (!items || !countryId) {
      return items;
    }

    return items.filter(item => item.countryId === countryId);
  }
}

