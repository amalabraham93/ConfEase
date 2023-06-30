import { TestBed } from '@angular/core/testing';

import { AuthUserInterceptor } from './auth-user.interceptor';

describe('AuthUserInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      AuthUserInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: AuthUserInterceptor = TestBed.inject(AuthUserInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
