import { TestBed } from '@angular/core/testing';

import { RegsiterConfService } from './regsiter-conf.service';

describe('RegsiterConfService', () => {
  let service: RegsiterConfService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RegsiterConfService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
