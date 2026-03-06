import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeesPlanComponent } from './fees-plan.component';

describe('FeesPlanComponent', () => {
  let component: FeesPlanComponent;
  let fixture: ComponentFixture<FeesPlanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FeesPlanComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FeesPlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
