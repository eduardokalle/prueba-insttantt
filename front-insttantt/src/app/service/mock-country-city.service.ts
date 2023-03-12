import { Injectable } from '@angular/core';
import { countries } from '../dataMock/country';
import { cities } from '../dataMock/citys';


@Injectable({
  providedIn: 'root'
})
export class MockCountryCityService {

  constructor() { }

  getDataCities() {
    return cities;
  }

  getDataCountri() {
    return countries;
  }
}
