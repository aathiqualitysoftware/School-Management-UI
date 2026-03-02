import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ForbiddenComponent } from './forbidden.component';
import { DebugElement } from '@angular/core';

describe('ForbiddenComponent', () => {
  let component: ForbiddenComponent;
  let fixture: ComponentFixture<ForbiddenComponent>;
  let debugElement: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ForbiddenComponent, HttpClientTestingModule]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ForbiddenComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be a standalone component', () => {
    expect((component.constructor as any).ɵcmp?.standalone).toBeTruthy();
  });

  it('should use app-forbidden selector', () => {
    const componentDef = (component.constructor as any).ɵcmp;
    expect(componentDef.selectors[0][0]).toBe('app-forbidden');
  });

  it('should have empty imports array', () => {
    const componentDef = (component.constructor as any).ɵcmp;
    expect(componentDef.imports).toEqual([]);
  });

  it('should render without errors', () => {
    expect(() => fixture.detectChanges()).not.toThrow();
  });

  it('should have template and stylesheet defined', () => {
    const componentDef = (component.constructor as any).ɵcmp;
    expect(componentDef.template).toBeDefined();
    expect(componentDef.styles).toBeDefined();
  });

  it('should be instantiable', () => {
    const forbiddenComponent = new ForbiddenComponent();
    expect(forbiddenComponent).toBeTruthy();
    expect(forbiddenComponent instanceof ForbiddenComponent).toBeTruthy();
  });

  it('should have no public methods besides constructor', () => {
    const publicMethods = Object.getOwnPropertyNames(Object.getPrototypeOf(component))
      .filter(method => method !== 'constructor' && typeof component[method as keyof ForbiddenComponent] === 'function');

    expect(publicMethods.length).toBe(0);
  });

  it('should have no public properties', () => {
    const publicProperties = Object.getOwnPropertyNames(component)
      .filter(prop => !prop.startsWith('_'));

    expect(publicProperties.length).toBe(0);
  });

  it('should maintain component state after detection changes', () => {
    expect(component).toBeTruthy();
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });
});

