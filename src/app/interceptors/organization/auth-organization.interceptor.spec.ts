import { TestBed } from '@angular/core/testing';

import { AuthOrganizationInterceptor } from './auth-organization.interceptor';

describe('AuthOrganizationInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      AuthOrganizationInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: AuthOrganizationInterceptor = TestBed.inject(AuthOrganizationInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
