import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { EnvironmentService } from './environment.service';

describe('EnvironmentService', () => {
  let service: EnvironmentService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [EnvironmentService]
    });
    service = TestBed.inject(EnvironmentService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return null for config when currentEnv is not set', () => {
    const result = service.getConfig('apiUrl');
    expect(result).toBeNull();
  });

  it('should return config value when currentEnv is set', () => {
    // Set currentEnv directly for testing
    (service as any).currentEnv = 'dev';
    const result = service.getConfig('apiUrl');
    expect(result).toBe('https://vega-manna-dev.olamdigital.com/');
  });

  it('should get current environment', () => {
    (service as any).currentEnv = 'dev';
    const env = service.getEnv();
    expect(env).toBe('dev');
  });

  it('should load environment and config from assets', async () => {
    const mockEnvResponse = { env: 'dev' };

    const loadPromise = service.loadEnvAndConfig();

    const req = httpMock.expectOne('../assets/env/env.json');
    expect(req.request.method).toBe('GET');
    req.flush(mockEnvResponse);

    const result = await loadPromise;
    expect(result).toBe(true);
    expect(service.getEnv()).toBe('dev');
  });

  it('should handle different environment configurations', () => {
    // Test dev environment
    (service as any).currentEnv = 'dev';
    expect(service.getConfig('apiUrl')).toBe('https://vega-manna-dev.olamdigital.com/');

    // Test sit environment  
    (service as any).currentEnv = 'sit';
    expect(service.getConfig('apiUrl')).toBe('https://vega-manna-sit.olamdigital.com/');

    // Test uat environment
    (service as any).currentEnv = 'uat';
    expect(service.getConfig('apiUrl')).toBe('https://vega-manna-uat.olamdigital.com/');

    // Test prod environment
    (service as any).currentEnv = 'prod';
    expect(service.getConfig('apiUrl')).toBe('https://vega-prod.olamdigital.com/');
  });

  it('should get crypto key from configuration', () => {
    (service as any).currentEnv = 'dev';
    const cryptoKey = service.getConfig('cryptoKey');
    expect(cryptoKey).toBe('18jkbasdhuicjhg+79o=76');
  });

  it('should get keycloak config', () => {
    (service as any).currentEnv = 'dev';
    const keycloakConfig = service.getConfig('keycloakConfig');
    expect(keycloakConfig).toEqual({
      url: "https://digitalauthdev.olamnet.com/auth/",
      realm: "vega-manna-dev",
      clientId: "ofi-vega-portal-dev"
    });
  });
});