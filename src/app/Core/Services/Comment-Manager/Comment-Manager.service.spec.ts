/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { CommentManagerService } from './Comment-Manager.service';

describe('Service: CommentManager', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CommentManagerService]
    });
  });

  it('should ...', inject([CommentManagerService], (service: CommentManagerService) => {
    expect(service).toBeTruthy();
  }));
});
