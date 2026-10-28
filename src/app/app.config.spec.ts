import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { appConfig } from './app.config';
import { routes } from './app.routes';

describe('appConfig', () => {
  it('should provide the application router with the app routes', () => {
    TestBed.configureTestingModule({
      providers: [...appConfig.providers],
    });

    const router = TestBed.inject(Router);

    expect(router).toBeTruthy();
    expect(router.config).toEqual(routes);
  });
});
