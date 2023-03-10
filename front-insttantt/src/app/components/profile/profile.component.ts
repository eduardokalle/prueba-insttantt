import { Component, OnInit,  ElementRef, ViewChild  } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Pipe, PipeTransform } from '@angular/core';

import { UserService } from 'src/app/service/user.service'; 
import { MockCountryCityService } from 'src/app/service/mock-country-city.service'; 

import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
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


  addressSet : "MI DIRECCION ";
  countrySet : any;
  citySet : any;

  showVideo= true;

  isDisabled  = false;

  conuntryUx : [];

  disableActive;

  photolast;

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
        
      });
    }

  ngOnInit(): void {
    this.userService.connect();
    this.dataCities = this.mockCountryCityService.getDataCities();
    this.datCountrys= this.mockCountryCityService.getDataCountri();
    const muId = localStorage.getItem("myID");
    this.userService.emit('client:getuser', muId);
    this.dataGet();
     


  }
  
  async dataGet(){
    await this.userService.on('server:getuser', ( data: any) => {  
      
        console.log(data);
        const base_image = new Image();
        base_image.src = data.photoProfile;
        this.photolast = data.photoProfile;
         const canvas = document.querySelector('canvas');
         const context = canvas.getContext('2d');
         console.log(base_image.src);
         
         base_image.onload = function(){
        context.drawImage(base_image, 0, 0, canvas.width, canvas.height);}

        const conuntryUx = this.datCountrys.filter(item => item.name === data.country)

        this.form.patchValue({
          country: data.country,
          address: data.address,
          city: data.city,
        });
       // this.form.get("country").setValue(conuntryUx)  
    })

    }

  capturePhoto() {
   
    const video = document.querySelector('video');
    
    navigator.mediaDevices.getUserMedia({ video: this.showVideo })
      .then(stream => {
        video.srcObject = stream;
        video.play();
      })
      .catch(error => {
        console.log('Error al acceder a la c??mara: ', error);
        Swal.fire({
          icon: 'error',
          title: 'Oops...error',
          text: 'Error al acceder a la c??mara!',
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
  
  activeButon(){
    this.isDisabled = false
  }

  onSubmit() {
    console.log(this.form.value);
    const data = this.form.value;
    const muId = localStorage.getItem("myID");
    console.log(this.photo);

    if(this.photo == undefined){
      this.photo == this.photolast
    }else{
      console.log(this.photo);
       this.photo
    }

    const newData = {
      country: data.country,
      city: data.city,
      address: data.address,
      photoProfile: this.photo,
      _id: muId
    }

    console.log(newData);
    
    this.userService.emit('client:updateusercomplete',newData);
    this.resData();
  };

  onInputClick() {
    this.isDisabled  = false;
  }

  async resData () {
    
   await this.userService.on('server:updateusercomplete', (data: any) => {

    console.log(data);
    
     if (data == "resgitro completado") {
      Swal.fire({
        icon: 'success',
        title: 'Usuario actualizado',
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
    });
  }  
  
}

@Pipe({
  name: 'filterByCountry'
})
export class FilterByCountryPipe implements PipeTransform {
  transform(items: any[], countryId: number): any[] {
    debugger
    if (!items || !countryId) {
      return items;
    }

    return items.filter(item => item.countryId === countryId);
  }
}

