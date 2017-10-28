import { TestBed, inject } from '@angular/core/testing';

import { OSStokenService } from './osstoken.service';

describe('OSStokenService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OSStokenService]
    });
  });

  it('should be created', inject([OSStokenService], (service: OSStokenService) => {
    expect(service).toBeTruthy();
  }));
});
