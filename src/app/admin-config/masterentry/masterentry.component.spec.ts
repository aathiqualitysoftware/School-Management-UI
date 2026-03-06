import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterentryComponent } from './masterentry.component';

describe('MasterentryComponent', () => {
  let component: MasterentryComponent;
  let fixture: ComponentFixture<MasterentryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MasterentryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MasterentryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
