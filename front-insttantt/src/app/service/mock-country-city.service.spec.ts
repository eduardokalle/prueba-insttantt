import { TestBed } from '@angular/core/testing';

import { MockCountryCityService } from './mock-country-city.service';

describe('MockCountryCityService', () => {
  let service: MockCountryCityService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MockCountryCityService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
