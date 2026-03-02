import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DepartmnetDesignationComponent } from './departmnet-designation.component';

describe('DepartmnetDesignationComponent', () => {
  let component: DepartmnetDesignationComponent;
  let fixture: ComponentFixture<DepartmnetDesignationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DepartmnetDesignationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DepartmnetDesignationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
