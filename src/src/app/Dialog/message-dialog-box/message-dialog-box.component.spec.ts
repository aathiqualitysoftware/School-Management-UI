import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MessageDialogBoxComponent } from './message-dialog-box.component';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { MessageService } from 'primeng/api';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Subject } from 'rxjs';

describe('MessageDialogBoxComponent', () => {
  let component: MessageDialogBoxComponent;
  let fixture: ComponentFixture<MessageDialogBoxComponent>;
  let mockDynamicDialogConfig: DynamicDialogConfig;
  let mockDynamicDialogRef: jasmine.SpyObj<DynamicDialogRef>;
  let mockMessageService: jasmine.SpyObj<MessageService>;

  beforeEach(async () => {
    mockDynamicDialogConfig = {
      data: {}
    };

    const dynamicDialogRefSpy = jasmine.createSpyObj('DynamicDialogRef', ['close']);
    const messageServiceSpy = jasmine.createSpyObj('MessageService', ['add']);
    (messageServiceSpy as any).messageObserver = new Subject();
    (messageServiceSpy as any).clearObserver = new Subject();

    await TestBed.configureTestingModule({
      imports: [MessageDialogBoxComponent, HttpClientTestingModule],
      providers: [
        { provide: DynamicDialogConfig, useValue: mockDynamicDialogConfig },
        { provide: DynamicDialogRef, useValue: dynamicDialogRefSpy },
        { provide: MessageService, useValue: messageServiceSpy }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .overrideComponent(MessageDialogBoxComponent, {
        set: {
          providers: [
            { provide: MessageService, useValue: messageServiceSpy }
          ]
        }
      })
      .compileComponents();

    mockDynamicDialogRef = TestBed.inject(DynamicDialogRef) as jasmine.SpyObj<DynamicDialogRef>;
    mockMessageService = TestBed.inject(MessageService) as jasmine.SpyObj<MessageService>;

    fixture = TestBed.createComponent(MessageDialogBoxComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  describe('Constructor initialization', () => {
    it('should initialize with filter data', () => {
      mockDynamicDialogConfig.data = {
        data: {
          filter: {
            sort: 'ascending'
          }
        }
      };

      fixture = TestBed.createComponent(MessageDialogBoxComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();

      expect(component.filterVal).toBeDefined();
      expect(component.selectedSort).toBe('ascending');
    });

    it('should initialize timeline section with invoice status', () => {
      mockDynamicDialogConfig.data = {
        section: 'timeline',
        data: {
          invoiceNumber: 'INV123'
        }
      };

      fixture = TestBed.createComponent(MessageDialogBoxComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();

      expect(component.invoiceStatus).toBeTrue();
    });

    it('should initialize timeline section with payment NA status', () => {
      mockDynamicDialogConfig.data = {
        section: 'timeline',
        data: {
          paymentStatusText: 'NA'
        }
      };

      fixture = TestBed.createComponent(MessageDialogBoxComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();

      expect(component.paymentNA).toBeTrue();
    });

    it('should initialize timeline section with payment status and set line percentage to 50%', () => {
      mockDynamicDialogConfig.data = {
        section: 'timeline',
        data: {
          paymentStatusText: 'S',
          paymentStatus: true
        }
      };

      fixture = TestBed.createComponent(MessageDialogBoxComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();

      expect(component.paymentStatus).toBeTrue();
      expect(component.linePercentage).toBe('50%');
    });

    it('should initialize timeline section with clearing status and set line percentage to 100%', () => {
      mockDynamicDialogConfig.data = {
        section: 'timeline',
        data: {
          clearingStatus: true
        }
      };

      fixture = TestBed.createComponent(MessageDialogBoxComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();

      expect(component.clearingStatus).toBeTrue();
      expect(component.linePercentage).toBe('100%');
    });

    it('should not set invoice status when invoiceNumber is missing', () => {
      mockDynamicDialogConfig.data = {
        section: 'timeline',
        data: {}
      };

      fixture = TestBed.createComponent(MessageDialogBoxComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();

      expect(component.invoiceStatus).toBeFalse();
    });

    it('should not set payment status when paymentStatusText is not S', () => {
      mockDynamicDialogConfig.data = {
        section: 'timeline',
        data: {
          paymentStatusText: 'P',
          paymentStatus: true
        }
      };

      fixture = TestBed.createComponent(MessageDialogBoxComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();

      expect(component.paymentStatus).toBeFalse();
    });
  });

  describe('selectAll', () => {
    beforeEach(() => {
      component.filterVal = {};
      component.data = {
        data: {
          vendor: ['Vendor1', 'Vendor2', 'Vendor3'],
          filter: {}
        }
      };
      fixture.detectChanges();
    });

    it('should select all items when checked is true', () => {
      const event = { checked: true };
      const key = 'vendor';

      component.selectAll(event, key);

      expect(component.filterVal[key]).toBeDefined();
      expect(component.filterVal[key]['Vendor1']).toBeTrue();
      expect(component.filterVal[key]['Vendor2']).toBeTrue();
      expect(component.filterVal[key]['Vendor3']).toBeTrue();
    });

    it('should clear all items when checked is false', () => {
      component.filterVal['vendor'] = { 'Vendor1': true, 'Vendor2': true };
      const event = { checked: false };
      const key = 'vendor';

      component.selectAll(event, key);

      expect(component.filterVal[key]).toEqual({});
      expect(component.data['data']['filter'][key]).toEqual({});
    });

    it('should initialize filterVal key if not exists when selecting all', () => {
      delete component.filterVal['vendor'];
      const event = { checked: true };
      const key = 'vendor';

      component.selectAll(event, key);

      expect(component.filterVal[key]).toBeDefined();
    });
  });

  describe('onClickUpload', () => {
    it('should close dialog with the provided value', () => {
      const value = 'uploaded';

      component.onClickUpload(value);

      expect(mockDynamicDialogRef.close).toHaveBeenCalledWith(value);
    });
  });

  describe('cancel', () => {
    it('should close dialog without value', () => {
      component.cancel();

      expect(mockDynamicDialogRef.close).toHaveBeenCalled();
    });
  });

  describe('onApplyFilter', () => {
    beforeEach(() => {
      component.filterVal = { status: { active: true } };
      component.selectedSort = 'descending';
      fixture.detectChanges();
    });

    it('should apply filter with sort and close dialog', () => {
      component.onApplyFilter(component.filterVal);

      expect(component.filterVal['sort']).toBe('descending');
      expect(mockDynamicDialogRef.close).toHaveBeenCalledWith('apply');
    });

    it('should not add sort if selectedSort is undefined', () => {
      component.selectedSort = undefined;

      component.onApplyFilter(component.filterVal);

      expect(component.filterVal['sort']).toBeUndefined();
      expect(mockDynamicDialogRef.close).toHaveBeenCalledWith('apply');
    });
  });

  describe('onClearFilter', () => {
    it('should clear all filters and close dialog', () => {
      component.filterVal = { status: { active: true } };
      component.data = {
        data: {
          filter: { status: { active: true } }
        }
      };
      component.selectedSort = 'ascending';

      component.onClearFilter();

      expect(component.filterVal).toEqual({});
      expect(component.data['data']['filter']).toEqual({});
      expect(component.selectedSort).toBeUndefined();
      expect(mockDynamicDialogRef.close).toHaveBeenCalledWith('clear');
    });
  });

  describe('slectVal', () => {
    beforeEach(() => {
      component.filterVal = {};
      component.data = {
        data: {
          status: ['active', 'inactive']
        }
      };
      fixture.detectChanges();
    });

    it('should add value to filter when key does not exist', () => {
      component.slectVal('active', 'status');

      expect(component.filterVal['status']).toBeDefined();
      expect(component.filterVal['status']['active']).toBeTrue();
    });

    it('should add value to filter when key exists but value does not', () => {
      component.filterVal['status'] = { 'inactive': true };

      component.slectVal('active', 'status');

      expect(component.filterVal['status']['active']).toBeTrue();
      expect(component.filterVal['status']['inactive']).toBeTrue();
    });

    it('should remove value from filter when value already exists', () => {
      component.filterVal['status'] = { 'active': true, 'inactive': true };

      component.slectVal('active', 'status');

      expect(component.filterVal['status']['active']).toBeUndefined();
      expect(component.filterVal['statusAll']).toBeFalse();
    });
  });

  describe('backToHome', () => {
    it('should close dialog with "done" value', () => {
      component.backToHome();

      expect(mockDynamicDialogRef.close).toHaveBeenCalledWith('done');
    });
  });

  describe('Component properties', () => {
    it('should have categories defined', () => {
      fixture.detectChanges();

      expect(component.categories).toBeDefined();
      expect(component.categories.length).toBe(4);
      expect(component.categories[0]).toEqual({ name: 'Accounting', key: 'A' });
    });

    it('should have default values', () => {
      fixture.detectChanges();

      expect(component.invoiceStatus).toBeFalse();
      expect(component.clearingStatus).toBeFalse();
      expect(component.paymentStatus).toBeFalse();
      expect(component.paymentNA).toBeFalse();
      expect(component.linePercentage).toBe('0%');
    });
  });
});


