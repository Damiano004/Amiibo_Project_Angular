/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { CardManagerService } from './Card-Manager.service';

describe('Service: CardManager', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CardManagerService]
    });
  });

  it('should ...', inject([CardManagerService], (service: CardManagerService) => {
    expect(service).toBeTruthy();
  }));
});
