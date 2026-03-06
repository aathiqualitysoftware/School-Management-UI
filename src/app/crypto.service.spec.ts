import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CryptoService } from './crypto.service';
import { EnvironmentService } from './environment.service';

describe('CryptoService', () => {
  let service: CryptoService;
  let mockEnvironmentService: jasmine.SpyObj<EnvironmentService>;

  beforeEach(() => {
    const environmentSpy = jasmine.createSpyObj('EnvironmentService', ['getConfig']);

    TestBed.configureTestingModule({
      providers: [
        CryptoService,
        { provide: EnvironmentService, useValue: environmentSpy }
      ]
    });

    service = TestBed.inject(CryptoService);
    mockEnvironmentService = TestBed.inject(EnvironmentService) as jasmine.SpyObj<EnvironmentService>;
    mockEnvironmentService.getConfig.and.returnValue('test-crypto-key');
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should save and retrieve data from sessionStorage', async () => {
    const key = 'testKey';
    const value = 'testValue';

    spyOn(sessionStorage, 'setItem');
    spyOn(sessionStorage, 'getItem').and.returnValue(service['encrypt'](value));

    await service.saveData(key, value);
    expect(sessionStorage.setItem).toHaveBeenCalled();

    const retrievedValue = service.getData(key);
    expect(retrievedValue).toBe(value);
  });

  it('should handle empty data from sessionStorage', () => {
    const key = 'nonExistentKey';

    spyOn(sessionStorage, 'getItem').and.returnValue(null);

    const result = service.getData(key);
    expect(result).toBe('');
  });

  it('should remove data from sessionStorage', () => {
    const key = 'testKey';

    spyOn(sessionStorage, 'removeItem');

    service.removeData(key);
    expect(sessionStorage.removeItem).toHaveBeenCalledWith(key);
  });

  it('should clear all data from sessionStorage', () => {
    spyOn(sessionStorage, 'clear');

    service.clearData();
    expect(sessionStorage.clear).toHaveBeenCalled();
  });

  it('should encrypt and decrypt data correctly', () => {
    const originalText = 'test encryption';

    const encrypted = service['encrypt'](originalText);
    const decrypted = service['decrypt'](encrypted);

    expect(encrypted).not.toBe(originalText);
    expect(decrypted).toBe(originalText);
  });
});

