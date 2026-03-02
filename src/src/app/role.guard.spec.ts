import { TestBed } from '@angular/core/testing';
import { CanActivateFn, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';
import { KeycloakService } from 'keycloak-angular';

import { roleGuard } from './role.guard';

describe('roleGuard', () => {
  let mockAuthService: jasmine.SpyObj<AuthService>;
  let mockRouter: jasmine.SpyObj<Router>;
  let mockKeycloakService: jasmine.SpyObj<KeycloakService>;
  let mockRoute: Partial<ActivatedRouteSnapshot>;
  let mockState: Partial<RouterStateSnapshot>;

  const executeGuard: CanActivateFn = (...guardParameters) =>
    TestBed.runInInjectionContext(() => roleGuard(...guardParameters));

  beforeEach(() => {
    const authServiceSpy = jasmine.createSpyObj('AuthService', ['isAccessAllowed']);
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    const keycloakServiceSpy = jasmine.createSpyObj('KeycloakService', ['getUserRoles']);

    TestBed.configureTestingModule({
      providers: [
        { provide: AuthService, useValue: authServiceSpy },
        { provide: Router, useValue: routerSpy },
        { provide: KeycloakService, useValue: keycloakServiceSpy }
      ]
    });

    mockAuthService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    mockRouter = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    mockKeycloakService = TestBed.inject(KeycloakService) as jasmine.SpyObj<KeycloakService>;

    mockRoute = {
      data: {},
      queryParams: {},
      params: {},
      url: [],
      fragment: null,
      outlet: 'primary',
      component: null,
      routeConfig: null,
      parent: null,
      firstChild: null,
      children: [],
      pathFromRoot: [],
      paramMap: jasmine.createSpyObj('ParamMap', ['get', 'has']),
      queryParamMap: jasmine.createSpyObj('ParamMap', ['get', 'has'])
    };

    mockState = {
      url: '/test',
      root: {} as ActivatedRouteSnapshot
    };
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });

  it('should allow access when user has required roles and auth is allowed', async () => {
    mockRoute.data = { expectedRoles: ['admin', 'user'] };
    mockKeycloakService.getUserRoles.and.returnValue(['admin', 'manager']);
    mockAuthService.isAccessAllowed.and.returnValue(Promise.resolve(true));

    const result = await executeGuard(mockRoute as ActivatedRouteSnapshot, mockState as RouterStateSnapshot);

    expect(result).toBe(true);
    expect(mockRouter.navigate).not.toHaveBeenCalled();
  });

  it('should allow access when expectedRoles is undefined and auth is allowed', async () => {
    mockRoute.data = {};
    mockKeycloakService.getUserRoles.and.returnValue(['admin']);
    mockAuthService.isAccessAllowed.and.returnValue(Promise.resolve(true));

    const result = await executeGuard(mockRoute as ActivatedRouteSnapshot, mockState as RouterStateSnapshot);

    expect(result).toBe(true);
    expect(mockRouter.navigate).not.toHaveBeenCalled();
  });

  it('should deny access when auth is not allowed', async () => {
    mockRoute.data = { expectedRoles: ['admin'] };
    mockKeycloakService.getUserRoles.and.returnValue(['admin']);
    mockAuthService.isAccessAllowed.and.returnValue(Promise.resolve(false));

    const result = await executeGuard(mockRoute as ActivatedRouteSnapshot, mockState as RouterStateSnapshot);

    expect(result).toBe(false);
    expect(mockRouter.navigate).toHaveBeenCalledWith(['forbidden']);
  });

  it('should deny access when user does not have required roles', async () => {
    mockRoute.data = { expectedRoles: ['admin', 'supervisor'] };
    mockKeycloakService.getUserRoles.and.returnValue(['user', 'viewer']);
    mockAuthService.isAccessAllowed.and.returnValue(Promise.resolve(true));

    const result = await executeGuard(mockRoute as ActivatedRouteSnapshot, mockState as RouterStateSnapshot);

    expect(result).toBe(false);
    expect(mockRouter.navigate).toHaveBeenCalledWith(['forbidden']);
  });

  it('should handle action-specific roles from queryParams', async () => {
    mockRoute.queryParams = { action: 'edit' };
    mockRoute.data = {
      expectedRoles: {
        edit: ['admin'],
        view: ['user']
      }
    };
    mockKeycloakService.getUserRoles.and.returnValue(['admin']);
    mockAuthService.isAccessAllowed.and.returnValue(Promise.resolve(true));

    const result = await executeGuard(mockRoute as ActivatedRouteSnapshot, mockState as RouterStateSnapshot);

    expect(result).toBe(true);
    expect(mockRouter.navigate).not.toHaveBeenCalled();
  });

  it('should deny access for action-specific roles when user lacks permission', async () => {
    mockRoute.queryParams = { action: 'edit' };
    mockRoute.data = {
      expectedRoles: {
        edit: ['admin'],
        view: ['user']
      }
    };
    mockKeycloakService.getUserRoles.and.returnValue(['user']);
    mockAuthService.isAccessAllowed.and.returnValue(Promise.resolve(true));

    const result = await executeGuard(mockRoute as ActivatedRouteSnapshot, mockState as RouterStateSnapshot);

    expect(result).toBe(false);
    expect(mockRouter.navigate).toHaveBeenCalledWith(['forbidden']);
  });

  it('should handle empty user roles', async () => {
    mockRoute.data = { expectedRoles: ['admin'] };
    mockKeycloakService.getUserRoles.and.returnValue([]);
    mockAuthService.isAccessAllowed.and.returnValue(Promise.resolve(true));

    const result = await executeGuard(mockRoute as ActivatedRouteSnapshot, mockState as RouterStateSnapshot);

    expect(result).toBe(false);
    expect(mockRouter.navigate).toHaveBeenCalledWith(['forbidden']);
  });

  it('should handle empty expected roles array', async () => {
    mockRoute.data = { expectedRoles: [] };
    mockKeycloakService.getUserRoles.and.returnValue(['user']);
    mockAuthService.isAccessAllowed.and.returnValue(Promise.resolve(true));

    const result = await executeGuard(mockRoute as ActivatedRouteSnapshot, mockState as RouterStateSnapshot);

    expect(result).toBe(false);
    expect(mockRouter.navigate).toHaveBeenCalledWith(['forbidden']);
  });

  it('should handle case when both auth fails and user lacks roles', async () => {
    mockRoute.data = { expectedRoles: ['admin'] };
    mockKeycloakService.getUserRoles.and.returnValue(['user']);
    mockAuthService.isAccessAllowed.and.returnValue(Promise.resolve(false));

    const result = await executeGuard(mockRoute as ActivatedRouteSnapshot, mockState as RouterStateSnapshot);

    expect(result).toBe(false);
    expect(mockRouter.navigate).toHaveBeenCalledWith(['forbidden']);
  });

  it('should work with partial role match', async () => {
    mockRoute.data = { expectedRoles: ['admin', 'manager', 'supervisor'] };
    mockKeycloakService.getUserRoles.and.returnValue(['manager', 'user']);
    mockAuthService.isAccessAllowed.and.returnValue(Promise.resolve(true));

    const result = await executeGuard(mockRoute as ActivatedRouteSnapshot, mockState as RouterStateSnapshot);

    expect(result).toBe(true);
    expect(mockRouter.navigate).not.toHaveBeenCalled();
  });
});
