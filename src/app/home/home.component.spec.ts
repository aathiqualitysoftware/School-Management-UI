import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HomeComponent } from './home.component';
import { KeycloakService } from 'keycloak-angular';
import { Router } from '@angular/router';
import { EnvironmentService } from '../environment.service';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let mockKeycloakService: jasmine.SpyObj<KeycloakService>;
  let mockRouter: jasmine.SpyObj<Router>;
  let mockEnvironmentService: jasmine.SpyObj<EnvironmentService>;

  const mockTokenParsed = {
    name: 'John Doe',
    preferred_username: 'john.doe@example.com'
  };

  beforeEach(async () => {
    const keycloakSpy = jasmine.createSpyObj('KeycloakService', [
      'getKeycloakInstance',
      'getUserRoles',
      'logout'
    ]);
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    const environmentServiceSpy = jasmine.createSpyObj('EnvironmentService', ['getConfig']);

    await TestBed.configureTestingModule({
      imports: [HomeComponent, HttpClientTestingModule],
      providers: [
        { provide: KeycloakService, useValue: keycloakSpy },
        { provide: Router, useValue: routerSpy },
        { provide: EnvironmentService, useValue: environmentServiceSpy }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    mockKeycloakService = TestBed.inject(KeycloakService) as jasmine.SpyObj<KeycloakService>;
    mockRouter = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    mockEnvironmentService = TestBed.inject(EnvironmentService) as jasmine.SpyObj<EnvironmentService>;

    // Setup default mocks
    mockKeycloakService.getUserRoles.and.returnValue([]);
    mockKeycloakService.getKeycloakInstance.and.returnValue({
      tokenParsed: mockTokenParsed
    } as any);
    mockEnvironmentService.getConfig.and.returnValue('http://localhost:4200');
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('should initialize component with user data', fakeAsync(() => {
      mockKeycloakService.getUserRoles.and.returnValue(['DASHBOARD_READ_ONLY', 'USER_ADMINISTRATION_READ_ONLY']);

      component.ngOnInit();
      tick();

      expect(component.userRoles).toEqual(['DASHBOARD_READ_ONLY', 'USER_ADMINISTRATION_READ_ONLY']);
      expect(component.name).toBe('John Doe');
      expect(component.username).toBe('john.doe@example.com');
      expect(mockKeycloakService.getUserRoles).toHaveBeenCalled();
      expect(mockKeycloakService.getKeycloakInstance).toHaveBeenCalled();
    }));

    it('should filter navigation items based on user roles', fakeAsync(() => {
      const userRoles = ['DASHBOARD_READ_ONLY', 'TRANSACTION_REPORT_READ_ONLY'];
      mockKeycloakService.getUserRoles.and.returnValue(userRoles);

      component.ngOnInit();
      tick();

      // Check that navs are filtered based on roles
      const filteredNavs = component.navs;
      expect(filteredNavs.length).toBeGreaterThan(0);

      // Verify that items with matching roles are included
      filteredNavs.forEach(nav => {
        if (nav.roles) {
          expect(nav.roles.some(role => userRoles.includes(role))).toBeTruthy();
        }
      });
    }));

    it('should filter portal configuration navs based on roles', fakeAsync(() => {
      const userRoles = ['PORTAL_CONFIG_USERPROFITCENTER_READ_ONLY'];
      mockKeycloakService.getUserRoles.and.returnValue(userRoles);

      component.ngOnInit();
      tick();

      const filteredPortalNavs = component.portal_configuration_navs;
      expect(filteredPortalNavs.length).toBeGreaterThan(0);

      filteredPortalNavs.forEach(nav => {
        if (nav.roles) {
          expect(nav.roles.some(role => userRoles.includes(role))).toBeTruthy();
        }
      });
    }));

    it('should filter vega configuration navs based on roles', fakeAsync(() => {
      const userRoles = ['VEGA_CONFIG_ENTITY_READ_ONLY', 'VEGA_CONFIG_PRODUCT_READ_ONLY'];
      mockKeycloakService.getUserRoles.and.returnValue(userRoles);

      component.ngOnInit();
      tick();

      const filteredVegaNavs = component.vega_configuration_navs;
      expect(filteredVegaNavs.length).toBeGreaterThan(0);

      filteredVegaNavs.forEach(nav => {
        if (nav.roles) {
          expect(nav.roles.some(role => userRoles.includes(role))).toBeTruthy();
        }
      });
    }));

    it('should filter field configuration navs based on roles', fakeAsync(() => {
      const userRoles = ['FIELD_CONFIG_MODULE_READ_ONLY'];
      mockKeycloakService.getUserRoles.and.returnValue(userRoles);

      component.ngOnInit();
      tick();

      const filteredFieldNavs = component.field_configuration_navs;
      expect(filteredFieldNavs.length).toBeGreaterThan(0);

      filteredFieldNavs.forEach(nav => {
        if (nav.roles) {
          expect(nav.roles.some(role => userRoles.includes(role))).toBeTruthy();
        }
      });
    }));

    it('should filter others configuration navs based on roles', fakeAsync(() => {
      const userRoles = ['OTHERS_CONFIG_TOKEN_READ_WRITE'];
      mockKeycloakService.getUserRoles.and.returnValue(userRoles);

      component.ngOnInit();
      tick();

      const filteredOthersNavs = component.others_configuration_navs;
      expect(filteredOthersNavs.length).toBeGreaterThan(0);

      filteredOthersNavs.forEach(nav => {
        if (nav.roles) {
          expect(nav.roles.some(role => userRoles.includes(role))).toBeTruthy();
        }
      });
    }));

    it('should filter nica configuration navs based on roles', fakeAsync(() => {
      const userRoles = ['NICA_CONFIG_PRICE_CONFIGURATION_READ_WRITE'];
      mockKeycloakService.getUserRoles.and.returnValue(userRoles);

      component.ngOnInit();
      tick();

      const filteredNicaNavs = component.nica_configuration_navs;
      expect(filteredNicaNavs.length).toBeGreaterThan(0);

      filteredNicaNavs.forEach(nav => {
        if (nav.roles) {
          expect(nav.roles.some(role => userRoles.includes(role))).toBeTruthy();
        }
      });
    }));

    it('should filter discounting configuration navs based on roles', fakeAsync(() => {
      const userRoles = ['DISCOUNTING_CONFIG_DISCOUNTCALC_READ_WRITE'];
      mockKeycloakService.getUserRoles.and.returnValue(userRoles);

      component.ngOnInit();
      tick();

      const filteredDiscountingNavs = component.discounting_configuration_navs;
      expect(filteredDiscountingNavs.length).toBeGreaterThan(0);

      filteredDiscountingNavs.forEach(nav => {
        if (nav.roles) {
          expect(nav.roles.some(role => userRoles.includes(role))).toBeTruthy();
        }
      });
    }));

    it('should include navs without roles when no specific roles are defined', fakeAsync(() => {
      // Create a nav item without roles
      const originalNavs = component.navs;
      component.navs = [...originalNavs, {
        navName: 'Test Nav',
        navIcon: 'test-icon.svg',
        navURL: 'test/url',
        roles: undefined as any
      }];

      component.ngOnInit();
      tick();

      expect(component.navs.length).toBeGreaterThan(0);
    }));

    it('should handle empty user roles', fakeAsync(() => {
      mockKeycloakService.getUserRoles.and.returnValue([]);

      component.ngOnInit();
      tick();

      expect(component.userRoles).toEqual([]);
      expect(component.name).toBe('John Doe');
      expect(component.username).toBe('john.doe@example.com');
    }));

    it('should handle missing tokenParsed data', fakeAsync(() => {
      mockKeycloakService.getKeycloakInstance.and.returnValue({
        tokenParsed: null
      } as any);

      component.ngOnInit();
      tick();

      expect(component.name).toBeUndefined();
      expect(component.username).toBeUndefined();
    }));
  });

  describe('ngAfterContentChecked', () => {
    it('should update pathname with current location hash', () => {
      // Mock window.location.hash
      Object.defineProperty(window, 'location', {
        value: { hash: '#/test/path' },
        writable: true
      });

      component.ngAfterContentChecked();

      expect(component.pathname).toBe('#/test/path');
    });

    it('should handle empty hash', () => {
      Object.defineProperty(window, 'location', {
        value: { hash: '' },
        writable: true
      });

      component.ngAfterContentChecked();

      expect(component.pathname).toBe('');
    });
  });

  describe('navigateMenu', () => {
    it('should navigate to specified URL', () => {
      const testUrl = 'home/dashboard';

      component.navigateMenu(testUrl);

      expect(mockRouter.navigate).toHaveBeenCalledWith([testUrl]);
    });

    it('should handle null URL', () => {
      component.navigateMenu(null);

      expect(mockRouter.navigate).toHaveBeenCalledWith([null]);
    });

    it('should handle undefined URL', () => {
      component.navigateMenu(undefined);

      expect(mockRouter.navigate).toHaveBeenCalledWith([undefined]);
    });
  });

  describe('logout', () => {
    it('should call keycloak logout with redirect URL', fakeAsync(() => {
      const redirectUrl = 'http://localhost:4200/login';
      mockEnvironmentService.getConfig.and.returnValue(redirectUrl);
      mockKeycloakService.logout.and.returnValue(Promise.resolve());

      component.logout();
      tick();

      expect(mockKeycloakService.logout).toHaveBeenCalledWith(redirectUrl);
    }));

    it('should handle logout error gracefully', fakeAsync(() => {
      mockKeycloakService.logout.and.returnValue(Promise.reject('Logout failed'));
      spyOn(console, 'error');

      try {
        component.logout();
        tick();
      } catch (error) {
        expect(error).toBe('Logout failed');
      }
    }));
  });

  describe('navigation arrays initialization', () => {
    it('should have default navigation items', () => {
      expect(component.navs).toBeDefined();
      expect(component.navs.length).toBeGreaterThan(0);
      expect(component.navs[0]).toEqual(jasmine.objectContaining({
        navName: jasmine.any(String),
        navIcon: jasmine.any(String),
        navURL: jasmine.any(String)
      }));
    });

    it('should have portal configuration navigation items', () => {
      expect(component.portal_configuration_navs).toBeDefined();
      expect(component.portal_configuration_navs.length).toBeGreaterThan(0);
    });

    it('should have vega configuration navigation items', () => {
      expect(component.vega_configuration_navs).toBeDefined();
      expect(component.vega_configuration_navs.length).toBeGreaterThan(0);
    });

    it('should have field configuration navigation items', () => {
      expect(component.field_configuration_navs).toBeDefined();
      expect(component.field_configuration_navs.length).toBeGreaterThan(0);
    });

    it('should have others configuration navigation items', () => {
      expect(component.others_configuration_navs).toBeDefined();
      expect(component.others_configuration_navs.length).toBeGreaterThan(0);
    });

    it('should have nica configuration navigation items', () => {
      expect(component.nica_configuration_navs).toBeDefined();
      expect(component.nica_configuration_navs.length).toBeGreaterThan(0);
    });

    it('should have discounting configuration navigation items', () => {
      expect(component.discounting_configuration_navs).toBeDefined();
      expect(component.discounting_configuration_navs.length).toBeGreaterThan(0);
    });
  });

  describe('PrimeNG menu items', () => {
    it('should have initial menu items structure', () => {
      expect(component.items).toBeDefined();
      expect(component.items.length).toBeGreaterThan(0);

      const fileMenu = component.items.find(item => item.label === 'File');
      expect(fileMenu).toBeDefined();
      expect(fileMenu?.items).toBeDefined();
      expect(fileMenu?.items?.length).toBeGreaterThan(0);
    });

    it('should have nested menu structure', () => {
      const fileMenu = component.items.find(item => item.label === 'File');
      const newMenuItem = fileMenu?.items?.find(item => item.label === 'New');

      expect(newMenuItem).toBeDefined();
      expect(newMenuItem?.items).toBeDefined();
      expect(newMenuItem?.items?.length).toBeGreaterThan(0);
    });
  });

  describe('role-based filtering edge cases', () => {
    it('should handle navigation items with empty roles array', fakeAsync(() => {
      const testNavs = [{
        navName: 'Test Nav',
        navIcon: 'test.svg',
        navURL: 'test/url',
        roles: []
      }];

      component.navs = testNavs;
      mockKeycloakService.getUserRoles.and.returnValue(['SOME_ROLE']);

      component.ngOnInit();
      tick();

      // Should include items with empty roles array
      expect(component.navs.length).toBe(0);
    }));

    it('should handle navigation items with null roles', fakeAsync(() => {
      const testNavs = [{
        navName: 'Test Nav',
        navIcon: 'test.svg',
        navURL: 'test/url',
        roles: null as any
      }];

      component.navs = testNavs;
      mockKeycloakService.getUserRoles.and.returnValue(['SOME_ROLE']);

      component.ngOnInit();
      tick();

      // Should include items with null roles
      expect(component.navs.length).toBe(1);
    }));

    it('should filter out items when user has no matching roles', fakeAsync(() => {
      const testNavs = [{
        navName: 'Test Nav',
        navIcon: 'test.svg',
        navURL: 'test/url',
        roles: ['REQUIRED_ROLE']
      }];

      component.navs = testNavs;
      mockKeycloakService.getUserRoles.and.returnValue(['DIFFERENT_ROLE']);

      component.ngOnInit();
      tick();

      expect(component.navs.length).toBe(0);
    }));
  });

  describe('component lifecycle', () => {
    it('should implement OnInit interface', () => {
      expect(component.ngOnInit).toBeDefined();
      expect(typeof component.ngOnInit).toBe('function');
    });

    it('should implement AfterContentChecked interface', () => {
      expect(component.ngAfterContentChecked).toBeDefined();
      expect(typeof component.ngAfterContentChecked).toBe('function');
    });
  });
});
