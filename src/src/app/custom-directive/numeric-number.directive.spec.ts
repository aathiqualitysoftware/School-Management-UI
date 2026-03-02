import { ElementRef, DebugElement, SimpleChanges } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { By } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { NumericNumberDirective } from './numeric-number.directive';

@Component({
  template: `
    <input 
      type="text" 
      appNumericNumber
      [decimal]="decimal"
      [decimalSeparator]="decimalSeparator"
      [min]="min"
      [max]="max"
      [pattern]="pattern"
      [(ngModel)]="testValue"
      #testInput>
  `
})
class TestComponent {
  testValue = '';
  decimal = false;
  decimalSeparator = '.';
  min = -Infinity;
  max = Infinity;
  pattern?: string | RegExp;
}

describe('NumericNumberDirective', () => {
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;
  let directive: NumericNumberDirective;
  let inputElement: HTMLInputElement;
  let inputDebugElement: DebugElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestComponent],
      imports: [NumericNumberDirective, FormsModule]
    });

    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    inputDebugElement = fixture.debugElement.query(By.directive(NumericNumberDirective));
    directive = inputDebugElement.injector.get(NumericNumberDirective);
    inputElement = inputDebugElement.nativeElement;
    fixture.detectChanges();
  });

  it('should create an instance', () => {
    expect(directive).toBeTruthy();
  });

  it('should initialize with default values', () => {
    expect(directive.decimal).toBe(false);
    expect(directive.decimalSeparator).toBe('.');
    expect(directive.min).toBe(-Infinity);
    expect(directive.max).toBe(Infinity);
    expect(directive.inputElement).toBe(inputElement);
  });

  describe('ngOnChanges', () => {
    it('should update regex when pattern changes', () => {
      const changes: SimpleChanges = {
        pattern: {
          currentValue: '^\\d{1,3}$',
          previousValue: undefined,
          firstChange: true,
          isFirstChange: () => true
        }
      };

      directive.pattern = '^\\d{1,3}$';
      directive.ngOnChanges(changes);

      expect(directive['regex']).toEqual(jasmine.any(RegExp));
    });

    it('should update min value when min changes', () => {
      const changes: SimpleChanges = {
        min: {
          currentValue: 10,
          previousValue: -Infinity,
          firstChange: false,
          isFirstChange: () => false
        }
      };

      directive.min = 10;
      directive.ngOnChanges(changes);

      expect(directive.min).toBe(10);
    });

    it('should set min to -Infinity for invalid min value', () => {
      const changes: SimpleChanges = {
        min: {
          currentValue: 'invalid',
          previousValue: -Infinity,
          firstChange: false,
          isFirstChange: () => false
        }
      };

      directive.min = 'invalid' as any;
      directive.ngOnChanges(changes);

      expect(directive.min).toBe(-Infinity);
    });

    it('should update max value when max changes', () => {
      const changes: SimpleChanges = {
        max: {
          currentValue: 100,
          previousValue: Infinity,
          firstChange: false,
          isFirstChange: () => false
        }
      };

      directive.max = 100;
      directive.ngOnChanges(changes);

      expect(directive.max).toBe(100);
    });

    it('should set max to Infinity for invalid max value', () => {
      const changes: SimpleChanges = {
        max: {
          currentValue: 'invalid',
          previousValue: Infinity,
          firstChange: false,
          isFirstChange: () => false
        }
      };

      directive.max = 'invalid' as any;
      directive.ngOnChanges(changes);

      expect(directive.max).toBe(Infinity);
    });
  });

  describe('onKeyDown - Navigation Keys', () => {
    it('should allow navigation keys', () => {
      const navigationKeys = [
        'Backspace', 'Delete', 'Tab', 'Escape', 'Enter',
        'Home', 'End', 'ArrowLeft', 'ArrowRight', 'Clear', 'Copy', 'Paste'
      ];

      navigationKeys.forEach(key => {
        const event = new KeyboardEvent('keydown', { key });
        spyOn(event, 'preventDefault');

        directive.onKeyDown(event);

        expect(event.preventDefault).not.toHaveBeenCalled();
      });
    });
  });

  describe('onKeyDown - Decimal Input', () => {
    beforeEach(() => {
      directive.decimal = true;
      directive.decimalSeparator = '.';
    });

    it('should allow single decimal point', () => {
      inputElement.value = '123';
      inputElement.setSelectionRange(3, 3);

      const event = new KeyboardEvent('keydown', { key: '.' });
      spyOn(event, 'preventDefault');
      spyOn(directive as any, 'forecastValue').and.returnValue('123.');

      directive.onKeyDown(event);

      expect(event.preventDefault).not.toHaveBeenCalled();
    });

    it('should prevent multiple decimal points', () => {
      inputElement.value = '12.3';
      inputElement.setSelectionRange(4, 4);

      const event = new KeyboardEvent('keydown', { key: '.' });
      spyOn(event, 'preventDefault');
      spyOn(directive as any, 'forecastValue').and.returnValue('12.3.');

      directive.onKeyDown(event);

      expect(event.preventDefault).toHaveBeenCalled();
    });
  });

  describe('onKeyDown - Numeric Input', () => {
    it('should allow numeric keys', () => {
      for (let i = 0; i <= 9; i++) {
        const event = new KeyboardEvent('keydown', { key: i.toString() });
        spyOn(event, 'preventDefault');
        spyOn(directive as any, 'forecastValue').and.returnValue(i.toString());

        directive.onKeyDown(event);

        expect(event.preventDefault).not.toHaveBeenCalled();
      }
    });

    it('should prevent non-numeric keys', () => {
      const nonNumericKeys = ['a', 'b', 'c', '!', '@', '#'];

      nonNumericKeys.forEach(key => {
        const event = new KeyboardEvent('keydown', { key });
        spyOn(event, 'preventDefault');

        directive.onKeyDown(event);

        expect(event.preventDefault).toHaveBeenCalled();
      });
    });

    it('should prevent space key', () => {
      const event = new KeyboardEvent('keydown', { key: ' ' });
      spyOn(event, 'preventDefault');

      directive.onKeyDown(event);

      expect(event.preventDefault).toHaveBeenCalled();
    });
  });

  describe('onKeyDown - Min/Max Validation', () => {
    beforeEach(() => {
      directive.min = 10;
      directive.max = 100;
    });

    it('should prevent input below minimum value', () => {
      const event = new KeyboardEvent('keydown', { key: '5' });
      spyOn(event, 'preventDefault');
      spyOn(directive as any, 'forecastValue').and.returnValue('5');

      directive.onKeyDown(event);

      expect(event.preventDefault).toHaveBeenCalled();
    });

    it('should prevent input above maximum value', () => {
      const event = new KeyboardEvent('keydown', { key: '5' });
      spyOn(event, 'preventDefault');
      spyOn(directive as any, 'forecastValue').and.returnValue('150');

      directive.onKeyDown(event);

      expect(event.preventDefault).toHaveBeenCalled();
    });

    it('should allow input within range', () => {
      const event = new KeyboardEvent('keydown', { key: '5' });
      spyOn(event, 'preventDefault');
      spyOn(directive as any, 'forecastValue').and.returnValue('50');

      directive.onKeyDown(event);

      expect(event.preventDefault).not.toHaveBeenCalled();
    });
  });

  describe('onKeyDown - Pattern Validation', () => {
    beforeEach(() => {
      directive.pattern = '^\\d{1,3}$'; // Only 1-3 digits
      directive.ngOnChanges({
        pattern: {
          currentValue: '^\\d{1,3}$',
          previousValue: undefined,
          firstChange: true,
          isFirstChange: () => true
        }
      });
    });

    it('should allow input matching pattern', () => {
      const event = new KeyboardEvent('keydown', { key: '5' });
      spyOn(event, 'preventDefault');
      spyOn(directive as any, 'forecastValue').and.returnValue('125');

      directive.onKeyDown(event);

      expect(event.preventDefault).not.toHaveBeenCalled();
    });

    it('should prevent input not matching pattern', () => {
      const event = new KeyboardEvent('keydown', { key: '5' });
      spyOn(event, 'preventDefault');
      spyOn(directive as any, 'forecastValue').and.returnValue('1255');

      directive.onKeyDown(event);

      expect(event.preventDefault).toHaveBeenCalled();
    });
  });

  describe('forecastValue', () => {
    beforeEach(() => {
      inputElement.value = 'hello world';
    });

    it('should insert character at cursor position', () => {
      inputElement.setSelectionRange(5, 5); // position at space

      const result = (directive as any).forecastValue('X');

      expect(result).toBe('helloX world');
    });

    it('should replace selected text', () => {
      inputElement.setSelectionRange(0, 5); // select 'hello'

      const result = (directive as any).forecastValue('X');

      expect(result).toBe('X world');
    });

    it('should append character at end', () => {
      inputElement.setSelectionRange(11, 11); // end position

      const result = (directive as any).forecastValue('!');

      expect(result).toBe('hello world!');
    });

    it('should insert character at beginning', () => {
      inputElement.setSelectionRange(0, 0); // beginning

      const result = (directive as any).forecastValue('X');

      expect(result).toBe('Xhello world');
    });

    it('should handle empty input', () => {
      inputElement.value = '';
      inputElement.setSelectionRange(0, 0);

      const result = (directive as any).forecastValue('5');

      expect(result).toBe('5');
    });
  });

  describe('Integration Tests', () => {
    it('should work with decimal input through component', () => {
      component.decimal = true;
      fixture.detectChanges();

      inputElement.value = '12';
      inputElement.setSelectionRange(2, 2);

      const event = new KeyboardEvent('keydown', { key: '.' });
      inputElement.dispatchEvent(event);

      // Should not prevent the decimal point
      expect(directive['hasDecimalPoint']).toBeFalsy(); // Will be set after the event
    });

    it('should work with min/max through component', () => {
      component.min = 0;
      component.max = 100;
      fixture.detectChanges();

      // Test should now use the updated min/max values
      expect(directive.min).toBe(0);
      expect(directive.max).toBe(100);
    });

    it('should update pattern through component', () => {
      component.pattern = '^\\d{1,2}$';
      fixture.detectChanges();

      expect(directive.pattern).toBe('^\\d{1,2}$');
    });
  });

  describe('Edge Cases', () => {
    it('should handle null selection range', () => {
      inputElement.value = 'test';
      // Simulate null selection
      Object.defineProperty(inputElement, 'selectionStart', { value: null });
      Object.defineProperty(inputElement, 'selectionEnd', { value: null });

      expect(() => {
        (directive as any).forecastValue('x');
      }).not.toThrow();
    });

    it('should handle very large numbers', () => {
      directive.max = Number.MAX_SAFE_INTEGER;
      const event = new KeyboardEvent('keydown', { key: '9' });
      spyOn(directive as any, 'forecastValue').and.returnValue(Number.MAX_SAFE_INTEGER.toString());

      expect(() => {
        directive.onKeyDown(event);
      }).not.toThrow();
    });

    it('should handle negative numbers', () => {
      directive.min = -100;
      const event = new KeyboardEvent('keydown', { key: '5' });
      spyOn(directive as any, 'forecastValue').and.returnValue('-50');
      spyOn(event, 'preventDefault');

      directive.onKeyDown(event);

      expect(event.preventDefault).not.toHaveBeenCalled();
    });

    it('should handle custom decimal separator', () => {
      directive.decimal = true;
      directive.decimalSeparator = ',';

      const event = new KeyboardEvent('keydown', { key: ',' });
      spyOn(directive as any, 'forecastValue').and.returnValue('12,');
      spyOn(event, 'preventDefault');

      directive.onKeyDown(event);

      expect(event.preventDefault).not.toHaveBeenCalled();
    });
  });
});
