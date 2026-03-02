import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateDepartmentDesignationComponent } from './create-department-designation.component';

describe('CreateDepartmentDesignationComponent', () => {
  let component: CreateDepartmentDesignationComponent;
  let fixture: ComponentFixture<CreateDepartmentDesignationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateDepartmentDesignationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateDepartmentDesignationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
