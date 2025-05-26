/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { TabStateManagerService } from './Tab-State-Manager.service';

describe('Service: TabStateManager', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TabStateManagerService]
    });
  });

  it('should ...', inject([TabStateManagerService], (service: TabStateManagerService) => {
    expect(service).toBeTruthy();
  }));
});
