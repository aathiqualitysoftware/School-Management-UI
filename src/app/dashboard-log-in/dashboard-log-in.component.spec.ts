import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardLogInComponent } from './dashboard-log-in.component';

describe('DashboardLogInComponent', () => {
  let component: DashboardLogInComponent;
  let fixture: ComponentFixture<DashboardLogInComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardLogInComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DashboardLogInComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
