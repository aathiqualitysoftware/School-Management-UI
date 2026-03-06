import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Router } from '@angular/router';
import { KeycloakService } from 'keycloak-angular';
import { AuthService } from './auth.service';
import { EnvironmentService } from './environment.service';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

describe('AuthService', () => {
  let service: AuthService;
  let mockKeycloakService: jasmine.SpyObj<KeycloakService>;
  let mockRouter: jasmine.SpyObj<Router>;
  let mockEnvironmentService: jasmine.SpyObj<EnvironmentService>;

  beforeEach(() => {
    const keycloakSpy = jasmine.createSpyObj('KeycloakService', ['isLoggedIn', 'login']);
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    const environmentSpy = jasmine.createSpyObj('EnvironmentService', ['getConfig']);

    TestBed.configureTestingModule({
      providers: [
        AuthService,
        { provide: KeycloakService, useValue: keycloakSpy },
        { provide: Router, useValue: routerSpy },
        { provide: EnvironmentService, useValue: environmentSpy }
      ]
    });

    service = TestBed.inject(AuthService);
    mockKeycloakService = TestBed.inject(KeycloakService) as jasmine.SpyObj<KeycloakService>;
    mockRouter = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    mockEnvironmentService = TestBed.inject(EnvironmentService) as jasmine.SpyObj<EnvironmentService>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should allow access when user is logged in', async () => {
    mockKeycloakService.isLoggedIn.and.returnValue(true);
    const route = {} as ActivatedRouteSnapshot;
    const state = { url: '/test' } as RouterStateSnapshot;

    const result = await service.isAccessAllowed(route, state);

    expect(result).toBe(true);
    expect(mockKeycloakService.isLoggedIn).toHaveBeenCalled();
  });

  it('should redirect to login when user is not logged in', async () => {
    mockKeycloakService.isLoggedIn.and.returnValue(false);
    mockKeycloakService.login.and.returnValue(Promise.resolve());
    const route = {} as ActivatedRouteSnapshot;
    const state = { url: '/test' } as RouterStateSnapshot;

    // Mock window.location.origin
    Object.defineProperty(window, 'location', {
      value: {
        origin: 'http://localhost:4200'
      },
      writable: true
    });

    const result = await service.isAccessAllowed(route, state);

    expect(mockKeycloakService.login).toHaveBeenCalledWith({
      redirectUri: 'http://localhost:4200/#/test'
    });
    expect(result).toBe(false);
  });
});

