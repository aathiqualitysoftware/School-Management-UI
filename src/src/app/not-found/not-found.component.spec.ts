import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DebugElement } from '@angular/core';

import { NotFoundComponent } from './not-found.component';

describe('NotFoundComponent', () => {
  let component: NotFoundComponent;
  let fixture: ComponentFixture<NotFoundComponent>;
  let debugElement: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NotFoundComponent, HttpClientTestingModule]
    })
      .compileComponents();

    fixture = TestBed.createComponent(NotFoundComponent);
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

  it('should use app-not-found selector', () => {
    const componentDef = (component.constructor as any).ɵcmp;
    expect(componentDef.selectors[0][0]).toBe('app-not-found');
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

  it('should be properly initialized', () => {
    expect(component).toBeInstanceOf(NotFoundComponent);
  });

  it('should have correct component configuration', () => {
    const componentMetadata = (component.constructor as any).ɵcmp;
    expect(componentMetadata).toBeDefined();
    expect(componentMetadata.type).toBe(NotFoundComponent);
  });

  it('should render template successfully', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled).toBeDefined();
  });

  it('should maintain component state', () => {
    // Since this is a simple component with no state, just verify it doesn't change
    const initialComponent = fixture.componentInstance;
    fixture.detectChanges();
    expect(fixture.componentInstance).toBe(initialComponent);
  });
});

