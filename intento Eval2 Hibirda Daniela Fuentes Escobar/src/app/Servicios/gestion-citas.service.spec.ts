import { TestBed } from '@angular/core/testing';

import { GestionCitasService } from './gestion-citas.service';

describe('GestionCitasService', () => {
  let service: GestionCitasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GestionCitasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
