import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HostelGatePassComponent } from './hostel-gate-pass.component';

describe('HostelGatePassComponent', () => {
  let component: HostelGatePassComponent;
  let fixture: ComponentFixture<HostelGatePassComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HostelGatePassComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HostelGatePassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
