import { TestBed } from '@angular/core/testing';
import { ActivatedRouteSnapshot, CanActivateFn, RouterStateSnapshot, Router } from '@angular/router';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { authGuard } from './auth.guard';
import { AuthService } from './auth.service';

describe('authGuard', () => {
  let mockAuthService: jasmine.SpyObj<AuthService>;
  let mockRouter: jasmine.SpyObj<Router>;
  let mockRoute: ActivatedRouteSnapshot;
  let mockState: RouterStateSnapshot;

  const executeGuard: CanActivateFn = (...guardParameters) =>
    TestBed.runInInjectionContext(() => authGuard(...guardParameters));

  beforeEach(() => {
    const authServiceSpy = jasmine.createSpyObj('AuthService', ['isAccessAllowed']);
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        { provide: AuthService, useValue: authServiceSpy },
        { provide: Router, useValue: routerSpy }
      ]
    });

    mockAuthService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    mockRouter = TestBed.inject(Router) as jasmine.SpyObj<Router>;

    // Create mock route and state objects
    mockRoute = {
      url: [],
      params: {},
      queryParams: {},
      fragment: null,
      data: {},
      outlet: 'primary',
      component: null,
      routeConfig: { path: '/test' },
      root: {} as ActivatedRouteSnapshot,
      parent: null,
      firstChild: null,
      children: [],
      pathFromRoot: [],
      paramMap: jasmine.createSpyObj('ParamMap', ['get', 'getAll', 'has', 'keys']),
      queryParamMap: jasmine.createSpyObj('ParamMap', ['get', 'getAll', 'has', 'keys']),
      title: undefined
    };

    mockState = {
      url: '/test',
      root: {} as ActivatedRouteSnapshot
    };
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });

  it('should return true when user is authorized', async () => {
    mockAuthService.isAccessAllowed.and.returnValue(Promise.resolve(true));

    const result = await executeGuard(mockRoute, mockState);

    expect(result).toBe(true);
    expect(mockAuthService.isAccessAllowed).toHaveBeenCalledWith(mockRoute, mockState);
  });

  it('should return false when user is not authorized', async () => {
    mockAuthService.isAccessAllowed.and.returnValue(Promise.resolve(false));

    const result = await executeGuard(mockRoute, mockState);

    expect(result).toBe(false);
    expect(mockAuthService.isAccessAllowed).toHaveBeenCalledWith(mockRoute, mockState);
  });

  it('should handle promise rejection from auth service', async () => {
    mockAuthService.isAccessAllowed.and.returnValue(Promise.reject(new Error('Auth service error')));

    try {
      await executeGuard(mockRoute, mockState);
      fail('Expected error to be thrown');
    } catch (error) {
      expect(error).toEqual(jasmine.any(Error));
      expect(mockAuthService.isAccessAllowed).toHaveBeenCalledWith(mockRoute, mockState);
    }
  });

  it('should pass correct route parameters to auth service', async () => {
    mockRoute.params = { id: '123' };
    mockRoute.queryParams = { tab: 'details' };
    mockRoute.data = { requiresAuth: true };
    mockAuthService.isAccessAllowed.and.returnValue(Promise.resolve(true));

    await executeGuard(mockRoute, mockState);

    expect(mockAuthService.isAccessAllowed).toHaveBeenCalledWith(
      jasmine.objectContaining({
        params: { id: '123' },
        queryParams: { tab: 'details' },
        data: { requiresAuth: true }
      }),
      mockState
    );
  });

  it('should pass correct state information to auth service', async () => {
    mockState.url = '/protected-route?param=value';
    mockAuthService.isAccessAllowed.and.returnValue(Promise.resolve(true));

    await executeGuard(mockRoute, mockState);

    expect(mockAuthService.isAccessAllowed).toHaveBeenCalledWith(
      mockRoute,
      jasmine.objectContaining({
        url: '/protected-route?param=value'
      })
    );
  });

  describe('Different route scenarios', () => {
    it('should handle routes with children', async () => {
      const childRoute = {
        ...mockRoute,
        parent: mockRoute,
        pathFromRoot: [mockRoute]
      };
      mockRoute.children = [childRoute];
      mockAuthService.isAccessAllowed.and.returnValue(Promise.resolve(true));

      const result = await executeGuard(mockRoute, mockState);

      expect(result).toBe(true);
    });

    it('should handle routes with fragments', async () => {
      mockRoute.fragment = 'section1';
      mockAuthService.isAccessAllowed.and.returnValue(Promise.resolve(true));

      const result = await executeGuard(mockRoute, mockState);

      expect(result).toBe(true);
    });

    it('should handle routes with outlet', async () => {
      mockRoute.outlet = 'sidebar';
      mockAuthService.isAccessAllowed.and.returnValue(Promise.resolve(true));

      const result = await executeGuard(mockRoute, mockState);

      expect(result).toBe(true);
    });
  });

  describe('Error handling', () => {
    it('should handle auth service returning undefined', async () => {
      mockAuthService.isAccessAllowed.and.returnValue(Promise.resolve(undefined as any));

      const result = await executeGuard(mockRoute, mockState);

      expect(result).toBeUndefined();
    });

    it('should handle synchronous errors from auth service', async () => {
      mockAuthService.isAccessAllowed.and.throwError('Sync error');

      try {
        await executeGuard(mockRoute, mockState);
        fail('Expected error to be thrown');
      } catch (error) {
        expect(error).toEqual('Sync error');
      }
    });
  });

  describe('Performance considerations', () => {
    it('should only call auth service once per guard execution', async () => {
      mockAuthService.isAccessAllowed.and.returnValue(Promise.resolve(true));

      await executeGuard(mockRoute, mockState);

      expect(mockAuthService.isAccessAllowed).toHaveBeenCalledTimes(1);
    });

    it('should handle multiple concurrent calls', async () => {
      mockAuthService.isAccessAllowed.and.returnValue(Promise.resolve(true));

      const promises = [
        executeGuard(mockRoute, mockState),
        executeGuard(mockRoute, mockState),
        executeGuard(mockRoute, mockState)
      ];

      const results = await Promise.all(promises);

      expect(results).toEqual([true, true, true]);
      expect(mockAuthService.isAccessAllowed).toHaveBeenCalledTimes(3);
    });
  });

  describe('Integration with Angular Router', () => {
    it('should work with TestBed injection context', () => {
      TestBed.runInInjectionContext(() => {
        const authService = TestBed.inject(AuthService);
        expect(authService).toBeTruthy();
      });
    });

    it('should be compatible with router configuration', () => {
      const guardFunction = authGuard;
      expect(typeof guardFunction).toBe('function');
      expect(guardFunction.length).toBe(2); // Should accept route and state parameters
    });
  });
});
